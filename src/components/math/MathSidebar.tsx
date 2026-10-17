import { useState } from 'react'
import { Link, useMatch, useSearchParams } from 'react-router-dom'
import MobileSidebarToggle from '@/components/ui/MobileSidebarToggle'
import { mathGrades, mathStrands, getStrandBySlug } from '@/data/math/strands'
import {
  findExpectation,
  getExpectationsInStrand,
  getIdeaOf,
  getIdeasInStrand,
} from '@/data/math/expectations'

const linkClass = (isCurrent: boolean) =>
  `flex items-center justify-between gap-1.5 py-1 text-sm transition-colors ${
    isCurrent
      ? 'font-semibold text-gray-900'
      : 'text-gray-500 hover:text-gray-900'
  }`

function MathSidebar() {
  const overviewMatch = useMatch('/blog/math')
  const gradeMatch = useMatch('/blog/math/grade/:grade')
  const expectationMatch = useMatch('/blog/math/grade/:grade/:code')
  const strandMatch = useMatch('/blog/math/strand/:slug')
  const [searchParams] = useSearchParams()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const expectation = expectationMatch
    ? findExpectation(
        Number(expectationMatch.params.grade),
        expectationMatch.params.code ?? ''
      )
    : undefined
  const currentGrade = gradeMatch
    ? Number(gradeMatch.params.grade)
    : expectation?.grade
  const currentStrand = strandMatch
    ? getStrandBySlug(strandMatch.params.slug ?? '')
    : expectation &&
      mathStrands.find((strand) => strand.id === expectation.strand)
  const ideas = currentStrand ? getIdeasInStrand(currentStrand.id) : []
  // On a strand page the idea comes from ?idea=, on an expectation page from the expectation
  const currentIdeaId = expectation
    ? getIdeaOf(expectation)?.id
    : (searchParams.get('idea') ?? ideas[0]?.id)

  const currentLabel = expectation
    ? `Grade ${expectation.grade} · ${expectation.code}`
    : currentGrade
      ? `Grade ${currentGrade}`
      : currentStrand
        ? currentStrand.name
        : 'Overview'

  const closeMobile = () => setIsMobileOpen(false)

  return (
    <div className="lg:pr-4">
      <MobileSidebarToggle
        label="Browse Math"
        current={currentLabel}
        isOpen={isMobileOpen}
        onToggle={() => setIsMobileOpen(!isMobileOpen)}
      />

      <div
        className={`${isMobileOpen ? 'block pt-3' : 'hidden'} lg:block lg:pt-0`}
      >
        <p className="mb-1.5 text-xs uppercase tracking-wide text-gray-400">
          Math
        </p>

        <Link
          to="/blog/math"
          onClick={closeMobile}
          className={linkClass(!!overviewMatch)}
        >
          Overview
        </Link>

        <p className="mt-2 py-1 text-sm font-semibold text-gray-900">
          By grade
        </p>
        <div className="grid grid-cols-4 gap-1.5 pt-1.5 pb-1 pl-2.5">
          {mathGrades.map((grade) => {
            const isCurrent = grade === currentGrade
            return (
              <Link
                key={grade}
                to={`/blog/math/grade/${grade}`}
                onClick={closeMobile}
                aria-label={`Grade ${grade}`}
                aria-current={isCurrent ? 'page' : undefined}
                className={`rounded-lg border py-1 text-center text-[13px] transition-colors ${
                  isCurrent
                    ? 'border-gray-900 bg-gray-900 text-white'
                    : 'border-gray-200 text-gray-500 hover:text-gray-900'
                }`}
              >
                {grade}
              </Link>
            )
          })}
        </div>

        <p className="mt-2 py-1 text-sm font-semibold text-gray-900">
          By strand
        </p>
        <div className="pl-2.5">
          {mathStrands.map((strand) => {
            const isCurrent = strand.id === currentStrand?.id
            return (
              <div key={strand.id}>
                <Link
                  to={`/blog/math/strand/${strand.slug}`}
                  onClick={closeMobile}
                  className={linkClass(isCurrent)}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: strand.colors.accent }}
                    />
                    {strand.name}
                  </span>
                  <span className="text-xs font-normal text-gray-400">
                    {getExpectationsInStrand(strand.id).length}
                  </span>
                </Link>

                {isCurrent && (
                  <div className="mb-1.5 ml-1 border-l border-gray-200 pl-4">
                    {ideas.map((idea) => (
                      <Link
                        key={idea.id}
                        to={`/blog/math/strand/${strand.slug}?idea=${idea.id}`}
                        onClick={closeMobile}
                        className={`block py-0.5 text-[13px] transition-colors ${
                          idea.id === currentIdeaId
                            ? 'font-semibold text-gray-900'
                            : 'text-gray-500 hover:text-gray-900'
                        }`}
                      >
                        {idea.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <p className="mt-2 flex items-center justify-between py-1 text-sm font-semibold text-gray-900">
          Articles
          <span className="text-xs font-normal text-gray-400">soon</span>
        </p>
      </div>
    </div>
  )
}

export default MathSidebar
