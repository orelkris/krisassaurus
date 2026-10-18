import type { ReactNode } from 'react'
import { gapClass, type Step } from '@/types/index'

interface ContainerProps {
  children: ReactNode
  // The space between children; the page step unless a spot needs a smaller one
  gap?: Step
  // Grows to fill its column, for layouts where the column itself scrolls
  fill?: boolean
}

// A flex column that pads its content on all sides and spaces its children
// equally. The main area and the sidebar both use it, so every page lines up
function Container({ children, gap = 'page', fill = false }: ContainerProps) {
  return (
    <div
      className={`${gapClass[gap]} pad-page min-w-0 ${fill ? 'min-h-0 flex-1' : ''}`}
    >
      {children}
    </div>
  )
}

export default Container