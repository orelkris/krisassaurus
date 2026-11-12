import { ChevronRight } from 'lucide-react'
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom'
import OverallHeader from '@/components/ui/OverallHeader'
import SpecificList, { type SpecificGroup } from '@/components/ui/SpecificList'
import ViewTabs, { type ViewTab } from '@/components/ui/ViewTabs'
import {
  expectationPath,
  getOveralls,
  groupByIdea,
  mathPath,
  overallPath,
} from '@/data/math/expectations'
import { mathGrades, mathStrands } from '@/data/math/strands'
import { useHashJump } from '@/hooks/useHashJump'

type View = 'expectations' | 'compare'

// One overall expectation in one grade, e.g. /math/grade/4/b2, laid out like
// Gym's: the overall as a big title with a menu of the strand's others, its
// text, then its specific expectations under each idea. Each code opens its
// expectation page. The Compare Grades tab (?view=compare) links each one to
// its idea from Grade 1 to 8
function OverallPage() {
  const params = useParams<{ grade: string; code: string }>()
  const grade = Number(params.grade)
  const code = (params.code ?? '').toUpperCase()
  const strand = mathStrands.find((s) => s.id === code[0])
  const isGrade = mathGrades.includes(grade)
  const overalls = isGrade && strand ? getOveralls(grade, strand.id) : []
  const overall = overalls.find((o) => o.code === code)
  const [search, setSearch] = useSearchParams()
  useHashJump(grade, code)

  if (!isGrade) return <Navigate to={mathPath({})} replace />
  if (!strand || !overall) return <Navigate to={mathPath({ grade })} replace />

  const tabs: ViewTab<View>[] = [
    { id: 'expectations', label: 'Expectations' },
    { id: 'compare', label: 'Compare Grades' },
  ]
  const view =
    tabs.find((tab) => tab.id === search.get('view'))?.id ?? 'expectations'
  const setView = (id: View) =>
    setSearch(id === 'expectations' ? {} : { view: id }, { replace: true })

  // A heading per idea, like Gym's Strand D topics
  const groups: SpecificGroup[] = groupByIdea(overall.expectations).map(
    ({ idea, expectations }) => ({
      heading: idea?.name,
      items: expectations.map((expectation) => ({
        code: expectation.code,
        to: expectationPath(expectation),
        description: expectation.text,
        extra:
          view === 'compare' ? (
            <Link
              to={`${overallPath(grade, code)}/${expectation.code.toLowerCase()}`}
              className="-ml-sm row-xs self-start rounded-row px-sm py-xs text-sm font-semibold text-strand-text transition-colors hover:bg-soft"
            >
              Compare Grades {mathGrades[0]}–{mathGrades[mathGrades.length - 1]}
              <ChevronRight aria-hidden="true" className="size-icon" />
            </Link>
          ) : undefined,
      })),
    })
  )

  return (
    <div data-strand={strand.id} className="contents">
      <div className="col-md">
        <OverallHeader
          back={{
            label: 'Overall Expectations',
            to: `${mathPath({ grade })}#strand-${strand.id.toLowerCase()}`,
          }}
          code={code}
          name={overall.name}
          items={overalls.map((o) => ({
            code: o.code,
            name: o.name,
            count: o.expectations.length,
            to: overallPath(grade, o.code),
          }))}
        />
        <p className="text-lead max-w-read">{overall.description}</p>
      </div>
      <div className="col-md">
        <ViewTabs tabs={tabs} current={view} onSelect={setView} label="Show" />
        <SpecificList groups={groups} />
      </div>
    </div>
  )
}

export default OverallPage
