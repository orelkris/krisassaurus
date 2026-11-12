import { useEffect, useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom'
import OverallHeader from '@/components/ui/OverallHeader'
import SpecificList, { type SpecificGroup } from '@/components/ui/SpecificList'
import ViewTabs, { type ViewTab } from '@/components/ui/ViewTabs'
import MathSupports from '@/components/math/MathSupports'
import {
  getOveralls,
  groupByIdea,
  hasSupport,
  loadGradeDetails,
  mathPath,
  overallPath,
} from '@/data/math/expectations'
import { mathGrades, mathStrands } from '@/data/math/strands'
import { useHashJump } from '@/hooks/useHashJump'
import type { ExpectationDetails, MathSupport } from '@/types/math'

type View = 'expectations' | MathSupport | 'compare'

// The grade's teacher supports (key concepts, examples, sample tasks), which
// load with the page
function useGradeDetails(grade: number) {
  const [loaded, setLoaded] = useState<{
    grade: number
    details: Record<string, ExpectationDetails>
  }>()
  useEffect(() => {
    if (!Number.isInteger(grade) || grade < 1 || grade > 8) return
    let isCurrent = true
    loadGradeDetails(grade).then((details) => {
      if (isCurrent) setLoaded({ grade, details })
    })
    return () => {
      isCurrent = false
    }
  }, [grade])
  return loaded?.grade === grade ? loaded.details : undefined
}

// One overall expectation in one grade, e.g. /math/grade/4/b2, laid out like
// Gym's: the overall as a big title with a menu of the strand's others, its
// text, then its specific expectations under each idea. The Key Concepts,
// Examples and Sample Tasks tabs show each one's teacher supports under it.
// The Compare Grades tab (?view=compare) links each one to its idea from
// Grade 1 to 8
function OverallPage() {
  const params = useParams<{ grade: string; code: string }>()
  const grade = Number(params.grade)
  const code = (params.code ?? '').toUpperCase()
  const strand = mathStrands.find((s) => s.id === code[0])
  const isGrade = mathGrades.includes(grade)
  const overalls = isGrade && strand ? getOveralls(grade, strand.id) : []
  const overall = overalls.find((o) => o.code === code)
  const [search, setSearch] = useSearchParams()
  const details = useGradeDetails(grade)
  useHashJump(grade, code, !!details)

  if (!isGrade) return <Navigate to={mathPath({})} replace />
  if (!strand || !overall) return <Navigate to={mathPath({ grade })} replace />

  // Only the supports some expectation here has
  const supportTabs: ViewTab<MathSupport>[] = [
    { id: 'concepts', label: 'Key Concepts' },
    { id: 'examples', label: 'Examples' },
    { id: 'tasks', label: 'Sample Tasks' },
  ]
  const tabs: ViewTab<View>[] = [
    { id: 'expectations', label: 'Expectations' },
    ...supportTabs.filter((tab) =>
      overall.expectations.some((e) => hasSupport(details?.[e.id], tab.id))
    ),
    { id: 'compare', label: 'Compare Grades' },
  ]
  // Before the supports load, a support tab in the address is kept
  const asked = search.get('view')
  const isSupport = (id: string | null): id is MathSupport =>
    supportTabs.some((tab) => tab.id === id)
  const view: View =
    tabs.find((tab) => tab.id === asked)?.id ??
    (!details && isSupport(asked) ? asked : 'expectations')
  const setView = (id: View) =>
    setSearch(id === 'expectations' ? {} : { view: id }, { replace: true })

  // A heading per idea, like Gym's Strand D topics
  const groups: SpecificGroup[] = groupByIdea(overall.expectations).map(
    ({ idea, expectations }) => ({
      heading: idea?.name,
      items: expectations.map((expectation) => ({
        code: expectation.code,
        description: expectation.text,
        extra:
          view !== 'expectations' &&
          view !== 'compare' &&
          details &&
          hasSupport(details[expectation.id], view) ? (
            <MathSupports
              expectation={expectation}
              details={details[expectation.id]}
              support={view}
            />
          ) : view === 'compare' ? (
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
