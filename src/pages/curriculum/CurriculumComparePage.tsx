import { Navigate, useParams } from 'react-router-dom'
import CompareList from '@/components/ui/CompareList'
import OverallHeader from '@/components/ui/OverallHeader'
import { useCurriculum } from '@/hooks/useCurriculum'
import {
  curriculumPath,
  gradesOf,
  hasUnits,
  ideaOf,
  mergeGrades,
  specificsIn,
  specificsInIdea,
  unitOf,
} from '@/lib/curriculum'
import type { StrandId } from '@/types/curriculum'

// One specific expectation across every grade, e.g. /gym/grade/4/b1/b1.3.
// Grades in a row that say the same thing share one row (Grades 1–6);
// in a strand with units, each grade shows its unit instead.
// Gym's Strand D is compared by topic, and Math by idea, since their codes
// change between grades
function CurriculumComparePage() {
  const curriculum = useCurriculum()
  const params = useParams<{ grade: string; code: string; specific: string }>()
  const grade = Number(params.grade)
  const overallCode = (params.code ?? '').toUpperCase()
  const code = (params.specific ?? '').toUpperCase()
  const strand = code[0] as StrandId
  const specific =
    curriculum.grades[grade]?.[strand]?.[overallCode]?.specifics[code]
  const overallPath = `${curriculumPath(curriculum.subject, { grade })}/${overallCode.toLowerCase()}`

  if (!specific) return <Navigate to={overallPath} replace />

  const idea = ideaOf(curriculum, grade, code)
  const byTopic = !!curriculum.strands[strand].topics && !!specific.topic

  // What each grade says: the same code, every specific in the same idea
  // (Math), or every specific under the same topic (Strand D)
  const grades = gradesOf(curriculum).map((g) => ({
    grade: g,
    entries: (idea
      ? specificsInIdea(curriculum, idea, g)
      : specificsIn(curriculum, g, strand).filter(([c, s]) =>
          byTopic ? s.topic === specific.topic : c === code
        )
    ).map(([c, s]) => ({
      code: idea || byTopic ? c : undefined,
      text: s.description,
    })),
  }))

  // Grades next to each other that say the same thing share a row. In a
  // strand with units (Science B to E), each grade keeps its own row, with
  // its unit above the text, since the same code is about a new unit
  const rows = hasUnits(curriculum, strand)
    ? grades
        .filter((g) => g.entries.length)
        .map((g) => ({
          label: `Grade ${g.grade}`,
          heading: unitOf(curriculum, g.grade, strand),
          entries: g.entries,
        }))
    : mergeGrades(grades)

  const all = gradesOf(curriculum)
  return (
    <div data-strand={strand} className="contents">
      <OverallHeader
        back={{
          label: `Grade ${grade}`,
          to: `${overallPath}?view=compare#${code.toLowerCase()}`,
        }}
        code={code}
        name={
          idea
            ? idea.name
            : byTopic
              ? specific.topic
              : `Grades ${all[0]} to ${all[all.length - 1]}`
        }
        items={[]}
      />
      <CompareList rows={rows} />
    </div>
  )
}

export default CurriculumComparePage
