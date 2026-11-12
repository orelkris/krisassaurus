import { useLocation } from 'react-router-dom'
import CurriculumFilter, {
  type CurriculumPick,
  type FilterSubList,
} from '@/components/ui/CurriculumFilter'
import { useCurriculum } from '@/hooks/useCurriculum'
import {
  curriculumPath,
  gradesOf,
  overallsIn,
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

  // How many expectations a pick has: one grade, or one strand in every grade
  const count = ({ grade, strand }: CurriculumPick) => {
    const grades = grade ? [grade] : gradesOf(curriculum)
    return grades.reduce(
      (sum, g) => sum + specificsIn(curriculum, g, strand as StrandId).length,
      0
    )
  }

  // A grade page, or a strand page, each from the top
  const path = ({ grade, strand }: CurriculumPick) =>
    grade
      ? curriculumPath(curriculum.subject, { grade })
      : curriculumPath(curriculum.subject, { strand: strand as StrandId })

  // On a strand page, the strand's overall expectations under it, like
  // Math's ideas (Strand A has only one, so it has none)
  const strandId = strand as StrandId | undefined
  const overalls =
    strandId && !grade && curriculum.strands[strandId]
      ? overallsIn(curriculum, strandId)
      : []
  const currentCode = pathname
    .match(new RegExp(`^${base}/strand/[a-z]/([a-z0-9]+)`))?.[1]
    ?.toUpperCase()
  const subList: FilterSubList | undefined =
    strandId && overalls.length > 1
      ? {
          kind: 'links',
          links: overalls.map(({ code, name }, index) => ({
            id: code,
            label: `${code} ${name ?? ''}`,
            to: curriculumPath(curriculum.subject, { strand: strandId, code }),
            // The strand page opens at its first overall
            isCurrent: currentCode ? code === currentCode : index === 0,
          })),
        }
      : undefined

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
      subList={subList}
    />
  )
}

export default CurriculumSidebar
