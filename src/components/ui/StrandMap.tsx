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
  // The strand's colours: the picked row is tinted, the squares use accent
  colors: { bg: string; text: string; accent: string }
}

// Rows down the side, grades across the top, one square per expectation.
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
      <table className="w-full min-w-table border-collapse text-sm">
        <thead>
          <tr className="text-note border-b border-line">
            <th
              scope="col"
              className="w-[34%] py-sm pr-xs pl-md text-left font-semibold"
            >
              {rowLabel}
            </th>
            {grades.map((grade) => (
              <th key={grade} scope="col" className="px-xs py-sm font-semibold">
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
                    <td key={grade} className="px-xs py-sm text-center">
                      {count ? (
                        <span
                          className="inline-flex gap-xs"
                          title={`${count} expectation${count > 1 ? 's' : ''}`}
                        >
                          {Array.from({ length: count }, (_, index) => (
                            <span
                              key={index}
                              className="size-dot-lg rounded-tiny"
                              style={{ backgroundColor: colors.accent }}
                            />
                          ))}
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
