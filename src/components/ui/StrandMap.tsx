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
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full min-w-[560px] border-collapse text-[13px]">
        <thead>
          <tr className="text-muted border-b border-gray-200">
            <th
              scope="col"
              className="w-[34%] py-2 pr-1.5 pl-3.5 text-left font-semibold"
            >
              {rowLabel}
            </th>
            {grades.map((grade) => (
              <th key={grade} scope="col" className="px-1.5 py-2 font-semibold">
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
                className={`relative border-b border-gray-200 last:border-b-0 ${
                  isCurrent ? '' : 'hover:bg-gray-50'
                }`}
                style={
                  isCurrent
                    ? { backgroundColor: colors.bg, color: colors.text }
                    : undefined
                }
              >
                <td className="py-2 pr-1.5 pl-3.5">
                  <Link
                    to={row.to}
                    replace
                    aria-current={isCurrent ? 'true' : undefined}
                    // Stretched over the row, so the whole row picks it
                    className="font-semibold after:absolute after:inset-0"
                  >
                    {row.label}
                  </Link>
                </td>
                {grades.map((grade) => {
                  const count = row.counts[grade] ?? 0
                  return (
                    <td key={grade} className="px-1.5 py-2 text-center">
                      {count ? (
                        <span
                          className="inline-flex gap-[3px]"
                          title={`${count} expectation${count > 1 ? 's' : ''}`}
                        >
                          {Array.from({ length: count }, (_, index) => (
                            <span
                              key={index}
                              className="h-[9px] w-[9px] rounded-[3px]"
                              style={{ backgroundColor: colors.accent }}
                            />
                          ))}
                        </span>
                      ) : (
                        <span className="text-gray-200">–</span>
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
