import { Link } from 'react-router-dom'
import type { Expectation } from '@/types/math'
import { expectationPath } from '@/data/math/expectations'
import { getStrand } from '@/data/math/strands'

interface ExpectationRowProps {
  expectation: Expectation
}

// One line of a grade page: code and official wording
function ExpectationRow({ expectation }: ExpectationRowProps) {
  const strand = getStrand(expectation.strand)

  return (
    <Link
      to={expectationPath(expectation)}
      className="grid grid-cols-[44px_minmax(0,1fr)] items-baseline gap-3 rounded-[10px] border border-transparent pad-sm hover:border-gray-200 hover:bg-gray-50 sm:grid-cols-[52px_minmax(0,1fr)]"
    >
      <span
        className="text-[13px] font-bold tabular-nums"
        style={{ color: strand.colors.text }}
      >
        {expectation.code}
      </span>
      <span className="text-[14.5px]">{expectation.text}</span>
    </Link>
  )
}

export default ExpectationRow
