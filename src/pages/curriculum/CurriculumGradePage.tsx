import { useMemo } from 'react'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import PageHeader from '@/components/layout/PageHeader'
import CurriculumBreadcrumb from '@/components/ui/CurriculumBreadcrumb'
import StrandBox from '@/components/ui/StrandBox'
import StrandSwitch from '@/components/ui/StrandSwitch'
import StrandTabs from '@/components/ui/StrandTabs'
import TermBox from '@/components/ui/TermBox'
import { useCurriculum } from '@/hooks/useCurriculum'
import { useHashJump } from '@/hooks/useHashJump'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { curriculumPath, gradesOf, strandsOf, unitOf } from '@/lib/curriculum'
import { SUBJECTS, type StrandId } from '@/types/curriculum'

const sectionId = (id: string) => `strand-${id.toLowerCase()}`

// One grade: sticky strand tabs when there's more than one strand, then a
// box per strand with its overall expectations, each with a button to its
// specific expectations. A subject that shows one strand at a time (the
// Arts) has a switch instead, and only the picked strand: its concepts box
// (Elements of dance) when the document has one, then its box
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

  // One strand at a time: the address picks it (#strand-c), else the first.
  // Nothing on the page has that id, so the page stays at the top
  const { hash } = useLocation()
  const picked =
    strands.find((id) => `#${sectionId(id)}` === hash) ?? strands[0]

  // Coming back from an overall (e.g. #strand-d) opens at that strand
  useHashJump(grade)

  if (!isGrade)
    return <Navigate to={curriculumPath(curriculum.subject, {})} replace />

  const strandBox = (id: StrandId) => {
    const overalls = curriculum.grades[grade]?.[id] ?? {}
    return (
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
    )
  }

  if (curriculum.strandAtATime) {
    const concepts = curriculum.concepts?.[picked]
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
        <div className="col-page">
          <StrandSwitch
            strands={tabs.map((tab) => tab.strand)}
            current={picked}
            hrefOf={(id) => `#${sectionId(id)}`}
          />
          {concepts && terms.length > 0 && (
            <TermBox title={concepts.name} terms={terms} strandId={picked} />
          )}
          {strandBox(picked)}
        </div>
      </>
    )
  }

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

      {strands.length > 1 && (
        <StrandTabs tabs={tabs} activeId={activeId} onSelect={jumpTo} />
      )}

      {strands.map((id) => (
        <section key={id} id={sectionId(id)} className="scroll-mt-tabs">
          {strandBox(id)}
        </section>
      ))}
    </>
  )
}

export default CurriculumGradePage
