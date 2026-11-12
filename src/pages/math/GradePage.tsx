import { useMemo } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import PageHeader from '@/components/layout/PageHeader'
import CurriculumBreadcrumb from '@/components/ui/CurriculumBreadcrumb'
import StrandBox from '@/components/ui/StrandBox'
import StrandTabs from '@/components/ui/StrandTabs'
import { getOveralls, overallPath } from '@/data/math/expectations'
import { mathStrands } from '@/data/math/strands'
import { useHashJump } from '@/hooks/useHashJump'
import { useScrollSpy } from '@/hooks/useScrollSpy'

const sectionId = (id: string) => `strand-${id.toLowerCase()}`

// One grade, laid out like the other subjects' grade pages: sticky strand
// tabs, then a box per strand with its overall expectations. Each one's
// button opens the overall's page, as in Gym
function GradePage() {
  const grade = Number(useParams<{ grade: string }>().grade)
  const isGrade = Number.isInteger(grade) && grade >= 1 && grade <= 8

  const tabs = useMemo(
    () =>
      mathStrands.map((strand) => ({
        id: sectionId(strand.id),
        strand: { id: strand.id, name: strand.name },
      })),
    []
  )
  const sectionIds = useMemo(() => tabs.map((tab) => tab.id), [tabs])
  const { activeId, jumpTo } = useScrollSpy(sectionIds)

  // Coming back to a strand (e.g. #strand-d) opens at it
  useHashJump(grade)

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
      />

      <StrandTabs tabs={tabs} activeId={activeId} onSelect={jumpTo} />

      {mathStrands.map((strand) => (
        <section
          key={strand.id}
          id={sectionId(strand.id)}
          className="scroll-mt-tabs"
        >
          <StrandBox
            strand={{ id: strand.id, name: strand.name }}
            rows={getOveralls(grade, strand.id).map((overall) => ({
              code: overall.code,
              name: overall.name,
              description: overall.description,
              count: overall.expectations.length,
              to: overallPath(grade, overall.code),
            }))}
          />
        </section>
      ))}
    </>
  )
}

export default GradePage
