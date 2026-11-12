import { Navigate, useParams } from 'react-router-dom'
import PageHeader from '@/components/layout/PageHeader'
import CompareList, { type CompareRow } from '@/components/ui/CompareList'
import OverallHeader from '@/components/ui/OverallHeader'
import StickyBar from '@/components/ui/StickyBar'
import StrandBadge from '@/components/ui/StrandBadge'
import StrandMap from '@/components/ui/StrandMap'
import { useCurriculum } from '@/hooks/useCurriculum'
import { useHashJump } from '@/hooks/useHashJump'
import {
  curriculumPath,
  gradesOf,
  hasUnits,
  mergeGrades,
  overallsIn,
  slug,
  specificsIn,
  strandColors,
  strandsOf,
  topicsIn,
  unitOf,
} from '@/lib/curriculum'
import type { Curriculum, StrandId } from '@/types/curriculum'

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
function sectionsIn(
  curriculum: Curriculum<StrandId>,
  strand: StrandId,
  code: string
): StrandSection[] {
  const grades = gradesOf(curriculum)
  // Every specific in this overall, in every grade
  const inOverall = (grade: number) =>
    specificsIn(curriculum, grade, strand).filter(([c]) =>
      c.startsWith(`${code}.`)
    )

  // A strand with units (Science's B to E) covers a new topic each grade, so
  // B2.1 in Grade 1 and in Grade 2 aren't the same thing. Each grade gets its
  // own row instead: the unit, then that grade's expectations
  if (hasUnits(curriculum, strand))
    return [
      {
        id: 'grades',
        heading: '',
        rows: grades
          .map((grade) => ({
            label: `Grade ${grade}`,
            heading: unitOf(curriculum, grade, strand),
            entries: inOverall(grade).map(([c, s]) => ({
              code: c,
              text: s.description,
            })),
          }))
          .filter((row) => row.entries.length),
      },
    ].filter((section) => section.rows.length)

  const sections: StrandSection[] = curriculum.strands[strand].topics
    ? topicsIn(curriculum, strand).map((topic) => ({
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
            // A skills strand names each skill by its topic
            heading: [
              specificCode,
              curriculum.strands[strand].skills ? first?.topic : '',
            ]
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
function CurriculumStrandPage() {
  const curriculum = useCurriculum()
  const params = useParams<{ strand: string; code?: string }>()
  const strand = (params.strand ?? '').toUpperCase() as StrandId
  const isStrand = strandsOf(curriculum).includes(strand)
  const overalls = isStrand ? overallsIn(curriculum, strand) : []
  const code = params.code?.toUpperCase() ?? overalls[0]?.code
  useHashJump(strand, code)

  if (!isStrand)
    return <Navigate to={curriculumPath(curriculum.subject, {})} replace />
  if (!overalls.some((overall) => overall.code === code))
    return (
      <Navigate to={curriculumPath(curriculum.subject, { strand })} replace />
    )

  const current = overalls.find((overall) => overall.code === code)
  const strandName = curriculum.strands[strand].name
  const grades = gradesOf(curriculum)
  // With one overall (Strand A), the title is the strand itself and there's
  // nothing to pick, so no map
  const single = overalls.length === 1

  // Like Math's strand page: the strand as the title, then a map with one
  // row per overall expectation (its sub-strands) and one square per specific
  // expectation in each grade. Picking a row shows that overall below.
  // The page's parts go straight into the main column's Container, like the
  // Overview's; this wrapper only passes the strand colour down
  return (
    <div data-strand={strand} className="contents">
      {single ? (
        <OverallHeader code={strand} name={strandName} items={[]} />
      ) : (
        <>
          <PageHeader
            title={
              <>
                <StrandBadge strand={{ id: strand }} size="lg" />
                {strandName}
              </>
            }
          />
          <StrandMap
            rowLabel="Overall expectation"
            grades={grades}
            rows={overalls.map((overall) => ({
              id: overall.code,
              label: `${overall.code} ${overall.name ?? ''}`,
              to: curriculumPath(curriculum.subject, {
                strand,
                code: overall.code,
              }),
              counts: Object.fromEntries(
                grades.map((grade) => [
                  grade,
                  Object.keys(
                    curriculum.grades[grade]?.[strand]?.[overall.code]
                      ?.specifics ?? {}
                  ).length,
                ])
              ),
            }))}
            currentId={code}
            colors={strandColors(strand)}
          />
        </>
      )}
      {curriculum.strands[strand].note && (
        <p className="text-lead">{curriculum.strands[strand].note}</p>
      )}
      {/* The overall's name sticks while its parts scroll past */}
      {!single && (
        <StickyBar padded>
          <h2 className="text-label">
            {strandName} · {code} {current?.name} · Grades {grades[0]} to{' '}
            {grades[grades.length - 1]}
          </h2>
        </StickyBar>
      )}
      {sectionsIn(curriculum, strand, code).map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="col-sm scroll-mt-md"
        >
          {section.heading && (
            <h2 className="heading-section text-strand-text">
              {section.heading}
            </h2>
          )}
          <CompareList rows={section.rows} />
        </section>
      ))}
    </div>
  )
}

export default CurriculumStrandPage
