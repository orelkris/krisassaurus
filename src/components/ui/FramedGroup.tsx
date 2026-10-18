import type { ReactNode } from 'react'
import { gapClass, type Step } from '@/types/index'

interface FramedGroupProps {
  label: ReactNode
  children: ReactNode
  // The space between children, on the same steps as Container
  gap?: Step
}

// A bordered box with a small label centred on its top border. Like
// Container, it pads its content and spaces its children equally
function FramedGroup({ label, children, gap = 'stack' }: FramedGroupProps) {
  return (
    <div
      className={`${gapClass[gap]} pad-md relative rounded-xl border border-gray-200`}
    >
      <p className="text-label absolute -top-2 left-1/2 max-w-[90%] -translate-x-1/2 bg-white px-2 text-center">
        {label}
      </p>
      {children}
    </div>
  )
}

export default FramedGroup