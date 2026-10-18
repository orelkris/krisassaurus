import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import type {
  CurriculumItem,
  Expectation,
  ExpectationDetails,
} from '@/types/math'
import FramedGroup from '@/components/ui/FramedGroup'
import Pill from '@/components/ui/Pill'
import StickyBar from '@/components/ui/StickyBar'
import PageHeader from '@/components/layout/PageHeader'
import MathBreadcrumb from '@/components/math/MathBreadcrumb'
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
  mathPath,
} from '@/data/math/expectations'
import { getStrand } from '@/data/math/strands'
import { useEqualHeights } from '@/hooks/useEqualHeights'

const cardGridClass =
  'grid grid-cols-1 items-start gap-grid min-[900px]:grid-cols-2'

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

  // An unknown code goes back to its grade, e.g. /grade/6/strand
  if (!expectation) {
    const gradeNumber = Number(grade)
    const isGrade =
      Number.isInteger(gradeNumber) && gradeNumber >= 1 && gradeNumber <= 8
    return (
      <Navigate
        to={mathPath({ grade: isGrade ? gradeNumber : undefined })}
        replace
      />
    )
  }

  const strand = getStrand(expectation.strand)
  const idea = getIdeaOf(expectation)
  const concepts = getConceptCards(expectation.id)
  const activities = getActivityCards(expectation.id)

  return (
    <>
      <PageHeader
        above={
          <>
            <MathBreadcrumb className="hidden lg:block" />
            <div className="row-stack flex-wrap">
              <Pill colors={strand.colors}>{strand.name}</Pill>
              {idea && <Pill>{idea.name}</Pill>}
            </div>
          </>
        }
        title={`Grade ${expectation.grade} · ${expectation.code}`}
        meta={
          <>
            <span>Official wording, Ontario curriculum (2020)</span>
            <Link
              to="/resources/documents/mathematics-1-8"
              className="text-gray-500 underline underline-offset-[3px] hover:text-gray-900"
            >
              Curriculum PDF, page {expectation.page}
            </Link>
          </>
        }
      >
        <p
          className="border-l-4 py-1 pl-4 text-xl leading-snug font-semibold text-gray-900"
          style={{ borderColor: strand.colors.accent }}
        >
          <MathText text={expectation.text} />
        </p>
      </PageHeader>

      {/* The label sticks while the rest of the page scrolls past */}
      <section className="col-page">
        <StickyBar padded>
          <h2 className="text-label">
            Grade {expectation.grade} · {strand.name} · {expectation.code}
          </h2>
        </StickyBar>

        <section className="col-section">
          <span className="text-label">Where this fits</span>
          <WhereThisFits expectation={expectation} />
        </section>

        {details && concepts && (
          <FramedGroup label={`Key concepts · ${concepts.length}`}>
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
          </FramedGroup>
        )}
        {details && !concepts && details.keyConcepts.length > 0 && (
          <FramedGroup label="Key concepts">
            <CurriculumList items={details.keyConcepts} />
          </FramedGroup>
        )}

        {details && details.examples.length > 0 && (
          <FramedGroup label="Examples">
            <CurriculumList items={details.examples} />
          </FramedGroup>
        )}

        {details && details.tasks.length > 0 && (
          <FramedGroup
            label={`Sample tasks · ${details.tasks.length}`}
            gap="section"
          >
            {details.tools.length > 0 && (
              <div className="row-stack flex-wrap">
                <span className="text-label">Tools in these tasks</span>
                {details.tools.map((tool) => (
                  <Pill key={tool}>{tool}</Pill>
                ))}
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
          </FramedGroup>
        )}

        {details && (
          <p className="text-muted">
            Text from the curriculum, PDF page {expectation.page}. Diagrams are
            only in the PDF.
          </p>
        )}
      </section>
    </>
  )
}

export default ExpectationPage
