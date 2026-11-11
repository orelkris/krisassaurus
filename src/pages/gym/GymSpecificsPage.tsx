import { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import OverallHeader from '@/components/ui/OverallHeader'
import SpecificList, {
  type SpecificGroup,
  type SpecificItem,
} from '@/components/ui/SpecificList'
import ViewTabs, { type ViewTab } from '@/components/ui/ViewTabs'
import { gymCurriculum as gym } from '@/data/subjects/gym/curriculum'
import { curriculumPath, gradesOf, topicsIn } from '@/lib/curriculum'
import type { GymStrand, SpecificExpectation } from '@/types/curriculum'

type View = 'expectations' | 'examples' | 'skills' | 'prompts'

// One overall expectation in one grade, e.g. /gym/grade/4/d1: its specific
// expectations, with tabs for their examples, skills and prompts
function GymSpecificsPage() {
  const params = useParams<{ grade: string; code: string }>()
  // A new page for each overall, so the tabs start at Expectations again
  return (
    <Specifics
      key={`${params.grade}/${params.code}`}
      grade={Number(params.grade)}
      code={(params.code ?? '').toUpperCase()}
    />
  )
}

function Specifics({ grade, code }: { grade: number; code: string }) {
  const strand = code[0] as GymStrand
  const overalls = gym.grades[grade]?.[strand] ?? {}
  const overall = overalls[code]
  const [view, setView] = useState<View>('expectations')

  if (!gradesOf(gym).includes(grade))
    return <Navigate to={curriculumPath(gym.subject, {})} replace />
  if (!overall)
    return <Navigate to={curriculumPath(gym.subject, { grade })} replace />

  const gradePath = curriculumPath(gym.subject, { grade })
  const specifics = Object.entries(overall.specifics)
  // Strand A's skills in this grade, for the Skills tab
  const skills = Object.values(gym.grades[grade]?.A ?? {}).flatMap((a) =>
    Object.entries(a.specifics)
  )
  const skill = (tag: string) => skills.find(([c]) => c === tag)?.[1]

  // Only the tabs that have something to show
  const tabs: ViewTab<View>[] = [
    { id: 'expectations', label: 'Expectations' },
    ...(specifics.some(([, s]) => s.examples.length)
      ? [{ id: 'examples' as const, label: 'Examples' }]
      : []),
    ...(specifics.some(([, s]) => s.tags.length)
      ? [{ id: 'skills' as const, label: 'Skills' }]
      : []),
    ...(specifics.some(([, s]) => s.prompts.length)
      ? [{ id: 'prompts' as const, label: 'Prompts' }]
      : []),
  ]

  const item = (
    specificCode: string,
    specific: SpecificExpectation
  ): SpecificItem => ({
    code: specificCode,
    // Strand A names each skill by its topic; Strand D has a short name
    title: strand === 'A' ? specific.topic : specific.shortName,
    description: specific.description,
    examples: specific.examples.map((text, index) => ({
      text,
      at: specific.exampleAt?.[index] ?? specific.description.length,
    })),
    boxes:
      view === 'skills'
        ? specific.tags.map((tag) => ({
            strand: 'A',
            parts: [
              {
                label: [tag, skill(tag)?.topic].filter(Boolean).join(' '),
                text: skill(tag)?.description ?? '',
              },
            ],
          }))
        : view === 'prompts'
          ? specific.prompts.map((prompt) => ({
              parts: [
                { label: 'Teacher', text: prompt.teacher },
                ...prompt.students.map((text) => ({
                  label: 'Student',
                  text,
                })),
              ],
            }))
          : undefined,
  })

  // Grouped by topic when the strand has a printed list of them (Strand D)
  const groups: SpecificGroup[] = gym.strands[strand].topics
    ? topicsIn(gym, strand)
        .map((topic) => ({
          heading: topic,
          items: specifics
            .filter(([, s]) => s.topic === topic)
            .map(([c, s]) => item(c, s)),
        }))
        .filter((group) => group.items.length)
    : [{ items: specifics.map(([c, s]) => item(c, s)) }]

  return (
    <div data-strand={strand} className="col-xl">
      <div className="col-md">
        <OverallHeader
          back={{
            label: 'Overall Expectations',
            to: `${gradePath}#strand-${strand.toLowerCase()}`,
          }}
          code={code}
          name={overall.name}
          items={Object.entries(overalls).map(([c, o]) => ({
            code: c,
            name: o.name,
            count: Object.keys(o.specifics).length,
            to: `${gradePath}/${c.toLowerCase()}`,
          }))}
        />
        <p className="text-lead max-w-read">{overall.description}</p>
      </div>
      <div className="col-md">
        {tabs.length > 1 && (
          <ViewTabs
            tabs={tabs}
            current={view}
            onSelect={setView}
            label="Show"
          />
        )}
        <SpecificList groups={groups} showExamples={view === 'examples'} />
      </div>
    </div>
  )
}

export default GymSpecificsPage
