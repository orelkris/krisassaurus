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
      className="lg:hidden row-stack w-full cursor-pointer justify-between rounded-[10px] border border-gray-200 pad-sm text-left text-sm font-semibold text-gray-900"
    >
      <span>
        <span className="text-label block">{label}</span>
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
