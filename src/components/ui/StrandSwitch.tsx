import { Link } from 'react-router-dom'
import type { StrandId } from '@/types/curriculum'

interface StrandSwitchProps {
  strands: { id: StrandId; name: string }[]
  current: StrandId
  // The address of each strand's view, e.g. #strand-b
  hrefOf: (id: StrandId) => string
  label?: string
}

// Picks the one strand a page shows: a button per strand (badge and name)
// on a grey track, four across, two by two on phones. The picked one is
// white. Each is a link, so the address keeps the pick
function StrandSwitch({
  strands,
  current,
  hrefOf,
  label = 'Strand',
}: StrandSwitchProps) {
  return (
    <nav
      aria-label={label}
      className="grid grid-cols-2 gap-xs rounded-card bg-soft p-xs sm:grid-cols-4"
    >
      {strands.map((strand) => {
        const isCurrent = strand.id === current
        return (
          <Link
            key={strand.id}
            to={hrefOf(strand.id)}
            replace
            preventScrollReset
            aria-current={isCurrent ? 'true' : undefined}
            data-strand={strand.id}
            className={`row-sm justify-center rounded-row px-sm py-sm text-sm font-semibold transition-colors ${
              isCurrent
                ? 'bg-page text-fg shadow-tab'
                : 'text-muted hover:bg-page hover:text-fg'
            }`}
          >
            <span className="inline-flex size-badge-sm shrink-0 items-center justify-center rounded-badge bg-strand text-xs text-on-primary">
              {strand.id}
            </span>
            {strand.name}
          </Link>
        )
      })}
    </nav>
  )
}

export default StrandSwitch
