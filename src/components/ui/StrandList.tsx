import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import StrandBadge from '@/components/ui/StrandBadge'
import type { StrandId } from '@/types/curriculum'

export interface StrandListRow {
  // A code shown before the label, e.g. B1. Rows without one get a dot
  code?: string
  label: string
  to: string
}

export interface StrandListItem {
  id: StrandId
  name: string
  to: string
  rows: StrandListRow[]
  // Extra labelled groups of rows under the main ones, e.g. Topics
  groups?: { label: string; rows: StrandListRow[] }[]
}

interface StrandListProps {
  strands: StrandListItem[]
}

function Row({ row }: { row: StrandListRow }) {
  return (
    <Link
      to={row.to}
      className="row-md border-t border-line px-lg py-sm text-md text-fg transition-colors first:border-t-0 hover:bg-strand-bg"
    >
      <span className="w-code shrink-0 font-bold text-strand-text">
        {row.code ?? <span className="block size-dot rounded-pill bg-strand" />}
      </span>
      <span className="min-w-0 flex-1">{row.label}</span>
      <ChevronRight
        aria-hidden="true"
        className="size-icon shrink-0 text-strand-text"
      />
    </Link>
  )
}

// One box per strand, stacked: a header row (badge, name, chevron) that opens
// the strand, then one row per part of it (e.g. its overall expectations).
// Each box sets data-strand, so its badge, codes and hovers take the strand's
// colours from index.css. Each subject's Overview uses it for Strands
function StrandList({ strands }: StrandListProps) {
  return (
    <div className="col-md">
      {strands.map((strand) => (
        <section
          key={strand.id}
          data-strand={strand.id}
          className="box overflow-hidden"
        >
          <Link
            to={strand.to}
            className="row-md border-b border-line px-lg py-md transition-colors hover:bg-strand-bg"
          >
            <StrandBadge strand={{ id: strand.id }} />
            <h3 className="heading-card min-w-0 flex-1">{strand.name}</h3>
            <ChevronRight
              aria-hidden="true"
              className="size-icon shrink-0 text-strand-text"
            />
          </Link>
          <div className="flex flex-col">
            {strand.rows.map((row) => (
              <Row key={row.to} row={row} />
            ))}
          </div>
          {strand.groups?.map((group) => (
            <div key={group.label} className="border-t border-line">
              <p className="text-label px-lg pt-md pb-xs">{group.label}</p>
              <div className="flex flex-col">
                {group.rows.map((row) => (
                  <Row key={row.to} row={row} />
                ))}
              </div>
            </div>
          ))}
        </section>
      ))}
    </div>
  )
}

export default StrandList
