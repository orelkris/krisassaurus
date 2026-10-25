import { useMemo } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import SectionTabs from '@/components/ui/SectionTabs'
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
        label: `${strand.name} · ${list.filter((e) => e.strand === strand.id).length}`,
        color: strand.colors.accent,
      })),
    [list]
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

      <SectionTabs
        tabs={tabs}
        activeId={activeId}
        onSelect={jumpTo}
        label="Jump to a strand"
        title={`Grade ${grade}`}
      />

      {/* Each strand is its banner and boxes, spaced like the rest of the page */}
      {mathStrands.map((strand) => {
        const items = list.filter(
          (expectation) => expectation.strand === strand.id
        )
        return (
          <section
            key={strand.id}
            id={`strand-${strand.slug}`}
            className="col-page scroll-mt-16"
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
