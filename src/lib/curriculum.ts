import { colorSet, type ColorSet } from '@/lib/colors'
import type { ActivityCard, ConceptCard } from '@/types/math'
import type {
  Curriculum,
  Idea,
  OverallExpectation,
  SpecificExpectation,
  StrandId,
  SubjectId,
  Support,
  TeacherSupports,
} from '@/types/curriculum'

// Helpers that read any subject's curriculum. Counts are always worked out
// from the data, never typed in, so they can't go out of date

// The grades in order, e.g. [1, 2, …, 8]
export function gradesOf<S extends StrandId>(c: Curriculum<S>): number[] {
  return Object.keys(c.grades)
    .map(Number)
    .sort((a, b) => a - b)
}

// The strand letters in order, e.g. ['A', 'B', 'C', 'D']
export function strandsOf<S extends StrandId>(c: Curriculum<S>): S[] {
  return (Object.keys(c.strands) as S[]).sort()
}

// Every specific expectation in one grade, optionally in one strand
export function specificsIn<S extends StrandId>(
  c: Curriculum<S>,
  grade: number,
  strand?: S
): [string, SpecificExpectation][] {
  const strands = c.grades[grade] ?? {}
  const picked = strand ? [strands[strand] ?? {}] : Object.values(strands)
  return picked.flatMap((overalls) =>
    Object.values(overalls as Record<string, OverallExpectation>).flatMap(
      (overall) => Object.entries(overall.specifics)
    )
  )
}

// A strand's ideas, when the subject is split that way (Math), e.g.
// Fractions, decimals & percents. Empty for the other subjects
export function ideasIn<S extends StrandId>(
  c: Curriculum<S>,
  strand: S
): Idea<S>[] {
  return c.ideas?.filter((idea) => idea.strand === strand) ?? []
}

// The idea a specific expectation is part of in one grade, if any
export function ideaOf<S extends StrandId>(
  c: Curriculum<S>,
  grade: number,
  code: string
): Idea<S> | undefined {
  return c.ideas?.find((idea) => idea.codes[grade]?.includes(code))
}

// An idea's specific expectations in one grade, in order
export function specificsInIdea<S extends StrandId>(
  c: Curriculum<S>,
  idea: Idea<S>,
  grade: number
): [string, SpecificExpectation][] {
  const inStrand = specificsIn(c, grade, idea.strand)
  return (idea.codes[grade] ?? []).flatMap((code) =>
    inStrand.filter(([key]) => key === code)
  )
}

// The cards we rewrote for one expectation's key concepts and sample tasks,
// if any (Math's Grade 6 B1.1)
export function cardsFor<S extends StrandId>(
  c: Curriculum<S>,
  grade: number,
  code: string
): { concepts?: ConceptCard[]; activities?: ActivityCard[] } {
  const key = `g${grade}-${code.toLowerCase()}`
  return {
    concepts: c.cards?.concepts[key],
    activities: c.cards?.activities[key],
  }
}

// Whether an expectation has anything to show for a support
export function hasSupport(
  supports: TeacherSupports | undefined,
  support: Support
): boolean {
  if (!supports) return false
  if (support === 'concepts') return supports.keyConcepts.length > 0
  if (support === 'examples') return supports.examples.length > 0
  return supports.tasks.length > 0
}

// The strand of skills taught through the others, if the subject has one
export function skillsStrandOf<S extends StrandId>(
  c: Curriculum<S>
): S | undefined {
  return strandsOf(c).find((id) => c.strands[id].skills)
}

// A strand's unit in one grade, e.g. Light and Sound (Science Grade 4, C)
export function unitOf<S extends StrandId>(
  c: Curriculum<S>,
  grade: number,
  strand: S
): string | undefined {
  return c.units?.[grade]?.[strand]
}

// Whether a strand is taught as a different unit in each grade (Science's
// B to E), so its grades are listed by unit rather than lined up by code
export function hasUnits<S extends StrandId>(
  c: Curriculum<S>,
  strand: S
): boolean {
  return gradesOf(c).some((grade) => !!unitOf(c, grade, strand))
}

// How many specific expectations a grade has, e.g. 36
export function countExpectations<S extends StrandId>(
  c: Curriculum<S>,
  grade: number
): number {
  return specificsIn(c, grade).length
}

// The numbers for a subject's header: 8 grades, 4 strands, 283 expectations
export function curriculumStats<S extends StrandId>(c: Curriculum<S>) {
  const grades = gradesOf(c)
  return {
    grades: grades.length,
    strands: strandsOf(c).length,
    expectations: grades.reduce(
      (sum, grade) => sum + countExpectations(c, grade),
      0
    ),
  }
}

// A strand's overall expectations with their names, e.g.
// [{ code: 'B1', name: 'Active Participation' }, …]. Taken from the first
// grade that has the strand, since the names are the same in every grade
export function overallsIn<S extends StrandId>(
  c: Curriculum<S>,
  strand: S
): { code: string; name?: string }[] {
  const grade = gradesOf(c).find((g) => c.grades[g]?.[strand])
  const overalls = grade ? (c.grades[grade]?.[strand] ?? {}) : {}
  return Object.entries(overalls).map(([code, overall]) => ({
    code,
    name: overall.name,
  }))
}

// The topics a strand's specifics are grouped under, e.g. Healthy Eating,
// Personal Safety and Injury Prevention. Uses the strand's printed order
// when the data has one, otherwise the order they first appear in
export function topicsIn<S extends StrandId>(
  c: Curriculum<S>,
  strand: S
): string[] {
  const printed = c.strands[strand].topics
  if (printed) return printed
  const topics = gradesOf(c).flatMap((grade) =>
    specificsIn(c, grade, strand).map(([, specific]) => specific.topic)
  )
  return [...new Set(topics.filter((t): t is string => !!t))]
}

// A page in a subject's curriculum section, e.g. /gym/grade/4,
// /gym/strand/b, /gym/strand/b/b2 (or an idea, /math/strand/b/fractions)
export function curriculumPath(
  subject: SubjectId,
  { grade, strand, code }: { grade?: number; strand?: StrandId; code?: string }
): string {
  if (grade) return `/${subject}/grade/${grade}`
  if (strand && code)
    return `/${subject}/strand/${strand.toLowerCase()}/${code.toLowerCase()}`
  if (strand) return `/${subject}/strand/${strand.toLowerCase()}`
  return `/${subject}`
}

// What each grade says about one thing, merged so that grades next to each
// other that say the same thing share a row: Grades 1–6, Grade 7, Grade 8.
// Grades with nothing are left out
export function mergeGrades<T>(
  perGrade: { grade: number; entries: T[] }[]
): { label: string; entries: T[] }[] {
  const runs: { from: number; to: number; key: string; entries: T[] }[] = []
  for (const { grade, entries } of perGrade) {
    if (!entries.length) continue
    const key = JSON.stringify(entries)
    const last = runs[runs.length - 1]
    if (last && last.key === key && last.to === grade - 1) last.to = grade
    else runs.push({ from: grade, to: grade, key, entries })
  }
  return runs.map(({ from, to, entries }) => ({
    label: from === to ? `Grade ${from}` : `Grades ${from}–${to}`,
    entries,
  }))
}

// A piece of text as part of an address, e.g. Healthy Eating → healthy-eating,
// A1.1 → a1-1
export function slug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// A strand's colours as CSS variables, for components that take colours as
// props (Math, Drama). Every subject's strand B is the same green
export function strandColors(id: StrandId): ColorSet {
  return colorSet(`strand-${id.toLowerCase()}`)
}
