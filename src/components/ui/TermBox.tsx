import type { Term } from '@/types/curriculum'

interface TermBoxProps {
  // e.g. Elements of drama
  title: string
  terms: Term[]
  // The strand whose text colour the terms take
  strandId?: string
}

// A box of terms, styled like a strand box without its badge and count
// column: a title row, then a row per term with the term in the strand's
// colour and its text under it. E.g. a grade's Elements of drama
function TermBox({ title, terms, strandId }: TermBoxProps) {
  return (
    <section data-strand={strandId} className="box overflow-hidden">
      <h2 className="heading-section border-b border-line px-lg py-md">
        {title}
      </h2>
      <dl className="divide-y divide-line">
        {terms.map((item) => (
          <div key={item.term} className="col-sm p-lg">
            <dt className="text-md font-semibold text-strand-text">
              {item.term}
            </dt>
            <dd className="max-w-lead text-md text-fg">{item.text}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export default TermBox
