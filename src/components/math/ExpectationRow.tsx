import { Link } from 'react-router-dom'
import type { Expectation } from '@/types/math'
import { expectationPath, getIdeaOf } from '@/data/math/expectations'
import { getStrand } from '@/data/math/strands'

interface ExpectationRowProps {
  expectation: Expectation
}

// One line of a grade page: code, official wording, and its idea
function ExpectationRow({ expectation }: ExpectationRowProps) {
  const strand = getStrand(expectation.strand)

  return (
    <Link
      to={expectationPath(expectation)}
      className="grid grid-cols-[44px_minmax(0,1fr)] items-baseline gap-3 rounded-[10px] border border-transparent px-3 py-2.5 hover:border-gray-200 hover:bg-gray-50 sm:grid-cols-[52px_minmax(0,1fr)_auto]"
    >
      <span
        className="text-[13px] font-bold tabular-nums"
        style={{ color: strand.colors.text }}
      >
        {expectation.code}
      </span>
      <span className="text-[14.5px]">{expectation.text}</span>
      <span className="hidden whitespace-nowrap text-xs text-gray-400 sm:block">
        {getIdeaOf(expectation)?.name}
      </span>
    </Link>
  )
}

export default ExpectationRow
