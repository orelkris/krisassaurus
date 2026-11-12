import { useMemo } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import PageHeader from '@/components/layout/PageHeader'
import CurriculumBreadcrumb from '@/components/ui/CurriculumBreadcrumb'
import FramedGroup from '@/components/ui/FramedGroup'
import StrandBox from '@/components/ui/StrandBox'
import StrandTabs from '@/components/ui/StrandTabs'
import TermList from '@/components/ui/TermList'
import { useCurriculum } from '@/hooks/useCurriculum'
import { useHashJump } from '@/hooks/useHashJump'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { curriculumPath, gradesOf, strandsOf, unitOf } from '@/lib/curriculum'
import { SUBJECTS } from '@/types/curriculum'

const sectionId = (id: string) => `strand-${id.toLowerCase()}`

// One grade: the grade's concepts box first when the document has one
// (Drama's Elements of drama), sticky strand tabs when there's more than one
// strand, then a box per strand with its overall expectations, each with a
// button to its specific expectations
function CurriculumGradePage() {
  const curriculum = useCurriculum()
  const strands = useMemo(() => strandsOf(curriculum), [curriculum])
  const grade = Number(useParams<{ grade: string }>().grade)
  const isGrade = gradesOf(curriculum).includes(grade)

  const tabs = useMemo(
    () =>
      strands.map((id) => ({
        id: sectionId(id),
        strand: { id, name: curriculum.strands[id].name },
      })),
    [curriculum, strands]
  )
  const sectionIds = useMemo(() => tabs.map((tab) => tab.id), [tabs])
  const { activeId, jumpTo } = useScrollSpy(sectionIds)

  // Coming back from an overall (e.g. #strand-d) opens at that strand
  useHashJump(grade)

  if (!isGrade)
    return <Navigate to={curriculumPath(curriculum.subject, {})} replace />

  const concepts = curriculum.concepts
  const terms = concepts?.grades[grade] ?? []

  return (
    <>
      <PageHeader
        above={
          <CurriculumBreadcrumb
            subject={SUBJECTS[curriculum.subject].name}
            grade={grade}
            className="hidden lg:block"
          />
        }
        title={`Grade ${grade}`}
      />

      {concepts && terms.length > 0 && (
        <FramedGroup label={`${concepts.name} · Grade ${grade}`}>
          <TermList terms={terms} />
        </FramedGroup>
      )}

      {strands.length > 1 && (
        <StrandTabs tabs={tabs} activeId={activeId} onSelect={jumpTo} />
      )}

      {strands.map((id) => {
        const overalls = curriculum.grades[grade]?.[id] ?? {}
        return (
          <section key={id} id={sectionId(id)} className="scroll-mt-tabs">
            <StrandBox
              strand={{ id, name: curriculum.strands[id].name }}
              unit={unitOf(curriculum, grade, id)}
              rows={Object.entries(overalls).map(([code, overall]) => ({
                code,
                name: overall.name,
                description: overall.description,
                count: Object.keys(overall.specifics).length,
                to: `${curriculumPath(curriculum.subject, { grade })}/${code.toLowerCase()}`,
              }))}
            />
          </section>
        )
      })}
    </>
  )
}

export default CurriculumGradePage
