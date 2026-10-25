import { useEffect, useRef } from 'react'
import { Navigate, useParams, useSearchParams } from 'react-router-dom'
import PageHeader from '@/components/layout/PageHeader'
import CurriculumBreadcrumb from '@/components/ui/CurriculumBreadcrumb'
import ExpectationGroups from '@/components/ui/ExpectationGroups'
import StickyBar from '@/components/ui/StickyBar'
import StrandBadge from '@/components/ui/StrandBadge'
import StrandMap from '@/components/ui/StrandMap'
import {
  dramaCodeCounts,
  dramaCodeGroups,
  dramaPath,
} from '@/data/drama/curriculum/expectations'
import {
  dramaGrades,
  dramaTopics,
  getCodesInStrand,
  getDramaStrandBySlug,
} from '@/data/drama/curriculum/strands'

// One strand from Grade 1 to 8, laid out like Math's StrandPage. Each row of
// the map is one expectation number; below, the picked one in every grade
function DramaStrandPage() {
  const { slug = '' } = useParams<{ slug: string }>()
  const [searchParams] = useSearchParams()
  const strand = getDramaStrandBySlug(slug)
  const codes = strand ? getCodesInStrand(strand.id) : []
  const picked = searchParams.get('code')?.toUpperCase()
  const code = codes.find((item) => item === picked) ?? codes[0]

  // Picking another number brings its list into view
  const ladderRef = useRef<HTMLElement>(null)
  const shownCode = useRef(code)
  useEffect(() => {
    if (!code || shownCode.current === code) return
    shownCode.current = code
    ladderRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [code])

  if (!strand || !code) return <Navigate to="/drama" replace />

  return (
    <>
      <PageHeader
        above={
          <CurriculumBreadcrumb
            subject="Drama"
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
        description={`${strand.blurb} Below, each row is one expectation and each square is that expectation in a grade.`}
      />

      <StrandMap
        rowLabel="Expectation"
        grades={dramaGrades}
        rows={codes.map((item) => ({
          id: item,
          label: `${item} ${dramaTopics[item]}`,
          to: dramaPath({ strand: strand.id, code: item }),
          counts: dramaCodeCounts(item),
        }))}
        currentId={code}
        colors={strand.colors}
      />

      {/* The number's name sticks while its grades scroll past */}
      <section ref={ladderRef} className="col-page">
        <StickyBar padded>
          <h2 className="text-label">
            {strand.name} · {code} {dramaTopics[code]} · Grade 1 to 8
          </h2>
        </StickyBar>
        <ExpectationGroups groups={dramaCodeGroups(code)} />
      </section>
    </>
  )
}

export default DramaStrandPage
