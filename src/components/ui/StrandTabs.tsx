import StickyBar from '@/components/ui/StickyBar'
import type { BadgeStrand } from '@/components/ui/StrandBadge'

export interface StrandTab {
  // The id of the section the tab jumps to
  id: string
  strand: BadgeStrand & { name: string }
}

interface StrandTabsProps {
  tabs: StrandTab[]
  activeId: string
  onSelect: (id: string) => void
  // Small text at the start of the bar, e.g. Grade 6
  title: string
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
      <div className="flex w-full flex-wrap items-center gap-x-6 gap-y-3">
        <span className="text-label shrink-0 border-r border-gray-200 pr-6">
          {title}
        </span>
        <div role="tablist" aria-label={label} className="flex gap-1.5">
          {tabs.map(({ id, strand }) => {
            const isActive = id === current?.id
            return (
              <button
                key={id}
                role="tab"
                aria-selected={isActive}
                aria-label={strand.name}
                title={strand.name}
                onClick={() => onSelect(id)}
                className={`inline-flex h-7 min-w-[34px] cursor-pointer items-center justify-center rounded-md border-2 px-1.5 text-xs font-extrabold transition-opacity ${
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
        {current && (
          <span
            className="min-w-0 flex-[1_1_220px] text-sm leading-snug font-semibold"
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
