import { useMatch, useSearchParams } from 'react-router-dom'
import type { MathFilter } from '@/types/math'
import { findExpectation, getIdeaOf } from '@/data/math/expectations'
import { getStrand, getStrandBySlug } from '@/data/math/strands'

// Reads the Math filter (grade, strand, idea) from the URL.
// An expectation page picks both its grade and its strand
export function useMathFilter() {
  const expectationMatch = useMatch('/blog/math/grade/:grade/:code')
  const gradeStrandMatch = useMatch('/blog/math/grade/:grade/strand/:slug')
  const gradeMatch = useMatch('/blog/math/grade/:grade')
  const strandMatch = useMatch('/blog/math/strand/:slug')
  const [searchParams] = useSearchParams()

  const expectation = expectationMatch
    ? findExpectation(
        Number(expectationMatch.params.grade),
        expectationMatch.params.code ?? ''
      )
    : undefined

  const gradeParam = (gradeStrandMatch ?? gradeMatch)?.params.grade
  const slug = (gradeStrandMatch ?? strandMatch)?.params.slug

  const grade =
    expectation?.grade ?? (gradeParam ? Number(gradeParam) : undefined)
  const strand = expectation
    ? getStrand(expectation.strand)
    : slug
      ? getStrandBySlug(slug)
      : undefined
  const idea = expectation
    ? getIdeaOf(expectation)?.id
    : strandMatch
      ? (searchParams.get('idea') ?? undefined)
      : undefined

  const filter: MathFilter = { grade, strand: strand?.id, idea }
  return { filter, strand, expectation }
}