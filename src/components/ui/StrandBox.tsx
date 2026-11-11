import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import StrandBadge from '@/components/ui/StrandBadge'
import type { StrandId } from '@/types/curriculum'

export interface StrandBoxRow {
  // e.g. B1
  code: string
  // e.g. Active Participation; some overalls have none
  name?: string
  description: string
  // How many specific expectations it has
  count: number
  // The page with its specific expectations
  to: string
}

interface StrandBoxProps {
  strand: { id: StrandId; name: string }
  rows: StrandBoxRow[]
  // Words on each row's button
  buttonLabel?: string
}

// One strand on a grade page: a white title row (badge and name), then one
// row per overall expectation with its text on the left and a button with
// the count on the right (under the text on phones). The box sets
// data-strand, so codes, the count circle and hovers take the strand's colours
function StrandBox({
  strand,
  rows,
  buttonLabel = 'Specific expectations',
}: StrandBoxProps) {
  return (
    <div data-strand={strand.id} className="box overflow-hidden">
      <div className="row-md border-b border-line px-lg py-md">
        <StrandBadge strand={{ id: strand.id }} />
        <h2 className="heading-section">{strand.name}</h2>
      </div>
      <div className="divide-y divide-line">
        {rows.map((row) => (
          <div key={row.code} className="flex flex-col sm:flex-row">
            <div className="col-sm min-w-0 flex-1 p-lg">
              <h3 className="row-sm text-md font-semibold text-strand-text">
                <span>{row.code}</span>
                {row.name && <span>{row.name}</span>}
              </h3>
              <p className="text-md text-fg">{row.description}</p>
            </div>
            <Link
              to={row.to}
              className="flex items-center gap-sm border-t border-line px-lg py-md text-sm font-semibold text-strand-text transition-colors hover:bg-strand-bg sm:w-button-col sm:shrink-0 sm:flex-col sm:justify-center sm:border-t-0 sm:border-l"
            >
              <span className="inline-flex size-badge shrink-0 sm:size-count items-center justify-center rounded-pill bg-strand text-lg text-on-primary">
                {row.count}
              </span>
              <span className="row-xs whitespace-nowrap">
                {buttonLabel}
                <ChevronRight
                  aria-hidden="true"
                  className="size-icon shrink-0"
                />
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StrandBox
