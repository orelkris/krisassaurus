import type { MathIdea } from '@/types/math'
import ExpectationRow from '@/components/math/ExpectationRow'
import FramedGroup from '@/components/ui/FramedGroup'
import { mathGrades } from '@/data/math/strands'
import { getExpectationsInIdea } from '@/data/math/expectations'

interface IdeaLadderProps {
  idea: MathIdea
}

// One idea from Grade 1 to 8: each grade is a framed group of the same rows
// as a Grade page. The boxes are handed to the page's container, so they sit
// the same distance apart as everything else
function IdeaLadder({ idea }: IdeaLadderProps) {
  return (
    <>
      {mathGrades.map((grade) => {
        const items = getExpectationsInIdea(idea.id, grade)
        return (
          <FramedGroup key={grade} label={`Grade ${grade}`}>
            {items.length ? (
              <div className="flex flex-col">
                {items.map((expectation) => (
                  <ExpectationRow
                    key={expectation.id}
                    expectation={expectation}
                  />
                ))}
              </div>
            ) : (
              <p className="text-muted ml-3">Not in this grade</p>
            )}
          </FramedGroup>
        )
      })}
    </>
  )
}

export default IdeaLadder
