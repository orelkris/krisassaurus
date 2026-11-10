import type { ReactNode } from 'react'

interface InfoBoxProps {
  title: ReactNode
  // Small uppercase line above the title, e.g. "Curriculum"
  label?: string
  text?: ReactNode
  // Buttons along the bottom, e.g. ButtonLinks
  actions?: ReactNode
  // A thick left edge in the page's subject colour (set by data-subject)
  edge?: boolean
}

// A panel with a label, a title, a line of text and optional buttons. It
// knows nothing about what it shows, so any page can use it
function InfoBox({ title, label, text, actions, edge }: InfoBoxProps) {
  return (
    <section
      className={`panel col-xs items-start ${edge ? 'edge-subject' : ''}`}
    >
      {label && <p className="text-label">{label}</p>}
      <h2 className="heading-card">{title}</h2>
      {text && <p className="text-small">{text}</p>}
      {actions && <div className="mt-sm flex flex-wrap gap-sm">{actions}</div>}
    </section>
  )
}

export default InfoBox
