import type { ReactNode } from 'react'

interface PillProps {
  children: ReactNode
  // Filled with these colours; grey outline when left out
  colors?: { bg: string; text: string }
}

// Small rounded label, e.g. a strand name or a tool
function Pill({ children, colors }: PillProps) {
  return (
    <span
      className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs ${
        colors ? '' : 'border border-gray-200 text-gray-500'
      }`}
      style={
        colors ? { backgroundColor: colors.bg, color: colors.text } : undefined
      }
    >
      {children}
    </span>
  )
}

export default Pill
