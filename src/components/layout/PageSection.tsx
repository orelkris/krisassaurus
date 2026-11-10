import type { ReactNode } from 'react'
import type { StrandId } from '@/types/curriculum'

interface PageSectionProps {
  children: ReactNode
  title?: ReactNode
  description?: ReactNode
  // A panel puts the whole section, heading included, inside a box
  box?: 'panel'
  // Border colour of the panel
  accent?: string
  // Colours of a striped band along the top of the panel (Math and Drama,
  // until their strands use the token colours)
  stripe?: string[]
  // A striped band in these strands' colours, e.g. ['A', 'B', 'C', 'D']
  strandStripe?: readonly StrandId[]
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
  strandStripe,
}: PageSectionProps) {
  const body = (
    <>
      {(title || description) && (
        <div className="col-tight">
          {title && <h2 className="heading-section row-stack">{title}</h2>}
          {description && (
            // Inside a box the text runs the box's full width
            <p className={`text-lead ${box ? 'max-w-none' : ''}`}>
              {description}
            </p>
          )}
        </div>
      )}
      {children}
    </>
  )

  if (!box) return <section className="col-section">{body}</section>

  if (strandStripe) {
    return (
      <section className="box overflow-hidden">
        <div className="flex h-stripe" aria-hidden="true">
          {strandStripe.map((id) => (
            <span key={id} data-strand={id} className="flex-1 bg-strand" />
          ))}
        </div>
        <div className="col-md pad-lg">{body}</div>
      </section>
    )
  }

  if (stripe) {
    return (
      <section
        className="box overflow-hidden"
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
