import { Navigate, useParams } from 'react-router-dom'
import PageHeader from '@/components/layout/PageHeader'
import ElementsOfDrama from '@/components/drama/ElementsOfDrama'
import CurriculumBreadcrumb from '@/components/ui/CurriculumBreadcrumb'
import ExpectationGroups from '@/components/ui/ExpectationGroups'
import StrandBanner from '@/components/ui/StrandBanner'
import StrandTabs from '@/components/ui/StrandTabs'
import {
  dramaStrandGroups,
  getDramaExpectations,
} from '@/data/drama/curriculum/expectations'
import { dramaStrands } from '@/data/drama/curriculum/strands'
import { useScrollSpy } from '@/hooks/useScrollSpy'

// One tab per strand; each tab jumps to the strand's section
const tabs = dramaStrands.map((strand) => ({
  id: `strand-${strand.slug}`,
  strand,
}))
const sectionIds = tabs.map((tab) => tab.id)

// Laid out like Math's GradePage, with the elements of drama first
function DramaGradePage() {
  const grade = Number(useParams<{ grade: string }>().grade)
  const isGrade = Number.isInteger(grade) && grade >= 1 && grade <= 8
  const { activeId, jumpTo } = useScrollSpy(sectionIds)

  if (!isGrade) return <Navigate to="/drama" replace />

  const list = getDramaExpectations({ grade })

  return (
    <>
      <PageHeader
        above={
          <CurriculumBreadcrumb
            subject="Drama"
            grade={grade}
            className="hidden lg:block"
          />
        }
        title={`Grade ${grade}`}
        description={`All ${list.length} expectations for Grade ${grade}, in plain lists. You don’t have to teach them in this order, and many can be taught together.`}
      />

      <ElementsOfDrama grade={grade} />

      <StrandTabs
        tabs={tabs}
        activeId={activeId}
        onSelect={jumpTo}
        title={`Grade ${grade}`}
      />

      {/* Each strand is its banner and box, spaced like the rest of the page.
          On phones the strand name sits on its own line in the tabs, so the
          sections stop lower to clear the taller bar */}
      {dramaStrands.map((strand) => {
        const items = list.filter(
          (expectation) => expectation.strand === strand.id
        )
        return (
          <section
            key={strand.id}
            id={`strand-${strand.slug}`}
            className="col-page scroll-mt-28 md:scroll-mt-16"
          >
            <StrandBanner strand={strand} count={items.length} />
            <ExpectationGroups groups={dramaStrandGroups(items)} />
          </section>
        )
      })}
    </>
  )
}

export default DramaGradePage
