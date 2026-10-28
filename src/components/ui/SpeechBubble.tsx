import type { ReactNode } from 'react'
import type { LineStyle } from '@/types/drama'

const styleClass: Record<LineStyle, string> = {
  shaky: 'tracking-[0.12em]',
  loud: 'text-[15px] font-extrabold uppercase',
  soft: 'text-gray-500',
  heart: 'font-extrabold text-red-500',
}

interface SpeechBubbleProps {
  children: ReactNode
  // Where the bubble's bottom middle points, in % of its stage
  left: number
  top: number
  lineStyle?: LineStyle
}

// A small white bubble above a figure. Its stage must be position: relative
function SpeechBubble({ children, left, top, lineStyle }: SpeechBubbleProps) {
  return (
    <span
      className={`pointer-events-none absolute w-max max-w-[min(200px,45vw)] -translate-x-1/2 -translate-y-full rounded-xl border border-gray-200 bg-white px-2.5 py-1.5 text-[12.5px] text-gray-900 shadow-sm ${lineStyle ? styleClass[lineStyle] : ''}`}
      style={{ left: `${left}%`, top: `${top}%` }}
    >
      {children}
    </span>
  )
}

export default SpeechBubble
