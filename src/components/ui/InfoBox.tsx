import type { ReactNode } from 'react'

interface InfoBoxProps {
  title: ReactNode
  // Small uppercase line above the title, e.g. "Curriculum"
  label?: string
  text?: ReactNode
  // Buttons along the bottom, e.g. ButtonLinks
  actions?: ReactNode
  // Colour of the thick left edge and the label
  accent?: string
}

// A panel with a label, a title, a line of text and optional buttons. It
// knows nothing about what it shows, so any page can use it
function InfoBox({ title, label, text, actions, accent }: InfoBoxProps) {
  return (
    <section
      className={`panel col-tight items-start ${accent ? 'border-l-4' : ''}`}
      style={accent ? { borderLeftColor: accent } : undefined}
    >
      {label && (
        <p className="text-label" style={accent ? { color: accent } : undefined}>
          {label}
        </p>
      )}
      <h2 className="heading-card">{title}</h2>
      {text && <p className="text-small">{text}</p>}
      {actions && (
        <div className="mt-stack flex flex-wrap gap-stack">{actions}</div>
      )}
    </section>
  )
}

export default InfoBox