import { Link } from 'react-router-dom'
import type { Expectation } from '@/types/math'
import {
  expectationPath,
  getExpectationsInIdea,
  getIdeaOf,
} from '@/data/math/expectations'
import { getStrand } from '@/data/math/strands'

interface WhereThisFitsProps {
  expectation: Expectation
}

// Every item shares the same padding, so labels and text line up across the
// three cards whether or not an item is highlighted
const itemClass = 'rounded-lg px-2 py-1.5 text-[13.5px]'

function Code({ code }: { code: string }) {
  return <span className="mr-1 font-bold">{code}</span>
}

// The same idea in the grade before, this grade, and the grade after
function WhereThisFits({ expectation }: WhereThisFitsProps) {
  const strand = getStrand(expectation.strand)
  const idea = getIdeaOf(expectation)
  const { grade } = expectation
  const inGrade = (g: number) =>
    idea && g >= 1 && g <= 8 ? getExpectationsInIdea(idea.id, g) : []

  const columns = [
    {
      label: grade > 1 ? `Grade ${grade - 1} · before` : 'Before',
      items: inGrade(grade - 1),
      empty:
        grade === 1
          ? 'This is where it starts.'
          : 'Not taught in the grade before.',
    },
    { label: `Grade ${grade} · now`, items: inGrade(grade), empty: '' },
    {
      label: grade < 8 ? `Grade ${grade + 1} · next` : 'Next',
      items: inGrade(grade + 1),
      empty:
        grade === 8
          ? 'Continues in Grade 9 math.'
          : 'Not taught in the grade after.',
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-2.5 md:grid-cols-3">
      {columns.map((column, index) => (
        <div
          key={column.label}
          className="flex min-w-0 flex-col gap-1.5 rounded-xl border-2 border-gray-200 px-[13px] py-[11px]"
          style={
            index === 1 ? { borderColor: strand.colors.accent } : undefined
          }
        >
          <span className="text-label px-2">{column.label}</span>
          {column.items.length === 0 && (
            <span className={`${itemClass} text-gray-400`}>{column.empty}</span>
          )}
          {column.items.map((item) =>
            item.id === expectation.id ? (
              <span
                key={item.id}
                className={itemClass}
                style={{
                  backgroundColor: strand.colors.bg,
                  color: strand.colors.text,
                }}
              >
                <Code code={item.code} />
                {item.text}
              </span>
            ) : (
              <Link
                key={item.id}
                to={expectationPath(item)}
                className={`${itemClass} hover:underline hover:underline-offset-[3px]`}
              >
                <Code code={item.code} />
                {item.text}
              </Link>
            )
          )}
        </div>
      ))}
    </div>
  )
}

export default WhereThisFits
