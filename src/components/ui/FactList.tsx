import type { CSSProperties, ReactNode } from 'react'

interface FactListProps {
  facts: { label: string; value: ReactNode }[]
}

// Short facts side by side in one bordered row, e.g. Time, Grouping and
// Grades. On phones they stack
function FactList({ facts }: FactListProps) {
  return (
    <dl
      className="grid max-w-prose grid-cols-1 rounded-xl border border-gray-200 sm:grid-cols-[repeat(var(--n),minmax(0,1fr))]"
      style={{ '--n': facts.length } as CSSProperties}
    >
      {facts.map(({ label, value }) => (
        <div
          key={label}
          className="border-t border-gray-200 pad-sm first:border-t-0 sm:border-t-0 sm:border-l sm:first:border-l-0"
        >
          <dt className="text-label">{label}</dt>
          <dd className="text-sm font-semibold text-gray-900">{value}</dd>
        </div>
      ))}
    </dl>
  )
}

export default FactList
