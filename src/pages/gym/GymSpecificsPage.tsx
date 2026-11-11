import { ChevronRight } from 'lucide-react'
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom'
import OverallHeader from '@/components/ui/OverallHeader'
import ResourceList from '@/components/ui/ResourceList'
import SpecificList, {
  type SpecificGroup,
  type SpecificItem,
} from '@/components/ui/SpecificList'
import ViewTabs, { type ViewTab } from '@/components/ui/ViewTabs'
import { gymCurriculum as gym } from '@/data/subjects/gym/curriculum'
import { useHashJump } from '@/hooks/useHashJump'
import { curriculumPath, gradesOf, topicsIn } from '@/lib/curriculum'
import { resourcesFor } from '@/lib/resources'
import type { GymStrand, SpecificExpectation } from '@/types/curriculum'
import { RESOURCE_TYPES } from '@/types/resources'

type View =
  | 'expectations'
  | 'examples'
  | 'skills'
  | 'prompts'
  | 'resources'
  | 'compare'

// One overall expectation in one grade, e.g. /gym/grade/4/d1: its specific
// expectations, with tabs for their examples, skills, prompts, resources and
// a link to compare each one across the grades. The tab is in the address
// (?view=prompts), so the back link from a compare page returns to it
function GymSpecificsPage() {
  const params = useParams<{ grade: string; code: string }>()
  const grade = Number(params.grade)
  const code = (params.code ?? '').toUpperCase()
  const strand = code[0] as GymStrand
  const overalls = gym.grades[grade]?.[strand] ?? {}
  const overall = overalls[code]
  const [search, setSearch] = useSearchParams()
  useHashJump(grade, code)

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
    ...(specifics.some(([c]) => resourcesFor(gym.subject, grade, c).length)
      ? [{ id: 'resources' as const, label: 'Resources' }]
      : []),
    { id: 'compare', label: 'Compare Grades' },
  ]
  // The tab from the address, if this overall has it
  const view =
    tabs.find((tab) => tab.id === search.get('view'))?.id ?? 'expectations'
  const setView = (id: View) =>
    setSearch(id === 'expectations' ? {} : { view: id }, { replace: true })
  const grades = gradesOf(gym)

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
    extra:
      view === 'resources' &&
      resourcesFor(gym.subject, grade, specificCode).length ? (
        <ResourceList
          resources={resourcesFor(gym.subject, grade, specificCode).map(
            (resource) => ({
              ...resource,
              kind: RESOURCE_TYPES[resource.type].name,
            })
          )}
        />
      ) : view === 'compare' ? (
        <Link
          to={`${gradePath}/${code.toLowerCase()}/${specificCode.toLowerCase()}`}
          className="-ml-sm row-xs self-start rounded-row px-sm py-xs text-sm font-semibold text-strand-text transition-colors hover:bg-soft"
        >
          Compare Grades {grades[0]}–{grades[grades.length - 1]}
          <ChevronRight aria-hidden="true" className="size-icon" />
        </Link>
      ) : undefined,
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
