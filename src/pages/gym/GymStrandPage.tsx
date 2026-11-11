import { Navigate, useNavigate, useParams } from 'react-router-dom'
import CompareList, { type CompareRow } from '@/components/ui/CompareList'
import OverallHeader from '@/components/ui/OverallHeader'
import ViewTabs from '@/components/ui/ViewTabs'
import { gymCurriculum as gym } from '@/data/subjects/gym/curriculum'
import { useHashJump } from '@/hooks/useHashJump'
import {
  curriculumPath,
  gradesOf,
  mergeGrades,
  overallsIn,
  slug,
  specificsIn,
  strandsOf,
  topicsIn,
} from '@/lib/curriculum'
import type { GymStrand } from '@/types/curriculum'

// One part of the strand page: a heading, then what each grade says
interface StrandSection {
  id: string
  heading: string
  rows: CompareRow[]
}

// e.g. B1.3 → 3, so B1.10 comes after B1.9
const number = (code: string) => Number(code.split('.')[1])

// One strand across Grades 1 to 8, e.g. /gym/strand/b/b1: a tab per overall
// expectation, then each specific expectation with what every grade says
// (grades that say the same thing share a row). Strand D goes by topic,
// since a topic's code can change between grades. /gym/strand/b opens at
// the first overall
function GymStrandPage() {
  const params = useParams<{ strand: string; code?: string }>()
  const navigate = useNavigate()
  const strand = (params.strand ?? '').toUpperCase() as GymStrand
  const isStrand = strandsOf(gym).includes(strand)
  const overalls = isStrand ? overallsIn(gym, strand) : []
  const code = params.code?.toUpperCase() ?? overalls[0]?.code
  useHashJump(strand, code)

  if (!isStrand)
    return <Navigate to={curriculumPath(gym.subject, {})} replace />
  if (!overalls.some((overall) => overall.code === code))
    return <Navigate to={curriculumPath(gym.subject, { strand })} replace />

  const grades = gradesOf(gym)
  // Every specific in this overall, in every grade
  const inOverall = (grade: number) =>
    specificsIn(gym, grade, strand).filter(([c]) => c.startsWith(`${code}.`))

  const byTopic = !!gym.strands[strand].topics
  const sections: StrandSection[] = byTopic
    ? topicsIn(gym, strand).map((topic) => ({
        id: slug(topic),
        heading: topic,
        rows: mergeGrades(
          grades.map((grade) => ({
            grade,
            entries: inOverall(grade)
              .filter(([, s]) => s.topic === topic)
              .map(([c, s]) => ({ code: c, text: s.description })),
          }))
        ),
      }))
    : [...new Set(grades.flatMap((g) => inOverall(g).map(([c]) => c)))]
        .sort((a, b) => number(a) - number(b))
        .map((specificCode) => {
          const first = grades
            .flatMap((g) => inOverall(g))
            .find(([c]) => c === specificCode)?.[1]
          return {
            id: slug(specificCode),
            // Strand A names each skill by its topic
            heading: [specificCode, strand === 'A' ? first?.topic : '']
              .filter(Boolean)
              .join(' '),
            rows: mergeGrades(
              grades.map((grade) => ({
                grade,
                entries: inOverall(grade)
                  .filter(([c]) => c === specificCode)
                  .map(([, s]) => ({ text: s.description })),
              }))
            ),
          }
        })

  return (
    <div data-strand={strand} className="col-xl">
      <div className="col-md">
        <OverallHeader
          back={{ label: 'Gym', to: curriculumPath(gym.subject, {}) }}
          code={strand}
          name={gym.strands[strand].name}
          items={[]}
        />
        {gym.strands[strand].note && (
          <p className="text-lead">{gym.strands[strand].note}</p>
        )}
      </div>
      {overalls.length > 1 && (
        <ViewTabs
          tabs={overalls.map((overall) => ({
            id: overall.code,
            label: [overall.code, overall.name].filter(Boolean).join(' '),
          }))}
          current={code}
          onSelect={(id) =>
            navigate(curriculumPath(gym.subject, { strand, code: id }))
          }
          label="Overall expectations"
        />
      )}
      {sections
        .filter((section) => section.rows.length)
        .map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="col-sm scroll-mt-md"
          >
            <h2 className="heading-section text-strand-text">
              {section.heading}
            </h2>
            <CompareList rows={section.rows} />
          </section>
        ))}
    </div>
  )
}

export default GymStrandPage
