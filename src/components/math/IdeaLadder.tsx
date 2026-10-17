import { Link } from 'react-router-dom'
import type { MathIdea, MathStrand } from '@/types/math'
import { mathGrades } from '@/data/math/strands'
import {
  expectationPath,
  getExpectationsInIdea,
} from '@/data/math/expectations'

interface IdeaLadderProps {
  strand: MathStrand
  idea: MathIdea
}

// One idea from Grade 1 to 8: the grade in one column, its expectations in the
// other. Both columns share the first line's baseline, and long wording wraps
// under the text, not under the code
function IdeaLadder({ strand, idea }: IdeaLadderProps) {
  return (
    <div className="flex flex-col divide-y divide-dashed divide-gray-200">
      {mathGrades.map((grade) => {
        const items = getExpectationsInIdea(idea.id, grade)
        return (
          <div
            key={grade}
            className="grid grid-cols-1 items-baseline gap-1.5 py-3.5 sm:grid-cols-[76px_minmax(0,1fr)] sm:gap-4"
          >
            <div className="text-sm font-extrabold">Grade {grade}</div>
            <div className="flex min-w-0 flex-col gap-1.5">
              {items.length ? (
                items.map((expectation) => (
                  <Link
                    key={expectation.id}
                    to={expectationPath(expectation)}
                    className="group grid grid-cols-[46px_minmax(0,1fr)] items-baseline text-[14.5px] leading-normal"
                  >
                    <span
                      className="text-[12.5px] font-bold tabular-nums"
                      style={{ color: strand.colors.text }}
                    >
                      {expectation.code}
                    </span>
                    <span className="group-hover:underline group-hover:underline-offset-[3px]">
                      {expectation.text}
                    </span>
                  </Link>
                ))
              ) : (
                <span className="text-[13.5px] italic text-gray-400">
                  Not in this grade
                </span>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default IdeaLadder
