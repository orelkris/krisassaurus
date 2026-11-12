import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { StrandColors } from '@/components/ui/StrandBadge'

// What the page is about. A page can be about both (an expectation in one
// grade), but the filter picks one at a time: the grade when there is one
export interface CurriculumPick {
  grade?: number
  strand?: string
}

export interface FilterStrand {
  id: string
  name: string
  // Math and Drama pass their own colours; without them (Gym) the strand's
  // token colours from index.css are used, through data-strand
  colors?: StrandColors
}

export interface FilterLink {
  id: string
  label: string
  to: string
  isCurrent: boolean
}

// Shown under the picked strand, e.g. Math's ideas or Gym's overalls
export type FilterSubList = { kind: 'links'; links: FilterLink[] }

interface CurriculumFilterProps {
  grades: number[]
  strands: FilterStrand[]
  picked: CurriculumPick
  // How many expectations match a pick, shown at the end of each row
  count: (pick: CurriculumPick) => number
  // The page for a pick
  path: (pick: CurriculumPick) => string
  subList?: FilterSubList
  // A link to the subject's overview, above By grade
  overview?: { to: string; isCurrent: boolean }
  // A subject's own group between Overview and By grade (Drama: Strategies)
  afterOverview?: ReactNode
}

const headingClass = 'text-sm font-semibold text-fg'

const squareClass = (isPicked: boolean) =>
  `flex items-center justify-center rounded-row border py-xs text-sm transition-colors ${
    isPicked
      ? 'border-primary bg-primary text-on-primary'
      : 'border-line text-muted hover:bg-soft hover:text-fg'
  }`

interface FilterRowProps {
  to: string
  label: ReactNode
  count?: number
  isPicked: boolean
  // A strand's own colours (Math, Drama): tint when picked, and the dot
  tint?: StrandColors
  // A strand letter: the same, from the token colours. Rows with neither
  // are grey (grades)
  strandId?: string
}

// One sidebar row. The picked row is tinted, with its count at the end; the
// others turn grey across the whole row on hover
export function FilterRow({
  to,
  label,
  count,
  isPicked,
  tint,
  strandId,
}: FilterRowProps) {
  const pickedClass = tint
    ? ''
    : strandId
      ? 'bg-strand-bg text-strand-text'
      : 'bg-soft text-fg'
  return (
    <Link
      to={to}
      aria-pressed={isPicked}
      data-strand={strandId}
      className={`-mx-sm row-xs justify-between rounded-row px-sm py-xs text-sm transition-colors ${isPicked ? `font-semibold ${pickedClass}` : 'text-muted hover:bg-soft hover:text-fg'}`}
      style={
        isPicked && tint
          ? { backgroundColor: tint.bg, color: tint.text }
          : undefined
      }
    >
      <span className="row-sm">
        {tint && (
          <span
            className="size-dot shrink-0 rounded-pill"
            style={{ backgroundColor: tint.accent }}
          />
        )}
        {!tint && strandId && (
          <span className="size-dot shrink-0 rounded-pill bg-strand" />
        )}
        {label}
      </span>
      <span className={`text-xs font-normal ${isPicked ? '' : 'text-muted'}`}>
        {count}
      </span>
    </Link>
  )
}

// The picked strand's links, indented under it with a line. The current
// one is grey, like a picked grade
function SubList({ subList }: { subList: FilterSubList }) {
  return (
    <div className="mt-xs mb-xs ml-xs border-l border-line pl-sm">
      {subList.links.map((link) => (
        <Link
          key={link.id}
          to={link.to}
          aria-current={link.isCurrent ? 'page' : undefined}
          className={`block rounded-row px-sm py-xs text-sm transition-colors ${
            link.isCurrent
              ? 'bg-soft font-semibold text-fg'
              : 'text-muted hover:bg-soft hover:text-fg'
          }`}
        >
          {link.label}
        </Link>
      ))}
    </div>
  )
}

// The By grade and By strand groups of a subject's sidebar. One pick at a
// time: a grade opens its grade page, a strand its strand page, each from the
// top. Picking one drops the other. Desktop lists rows; phones show squares
// for the grades, which are easier to tap.
// Each subject adds its own groups around it (Math: Articles; Drama:
// Strategies), and the sidebar's Container spaces them all equally
function CurriculumFilter({
  grades,
  strands,
  picked,
  count,
  path,
  subList,
  overview,
  afterOverview,
}: CurriculumFilterProps) {
  // A page about a grade and a strand (e.g. an expectation) counts as its grade
  const pickedGrade = picked.grade
  const pickedStrand = picked.grade ? undefined : picked.strand
  const gradePath = (grade: number) => path({ grade })

  return (
    <>
      {overview && (
        <Link
          to={overview.to}
          aria-current={overview.isCurrent ? 'page' : undefined}
          className={`-mx-sm rounded-row px-sm py-xs ${headingClass} transition-colors ${
            overview.isCurrent ? 'bg-soft' : 'hover:bg-soft'
          }`}
        >
          Overview
        </Link>
      )}
      {afterOverview}

      <div className="col-xs">
        <p className={headingClass}>By grade</p>
        <div className="grid grid-cols-4 gap-sm pl-sm lg:hidden">
          {grades.map((grade) => (
            <Link
              key={grade}
              to={gradePath(grade)}
              aria-label={`Grade ${grade}`}
              aria-pressed={grade === pickedGrade}
              className={squareClass(grade === pickedGrade)}
            >
              {grade}
            </Link>
          ))}
        </div>
        <div className="hidden pl-sm lg:block">
          {grades.map((grade) => (
            <FilterRow
              key={grade}
              to={gradePath(grade)}
              label={`Grade ${grade}`}
              count={count({ grade })}
              isPicked={grade === pickedGrade}
            />
          ))}
        </div>
      </div>

      <div className="col-xs">
        <p className={headingClass}>By strand</p>
        <div className="pl-sm">
          {strands.map((strand) => {
            const isPicked = strand.id === pickedStrand
            return (
              <div key={strand.id}>
                <FilterRow
                  to={path({ strand: strand.id })}
                  label={strand.name}
                  count={count({ strand: strand.id })}
                  isPicked={isPicked}
                  tint={strand.colors}
                  strandId={strand.colors ? undefined : strand.id}
                />
                {isPicked && subList && <SubList subList={subList} />}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default CurriculumFilter
