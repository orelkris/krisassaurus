import { useEffect, useRef } from 'react'
import { Navigate, useParams, useSearchParams } from 'react-router-dom'
import Breadcrumb from '@/components/ui/Breadcrumb'
import IdeaLadder from '@/components/math/IdeaLadder'
import IdeaMap from '@/components/math/IdeaMap'
import StrandBadge from '@/components/math/StrandBadge'
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
    <div className="flex flex-col gap-7">
      <header className="flex flex-col gap-2">
        <Breadcrumb
          className="text-gray-900"
          items={[{ label: 'Math', to: '/blog/math' }, { label: strand.name }]}
        />
        <h1 className="flex items-center gap-2.5 text-3xl font-bold text-gray-900">
          <StrandBadge strand={strand} size="lg" />
          {strand.name}
        </h1>
        <p className="max-w-prose leading-relaxed text-gray-500">
          {strand.blurb} Below, each row is one idea and each square is one
          expectation in that grade.
        </p>
      </header>

      <IdeaMap strand={strand} ideas={ideas} currentId={idea.id} />

      <section ref={ladderRef} className="flex scroll-mt-4 flex-col gap-3.5">
        <h2 className="text-lg font-bold text-gray-900">
          {idea.name}, Grade 1 to 8
        </h2>
        <IdeaLadder strand={strand} idea={idea} />
      </section>
    </div>
  )
}

export default StrandPage
