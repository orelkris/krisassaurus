import type { CSSProperties, ReactNode } from 'react'
import { gapClass, type Step } from '@/types/index'

interface FramedGroupProps {
  label: ReactNode
  children: ReactNode
  // The space between children, on the same steps as Container
  gap?: Step
  // The frame's colours, e.g. a strand's or a strategy group's. The border is
  // a soft version of the accent and the label takes the text colour. Grey
  // when left out
  tone?: { bg: string; text: string; accent: string }
}

// For frames that belong to no strand or group
const neutralTone = { bg: '#F3F4F6', text: '#111827', accent: '#9CA3AF' }

// A bordered box with a coloured section heading centred on its top border. Like Container, it pads its content and spaces its children
// equally. It is a fieldset, so a long label wraps onto more lines and pushes
// the content down instead of covering it. The label's top half sits above
// the border; the negative margin and smaller top padding keep the box where
// a plain box would be. Bullets and list numbers inside take the accent
function FramedGroup({
  label,
  children,
  gap = 'stack',
  tone = neutralTone,
}: FramedGroupProps) {
  return (
    <fieldset
      className={`${gapClass[gap]} pad-lg -mt-4 min-w-0 rounded-2xl border-[1.5px] pt-3 marker:text-(--frame-accent) sm:pt-3`}
      style={
        {
          // The accent mixed with white, so the border is a softer version
          borderColor: `color-mix(in srgb, ${tone.accent} 25%, white)`,
          '--frame-accent': tone.accent,
        } as CSSProperties
      }
    >
      <legend className="mx-auto max-w-[90%] px-2 text-center">
        <h2 className="heading-section" style={{ color: tone.text }}>
          {label}
        </h2>
      </legend>
      {children}
    </fieldset>
  )
}

export default FramedGroup
