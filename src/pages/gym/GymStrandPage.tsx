import { Navigate, useParams } from 'react-router-dom'
import CompareList, { type CompareRow } from '@/components/ui/CompareList'
import OverallHeader, {
  type OverallMenuItem,
} from '@/components/ui/OverallHeader'
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

// One overall's parts, each with what every grade says (grades that say the
// same thing share a row). Strand D goes by topic, since a topic's code can
// change between grades; the others go by specific code
function sectionsIn(strand: GymStrand, code: string): StrandSection[] {
  const grades = gradesOf(gym)
  // Every specific in this overall, in every grade
  const inOverall = (grade: number) =>
    specificsIn(gym, grade, strand).filter(([c]) => c.startsWith(`${code}.`))

  const sections: StrandSection[] = gym.strands[strand].topics
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
  return sections.filter((section) => section.rows.length)
}

// One strand across Grades 1 to 8, e.g. /gym/strand/b/b1: the overall as the
// title, with a menu of the strand's other overalls (the same header as the
// specific expectations page), then each of its parts. /gym/strand/b opens at
// the first overall
function GymStrandPage() {
  const params = useParams<{ strand: string; code?: string }>()
  const strand = (params.strand ?? '').toUpperCase() as GymStrand
  const isStrand = strandsOf(gym).includes(strand)
  const overalls = isStrand ? overallsIn(gym, strand) : []
  const code = params.code?.toUpperCase() ?? overalls[0]?.code
  useHashJump(strand, code)

  if (!isStrand)
    return <Navigate to={curriculumPath(gym.subject, {})} replace />
  if (!overalls.some((overall) => overall.code === code))
    return <Navigate to={curriculumPath(gym.subject, { strand })} replace />

  // e.g. B1 Active Participation, with how many parts it has, for the menu
  const items: OverallMenuItem[] = overalls.map((overall) => ({
    code: overall.code,
    name: overall.name,
    count: sectionsIn(strand, overall.code).length,
    to: curriculumPath(gym.subject, { strand, code: overall.code }),
  }))
  const current = overalls.find((overall) => overall.code === code)
  // With one overall (Strand A), the title is the strand itself
  const single = overalls.length === 1

  // The page's parts go straight into the main column's Container, like the
  // Overview's; this wrapper only passes the strand colour down
  return (
    <div data-strand={strand} className="contents">
      <div className="col-md">
        <OverallHeader
          code={single ? strand : code}
          name={single ? gym.strands[strand].name : current?.name}
          items={single ? [] : items}
        />
        {gym.strands[strand].note && (
          <p className="text-lead">{gym.strands[strand].note}</p>
        )}
      </div>
      {sectionsIn(strand, code).map((section) => (
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
