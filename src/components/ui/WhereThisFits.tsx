import { Link } from 'react-router-dom'
import type { ExpectationItem } from '@/components/ui/ExpectationRow'
import type { StrandColors } from '@/components/ui/StrandBadge'

export interface FitColumn {
  // e.g. Grade 5 · before
  label: string
  items: ExpectationItem[]
  // Shown when the column has no items
  empty: string
}

interface WhereThisFitsProps {
  // The grade before, this grade, and the grade after
  columns: FitColumn[]
  // The expectation being viewed, tinted in its column
  currentId: string
  colors: StrandColors
}

// Every item shares the same padding, so labels and text line up across the
// three cards whether or not an item is highlighted
const itemClass = 'rounded-row px-sm py-xs text-sm'

function Code({ code }: { code: string }) {
  return <span className="mr-xs font-bold">{code}</span>
}

// The same expectation in the grade before, this grade, and the grade after.
// The middle card is the current grade
function WhereThisFits({ columns, currentId, colors }: WhereThisFitsProps) {
  return (
    <div className="grid grid-cols-1 gap-sm md:grid-cols-3">
      {columns.map((column, index) => (
        <div
          key={column.label}
          className="flex min-w-none flex-col gap-xs rounded-card border-2 border-line px-md py-sm"
          style={index === 1 ? { borderColor: colors.accent } : undefined}
        >
          <span className="text-label px-sm">{column.label}</span>
          {column.items.length === 0 && (
            <span className={`${itemClass} text-faint`}>{column.empty}</span>
          )}
          {column.items.map((item) =>
            item.id === currentId ? (
              <span
                key={item.id}
                className={itemClass}
                style={{ backgroundColor: colors.bg, color: colors.text }}
              >
                <Code code={item.code} />
                {item.text}
              </span>
            ) : (
              <Link
                key={item.id}
                to={item.to}
                className={`${itemClass} hover:underline hover:underline-offset-3`}
              >
                <Code code={item.code} />
                {item.text}
              </Link>
            )
          )}
        </div>
      ))}
    </div>
  )
}

export default WhereThisFits
