import type { ReactNode } from 'react'

interface StickyBarProps {
  children: ReactNode
  // Space between the content and the line under it. Tabs leave it out, so
  // their underline sits on the line
  padded?: boolean
}

// A row that sticks to the top of the page as you scroll, with a line under
// it, so you don't lose track of what you're looking at. It sticks a small
// step below the top, and a white strip fills that step, so it has room above
// it once stuck without adding any space to the page
function StickyBar({ children, padded = false }: StickyBarProps) {
  return (
    <div
      className={`sticky top-stack z-[5] flex items-baseline gap-6 border-b border-gray-200 bg-white before:absolute before:inset-x-0 before:-top-stack before:h-stack before:bg-white ${
        padded ? 'pb-stack' : ''
      }`}
    >
      {children}
    </div>
  )
}

export default StickyBar