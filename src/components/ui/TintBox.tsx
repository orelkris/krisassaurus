import type { ReactNode } from 'react'

export interface TintBoxPart {
  // A small label above the text, e.g. Teacher, Student, or A1.4 Healthy
  // Relationships. Optional, e.g. a Math key concept stands alone
  label?: string
  // Plain text, or more (e.g. a list of points)
  text: ReactNode
}

interface TintBoxProps {
  parts: TintBoxPart[]
}

// A box in the strand's light tint (from data-strand around it) holding one
// or more labelled pieces of text, with lines between them. Used for a
// teacher prompt and its student answers, a Strand A skill, and Math's key
// concepts, examples and sample tasks
function TintBox({ parts }: TintBoxProps) {
  return (
    <div className="rounded-card bg-strand-bg px-md">
      {parts.map((part, index) => (
        <div
          key={index}
          className="col-xs border-t border-strand-line py-md first:border-t-0"
        >
          {part.label && (
            <p className="text-sm font-semibold text-strand-text">
              {part.label}
            </p>
          )}
          {typeof part.text === 'string' ? (
            <p className="text-md text-fg">{part.text}</p>
          ) : (
            <div className="text-md text-fg">{part.text}</div>
          )}
        </div>
      ))}
    </div>
  )
}

export default TintBox