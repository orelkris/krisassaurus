import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import type {
  CurriculumItem,
  Expectation,
  ExpectationDetails,
} from '@/types/math'
import Breadcrumb from '@/components/ui/Breadcrumb'
import Pill from '@/components/ui/Pill'
import CurriculumList from '@/components/math/CurriculumList'
import MathCard from '@/components/math/MathCard'
import MathText from '@/components/math/MathText'
import TaskCard from '@/components/math/TaskCard'
import WhereThisFits from '@/components/math/WhereThisFits'
import { getActivityCards } from '@/data/math/activities'
import { getConceptCards } from '@/data/math/concepts'
import {
  findExpectation,
  getIdeaOf,
  loadDetails,
} from '@/data/math/expectations'
import { getStrand } from '@/data/math/strands'
import { useEqualHeights } from '@/hooks/useEqualHeights'

const boxClass =
  'flex min-w-0 flex-col gap-2 rounded-[14px] border border-gray-200 px-[18px] py-4'
const headingClass = 'text-base font-bold text-gray-900'
const labelClass = 'text-xs font-semibold uppercase tracking-wide text-gray-400'
const cardGridClass =
  'grid grid-cols-1 items-start gap-3 min-[900px]:grid-cols-2'

const flatten = (items: CurriculumItem[]): string =>
  items
    .map((item) => [item.text, flatten(item.items)].filter(Boolean).join(' '))
    .join(' ')

// The teacher supports load per grade; they reset whenever the expectation changes
function useDetails(expectation: Expectation | undefined) {
  const [loaded, setLoaded] = useState<{
    id: string
    details?: ExpectationDetails
  }>()

  useEffect(() => {
    if (!expectation) return
    let isCurrent = true
    loadDetails(expectation).then((details) => {
      if (isCurrent) setLoaded({ id: expectation.id, details })
    })
    return () => {
      isCurrent = false
    }
  }, [expectation])

  return loaded && loaded.id === expectation?.id ? loaded.details : undefined
}

function ExpectationPage() {
  const { grade = '', code = '' } = useParams<{ grade: string; code: string }>()
  const expectation = findExpectation(Number(grade), code)
  const details = useDetails(expectation)

  // Concept cards all share the tallest card's height; activities match per row
  const conceptsRef = useRef<HTMLDivElement>(null)
  const activitiesRef = useRef<HTMLDivElement>(null)
  useEqualHeights(conceptsRef, '.math-card', {}, [details])
  useEqualHeights(activitiesRef, '.math-card', { perRow: true }, [details])

  if (!expectation) return <Navigate to="/blog/math" replace />

  const strand = getStrand(expectation.strand)
  const idea = getIdeaOf(expectation)
  const concepts = getConceptCards(expectation.id)
  const activities = getActivityCards(expectation.id)

  return (
    <div className="flex flex-col gap-7">
      <header className="flex flex-col gap-3">
        <Breadcrumb
          className="text-gray-900"
          items={[
            { label: 'Math', to: '/blog/math' },
            {
              label: `Grade ${expectation.grade}`,
              to: `/blog/math/grade/${expectation.grade}`,
            },
            {
              label: strand.name,
              to: `/blog/math/strand/${strand.slug}${idea ? `?idea=${idea.id}` : ''}`,
            },
            { label: expectation.code },
          ]}
        />
        <div className="flex flex-wrap gap-1.5">
          <Pill colors={strand.colors}>{strand.name}</Pill>
          {idea && <Pill>{idea.name}</Pill>}
        </div>
        <h1 className="text-3xl font-bold text-gray-900">
          Grade {expectation.grade} · {expectation.code}
        </h1>
        <p
          className="border-l-4 py-1 pl-4 text-xl leading-snug font-semibold text-gray-900"
          style={{ borderColor: strand.colors.accent }}
        >
          <MathText text={expectation.text} />
        </p>
        <p className="flex flex-wrap gap-x-3.5 gap-y-1 text-[12.5px] text-gray-400">
          <span>Official wording, Ontario curriculum (2020)</span>
          <Link
            to="/resources/documents/mathematics-1-8"
            className="text-gray-500 underline underline-offset-[3px] hover:text-gray-900"
          >
            Curriculum PDF, page {expectation.page}
          </Link>
        </p>
      </header>

      <section className="flex flex-col gap-2.5">
        <span className={labelClass}>Where this fits</span>
        <WhereThisFits expectation={expectation} />
      </section>

      {details && concepts && (
        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-bold text-gray-900">
            Key concepts{' '}
            <span className="text-[12.5px] font-normal text-gray-400">
              {concepts.length}
            </span>
          </h2>
          <div ref={conceptsRef} className={cardGridClass}>
            {concepts.map((card, index) => (
              <MathCard
                key={card.title}
                title={`${String(index + 1).padStart(2, '0')} · ${card.title}`}
                summary={card.summary}
                body={card.body}
                blocks={card.blocks}
                original={
                  details.keyConcepts[index] &&
                  flatten([details.keyConcepts[index]])
                }
              />
            ))}
          </div>
        </section>
      )}
      {details && !concepts && details.keyConcepts.length > 0 && (
        <section className={boxClass}>
          <h2 className={headingClass}>Key concepts</h2>
          <CurriculumList items={details.keyConcepts} />
        </section>
      )}

      {details && details.examples.length > 0 && (
        <section className={boxClass}>
          <h2 className={headingClass}>Examples</h2>
          <CurriculumList items={details.examples} />
        </section>
      )}

      {details && details.tasks.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-bold text-gray-900">
            Sample tasks{' '}
            <span className="text-[12.5px] font-normal text-gray-400">
              {details.tasks.length}
            </span>
          </h2>
          {details.tools.length > 0 && (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className={labelClass}>Tools in these tasks</span>
              <div className="flex flex-wrap gap-1.5">
                {details.tools.map((tool) => (
                  <Pill key={tool}>{tool}</Pill>
                ))}
              </div>
            </div>
          )}
          {activities ? (
            <div ref={activitiesRef} className={cardGridClass}>
              {activities.map((card, index) => {
                const task = details.tasks[index]
                return (
                  <MathCard
                    key={card.title}
                    eyebrow={`Activity ${String(index + 1).padStart(2, '0')}`}
                    eyebrowColor={strand.colors.text}
                    title={card.title}
                    summary={card.summary}
                    blocks={card.blocks}
                    divided
                    wide={card.wide}
                    original={
                      task &&
                      [task.text, ...task.items, task.after ?? ''].join(' ')
                    }
                  />
                )
              })}
            </div>
          ) : (
            details.tasks.map((task, index) => (
              <TaskCard
                key={index}
                task={task}
                number={index + 1}
                color={strand.colors.text}
              />
            ))
          )}
        </section>
      )}

      {details && (
        <p className="text-[12.5px] text-gray-400">
          Text from the curriculum, PDF page {expectation.page}. Diagrams are
          only in the PDF.
        </p>
      )}
    </div>
  )
}

export default ExpectationPage
