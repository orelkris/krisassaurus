import type { ReactNode } from 'react'

interface CalloutProps {
  // The small tag at the top, e.g. "Example"
  label: string
  children: ReactNode
  colors: { bg: string; text: string; accent: string }
}

// A boxed part of a text that should stand out, with a small coloured tag at
// the top, e.g. a classroom example
function Callout({ label, children, colors }: CalloutProps) {
  return (
    <div
      className="col-stack rounded-xl border-[1.5px] border-l-4 px-4 py-3"
      style={{
        borderColor: `color-mix(in srgb, ${colors.accent} 30%, white)`,
        borderLeftColor: colors.accent,
      }}
    >
      <span
        className="self-start rounded-full px-2.5 py-0.5 text-xs font-bold tracking-wide uppercase"
        style={{ backgroundColor: colors.bg, color: colors.text }}
      >
        {label}
      </span>
      {children}
    </div>
  )
}

export default Callout
