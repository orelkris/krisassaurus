import { Navigate, useParams } from 'react-router-dom'
import CompareList from '@/components/ui/CompareList'
import OverallHeader from '@/components/ui/OverallHeader'
import {
  expectationPath,
  findExpectation,
  getExpectationsInIdea,
  getIdeaOf,
  overallPath,
} from '@/data/math/expectations'
import { mathGrades } from '@/data/math/strands'

// One specific expectation across the grades, e.g. /math/grade/4/b1/b1.3,
// like Gym's compare page. Math's codes change between grades, so it
// compares by idea: each grade's expectations in the same idea, each code
// linking to its page
function ComparePage() {
  const params = useParams<{ grade: string; code: string; specific: string }>()
  const grade = Number(params.grade)
  const overallCode = (params.code ?? '').toUpperCase()
  const code = (params.specific ?? '').toUpperCase()
  const expectation = findExpectation(grade, code)
  const back = overallPath(grade, overallCode)
  const idea = expectation && getIdeaOf(expectation)

  if (!expectation || expectation.overall !== overallCode || !idea)
    return <Navigate to={back} replace />

  const rows = mathGrades
    .map((g) => ({
      label: `Grade ${g}`,
      entries: getExpectationsInIdea(idea.id, g).map((e) => ({
        code: e.code,
        text: e.text,
        to: expectationPath(e),
      })),
    }))
    .filter((row) => row.entries.length)

  return (
    <div data-strand={expectation.strand} className="contents">
      <OverallHeader
        back={{
          label: `Grade ${grade}`,
          to: `${back}?view=compare#${code.toLowerCase()}`,
        }}
        code={code}
        name={idea.name}
        items={[]}
      />
      <CompareList rows={rows} />
    </div>
  )
}

export default ComparePage
