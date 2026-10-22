import type { ReactNode } from 'react'

export interface Term {
  term: string
  text: ReactNode
}

interface TermListProps {
  terms: Term[]
  // Colour of the terms, e.g. the strand's text colour
  color?: string
}

// Each term on its own line with its description across the full row under
// it, and a line between terms. Goes inside a FramedGroup, e.g. Drama's
// Elements of drama
function TermList({ terms, color }: TermListProps) {
  return (
    <dl className="flex flex-col divide-y divide-gray-200">
      {terms.map((item) => (
        <div key={item.term} className="col-tight py-2.5 first:pt-0 last:pb-0">
          <dt className="text-small font-semibold" style={{ color }}>
            {item.term}
          </dt>
          <dd className="text-sm">{item.text}</dd>
        </div>
      ))}
    </dl>
  )
}

export default TermList
