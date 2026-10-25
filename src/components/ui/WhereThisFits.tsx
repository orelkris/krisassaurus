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
const itemClass = 'rounded-lg px-2 py-1.5 text-[13.5px]'

function Code({ code }: { code: string }) {
  return <span className="mr-1 font-bold">{code}</span>
}

// The same expectation in the grade before, this grade, and the grade after.
// The middle card is the current grade
function WhereThisFits({ columns, currentId, colors }: WhereThisFitsProps) {
  return (
    <div className="grid grid-cols-1 gap-2.5 md:grid-cols-3">
      {columns.map((column, index) => (
        <div
          key={column.label}
          className="flex min-w-0 flex-col gap-1.5 rounded-xl border-2 border-gray-200 px-[13px] py-[11px]"
          style={index === 1 ? { borderColor: colors.accent } : undefined}
        >
          <span className="text-label px-2">{column.label}</span>
          {column.items.length === 0 && (
            <span className={`${itemClass} text-gray-400`}>{column.empty}</span>
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
                className={`${itemClass} hover:underline hover:underline-offset-[3px]`}
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
