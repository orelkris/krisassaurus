import { useLocation } from 'react-router-dom'
import CurriculumFilter, {
  type CurriculumPick,
} from '@/components/ui/CurriculumFilter'
import { gymCurriculum as gym } from '@/data/subjects/gym/curriculum'
import {
  curriculumPath,
  gradesOf,
  specificsIn,
  strandsOf,
} from '@/lib/curriculum'
import type { GymStrand } from '@/types/curriculum'

const strands = strandsOf(gym)

// What the address picks, e.g. /gym/grade/4 or /gym/strand/b
function usePick(): CurriculumPick {
  const { pathname } = useLocation()
  const grade = pathname.match(/^\/gym\/grade\/(\d+)/)?.[1]
  const strand = pathname.match(/^\/gym\/strand\/([a-z])/)?.[1]?.toUpperCase()
  return { grade: grade ? Number(grade) : undefined, strand }
}

// How many expectations a pick has: one grade, one strand in every grade,
// or one strand in one grade
function count({ grade, strand }: CurriculumPick) {
  const grades = grade ? [grade] : gradesOf(gym)
  return grades.reduce(
    (sum, g) => sum + specificsIn(gym, g, strand as GymStrand).length,
    0
  )
}

// A grade page, or a strand page when only a strand is picked. With both, the
// grade page opens at that strand
function path({ grade, strand }: CurriculumPick) {
  const id = strand as GymStrand | undefined
  if (grade)
    return `${curriculumPath(gym.subject, { grade })}${id ? `#strand-${id.toLowerCase()}` : ''}`
  return curriculumPath(gym.subject, { strand: id })
}

// Gym's sidebar: Overview, then the shared By grade / By strand filter
function GymSidebar() {
  const { pathname } = useLocation()
  const overviewPath = curriculumPath(gym.subject, {})
  return (
    <CurriculumFilter
      overview={{ to: overviewPath, isCurrent: pathname === overviewPath }}
      grades={gradesOf(gym)}
      strands={strands.map((id) => ({ id, name: gym.strands[id].name }))}
      picked={usePick()}
      count={count}
      path={path}
    />
  )
}

export default GymSidebar
