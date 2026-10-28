import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import type { DramaDetails, DramaExpectation } from '@/types/drama'
import PageHeader from '@/components/layout/PageHeader'
import CurriculumBreadcrumb from '@/components/ui/CurriculumBreadcrumb'
import FramedGroup from '@/components/ui/FramedGroup'
import Pill from '@/components/ui/Pill'
import StickyBar from '@/components/ui/StickyBar'
import WhereThisFits from '@/components/ui/WhereThisFits'
import {
  dramaPath,
  dramaWhereThisFits,
  findDramaExpectation,
  loadDramaDetails,
} from '@/data/drama/curriculum/expectations'
import {
  dramaGradePages,
  dramaTopics,
  getDramaStrand,
} from '@/data/drama/curriculum/strands'

const listClass = 'flex list-disc flex-col gap-1.5 pl-[18px] text-sm'

const capitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1)

// The examples and prompts load separately; they reset whenever the
// expectation changes
function useDetails(expectation: DramaExpectation | undefined) {
  const [loaded, setLoaded] = useState<{ id: string; details?: DramaDetails }>()

  useEffect(() => {
    if (!expectation) return
    let isCurrent = true
    loadDramaDetails(expectation).then((details) => {
      if (isCurrent) setLoaded({ id: expectation.id, details })
    })
    return () => {
      isCurrent = false
    }
  }, [expectation])

  return loaded && loaded.id === expectation?.id ? loaded.details : undefined
}

// One expectation, laid out like Math's ExpectationPage: official wording,
// where it fits, then the curriculum's examples and teacher prompts
function DramaExpectationPage() {
  const { grade = '', code = '' } = useParams<{ grade: string; code: string }>()
  const expectation = findDramaExpectation(Number(grade), code)
  const details = useDetails(expectation)

  // An unknown code goes back to its grade
  if (!expectation) {
    const gradeNumber = Number(grade)
    const isGrade =
      Number.isInteger(gradeNumber) && gradeNumber >= 1 && gradeNumber <= 8
    return (
      <Navigate
        to={dramaPath({ grade: isGrade ? gradeNumber : undefined })}
        replace
      />
    )
  }

  const strand = getDramaStrand(expectation.strand)
  const page = dramaGradePages[expectation.grade]

  return (
    <>
      <PageHeader
        above={
          <>
            <CurriculumBreadcrumb
              subject="Drama"
              grade={expectation.grade}
              strand={strand.name}
              code={expectation.code}
              className="hidden lg:block"
            />
            <div className="row-stack flex-wrap">
              <Pill colors={strand.colors}>{strand.name}</Pill>
              <Pill>{dramaTopics[expectation.code]}</Pill>
            </div>
          </>
        }
        title={`Grade ${expectation.grade} · ${expectation.code}`}
        meta={
          <>
            <span>Official wording, Ontario curriculum (2009)</span>
            <Link
              to="/resources/documents/the-arts-1-8"
              className="text-gray-500 underline underline-offset-[3px] hover:text-gray-900"
            >
              Curriculum PDF, page {page}
            </Link>
          </>
        }
      >
        <p
          className="border-l-4 py-1 pl-4 text-xl leading-snug font-semibold text-gray-900"
          style={{ borderColor: strand.colors.accent }}
        >
          {capitalize(expectation.text)}
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
          <WhereThisFits
            columns={dramaWhereThisFits(expectation)}
            currentId={expectation.id}
            colors={strand.colors}
          />
        </section>

        {details && details.examples.length > 0 && (
          <FramedGroup label="Examples" tone={strand.colors}>
            <ul className={listClass}>
              {details.examples.map((example) => (
                <li key={example}>{capitalize(example)}</li>
              ))}
            </ul>
          </FramedGroup>
        )}

        {details && details.prompts.length > 0 && (
          <FramedGroup
            label={`Teacher prompts · ${details.prompts.length}`}
            tone={strand.colors}
          >
            <ul className={listClass}>
              {details.prompts.map((prompt) => (
                <li key={prompt.text}>
                  {prompt.label && (
                    <span className="mr-1.5">
                      <Pill>{prompt.label}</Pill>
                    </span>
                  )}
                  “{prompt.text}”
                </li>
              ))}
            </ul>
          </FramedGroup>
        )}

        {details && (
          <p className="text-muted">
            Text from the curriculum, starting on PDF page {page}.
          </p>
        )}
      </section>
    </>
  )
}

export default DramaExpectationPage
