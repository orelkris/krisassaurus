import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

export interface ExpectationItem {
  id: string
  // e.g. B1.1
  code: string
  text: ReactNode
  to: string
}

interface ExpectationRowProps {
  item: ExpectationItem
  // Colour of the code, e.g. the strand's text colour
  color?: string
}

// One line of a grade page: code and official wording
function ExpectationRow({ item, color }: ExpectationRowProps) {
  return (
    <Link
      to={item.to}
      className="grid grid-cols-[44px_minmax(0,1fr)] items-baseline gap-3 rounded-[10px] border border-transparent pad-sm hover:border-gray-200 hover:bg-gray-50 sm:grid-cols-[52px_minmax(0,1fr)]"
    >
      <span className="text-[13px] font-bold tabular-nums" style={{ color }}>
        {item.code}
      </span>
      <span className="text-[14.5px]">{item.text}</span>
    </Link>
  )
}

export default ExpectationRow
