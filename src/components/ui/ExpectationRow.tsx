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
      className="grid grid-cols-[var(--spacing-code)_minmax(0,1fr)] items-baseline gap-md rounded-row border border-transparent pad-sm hover:border-line hover:bg-soft sm:grid-cols-[var(--spacing-code-long)_minmax(0,1fr)]"
    >
      <span className="text-sm font-bold tabular-nums" style={{ color }}>
        {item.code}
      </span>
      <span className="text-sm">{item.text}</span>
    </Link>
  )
}

export default ExpectationRow
