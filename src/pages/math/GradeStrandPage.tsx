import { Navigate, useParams } from 'react-router-dom'
import PageHeader from '@/components/layout/PageHeader'
import CurriculumBreadcrumb from '@/components/ui/CurriculumBreadcrumb'
import ExpectationGroups from '@/components/ui/ExpectationGroups'
import StrandBadge from '@/components/ui/StrandBadge'
import StickyBar from '@/components/ui/StickyBar'
import {
  getExpectations,
  mathPath,
  overallGroups,
} from '@/data/math/expectations'
import { getStrandBySlug } from '@/data/math/strands'

// One strand in one grade, e.g. Grade 6 Number
function GradeStrandPage() {
  const params = useParams<{ grade: string; slug: string }>()
  const grade = Number(params.grade)
  const strand = getStrandBySlug(params.slug ?? '')
  const isGrade = Number.isInteger(grade) && grade >= 1 && grade <= 8

  if (!isGrade) return <Navigate to={mathPath({})} replace />
  if (!strand) return <Navigate to={mathPath({ grade })} replace />

  const items = getExpectations({ grade, strand: strand.id })

  return (
    <>
      <PageHeader
        above={
          <CurriculumBreadcrumb
            subject="Math"
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
        <ExpectationGroups groups={overallGroups(items)} />
      </section>
    </>
  )
}

export default GradeStrandPage
