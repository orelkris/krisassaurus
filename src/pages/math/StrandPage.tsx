import { useEffect, useRef } from 'react'
import { Navigate, useParams, useSearchParams } from 'react-router-dom'
import PageHeader from '@/components/layout/PageHeader'
import CurriculumBreadcrumb from '@/components/ui/CurriculumBreadcrumb'
import ExpectationGroups from '@/components/ui/ExpectationGroups'
import StrandBadge from '@/components/ui/StrandBadge'
import StickyBar from '@/components/ui/StickyBar'
import StrandMap from '@/components/ui/StrandMap'
import {
  getIdeasInStrand,
  ideaGroups,
  mathPath,
} from '@/data/math/expectations'
import { getStrandBySlug, mathGrades } from '@/data/math/strands'

function StrandPage() {
  const { slug = '' } = useParams<{ slug: string }>()
  const [searchParams] = useSearchParams()
  const strand = getStrandBySlug(slug)
  const ideas = strand ? getIdeasInStrand(strand.id) : []
  const idea =
    ideas.find((item) => item.id === searchParams.get('idea')) ?? ideas[0]

  // Picking another idea brings its list into view
  const ladderRef = useRef<HTMLElement>(null)
  const shownIdea = useRef(idea?.id)
  useEffect(() => {
    if (!idea || shownIdea.current === idea.id) return
    shownIdea.current = idea.id
    ladderRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [idea])

  if (!strand || !idea) return <Navigate to="/math" replace />

  return (
    <>
      <PageHeader
        above={
          <CurriculumBreadcrumb
            subject="Math"
            strand={strand.name}
            className="hidden lg:block"
          />
        }
        title={
          <>
            <StrandBadge strand={strand} size="lg" />
            {strand.name}
          </>
        }
        description={`${strand.blurb} Below, each row is one idea and each square is one expectation in that grade.`}
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
      <section ref={ladderRef} className="col-page">
        <StickyBar padded>
          <h2 className="text-label">
            {strand.name} · {idea.name} · Grade 1 to 8
          </h2>
        </StickyBar>
        <ExpectationGroups groups={ideaGroups(idea)} />
      </section>
    </>
  )
}

export default StrandPage
