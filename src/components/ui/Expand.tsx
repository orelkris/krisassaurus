import type { ReactNode } from 'react'

interface ExpandProps {
  open: boolean
  children: ReactNode
}

// Slides its content open and closed. While closed the content takes no
// space and can't be tabbed into
function Expand({ open, children }: ExpandProps) {
  return (
    <div
      className="grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none"
      style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
    >
      <div className="min-h-0 overflow-hidden" inert={!open}>
        {children}
      </div>
    </div>
  )
}

export default Expand
