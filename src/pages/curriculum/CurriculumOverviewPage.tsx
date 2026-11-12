import PageHeader from '@/components/layout/PageHeader'
import PageSection from '@/components/layout/PageSection'
import CurriculumBox from '@/components/resources/CurriculumBox'
import GradeTiles from '@/components/ui/GradeTiles'
import StrandList, { type StrandListItem } from '@/components/ui/StrandList'
import { useCurriculum } from '@/hooks/useCurriculum'
import { getMinistryDocument } from '@/data/resources/ministryDocuments'
import {
  countExpectations,
  curriculumPath,
  curriculumStats,
  gradesOf,
  overallsIn,
  skillsStrandOf,
  slug,
  specificsIn,
  strandsOf,
  topicsIn,
} from '@/lib/curriculum'
import { SUBJECTS, type Curriculum, type StrandId } from '@/types/curriculum'

// A skills strand (Strand A) lists its skills, the same in every grade; the
// other strands list their overall expectations, and a strand with topics
// adds them
function strandItemsOf(curriculum: Curriculum<StrandId>): StrandListItem[] {
  const firstGrade = gradesOf(curriculum)[0]
  return strandsOf(curriculum).map((id) => {
    const to = curriculumPath(curriculum.subject, { strand: id })
    const isSkills = curriculum.strands[id].skills
    const rows = isSkills
      ? specificsIn(curriculum, firstGrade, id).map(([code, specific]) => ({
          code,
          label: specific.topic ?? '',
          to: `${to}#${slug(code)}`,
        }))
      : overallsIn(curriculum, id).map(({ code, name }) => ({
          code,
          label: name ?? '',
          to: curriculumPath(curriculum.subject, { strand: id, code }),
        }))
    const topics = isSkills ? [] : topicsIn(curriculum, id)

    return {
      id,
      name: curriculum.strands[id].name,
      rows,
      groups: topics.length
        ? [
            {
              label: 'Topics',
              rows: topics.map((topic) => ({
                label: topic,
                to: `${to}#${slug(topic)}`,
              })),
            },
          ]
        : undefined,
    }
  })
}

// A subject's landing page: the header, the curriculum document, the grades
// and the strands. Everything on it comes from the subject's data; the
// Container in
// TwoColumnLayout spaces these sections equally
function CurriculumOverviewPage() {
  const curriculum = useCurriculum()
  const stats = curriculumStats(curriculum)
  const year = getMinistryDocument(curriculum.documentSlug)?.year
  const strands = strandsOf(curriculum)
  const skills = skillsStrandOf(curriculum)
  return (
    <>
      <PageHeader
        title={SUBJECTS[curriculum.subject].name}
        meta={`${stats.grades} grades · ${stats.strands} strands · ${stats.expectations} expectations · Ontario curriculum, ${year}`}
      />
      <CurriculumBox subject={curriculum.subject} />

      <PageSection box="panel" title="Grades">
        <GradeTiles
          tiles={gradesOf(curriculum).map((grade) => ({
            grade,
            to: curriculumPath(curriculum.subject, { grade }),
            meta: `${countExpectations(curriculum, grade)} expectations`,
          }))}
        />
      </PageSection>

      <PageSection
        box="panel"
        strandStripe={strands}
        title="Strands"
        description={skills && curriculum.strands[skills].note}
      >
        <StrandList strands={strandItemsOf(curriculum)} />
      </PageSection>
    </>
  )
}

export default CurriculumOverviewPage
