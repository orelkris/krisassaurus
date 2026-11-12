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
  ideasIn,
  mergeGrades,
  overallsIn,
  slug,
  specificsIn,
  specificsInIdea,
  strandColors,
  strandsOf,
  topicsIn,
  unitOf,
} from '@/lib/curriculum'
import type { Curriculum, Idea, StrandId } from '@/types/curriculum'

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

// One idea's specifics in every grade, each with its code (Math): a row per
// grade, since the codes change from grade to grade
function ideaSections(
  curriculum: Curriculum<StrandId>,
  idea: Idea<StrandId>
): StrandSection[] {
  return [
    {
      id: idea.id,
      heading: '',
      rows: mergeGrades(
        gradesOf(curriculum).map((grade) => ({
          grade,
          entries: specificsInIdea(curriculum, idea, grade).map(([c, s]) => ({
            code: c,
            text: s.description,
          })),
        }))
      ),
    },
  ]
}

// One strand across Grades 1 to 8, e.g. /gym/strand/b/b1: the strand as the
// title, a map of its parts, then the picked part grade by grade. The parts
// are its overall expectations, or its ideas when the subject has them
// (/math/strand/b/fractions). /gym/strand/b opens at the first part
function CurriculumStrandPage() {
  const curriculum = useCurriculum()
  const params = useParams<{ strand: string; code?: string }>()
  const strand = (params.strand ?? '').toUpperCase() as StrandId
  const isStrand = strandsOf(curriculum).includes(strand)
  const ideas = isStrand ? ideasIn(curriculum, strand) : []
  const grades = gradesOf(curriculum)
  // Each part's id (B1, or an idea's id), name and count in each grade
  const parts = ideas.length
    ? ideas.map((idea) => ({
        id: idea.id,
        label: idea.name,
        name: idea.name,
        count: (grade: number) => idea.codes[grade]?.length ?? 0,
      }))
    : (isStrand ? overallsIn(curriculum, strand) : []).map(
        ({ code, name }) => ({
          id: code,
          label: `${code} ${name ?? ''}`,
          name: `${code} ${name ?? ''}`,
          count: (grade: number) =>
            Object.keys(
              curriculum.grades[grade]?.[strand]?.[code]?.specifics ?? {}
            ).length,
        })
      )
  const id = ideas.length
    ? (params.code ?? parts[0]?.id)
    : (params.code?.toUpperCase() ?? parts[0]?.id)
  useHashJump(strand, id)

  if (!isStrand)
    return <Navigate to={curriculumPath(curriculum.subject, {})} replace />
  if (!parts.some((part) => part.id === id))
    return (
      <Navigate to={curriculumPath(curriculum.subject, { strand })} replace />
    )

  const current = parts.find((part) => part.id === id)
  const idea = ideas.find((item) => item.id === id)
  const strandName = curriculum.strands[strand].name
  // With one part (Strand A), the title is the strand itself and there's
  // nothing to pick, so no map
  const single = parts.length === 1

  // The map has one row per part and one square per specific expectation in
  // each grade. Picking a row shows that part below.
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
            rowLabel={ideas.length ? 'Idea' : 'Overall expectation'}
            grades={grades}
            rows={parts.map((part) => ({
              id: part.id,
              label: part.label,
              to: curriculumPath(curriculum.subject, { strand, code: part.id }),
              counts: Object.fromEntries(
                grades.map((grade) => [grade, part.count(grade)])
              ),
            }))}
            currentId={id}
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
            {strandName} · {current?.name} · Grades {grades[0]} to{' '}
            {grades[grades.length - 1]}
          </h2>
        </StickyBar>
      )}
      {(idea
        ? ideaSections(curriculum, idea)
        : sectionsIn(curriculum, strand, id)
      ).map((section) => (
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
