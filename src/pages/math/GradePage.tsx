import { useMemo } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import StrandTabs from '@/components/ui/StrandTabs'
import PageHeader from '@/components/layout/PageHeader'
import CurriculumBreadcrumb from '@/components/ui/CurriculumBreadcrumb'
import ExpectationGroups from '@/components/ui/ExpectationGroups'
import StrandBanner from '@/components/ui/StrandBanner'
import { getExpectations, overallGroups } from '@/data/math/expectations'
import { mathStrands } from '@/data/math/strands'
import { useScrollSpy } from '@/hooks/useScrollSpy'

function GradePage() {
  const grade = Number(useParams<{ grade: string }>().grade)
  const isGrade = Number.isInteger(grade) && grade >= 1 && grade <= 8
  const list = useMemo(
    () => (isGrade ? getExpectations({ grade }) : []),
    [isGrade, grade]
  )

  // One tab per strand; each tab jumps to the strand's section
  const tabs = useMemo(
    () =>
      mathStrands.map((strand) => ({
        id: `strand-${strand.slug}`,
        strand,
      })),
    []
  )
  const sectionIds = useMemo(() => tabs.map((tab) => tab.id), [tabs])
  const { activeId, jumpTo } = useScrollSpy(sectionIds)

  if (!isGrade) return <Navigate to="/math" replace />

  return (
    <>
      <PageHeader
        above={
          <CurriculumBreadcrumb
            subject="Math"
            grade={grade}
            className="hidden lg:block"
          />
        }
        title={`Grade ${grade}`}
        description={`All ${list.length} expectations for Grade ${grade}, in plain lists. You don’t have to teach them in this order, and many can be taught together.`}
      />

      <StrandTabs
        tabs={tabs}
        activeId={activeId}
        onSelect={jumpTo}
        title={`Grade ${grade}`}
      />

      {/* Each strand is its banner and boxes, spaced like the rest of the page.
          On phones the strand name sits on its own line in the tabs, so the
          sections stop lower to clear the taller bar */}
      {mathStrands.map((strand) => {
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

            <ExpectationGroups groups={overallGroups(items)} />
          </section>
        )
      })}
    </>
  )
}

export default GradePage
