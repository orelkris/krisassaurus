import type { ReactNode } from 'react'
import type { SubjectId } from '@/types/curriculum'
import { gapClass, type Step } from '@/types/index'

interface ContainerProps {
  children: ReactNode
  // The space between children; the page step unless a spot needs a smaller one
  gap?: Step
  // Grows to fill its column, for layouts where the column itself scrolls
  fill?: boolean
  // The subject whose colour everything inside uses (border-subject…). It
  // comes from the subject's data, e.g. gymCurriculum.subject
  subject?: SubjectId
}

// A flex column that pads its content on all sides and spaces its children
// equally. The main area and the sidebar both use it, so every page lines up
function Container({
  children,
  gap = 'page',
  fill = false,
  subject,
}: ContainerProps) {
  return (
    <div
      data-subject={subject}
      className={`${gapClass[gap]} pad-page min-w-0 ${fill ? 'min-h-0 flex-1' : ''}`}
    >
      {children}
    </div>
  )
}

export default Container
