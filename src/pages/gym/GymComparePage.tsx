import { Navigate, useParams } from 'react-router-dom'
import CompareList from '@/components/ui/CompareList'
import OverallHeader from '@/components/ui/OverallHeader'
import { gymCurriculum as gym } from '@/data/subjects/gym/curriculum'
import {
  curriculumPath,
  gradesOf,
  mergeGrades,
  specificsIn,
} from '@/lib/curriculum'
import type { GymStrand } from '@/types/curriculum'

// One specific expectation across every grade, e.g. /gym/grade/4/b1/b1.3.
// Grades in a row that say the same thing share one row (Grades 1–6).
// Strand D is compared by topic, since a topic's code can change between
// grades
function GymComparePage() {
  const params = useParams<{ grade: string; code: string; specific: string }>()
  const grade = Number(params.grade)
  const overallCode = (params.code ?? '').toUpperCase()
  const code = (params.specific ?? '').toUpperCase()
  const strand = code[0] as GymStrand
  const specific = gym.grades[grade]?.[strand]?.[overallCode]?.specifics[code]
  const overallPath = `${curriculumPath(gym.subject, { grade })}/${overallCode.toLowerCase()}`

  if (!specific) return <Navigate to={overallPath} replace />

  const byTopic = !!gym.strands[strand].topics && !!specific.topic

  // What each grade says: the same code, or (Strand D) every specific under
  // the same topic
  const grades = gradesOf(gym).map((g) => ({
    grade: g,
    entries: specificsIn(gym, g, strand)
      .filter(([c, s]) => (byTopic ? s.topic === specific.topic : c === code))
      .map(([c, s]) => ({
        code: byTopic ? c : undefined,
        text: s.description,
      })),
  }))

  // Grades next to each other that say the same thing share a row
  const rows = mergeGrades(grades)

  const all = gradesOf(gym)
  return (
    <div data-strand={strand} className="contents">
      <OverallHeader
        back={{
          label: `Grade ${grade}`,
          to: `${overallPath}?view=compare#${code.toLowerCase()}`,
        }}
        code={code}
        name={
          byTopic
            ? specific.topic
            : `Grades ${all[0]} to ${all[all.length - 1]}`
        }
        items={[]}
      />
      <CompareList rows={rows} />
    </div>
  )
}

export default GymComparePage
