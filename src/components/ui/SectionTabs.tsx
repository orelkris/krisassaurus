import { useEffect, useRef } from 'react'

export interface SectionTab {
  id: string
  label: string
  // Underline colour for the current tab; grey when left out
  color?: string
}

interface SectionTabsProps {
  tabs: SectionTab[]
  activeId: string
  onSelect: (id: string) => void
  label?: string
}

// Sticky row of underline tabs for jumping between sections of a long page.
// Pair it with useScrollSpy to highlight the section being read.
function SectionTabs({ tabs, activeId, onSelect, label = 'Jump to a section' }: SectionTabsProps) {
  const rowRef = useRef<HTMLDivElement>(null)

  // On narrow screens the row scrolls sideways; keep the current tab visible
  useEffect(() => {
    const row = rowRef.current
    const tab = row?.querySelector<HTMLElement>(`[data-tab="${activeId}"]`)
    if (!row || !tab || row.scrollWidth <= row.clientWidth) return

    const left = tab.offsetLeft - row.offsetLeft
    const right = left + tab.offsetWidth
    if (left < row.scrollLeft || right > row.scrollLeft + row.clientWidth) {
      row.scrollLeft = left - 16
    }
  }, [activeId])

  return (
    <div className="sticky top-0 z-[5] -mx-1 bg-white px-1 pt-1">
      <div
        ref={rowRef}
        role="tablist"
        aria-label={label}
        className="flex gap-6 overflow-x-auto border-b border-gray-200 [scrollbar-width:none] lg:flex-wrap"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeId
          return (
            <button
              key={tab.id}
              data-tab={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelect(tab.id)}
              className={`shrink-0 cursor-pointer pt-2 pb-2.5 text-sm transition-colors ${
                isActive ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'
              }`}
              style={{
                boxShadow: `inset 0 -3px 0 ${isActive ? (tab.color ?? '#111827') : 'transparent'}`,
              }}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default SectionTabs
