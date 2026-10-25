import { useMatch, useSearchParams } from 'react-router-dom'
import type { DramaFilter } from '@/types/drama'
import { findDramaExpectation } from '@/data/drama/curriculum/expectations'
import {
  getDramaStrand,
  getDramaStrandBySlug,
} from '@/data/drama/curriculum/strands'

// Reads the Drama curriculum filter (grade, strand, code) from the URL, like
// useMathFilter. An expectation page picks both its grade and its strand
export function useDramaFilter() {
  const expectationMatch = useMatch('/drama/grade/:grade/:code')
  const gradeStrandMatch = useMatch('/drama/grade/:grade/strand/:slug')
  const gradeMatch = useMatch('/drama/grade/:grade')
  const strandMatch = useMatch('/drama/strand/:slug')
  const [searchParams] = useSearchParams()

  const expectation = expectationMatch
    ? findDramaExpectation(
        Number(expectationMatch.params.grade),
        expectationMatch.params.code ?? ''
      )
    : undefined

  const gradeParam = (gradeStrandMatch ?? gradeMatch)?.params.grade
  const slug = (gradeStrandMatch ?? strandMatch)?.params.slug

  const grade =
    expectation?.grade ?? (gradeParam ? Number(gradeParam) : undefined)
  const strand = expectation
    ? getDramaStrand(expectation.strand)
    : slug
      ? getDramaStrandBySlug(slug)
      : undefined
  const code = expectation
    ? expectation.code
    : strandMatch
      ? searchParams.get('code')?.toUpperCase()
      : undefined

  const filter: DramaFilter = { grade, strand: strand?.id, code }
  return { filter, strand, expectation }
}
