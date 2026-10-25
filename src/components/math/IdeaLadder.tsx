import type { MathIdea } from '@/types/math'
import ExpectationGroups from '@/components/ui/ExpectationGroups'
import { getStrand, mathGrades } from '@/data/math/strands'
import {
  getExpectationsInIdea,
  toExpectationItem,
} from '@/data/math/expectations'

interface IdeaLadderProps {
  idea: MathIdea
}

// One idea from Grade 1 to 8: each grade is a framed group of the same rows
// as a Grade page
function IdeaLadder({ idea }: IdeaLadderProps) {
  const groups = mathGrades.map((grade) => {
    const items = getExpectationsInIdea(idea.id, grade)
    return {
      id: String(grade),
      label: `Grade ${grade}`,
      color: getStrand(idea.strand).colors.text,
      sections: items.length
        ? [{ id: 'all', items: items.map(toExpectationItem) }]
        : [],
      empty: 'Not in this grade',
    }
  })

  return <ExpectationGroups groups={groups} />
}

export default IdeaLadder
