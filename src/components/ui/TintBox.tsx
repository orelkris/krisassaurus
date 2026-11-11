export interface TintBoxPart {
  // A small label above the text, e.g. Teacher, Student, or A1.4 Healthy Relationships
  label: string
  text: string
}

interface TintBoxProps {
  parts: TintBoxPart[]
}

// A box in the strand's light tint (from data-strand around it) holding one
// or more labelled pieces of text, with lines between them. Used for a
// teacher prompt and its student answers, and for a Strand A skill
function TintBox({ parts }: TintBoxProps) {
  return (
    <div className="rounded-card bg-strand-bg px-md">
      {parts.map((part, index) => (
        <div
          key={index}
          className="col-xs border-t border-line py-md first:border-t-0"
        >
          <p className="text-sm font-semibold text-strand-text">{part.label}</p>
          <p className="text-md text-fg">{part.text}</p>
        </div>
      ))}
    </div>
  )
}

export default TintBox
