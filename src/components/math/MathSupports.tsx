import { useRef } from 'react'
import type { Expectation, ExpectationDetails } from '@/types/math'
import CurriculumList from '@/components/math/CurriculumList'
import MathCard from '@/components/math/MathCard'
import TaskCard from '@/components/math/TaskCard'
import Pill from '@/components/ui/Pill'
import { getActivityCards } from '@/data/math/activities'
import { getConceptCards } from '@/data/math/concepts'
import { getStrand } from '@/data/math/strands'
import { useEqualHeights } from '@/hooks/useEqualHeights'
import type { CurriculumItem, MathSupport } from '@/types/math'

const flatten = (items: CurriculumItem[]): string =>
  items
    .map((item) => [item.text, flatten(item.items)].filter(Boolean).join(' '))
    .join(' ')

interface MathSupportsProps {
  expectation: Expectation
  details: ExpectationDetails
  support: MathSupport
}

// One of an expectation's teacher supports, under its text on the overall
// page: its key concepts, examples or sample tasks. Rewritten cards (e.g.
// Grade 6 B1.1) replace the curriculum's text where they exist
function MathSupports({ expectation, details, support }: MathSupportsProps) {
  const cardsRef = useRef<HTMLDivElement>(null)
  useEqualHeights(cardsRef, '.math-card', { perRow: true }, [support])
  const colors = getStrand(expectation.strand).colors

  if (support === 'concepts') {
    const concepts = getConceptCards(expectation.id)
    if (!concepts) return <CurriculumList items={details.keyConcepts} />
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
              details.keyConcepts[index] &&
              flatten([details.keyConcepts[index]])
            }
          />
        ))}
      </div>
    )
  }

  if (support === 'examples') return <CurriculumList items={details.examples} />

  const activities = getActivityCards(expectation.id)
  return (
    <div className="col-md">
      {details.tools.length > 0 && (
        <div className="row-stack flex-wrap">
          {details.tools.map((tool) => (
            <Pill key={tool}>{tool}</Pill>
          ))}
        </div>
      )}
      {activities ? (
        <div ref={cardsRef} className="col-md">
          {activities.map((card, index) => {
            const task = details.tasks[index]
            return (
              <MathCard
                key={card.title}
                eyebrow={`Activity ${String(index + 1).padStart(2, '0')}`}
                eyebrowColor={colors.text}
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
        details.tasks.map((task, index) => (
          <TaskCard
            key={index}
            task={task}
            number={index + 1}
            color={colors.text}
          />
        ))
      )}
    </div>
  )
}

export default MathSupports
