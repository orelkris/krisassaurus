import { Navigate, useParams } from 'react-router-dom'
import PageHeader from '@/components/layout/PageHeader'
import ElementsOfDrama from '@/components/drama/ElementsOfDrama'
import CurriculumBreadcrumb from '@/components/ui/CurriculumBreadcrumb'
import ExpectationGroups from '@/components/ui/ExpectationGroups'
import StickyBar from '@/components/ui/StickyBar'
import StrandBadge from '@/components/ui/StrandBadge'
import {
  dramaPath,
  dramaStrandGroups,
  getDramaExpectations,
} from '@/data/drama/curriculum/expectations'
import { getDramaStrandBySlug } from '@/data/drama/curriculum/strands'

// One strand in one grade, e.g. Grade 6 Creating and Presenting. Laid out
// like Math's GradeStrandPage; Creating and Presenting starts with the
// elements of drama, which it applies
function DramaGradeStrandPage() {
  const params = useParams<{ grade: string; slug: string }>()
  const grade = Number(params.grade)
  const strand = getDramaStrandBySlug(params.slug ?? '')
  const isGrade = Number.isInteger(grade) && grade >= 1 && grade <= 8

  if (!isGrade) return <Navigate to={dramaPath({})} replace />
  if (!strand) return <Navigate to={dramaPath({ grade })} replace />

  const items = getDramaExpectations({ grade, strand: strand.id })

  return (
    <>
      <PageHeader
        above={
          <CurriculumBreadcrumb
            subject="Drama"
            grade={grade}
            strand={strand.name}
            className="hidden lg:block"
          />
        }
        title={
          <>
            Grade {grade} ·
            <StrandBadge strand={strand} size="lg" />
            {strand.name}
          </>
        }
      />

      {/* The label sticks while the boxes scroll past */}
      <section className="col-page">
        <StickyBar padded>
          <h2 className="text-label">
            Grade {grade} · {strand.name} · {items.length} expectations
          </h2>
        </StickyBar>
        {strand.id === 'B1' && <ElementsOfDrama grade={grade} />}
        <ExpectationGroups groups={dramaStrandGroups(items)} />
      </section>
    </>
  )
}

export default DramaGradeStrandPage
