import { ChevronRight } from 'lucide-react'
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom'
import TeacherSupports from '@/components/curriculum/TeacherSupports'
import OverallHeader from '@/components/ui/OverallHeader'
import ResourceList from '@/components/ui/ResourceList'
import SpecificList, {
  type SpecificGroup,
  type SpecificItem,
} from '@/components/ui/SpecificList'
import ViewTabs, { type ViewTab } from '@/components/ui/ViewTabs'
import { useCurriculum } from '@/hooks/useCurriculum'
import { useHashJump } from '@/hooks/useHashJump'
import { useSupports } from '@/hooks/useSupports'
import {
  cardsFor,
  curriculumPath,
  gradesOf,
  hasSupport,
  ideaOf,
  skillsStrandOf,
  topicsIn,
  unitOf,
} from '@/lib/curriculum'
import { resourcesFor } from '@/lib/resources'
import type { SpecificExpectation, StrandId, Support } from '@/types/curriculum'
import { RESOURCE_TYPES } from '@/types/resources'

type View =
  | 'expectations'
  | 'concepts'
  | 'examples'
  | 'skills'
  | 'prompts'
  | 'tasks'
  | 'resources'
  | 'compare'

// One overall expectation in one grade, e.g. /gym/grade/4/d1: its specific
// expectations, with tabs for their key concepts, examples, skills, prompts,
// sample tasks and resources (only those it has), and a link to compare
// each one across the grades. The tab is in the address
// (?view=prompts), so the back link from a compare page returns to it
function CurriculumSpecificsPage() {
  const curriculum = useCurriculum()
  const params = useParams<{ grade: string; code: string }>()
  const grade = Number(params.grade)
  const code = (params.code ?? '').toUpperCase()
  const strand = code[0] as StrandId
  const overalls = curriculum.grades[grade]?.[strand] ?? {}
  const overall = overalls[code]
  const [search, setSearch] = useSearchParams()
  // Math's key concepts, examples and sample tasks load with the page
  const supports = useSupports(curriculum, grade)
  const loading = !!curriculum.supports && !supports
  useHashJump(grade, code, loading)

  if (!gradesOf(curriculum).includes(grade))
    return <Navigate to={curriculumPath(curriculum.subject, {})} replace />
  // A specific's code (b2.1) opens its overall at it
  if (!overall && code.includes('.'))
    return (
      <Navigate
        to={`${curriculumPath(curriculum.subject, { grade })}/${code.split('.')[0].toLowerCase()}#${code.toLowerCase()}`}
        replace
      />
    )
  if (!overall)
    return (
      <Navigate to={curriculumPath(curriculum.subject, { grade })} replace />
    )

  const gradePath = curriculumPath(curriculum.subject, { grade })
  const specifics = Object.entries(overall.specifics)
  // The skills strand's skills in this grade (Strand A), for the Skills tab
  const skillsStrand = skillsStrandOf(curriculum)
  const skills = Object.values(
    (skillsStrand && curriculum.grades[grade]?.[skillsStrand]) ?? {}
  ).flatMap((a) => Object.entries(a.specifics))
  const skill = (tag: string) => skills.find(([c]) => c === tag)?.[1]

  // Only the tabs that have something to show
  const tabs: ViewTab<View>[] = [
    { id: 'expectations', label: 'Expectations' },
    ...(specifics.some(([c]) => hasSupport(supports?.[c], 'concepts'))
      ? [{ id: 'concepts' as const, label: 'Key Concepts' }]
      : []),
    ...(specifics.some(
      ([c, s]) => s.examples.length || hasSupport(supports?.[c], 'examples')
    )
      ? [{ id: 'examples' as const, label: 'Examples' }]
      : []),
    ...(specifics.some(([, s]) => s.tags.length)
      ? [{ id: 'skills' as const, label: 'Skills' }]
      : []),
    ...(specifics.some(([, s]) => s.prompts.length)
      ? [{ id: 'prompts' as const, label: 'Prompts' }]
      : []),
    ...(specifics.some(([c]) => hasSupport(supports?.[c], 'tasks'))
      ? [{ id: 'tasks' as const, label: 'Sample Tasks' }]
      : []),
    ...(specifics.some(
      ([c]) => resourcesFor(curriculum.subject, grade, c).length
    )
      ? [{ id: 'resources' as const, label: 'Resources' }]
      : []),
    { id: 'compare', label: 'Compare Grades' },
  ]
  // The tab from the address, if this overall has it
  // While the supports load, a support tab in the address is kept
  const asked = search.get('view')
  const isSupport = (id: string | null): id is Support =>
    id === 'concepts' || id === 'examples' || id === 'tasks'
  const view: View =
    tabs.find((tab) => tab.id === asked)?.id ??
    (loading && isSupport(asked) ? asked : 'expectations')
  const setView = (id: View) =>
    setSearch(id === 'expectations' ? {} : { view: id }, { replace: true })
  const grades = gradesOf(curriculum)

  const item = (
    specificCode: string,
    specific: SpecificExpectation
  ): SpecificItem => {
    // Its key concepts, examples or sample tasks, on those tabs
    const own = isSupport(view) ? supports?.[specificCode] : undefined
    return {
      code: specificCode,
      // A skill is named by its topic; Gym's Strand D has a short name
      title: curriculum.strands[strand].skills
        ? specific.topic
        : specific.shortName,
      description: specific.description,
      examples: specific.examples.map((text, index) => ({
        text,
        at: specific.exampleAt?.[index] ?? specific.description.length,
      })),
      boxes:
        view === 'skills'
          ? specific.tags.map((tag) => ({
              strand: skillsStrand,
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
                  {
                    // e.g. Teacher · In role (Drama)
                    label: ['Teacher', prompt.label]
                      .filter(Boolean)
                      .join(' · '),
                    text: prompt.teacher,
                  },
                  ...prompt.students.map((text) => ({
                    label: 'Student',
                    text,
                  })),
                ],
              }))
            : undefined,
      extra:
        own && isSupport(view) && hasSupport(own, view) ? (
          <TeacherSupports
            supports={own}
            support={view}
            cards={cardsFor(curriculum, grade, specificCode)}
          />
        ) : view === 'resources' &&
          resourcesFor(curriculum.subject, grade, specificCode).length ? (
          <ResourceList
            resources={resourcesFor(
              curriculum.subject,
              grade,
              specificCode
            ).map((resource) => ({
              ...resource,
              kind: RESOURCE_TYPES[resource.type].name,
            }))}
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
    }
  }

  // Grouped by idea when the subject has them (Math), or by topic when the
  // strand has a printed list of them (Strand D)
  const byIdea: SpecificGroup[] = []
  for (const [c, s] of specifics) {
    const heading = ideaOf(curriculum, grade, c)?.name
    const last = byIdea.at(-1)
    if (last && last.heading === heading) last.items.push(item(c, s))
    else byIdea.push({ heading, items: [item(c, s)] })
  }
  const groups: SpecificGroup[] = curriculum.ideas
    ? byIdea
    : curriculum.strands[strand].topics
      ? topicsIn(curriculum, strand)
          .map((topic) => ({
            heading: topic,
            items: specifics
              .filter(([, s]) => s.topic === topic)
              .map(([c, s]) => item(c, s)),
          }))
          .filter((group) => group.items.length)
      : [{ items: specifics.map(([c, s]) => item(c, s)) }]

  const unit = unitOf(curriculum, grade, strand)

  return (
    <div data-strand={strand} className="contents">
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
        {/* The grade's unit for this strand, e.g. Light and Sound */}
        {unit && <p className="heading-card text-strand-text">{unit}</p>}
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

export default CurriculumSpecificsPage
