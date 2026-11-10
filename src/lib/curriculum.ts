import type {
  Curriculum,
  OverallExpectation,
  SpecificExpectation,
  StrandId,
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
