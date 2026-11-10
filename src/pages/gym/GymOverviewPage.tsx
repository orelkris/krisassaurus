import PageHeader from '@/components/layout/PageHeader'
import PageSection from '@/components/layout/PageSection'
import CurriculumBox from '@/components/resources/CurriculumBox'
import GradeTiles from '@/components/ui/GradeTiles'
import StrandList, { type StrandListItem } from '@/components/ui/StrandList'
import { gymCurriculum as gym } from '@/data/subjects/gym/curriculum'
import { getMinistryDocument } from '@/data/resources/ministryDocuments'
import {
  countExpectations,
  curriculumPath,
  curriculumStats,
  gradesOf,
  overallsIn,
  specificsIn,
  strandsOf,
  topicsIn,
} from '@/lib/curriculum'
import { SUBJECTS } from '@/types/curriculum'

const stats = curriculumStats(gym)
const year = getMinistryDocument(gym.documentSlug)?.year
const strands = strandsOf(gym)
const firstGrade = gradesOf(gym)[0]

// A slug for a topic's place on the strand page, e.g. healthy-eating
const slug = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

// Strand A lists its skills (A1.1 to A1.6, the same in every grade); the other
// strands list their overall expectations, and a strand with topics adds them
const strandItems: StrandListItem[] = strands.map((id) => {
  const to = curriculumPath(gym.subject, { strand: id })
  const rows =
    id === 'A'
      ? specificsIn(gym, firstGrade, 'A').map(([code, specific]) => ({
          code,
          label: specific.topic ?? '',
          to: `${to}#${slug(code)}`,
        }))
      : overallsIn(gym, id).map(({ code, name }) => ({
          code,
          label: name ?? '',
          to: curriculumPath(gym.subject, { strand: id, code }),
        }))
  const topics = id === 'A' ? [] : topicsIn(gym, id)

  return {
    id,
    name: gym.strands[id].name,
    to,
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

// Gym's landing page: the header, the curriculum document, the grades and the
// strands. Everything on it comes from data/subjects/gym; the Container in
// TwoColumnLayout spaces these sections equally
function GymOverviewPage() {
  return (
    <>
      <PageHeader
        title={SUBJECTS[gym.subject].name}
        meta={`${stats.grades} grades · ${stats.strands} strands · ${stats.expectations} expectations · Ontario curriculum, ${year}`}
      />
      <CurriculumBox subject={gym.subject} />

      <PageSection box="panel" title="Grades">
        <GradeTiles
          tiles={gradesOf(gym).map((grade) => ({
            grade,
            to: curriculumPath(gym.subject, { grade }),
            meta: `${countExpectations(gym, grade)} expectations`,
          }))}
        />
      </PageSection>

      <PageSection
        box="panel"
        strandStripe={strands}
        title="Strands"
        description={gym.strands.A.note}
      >
        <StrandList strands={strandItems} />
      </PageSection>
    </>
  )
}

export default GymOverviewPage
