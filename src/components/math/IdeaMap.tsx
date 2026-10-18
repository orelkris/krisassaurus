import { Link } from 'react-router-dom'
import type { MathIdea, MathStrand } from '@/types/math'
import { mathPath } from '@/data/math/expectations'
import { mathGrades } from '@/data/math/strands'

interface IdeaMapProps {
  strand: MathStrand
  ideas: MathIdea[]
  currentId: string
}

// Ideas down the side, grades across the top, one square per expectation.
// Picking a row shows that idea's expectations below the map
function IdeaMap({ strand, ideas, currentId }: IdeaMapProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full min-w-[560px] border-collapse text-[13px]">
        <thead>
          <tr className="text-muted border-b border-gray-200">
            <th
              scope="col"
              className="w-[34%] py-2 pr-1.5 pl-3.5 text-left font-semibold"
            >
              Idea
            </th>
            {mathGrades.map((grade) => (
              <th key={grade} scope="col" className="px-1.5 py-2 font-semibold">
                Gr {grade}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ideas.map((idea) => {
            const isCurrent = idea.id === currentId
            return (
              <tr
                key={idea.id}
                className={`relative border-b border-gray-200 last:border-b-0 ${
                  isCurrent ? '' : 'hover:bg-gray-50'
                }`}
                style={
                  isCurrent
                    ? {
                        backgroundColor: strand.colors.bg,
                        color: strand.colors.text,
                      }
                    : undefined
                }
              >
                <td className="py-2 pr-1.5 pl-3.5">
                  <Link
                    to={mathPath({ strand: strand.id, idea: idea.id })}
                    replace
                    aria-current={isCurrent ? 'true' : undefined}
                    // Stretched over the row, so the whole row picks the idea
                    className="font-semibold after:absolute after:inset-0"
                  >
                    {idea.name}
                  </Link>
                </td>
                {mathGrades.map((grade) => {
                  const count = idea.expectations[grade]?.length ?? 0
                  return (
                    <td key={grade} className="px-1.5 py-2 text-center">
                      {count ? (
                        <span
                          className="inline-flex gap-[3px]"
                          title={`${count} expectation${count > 1 ? 's' : ''}`}
                        >
                          {Array.from({ length: count }, (_, index) => (
                            <span
                              key={index}
                              className="h-[9px] w-[9px] rounded-[3px]"
                              style={{ backgroundColor: strand.colors.accent }}
                            />
                          ))}
                        </span>
                      ) : (
                        <span className="text-gray-200">–</span>
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default IdeaMap
