import StickyBar from '@/components/ui/StickyBar'
import type { BadgeStrand } from '@/components/ui/StrandBadge'

export interface StrandTab {
  // The id of the section the tab jumps to
  id: string
  // Math and Drama pass their own colours; with just an id and name (Gym),
  // the tab uses the strand's token colours from index.css
  strand: (BadgeStrand | { id: string; colors?: undefined }) & { name: string }
}

interface StrandTabsProps {
  tabs: StrandTab[]
  activeId: string
  onSelect: (id: string) => void
  // Small text at the start of the bar, e.g. Grade 6
  title?: string
  label?: string
}

// Sticky row of strand badges for jumping between the strands of a grade page.
// Only the badges are tabs; the current strand's name sits beside them in its
// colour. When the name doesn't fit beside them it takes its own full line, so
// long names (Drama's) stay on one line. Pair it with useScrollSpy
function StrandTabs({
  tabs,
  activeId,
  onSelect,
  title,
  label = 'Jump to a strand',
}: StrandTabsProps) {
  const current = tabs.find((tab) => tab.id === activeId) ?? tabs[0]

  return (
    <StickyBar padded>
      <div className="flex w-full flex-wrap items-center gap-x-lg gap-y-md">
        {title && (
          <span className="text-label shrink-0 border-r border-line pr-lg">
            {title}
          </span>
        )}
        <div role="tablist" aria-label={label} className="flex gap-xs">
          {tabs.map(({ id, strand }) => {
            const isActive = id === current?.id
            if (!strand.colors) {
              return (
                <button
                  key={id}
                  role="tab"
                  data-strand={strand.id}
                  aria-selected={isActive}
                  aria-label={strand.name}
                  title={strand.name}
                  onClick={() => onSelect(id)}
                  className={`inline-flex size-badge shrink-0 cursor-pointer items-center justify-center rounded-badge border-2 bg-strand-bg text-sm font-semibold text-strand-text transition-opacity ${
                    isActive
                      ? 'border-strand'
                      : 'border-transparent opacity-75 hover:opacity-100'
                  }`}
                >
                  {strand.id}
                </button>
              )
            }
            return (
              <button
                key={id}
                role="tab"
                aria-selected={isActive}
                aria-label={strand.name}
                title={strand.name}
                onClick={() => onSelect(id)}
                className={`inline-flex h-tab min-w-tab cursor-pointer items-center justify-center rounded-badge border-2 px-xs text-xs font-extrabold transition-opacity ${
                  isActive
                    ? ''
                    : 'border-transparent opacity-75 hover:opacity-100'
                }`}
                style={{
                  backgroundColor: strand.colors.bg,
                  color: strand.colors.text,
                  borderColor: isActive ? strand.colors.accent : undefined,
                }}
              >
                {strand.id}
              </button>
            )
          })}
        </div>
        {current && !current.strand.colors && (
          <span
            data-strand={current.strand.id}
            className="min-w-none flex-1 basis-tab-name text-md font-semibold text-fg"
          >
            {current.strand.name}
          </span>
        )}
        {current && current.strand.colors && (
          <span
            className="min-w-none flex-1 basis-tab-name text-sm leading-snug font-semibold"
            style={{ color: current.strand.colors.text }}
          >
            {current.strand.name}
          </span>
        )}
      </div>
    </StickyBar>
  )
}

export default StrandTabs
