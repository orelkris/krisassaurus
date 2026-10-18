import type { ReactNode } from 'react'
import { X } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Expectation, MathStrand } from '@/types/math'
import MathBreadcrumb from '@/components/math/MathBreadcrumb'
import { mathGrades, mathStrands } from '@/data/math/strands'
import {
  expectationPath,
  getExpectations,
  getIdeasInStrand,
  groupByOverall,
  mathPath,
} from '@/data/math/expectations'
import { useMathFilter } from '@/hooks/useMathFilter'

const headingClass = 'text-sm font-semibold text-gray-900'

const squareClass = (isPicked: boolean) =>
  `flex items-center justify-center gap-1 rounded-lg border py-1.5 text-[13px] transition-colors ${
    isPicked
      ? 'border-gray-900 bg-gray-900 text-white'
      : 'border-gray-200 text-gray-500 hover:text-gray-900'
  }`

// Grey for grades; a strand and its expectations use the strand's colours
const greyTint = { bg: '#F3F4F6', text: '#111827', accent: '#111827' }

// Every picked item shows an ×, so it's clear that clicking it again unpicks it
function Unpick() {
  return (
    <X size={12} strokeWidth={2.5} aria-hidden="true" className="shrink-0" />
  )
}

interface FilterRowProps {
  to: string
  label: ReactNode
  count?: number
  isPicked: boolean
  tint?: MathStrand['colors']
  // A coloured dot before the label
  dot?: string
  small?: boolean
}

// One sidebar row. The picked row is tinted, with its count and an × at the end
function FilterRow({
  to,
  label,
  count,
  isPicked,
  tint = greyTint,
  dot,
  small = false,
}: FilterRowProps) {
  return (
    <Link
      to={to}
      aria-pressed={isPicked}
      className={`-mx-2 row-tight justify-between rounded-lg px-2 transition-colors ${
        small ? 'py-0.5 text-[13px]' : 'py-1 text-sm'
      } ${isPicked ? 'font-semibold' : 'text-gray-500 hover:text-gray-900'}`}
      style={
        isPicked ? { backgroundColor: tint.bg, color: tint.text } : undefined
      }
    >
      <span className="row-stack">
        {dot && (
          <span
            className={`shrink-0 rounded-full ${small ? 'h-1.5 w-1.5' : 'h-2 w-2'}`}
            style={{ backgroundColor: dot }}
          />
        )}
        {label}
      </span>
      <span
        className={`row-tight text-xs font-normal ${
          isPicked ? '' : 'text-gray-400'
        }`}
      >
        {count}
        {isPicked && <Unpick />}
      </span>
    </Link>
  )
}

// The sidebar is a filter: pick a grade, a strand, an expectation, or none.
// Clicking a picked item again unpicks it and keeps the rest.
// Desktop lists rows; phones show squares, which are easier to tap. The
// sidebar's Container spaces the groups (Math, By grade, By strand, Articles)
function MathSidebar() {
  const { filter, strand: currentStrand, expectation } = useMathFilter()
  const { grade: currentGrade } = filter

  const ideas = currentStrand ? getIdeasInStrand(currentStrand.id) : []
  const currentIdeaId = filter.idea ?? ideas[0]?.id
  // With a grade picked, the strand opens onto its expectations in that grade
  const groups =
    currentGrade && currentStrand ? groupByOverall(getExpectations(filter)) : []

  // Unpicking the grade of an expectation keeps its idea open on the strand page
  const gradePath = (grade: number) =>
    grade === currentGrade
      ? mathPath({ strand: filter.strand, idea: filter.idea })
      : mathPath({ grade, strand: filter.strand })
  // Clicking the open expectation again goes back to its grade and strand
  const codePath = (item: Expectation) =>
    item.id === expectation?.id ? mathPath(filter) : expectationPath(item)

  return (
    <>
      {/* On phones the sidebar sits above the page, so the breadcrumb leads */}
      <MathBreadcrumb className="lg:hidden" />

      <div className="col-tight">
        <p className="text-label">Math</p>

        <Link
          to={mathPath({})}
          className={`block py-1 text-sm transition-colors ${
            !currentGrade && !currentStrand
              ? 'font-semibold text-gray-900'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          Overview
        </Link>
      </div>

      <div className="col-tight">
        <p className={headingClass}>By grade</p>
        <div className="grid grid-cols-4 gap-1.5 pl-2.5 lg:hidden">
          {mathGrades.map((grade) => (
            <Link
              key={grade}
              to={gradePath(grade)}
              aria-label={`Grade ${grade}`}
              aria-pressed={grade === currentGrade}
              className={squareClass(grade === currentGrade)}
            >
              {grade}
              {grade === currentGrade && <Unpick />}
            </Link>
          ))}
        </div>
        <div className="hidden pl-2.5 lg:block">
          {mathGrades.map((grade) => (
            <FilterRow
              key={grade}
              to={gradePath(grade)}
              label={`Grade ${grade}`}
              count={getExpectations({ grade, strand: filter.strand }).length}
              isPicked={grade === currentGrade}
            />
          ))}
        </div>
      </div>

      <div className="col-tight">
        <p className={headingClass}>By strand</p>
        <div className="pl-2.5">
          {mathStrands.map((strand) => {
            const isCurrent = strand.id === currentStrand?.id
            return (
              <div key={strand.id}>
                <FilterRow
                  to={mathPath({
                    grade: currentGrade,
                    strand: isCurrent ? undefined : strand.id,
                  })}
                  label={strand.name}
                  count={
                    getExpectations({ grade: currentGrade, strand: strand.id })
                      .length
                  }
                  isPicked={isCurrent}
                  tint={strand.colors}
                  dot={strand.colors.accent}
                />

                {isCurrent && currentGrade && (
                  <div className="mt-1 mb-1.5 ml-1 flex flex-col gap-2 border-l border-gray-200 py-1 pl-4">
                    {groups.map((group) => (
                      <div key={group[0].overall}>
                        <p className="text-label">
                          {group[0].overall} · {group[0].overallTitle}
                        </p>
                        <div className="grid grid-cols-3 gap-1.5 pt-1 lg:hidden">
                          {group.map((item) => {
                            const isPicked = item.id === expectation?.id
                            return (
                              <Link
                                key={item.id}
                                to={codePath(item)}
                                aria-current={isPicked ? 'page' : undefined}
                                className={squareClass(isPicked)}
                                style={
                                  isPicked
                                    ? {
                                        backgroundColor: strand.colors.accent,
                                        borderColor: strand.colors.accent,
                                      }
                                    : undefined
                                }
                              >
                                {item.code}
                                {isPicked && <Unpick />}
                              </Link>
                            )
                          })}
                        </div>
                        <div className="hidden pt-0.5 lg:block">
                          {group.map((item) => (
                            <FilterRow
                              key={item.id}
                              to={codePath(item)}
                              label={item.code}
                              isPicked={item.id === expectation?.id}
                              tint={strand.colors}
                              dot={strand.colors.accent}
                              small
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {isCurrent && !currentGrade && (
                  <div className="mt-1 mb-1.5 ml-1 border-l border-gray-200 pl-4">
                    {ideas.map((idea) => (
                      <Link
                        key={idea.id}
                        to={mathPath({ strand: strand.id, idea: idea.id })}
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
      </div>

      <p className={`${headingClass} flex items-center justify-between`}>
        Articles
        <span className="text-muted font-normal">soon</span>
      </p>
    </>
  )
}

export default MathSidebar
