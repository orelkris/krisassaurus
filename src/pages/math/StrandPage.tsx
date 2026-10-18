import { useEffect, useRef } from 'react'
import { Navigate, useParams, useSearchParams } from 'react-router-dom'
import PageHeader from '@/components/layout/PageHeader'
import MathBreadcrumb from '@/components/math/MathBreadcrumb'
import IdeaLadder from '@/components/math/IdeaLadder'
import IdeaMap from '@/components/math/IdeaMap'
import StrandBadge from '@/components/math/StrandBadge'
import StickyBar from '@/components/ui/StickyBar'
import { getIdeasInStrand } from '@/data/math/expectations'
import { getStrandBySlug } from '@/data/math/strands'

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

  if (!strand || !idea) return <Navigate to="/blog/math" replace />

  return (
    <>
      <PageHeader
        above={<MathBreadcrumb className="hidden lg:block" />}
        title={
          <>
            <StrandBadge strand={strand} size="lg" />
            {strand.name}
          </>
        }
        description={`${strand.blurb} Below, each row is one idea and each square is one expectation in that grade.`}
      />

      <IdeaMap strand={strand} ideas={ideas} currentId={idea.id} />

      {/* The idea's name sticks while its grades scroll past */}
      <section ref={ladderRef} className="col-page">
        <StickyBar padded>
          <h2 className="text-label">
            {strand.name} · {idea.name} · Grade 1 to 8
          </h2>
        </StickyBar>
        <IdeaLadder idea={idea} />
      </section>
    </>
  )
}

export default StrandPage
