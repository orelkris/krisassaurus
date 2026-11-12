import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { STRAND_IDS } from '@/types/curriculum'

interface ProcessStepsProps {
  names: string[]
  // Each step's box on the page, e.g. #aspect-2
  hrefOf: (num: number) => string
  label: string
}

// A process's steps in a row of numbered circles joined by a line, each
// with its name under it and a link to its box (on phones, a list with the
// name beside each circle). Each step takes a strand letter's colour in
// turn (A, B, C…)
function ProcessSteps({ names, hrefOf, label }: ProcessStepsProps) {
  return (
    <nav
      aria-label={label}
      className="relative"
      style={{ '--steps': names.length } as CSSProperties}
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-[calc(50%/var(--steps))] top-[calc(var(--spacing-round)/2_-_var(--spacing-rule)/2)] hidden h-rule bg-line sm:block"
      />
      <ol className="relative col-sm sm:grid sm:grid-cols-[repeat(var(--steps),minmax(0,1fr))] sm:gap-sm">
        {names.map((name, index) => (
          <li key={name} data-strand={STRAND_IDS[index]}>
            <Link
              to={hrefOf(index + 1)}
              className="group row-md sm:flex-col sm:items-center sm:gap-sm sm:text-center"
            >
              <span className="inline-flex size-round shrink-0 items-center justify-center rounded-pill bg-strand font-bold text-on-primary transition-[filter] group-hover:brightness-95">
                {index + 1}
              </span>
              <span className="text-sm leading-snug text-fg">{name}</span>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default ProcessSteps
