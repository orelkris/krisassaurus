import type { ReactNode } from 'react'
import type { SubjectId } from '@/types/curriculum'
import { gapClass, type Step } from '@/types/index'

// A reading width for pages of running text; the padding sits outside it
export type ContainerWidth = 'read'

const widthClass: Record<ContainerWidth, string> = {
  read: 'box-content max-w-read',
}

interface ContainerProps {
  children: ReactNode
  // The space between children; the page step unless a spot needs a smaller one
  gap?: Step
  // Grows to fill its column, for layouts where the column itself scrolls
  fill?: boolean
  // The subject whose colour everything inside uses (border-subject…). It
  // comes from the subject's data, e.g. gymCurriculum.subject
  subject?: SubjectId
  width?: ContainerWidth
}

// A flex column that pads its content on all sides and spaces its children
// equally. The main area and the sidebar both use it, so every page lines up
function Container({
  children,
  gap = 'xl',
  fill = false,
  subject,
  width,
}: ContainerProps) {
  return (
    <div
      data-subject={subject}
      className={`${gapClass[gap]} pad-page min-w-none ${fill ? 'min-h-none flex-1' : ''} ${width ? widthClass[width] : ''}`}
    >
      {children}
    </div>
  )
}

export default Container
