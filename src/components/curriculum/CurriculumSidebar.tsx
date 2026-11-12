import { useLocation } from 'react-router-dom'
import CurriculumFilter, {
  type CurriculumPick,
} from '@/components/ui/CurriculumFilter'
import { useCurriculum } from '@/hooks/useCurriculum'
import {
  curriculumPath,
  gradesOf,
  specificsIn,
  strandsOf,
} from '@/lib/curriculum'
import type { StrandId } from '@/types/curriculum'

// A subject's sidebar: Overview, then the shared By grade / By strand filter
function CurriculumSidebar() {
  const curriculum = useCurriculum()
  const { pathname } = useLocation()
  const base = curriculumPath(curriculum.subject, {})

  // What the address picks, e.g. /gym/grade/4 or /gym/strand/b
  const grade = pathname.match(new RegExp(`^${base}/grade/(\\d+)`))?.[1]
  const strand = pathname
    .match(new RegExp(`^${base}/strand/([a-z])`))?.[1]
    ?.toUpperCase()
  const picked: CurriculumPick = {
    grade: grade ? Number(grade) : undefined,
    strand,
  }

  // How many expectations a pick has: one grade, one strand in every grade,
  // or one strand in one grade
  const count = ({ grade, strand }: CurriculumPick) => {
    const grades = grade ? [grade] : gradesOf(curriculum)
    return grades.reduce(
      (sum, g) => sum + specificsIn(curriculum, g, strand as StrandId).length,
      0
    )
  }

  // A grade page, or a strand page when only a strand is picked. With both,
  // the grade page opens at that strand
  const path = ({ grade, strand }: CurriculumPick) => {
    const id = strand as StrandId | undefined
    if (grade)
      return `${curriculumPath(curriculum.subject, { grade })}${id ? `#strand-${id.toLowerCase()}` : ''}`
    return curriculumPath(curriculum.subject, { strand: id })
  }

  return (
    <CurriculumFilter
      overview={{ to: base, isCurrent: pathname === base }}
      grades={gradesOf(curriculum)}
      strands={strandsOf(curriculum).map((id) => ({
        id,
        name: curriculum.strands[id].name,
      }))}
      picked={picked}
      count={count}
      path={path}
    />
  )
}

export default CurriculumSidebar
