import { useState, type ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'

interface FoldProps {
  label: string
  children: ReactNode
  className?: string
}

// A small button that slides a panel open under it. The panel grows from
// 0fr to 1fr, so it opens at its natural height and only its own card grows
function Fold({ label, children, className = '' }: FoldProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={className}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="inline-flex cursor-pointer items-center gap-1.5 text-[12.5px] text-gray-400 hover:text-gray-900"
      >
        <ChevronRight
          size={13}
          className={`transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
        />
        {label}
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="pt-2 text-[13.5px] leading-relaxed text-gray-500">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Fold
