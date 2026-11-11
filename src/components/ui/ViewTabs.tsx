export interface ViewTab<T extends string> {
  id: T
  label: string
}

interface ViewTabsProps<T extends string> {
  tabs: ViewTab<T>[]
  current: T
  onSelect: (id: T) => void
  label: string
}

// A row of tabs that switch what the page shows, one view at a time. The
// current tab is underlined in the strand colour (from data-strand around
// it). On narrow screens the tabs wrap onto a second line instead of
// scrolling sideways
function ViewTabs<T extends string>({
  tabs,
  current,
  onSelect,
  label,
}: ViewTabsProps<T>) {
  return (
    <div
      role="tablist"
      aria-label={label}
      className="flex flex-wrap gap-x-xs border-b border-line"
    >
      {tabs.map((tab) => {
        const isCurrent = tab.id === current
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isCurrent}
            onClick={() => onSelect(tab.id)}
            className={`-mb-px cursor-pointer rounded-t-row border-b-3 px-sm py-sm text-md whitespace-nowrap transition-colors hover:bg-soft ${
              isCurrent
                ? 'border-strand font-semibold text-fg'
                : 'border-transparent text-muted'
            }`}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}

export default ViewTabs
