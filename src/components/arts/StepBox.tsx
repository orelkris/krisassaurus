import type { ReactNode } from 'react'

interface StepBoxProps {
  // e.g. stage-3, so the diagram and the step circles can link here
  id: string
  num: number
  name: string
  // A strand letter gives the badge and labels that strand's colours;
  // without one they take the subject's
  strandId?: string
  children: ReactNode
}

// One numbered step of a process: a round badge and the name, then its
// parts, each under a line (StepList, or a paragraph)
export function StepBox({ id, num, name, strandId, children }: StepBoxProps) {
  return (
    <section
      id={id}
      data-strand={strandId}
      className="box scroll-mt-nav overflow-hidden"
    >
      <div className="row-md px-lg py-md">
        <span
          className={`inline-flex size-badge shrink-0 items-center justify-center rounded-pill text-sm font-semibold text-on-primary ${
            strandId ? 'bg-strand' : 'bg-subject'
          }`}
        >
          {num}
        </span>
        <h2 className="heading-section">{name}</h2>
      </div>
      <div className="divide-y divide-line border-t border-line">
        {children}
      </div>
    </section>
  )
}

interface StepListProps {
  // e.g. The student
  label: string
  items: string[]
  // The label in the strand's colour (inside a StepBox with a strandId),
  // else the subject's
  strand?: boolean
}

// A labelled list inside a StepBox, a line between items, no bullets
export function StepList({ label, items, strand = false }: StepListProps) {
  return (
    <div className="col-xs px-lg pt-lg">
      <h3
        className={`text-md font-semibold ${strand ? 'text-strand-text' : 'text-subject'}`}
      >
        {label}
      </h3>
      <ul>
        {items.map((item) => (
          <li
            key={item}
            className="max-w-lead border-t border-line py-md text-md leading-relaxed"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

// A paragraph inside a StepBox, e.g. an aspect's description
export function StepText({ children }: { children: ReactNode }) {
  return (
    <div className="p-lg">
      <p className="max-w-lead text-md leading-relaxed">{children}</p>
    </div>
  )
}
