import { useEffect, useMemo } from 'react'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import PageHeader from '@/components/layout/PageHeader'
import CurriculumBreadcrumb from '@/components/ui/CurriculumBreadcrumb'
import StrandBox from '@/components/ui/StrandBox'
import StrandTabs from '@/components/ui/StrandTabs'
import { gymCurriculum as gym } from '@/data/subjects/gym/curriculum'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { curriculumPath, gradesOf, strandsOf } from '@/lib/curriculum'
import { SUBJECTS } from '@/types/curriculum'

const strands = strandsOf(gym)
const sectionId = (id: string) => `strand-${id.toLowerCase()}`

// One grade: sticky strand tabs, then a box per strand with its overall
// expectations, each with a button to its specific expectations
function GymGradePage() {
  const grade = Number(useParams<{ grade: string }>().grade)
  const isGrade = gradesOf(gym).includes(grade)

  const tabs = useMemo(
    () =>
      strands.map((id) => ({
        id: sectionId(id),
        strand: { id, name: gym.strands[id].name },
      })),
    []
  )
  const sectionIds = useMemo(() => tabs.map((tab) => tab.id), [tabs])
  const { activeId, jumpTo } = useScrollSpy(sectionIds)

  // Coming back from an overall (e.g. #strand-d) opens at that strand
  const { hash } = useLocation()
  useEffect(() => {
    if (!hash) return
    const frame = requestAnimationFrame(() =>
      document.getElementById(hash.slice(1))?.scrollIntoView()
    )
    return () => cancelAnimationFrame(frame)
  }, [hash, grade])

  if (!isGrade) return <Navigate to={curriculumPath(gym.subject, {})} replace />

  return (
    <>
      <PageHeader
        above={
          <CurriculumBreadcrumb
            subject={SUBJECTS[gym.subject].name}
            grade={grade}
            className="hidden lg:block"
          />
        }
        title={`Grade ${grade}`}
      />

      <StrandTabs tabs={tabs} activeId={activeId} onSelect={jumpTo} />

      {strands.map((id) => {
        const overalls = gym.grades[grade]?.[id] ?? {}
        return (
          <section key={id} id={sectionId(id)} className="scroll-mt-tabs">
            <StrandBox
              strand={{ id, name: gym.strands[id].name }}
              rows={Object.entries(overalls).map(([code, overall]) => ({
                code,
                name: overall.name,
                description: overall.description,
                count: Object.keys(overall.specifics).length,
                to: `${curriculumPath(gym.subject, { grade })}/${code.toLowerCase()}`,
              }))}
            />
          </section>
        )
      })}
    </>
  )
}

export default GymGradePage
