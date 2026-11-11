import type { ReactNode } from 'react'
import TintBox, { type TintBoxPart } from '@/components/ui/TintBox'

export interface SpecificItem {
  // e.g. D1.1
  code: string
  // A bold line above the text, e.g. Nutrients
  title?: string
  description: string
  // Shown inline in brackets in the Examples view
  examples?: { text: string; at: number }[]
  // Extra boxes under the text in the Skills or Prompts view
  boxes?: { parts: TintBoxPart[]; strand?: string }[]
  // Anything else under the text, e.g. a list of resources or a link
  extra?: ReactNode
}

export interface SpecificGroup {
  // A heading above the group, e.g. Healthy Eating
  heading?: string
  items: SpecificItem[]
}

interface SpecificListProps {
  groups: SpecificGroup[]
  // Show each example inline, highlighted, where it sits in the text
  showExamples?: boolean
}

// The text with each "(e.g., …)" put back where it was, highlighted
function withExamples(text: string, examples: SpecificItem['examples']) {
  if (!examples?.length) return text
  const parts: ReactNode[] = []
  let from = 0
  examples.forEach((example, index) => {
    parts.push(text.slice(from, example.at))
    parts.push(' ')
    parts.push(
      <mark
        key={index}
        className="rounded-row bg-strand-bg box-decoration-clone px-xs text-fg"
      >
        (e.g., {example.text})
      </mark>
    )
    from = example.at
  })
  parts.push(text.slice(from))
  return parts
}

// Specific expectations: the code in a column on the left (above the text on
// phones), the text on the right at a readable width, lines between them.
// Groups get a heading, e.g. Strand D's topics
function SpecificList({ groups, showExamples = false }: SpecificListProps) {
  return (
    <div className="col-xl">
      {groups.map((group, index) => (
        <section key={group.heading ?? index} className="col-md">
          {group.heading && (
            <h2 className="heading-section text-strand-text">
              {group.heading}
            </h2>
          )}
          <div className="divide-y divide-line">
            {group.items.map((item) => (
              <div
                key={item.code}
                id={item.code.toLowerCase()}
                className="flex scroll-mt-md flex-col gap-xs py-md sm:flex-row sm:gap-xl"
              >
                <p className="pl-sm text-lg font-bold text-strand-text sm:w-code-long sm:shrink-0">
                  {item.code}
                </p>
                <div className="col-sm max-w-read min-w-0 flex-1">
                  <div>
                    {item.title && (
                      <p className="text-lg font-semibold text-strand-text">
                        {item.title}
                      </p>
                    )}
                    <p className="text-lg text-fg">
                      {showExamples
                        ? withExamples(item.description, item.examples)
                        : item.description}
                    </p>
                  </div>
                  {item.boxes?.map((box, boxIndex) => (
                    <div key={boxIndex} data-strand={box.strand}>
                      <TintBox parts={box.parts} />
                    </div>
                  ))}
                  {item.extra}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

export default SpecificList
