import { useEffect, useRef } from 'react'
import StickyBar from '@/components/ui/StickyBar'

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
  // Small text at the start of the bar, e.g. Grade 1, so it's clear what
  // you're looking at after scrolling down
  title?: string
}

// Sticky row of underline tabs for jumping between sections of a long page.
// Pair it with useScrollSpy to highlight the section being read.
function SectionTabs({
  tabs,
  activeId,
  onSelect,
  label = 'Jump to a section',
  title,
}: SectionTabsProps) {
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
    <StickyBar>
      {title && (
        <span className="text-label shrink-0 border-r border-gray-200 pr-6">
          {title}
        </span>
      )}
      <div
        ref={rowRef}
        role="tablist"
        aria-label={label}
        className="flex min-w-0 gap-6 overflow-x-auto [scrollbar-width:none] lg:flex-wrap"
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
              className={`shrink-0 cursor-pointer pb-2.5 text-sm transition-colors ${
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
    </StickyBar>
  )
}

export default SectionTabs
