import { Navigate, useLocation, useParams } from 'react-router-dom'
import { mathPath } from '@/data/math/expectations'
import { getStrandBySlug } from '@/data/math/strands'

// Old grade and strand links (/math/grade/6/strand/number, #b2) open the
// overall page instead: the one in the address, or the strand's first
function GradeStrandPage() {
  const params = useParams<{ grade: string; slug: string }>()
  const { hash } = useLocation()
  const grade = Number(params.grade)
  const strand = getStrandBySlug(params.slug ?? '')
  const isGrade = Number.isInteger(grade) && grade >= 1 && grade <= 8

  if (!isGrade) return <Navigate to={mathPath({})} replace />
  if (!strand) return <Navigate to={mathPath({ grade })} replace />

  const overall = hash.slice(1).toLowerCase()
  const to = /^[b-f]\d+$/.test(overall)
    ? `/math/grade/${grade}/${overall}`
    : mathPath({ grade, strand: strand.id })
  return <Navigate to={to} replace />
}

export default GradeStrandPage
