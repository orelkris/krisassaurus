import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export interface StrandMapRow {
  id: string
  label: ReactNode
  to: string
  // How many expectations the row has in each grade
  counts: Partial<Record<number, number>>
}

interface StrandMapProps {
  // Heading of the first column, e.g. "Idea" or "Expectation"
  rowLabel: string
  grades: number[]
  rows: StrandMapRow[]
  currentId: string
  // The strand's colours: the picked row is tinted, the counts use text
  colors: { bg: string; text: string; accent: string }
}

// Rows down the side, grades across the top, and how many expectations each
// row has in each grade, with lines between every row and column.
// Picking a row shows its expectations below the map. Every subject's Strand
// page uses it; the rows come from the subject's own data
function StrandMap({
  rowLabel,
  grades,
  rows,
  currentId,
  colors,
}: StrandMapProps) {
  return (
    <div className="overflow-x-auto rounded-card border border-line">
      <table className="w-full min-w-table table-fixed border-collapse text-sm">
        <thead>
          <tr className="text-note border-b border-line">
            <th
              scope="col"
              className="w-[34%] py-sm pr-xs pl-md text-left font-semibold"
            >
              {rowLabel}
            </th>
            {grades.map((grade) => (
              <th
                key={grade}
                scope="col"
                className="border-l border-line px-xs py-sm font-semibold"
              >
                Gr {grade}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const isCurrent = row.id === currentId
            return (
              <tr
                key={row.id}
                className={`relative border-b border-line last:border-b-0 ${
                  isCurrent ? '' : 'hover:bg-soft'
                }`}
                style={
                  isCurrent
                    ? { backgroundColor: colors.bg, color: colors.text }
                    : undefined
                }
              >
                <td className="py-sm pr-xs pl-md">
                  <Link
                    to={row.to}
                    replace
                    aria-current={isCurrent ? 'true' : undefined}
                    // Stretched over the row, so the whole row picks it
                    className="font-semibold after:absolute after:inset-none"
                  >
                    {row.label}
                  </Link>
                </td>
                {grades.map((grade) => {
                  const count = row.counts[grade] ?? 0
                  return (
                    <td
                      key={grade}
                      className="border-l border-line px-xs py-sm text-center"
                    >
                      {count ? (
                        <span
                          className="font-semibold"
                          style={{ color: colors.text }}
                        >
                          {count}
                        </span>
                      ) : (
                        <span className="text-line">–</span>
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default StrandMap
