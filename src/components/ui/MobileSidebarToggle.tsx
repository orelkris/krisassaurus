import { ChevronDown } from 'lucide-react'

interface MobileSidebarToggleProps {
  // e.g. "Browse Drama"
  label: string
  // The page being viewed
  current: string
  isOpen: boolean
  onToggle: () => void
}

// On phones a blog's sidebar folds into this button
function MobileSidebarToggle({
  label,
  current,
  isOpen,
  onToggle,
}: MobileSidebarToggleProps) {
  return (
    <button
      onClick={onToggle}
      aria-expanded={isOpen}
      className="lg:hidden flex w-full cursor-pointer items-center justify-between gap-2 rounded-[10px] border border-gray-200 px-3.5 py-2.5 text-left text-sm font-semibold text-gray-900"
    >
      <span>
        <span className="block text-[11px] font-medium uppercase tracking-wide text-gray-400">
          {label}
        </span>
        {current}
      </span>
      <ChevronDown
        size={14}
        className={`shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
      />
    </button>
  )
}

export default MobileSidebarToggle
