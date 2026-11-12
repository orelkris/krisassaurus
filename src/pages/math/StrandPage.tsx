import { Navigate, useParams, useSearchParams } from 'react-router-dom'
import PageHeader from '@/components/layout/PageHeader'
import CompareList from '@/components/ui/CompareList'
import StickyBar from '@/components/ui/StickyBar'
import StrandBadge from '@/components/ui/StrandBadge'
import StrandMap from '@/components/ui/StrandMap'
import {
  getExpectationsInIdea,
  getIdeasInStrand,
  mathPath,
} from '@/data/math/expectations'
import { getStrandBySlug, mathGrades } from '@/data/math/strands'

// One Math strand across Grades 1 to 8, laid out like the other subjects'
// strand pages: the strand as the title, a map with one row per idea and one
// square per expectation in each grade, then the picked idea grade by grade.
// Each code opens its expectation page
function StrandPage() {
  const { slug = '' } = useParams<{ slug: string }>()
  const [searchParams] = useSearchParams()
  const strand = getStrandBySlug(slug)
  const ideas = strand ? getIdeasInStrand(strand.id) : []
  const idea =
    ideas.find((item) => item.id === searchParams.get('idea')) ?? ideas[0]

  if (!strand || !idea) return <Navigate to="/math" replace />

  // One row per grade that has the idea; grades without it are left out
  const rows = mathGrades
    .map((grade) => ({
      label: `Grade ${grade}`,
      entries: getExpectationsInIdea(idea.id, grade).map((expectation) => ({
        code: expectation.code,
        text: expectation.text,
      })),
    }))
    .filter((row) => row.entries.length)

  // This wrapper only passes the strand colour down; the parts go straight
  // into the main column's Container
  return (
    <div data-strand={strand.id} className="contents">
      <PageHeader
        title={
          <>
            <StrandBadge strand={{ id: strand.id }} size="lg" />
            {strand.name}
          </>
        }
      />

      <StrandMap
        rowLabel="Idea"
        grades={mathGrades}
        rows={ideas.map((item) => ({
          id: item.id,
          label: item.name,
          to: mathPath({ strand: strand.id, idea: item.id }),
          counts: Object.fromEntries(
            mathGrades.map((grade) => [
              grade,
              item.expectations[grade]?.length ?? 0,
            ])
          ),
        }))}
        currentId={idea.id}
        colors={strand.colors}
      />

      {/* The idea's name sticks while its grades scroll past */}
      <StickyBar padded>
        <h2 className="text-label">
          {strand.name} · {idea.name} · Grades {mathGrades[0]} to{' '}
          {mathGrades[mathGrades.length - 1]}
        </h2>
      </StickyBar>
      <CompareList rows={rows} />
    </div>
  )
}

export default StrandPage
