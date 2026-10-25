import type { ReactNode } from 'react'
import { gapClass, type Step } from '@/types/index'

interface FramedGroupProps {
  label: ReactNode
  children: ReactNode
  // The space between children, on the same steps as Container
  gap?: Step
}

// A bordered box with a small label centred on its top border. Like
// Container, it pads its content and spaces its children equally. It is a
// fieldset, so a long label wraps onto more lines and pushes the content down
// instead of covering it. The label's top half sits above the border; the
// negative margin and smaller top padding keep the box where a plain box
// would be
function FramedGroup({ label, children, gap = 'stack' }: FramedGroupProps) {
  return (
    <fieldset
      className={`${gapClass[gap]} pad-md -mt-2 min-w-0 rounded-xl border border-gray-200 pt-[9px]`}
    >
      <legend className="text-label mx-auto max-w-[90%] px-2 text-center">
        {label}
      </legend>
      {children}
    </fieldset>
  )
}

export default FramedGroup