import { Link } from 'react-router-dom'
import PageHeader from '@/components/layout/PageHeader'
import PageSection from '@/components/layout/PageSection'
import CurriculumBox from '@/components/resources/CurriculumBox'
import GradeTiles from '@/components/ui/GradeTiles'
import StrandList, { type StrandListItem } from '@/components/ui/StrandList'
import { useCurriculum } from '@/hooks/useCurriculum'
import { getMinistryDocument } from '@/data/resources/ministryDocuments'
import { getSubjectSection } from '@/data/subjects'
import {
  countExpectations,
  curriculumPath,
  curriculumStats,
  gradesOf,
  ideasIn,
  overallsIn,
  skillsStrandOf,
  slug,
  specificsIn,
  strandsOf,
  topicsIn,
  unitOf,
} from '@/lib/curriculum'
import { SUBJECTS, type Curriculum, type StrandId } from '@/types/curriculum'

// A skills strand (Gym's Strand A) lists its named skills, the same in every
// grade; the other strands list their overall expectations, or their ideas
// when the subject has them (Math). A strand with topics adds them, and one
// with a unit in each grade (Science) adds those
function strandItemsOf(curriculum: Curriculum<StrandId>): StrandListItem[] {
  const firstGrade = gradesOf(curriculum)[0]
  return strandsOf(curriculum).map((id) => {
    const to = curriculumPath(curriculum.subject, { strand: id })
    const firstSpecifics = specificsIn(curriculum, firstGrade, id)
    const isSkills =
      curriculum.strands[id].skills &&
      firstSpecifics.every(([, specific]) => specific.topic)
    const ideas = ideasIn(curriculum, id)
    const rows = isSkills
      ? firstSpecifics.map(([code, specific]) => ({
          code,
          label: specific.topic ?? '',
          to: `${to}#${slug(code)}`,
        }))
      : ideas.length
        ? ideas.map((idea) => ({
            label: idea.name,
            to: curriculumPath(curriculum.subject, {
              strand: id,
              code: idea.id,
            }),
          }))
        : overallsIn(curriculum, id).map(({ code, name }) => ({
            code,
            label: name ?? '',
            to: curriculumPath(curriculum.subject, { strand: id, code }),
          }))
    const topics = isSkills ? [] : topicsIn(curriculum, id)
    const units = gradesOf(curriculum)
      .map((grade) => ({ grade, unit: unitOf(curriculum, grade, id) }))
      .filter(({ unit }) => unit)

    return {
      id,
      name: curriculum.strands[id].name,
      rows,
      groups: [
        ...(topics.length
          ? [
              {
                label: 'Topics',
                rows: topics.map((topic) => ({
                  label: topic,
                  to: `${to}#${slug(topic)}`,
                })),
              },
            ]
          : []),
        ...(units.length
          ? [
              {
                label: 'Units',
                rows: units.map(({ grade, unit }) => ({
                  label: `Grade ${grade} · ${unit}`,
                  to: `${curriculumPath(curriculum.subject, { grade })}#strand-${id.toLowerCase()}`,
                })),
              },
            ]
          : []),
      ],
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
  // e.g. Math's link to Drama & Math, kept with the subjects
  const related = getSubjectSection(curriculum.subject)?.related
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

      {related && (
        <p className="text-small">
          {related.label}{' '}
          <Link to={related.to} className="link">
            {related.linkText}
          </Link>
        </p>
      )}
    </>
  )
}

export default CurriculumOverviewPage
