import type { ReactNode } from 'react'
import type { LineStyle } from '@/types/drama'

const styleClass: Record<LineStyle, string> = {
  shaky: 'tracking-widest',
  loud: 'text-sm font-extrabold uppercase',
  soft: 'text-muted',
  heart: 'font-extrabold text-danger',
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
      className={`pointer-events-none absolute w-max max-w-[min(var(--container-bubble),45vw)] -translate-x-1/2 -translate-y-full rounded-card border border-line bg-page px-sm py-xs text-xs text-fg shadow-float ${lineStyle ? styleClass[lineStyle] : ''}`}
      style={{ left: `${left}%`, top: `${top}%` }}
    >
      {children}
    </span>
  )
}

export default SpeechBubble
