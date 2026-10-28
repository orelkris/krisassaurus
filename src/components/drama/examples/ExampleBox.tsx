import type { ReactNode } from 'react'

interface ExampleBoxProps {
  title: string
  // A short grey line under the title
  note?: string
  // Buttons beside the title, e.g. Start and Reset
  actions?: ReactNode
  // Border colour, usually the strategy group's accent
  accent: string
  children: ReactNode
}

// The frame every interactive example sits in, at the top of a strategy page
function ExampleBox({
  title,
  note,
  actions,
  accent,
  children,
}: ExampleBoxProps) {
  return (
    <section
      className="panel col-section"
      // Softened like FramedGroup's coloured frames
      style={{ borderColor: `color-mix(in srgb, ${accent} 25%, white)` }}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="col-tight">
          <h2 className="heading-section">{title}</h2>
          {note && <p className="text-small">{note}</p>}
        </div>
        {actions && <div className="row-tight flex-wrap">{actions}</div>}
      </div>
      {children}
    </section>
  )
}

export default ExampleBox
