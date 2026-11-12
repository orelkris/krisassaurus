import { useMatch, useSearchParams } from 'react-router-dom'
import type { MathFilter, TaughtStrandId } from '@/types/math'
import { findExpectation, getIdeaOf } from '@/data/math/expectations'
import { getStrand, getStrandBySlug, mathStrands } from '@/data/math/strands'

// Reads the Math filter (grade, strand, idea) from the URL.
// An expectation page picks both its grade and its strand, and so do an
// overall page (/grade/6/b2) and a compare page (/grade/6/b2/b2.1)
export function useMathFilter() {
  const codeMatch = useMatch('/math/grade/:grade/:code')
  const compareMatch = useMatch('/math/grade/:grade/:code/:specific')
  const gradeMatch = useMatch('/math/grade/:grade')
  const strandMatch = useMatch('/math/strand/:slug')
  const [searchParams] = useSearchParams()

  // A code with a dot is a specific expectation (b2.1), without one an
  // overall (b2)
  const code = (
    compareMatch?.params.specific ??
    codeMatch?.params.code ??
    ''
  ).toUpperCase()
  const gradeParam = (compareMatch ?? codeMatch ?? gradeMatch)?.params.grade
  const grade = gradeParam ? Number(gradeParam) : undefined

  const expectation =
    grade && code.includes('.') ? findExpectation(grade, code) : undefined
  const codeStrand = mathStrands.find((s) => s.id === code[0])?.id as
    | TaughtStrandId
    | undefined

  const slug = strandMatch?.params.slug
  const strand = codeStrand
    ? getStrand(codeStrand)
    : slug
      ? getStrandBySlug(slug)
      : undefined
  const idea = expectation
    ? getIdeaOf(expectation)?.id
    : strandMatch
      ? (searchParams.get('idea') ?? undefined)
      : undefined

  const filter: MathFilter = { grade, strand: strand?.id, idea }
  // Only on an expectation page itself, so the sidebar marks it
  return {
    filter,
    strand,
    expectation: compareMatch ? undefined : expectation,
  }
}
