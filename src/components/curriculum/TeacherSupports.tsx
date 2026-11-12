import { useRef } from 'react'
import MathCard from '@/components/math/MathCard'
import MathText from '@/components/math/MathText'
import TintBox from '@/components/ui/TintBox'
import Pill from '@/components/ui/Pill'
import { useEqualHeights } from '@/hooks/useEqualHeights'
import type {
  Support,
  SupportPoint,
  TeacherSupports as Supports,
} from '@/types/curriculum'
import type { ActivityCard, ConceptCard } from '@/types/math'

const capitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1)

// Points under a point, as in the PDF
function Points({ items }: { items: SupportPoint[] }) {
  return (
    <ul className="col-xs list-disc pl-md [&_ul]:list-[circle]">
      {items.map((item, index) => (
        <li key={index}>
          <MathText text={capitalize(item.text)} />
          {item.items.length > 0 && <Points items={item.items} />}
        </li>
      ))}
    </ul>
  )
}

// A short line ending in ":" with points under it is a heading
const isHeading = (item: SupportPoint) =>
  item.items.length > 0 &&
  item.text.endsWith(':') &&
  item.text.split(/\s+/).length <= 8

// Each key concept or example in its own tinted box, like Gym's prompts.
// A heading line becomes the box's label
function PointBoxes({ items }: { items: SupportPoint[] }) {
  return (
    <div className="col-sm">
      {items.map((item, index) => (
        <TintBox
          key={index}
          parts={[
            isHeading(item)
              ? {
                  label: capitalize(item.text.slice(0, -1)),
                  text: <Points items={item.items} />,
                }
              : {
                  text: (
                    <div className="col-xs">
                      <p>
                        <MathText text={capitalize(item.text)} />
                      </p>
                      {item.items.length > 0 && <Points items={item.items} />}
                    </div>
                  ),
                },
          ]}
        />
      ))}
    </div>
  )
}

const flatten = (items: SupportPoint[]): string =>
  items
    .map((item) => [item.text, flatten(item.items)].filter(Boolean).join(' '))
    .join(' ')

interface TeacherSupportsProps {
  supports: Supports
  support: Support
  // Our rewritten cards, which replace the document's text where they exist
  // (e.g. Math Grade 6 B1.1)
  cards: { concepts?: ConceptCard[]; activities?: ActivityCard[] }
}

// One of an expectation's teacher supports, under its text on the overall
// page: its key concepts, examples or sample tasks
function TeacherSupports({ supports, support, cards }: TeacherSupportsProps) {
  const cardsRef = useRef<HTMLDivElement>(null)
  useEqualHeights(cardsRef, '.math-card', { perRow: true }, [support])

  if (support === 'concepts') {
    const concepts = cards.concepts
    if (!concepts) return <PointBoxes items={supports.keyConcepts} />
    return (
      <div ref={cardsRef} className="col-md">
        {concepts.map((card, index) => (
          <MathCard
            key={card.title}
            title={`${String(index + 1).padStart(2, '0')} · ${card.title}`}
            summary={card.summary}
            body={card.body}
            blocks={card.blocks}
            original={
              supports.keyConcepts[index] &&
              flatten([supports.keyConcepts[index]])
            }
          />
        ))}
      </div>
    )
  }

  if (support === 'examples') return <PointBoxes items={supports.examples} />

  const activities = cards.activities
  return (
    <div className="col-md">
      {supports.tools.length > 0 && (
        <div className="row-stack flex-wrap">
          {supports.tools.map((tool) => (
            <Pill key={tool}>{tool}</Pill>
          ))}
        </div>
      )}
      {activities ? (
        <div ref={cardsRef} className="col-md">
          {activities.map((card, index) => {
            const task = supports.tasks[index]
            return (
              <MathCard
                key={card.title}
                eyebrow={`Activity ${String(index + 1).padStart(2, '0')}`}
                eyebrowColor="var(--color-strand-text)"
                title={card.title}
                summary={card.summary}
                blocks={card.blocks}
                divided
                original={
                  task && [task.text, ...task.items, task.after ?? ''].join(' ')
                }
              />
            )
          })}
        </div>
      ) : (
        supports.tasks.map((task, index) => (
          <TintBox
            key={index}
            parts={[
              {
                label: `Activity ${String(index + 1).padStart(2, '0')}`,
                text: (
                  <div className="col-xs">
                    {task.text && (
                      <p>
                        <MathText text={task.text} />
                      </p>
                    )}
                    {task.items.length > 0 && (
                      <ul className="col-xs list-disc pl-md">
                        {task.items.map((item) => (
                          <li key={item}>
                            <MathText text={item} />
                          </li>
                        ))}
                      </ul>
                    )}
                    {task.after && (
                      <p>
                        <MathText text={task.after} />
                      </p>
                    )}
                  </div>
                ),
              },
            ]}
          />
        ))
      )}
    </div>
  )
}

export default TeacherSupports
