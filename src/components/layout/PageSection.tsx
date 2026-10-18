import type { ReactNode } from 'react'

interface PageSectionProps {
  children: ReactNode
  title?: ReactNode
  description?: ReactNode
  // A panel puts the whole section, heading included, inside a box
  box?: 'panel'
  // Border colour of the panel
  accent?: string
  // Colours of a striped band along the top of the panel
  stripe?: string[]
}

// One section of a page: an optional heading and description, then content.
// The space inside a section is always the section step; the space between
// sections comes from the Container
function PageSection({
  children,
  title,
  description,
  box,
  accent,
  stripe,
}: PageSectionProps) {
  const body = (
    <>
      {(title || description) && (
        <div className="col-tight">
          {title && <h2 className="heading-section row-stack">{title}</h2>}
          {description && <p className="text-lead">{description}</p>}
        </div>
      )}
      {children}
    </>
  )

  if (!box) return <section className="col-section">{body}</section>

  if (stripe) {
    return (
      <section
        className="overflow-hidden rounded-2xl border border-gray-200"
        style={accent ? { borderColor: accent } : undefined}
      >
        <div className="flex h-2" aria-hidden="true">
          {stripe.map((color) => (
            <span
              key={color}
              className="flex-1"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <div className="col-section pad-lg">{body}</div>
      </section>
    )
  }

  return (
    <section
      className="panel col-section"
      style={accent ? { borderColor: accent } : undefined}
    >
      {body}
    </section>
  )
}

export default PageSection