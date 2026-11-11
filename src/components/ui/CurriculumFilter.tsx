import type { ReactNode } from 'react'
import { X } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { StrandColors } from '@/components/ui/StrandBadge'

// What the filter has picked. Nothing picked is the subject's overview
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

export interface FilterCode {
  id: string
  // e.g. B1.1
  code: string
  to: string
  isPicked: boolean
}

export interface FilterLink {
  id: string
  label: string
  to: string
  isCurrent: boolean
}

// Shown under the picked strand. With a grade picked: its codes in that
// grade, grouped by overall (B1, B2...). Without: a list of links, e.g. Math's
// ideas
export type FilterSubList =
  | { kind: 'codes'; groups: { label: string; codes: FilterCode[] }[] }
  | { kind: 'links'; links: FilterLink[] }

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
}

const headingClass = 'text-sm font-semibold text-fg'

const squareClass = (isPicked: boolean) =>
  `flex items-center justify-center gap-xs rounded-row border py-xs text-sm transition-colors ${
    isPicked
      ? 'border-primary bg-primary text-on-primary'
      : 'border-line text-muted hover:text-fg'
  }`

// Every picked item shows an ×, so it's clear that clicking it again unpicks it
function Unpick() {
  return (
    <X strokeWidth={2.5} aria-hidden="true" className="size-icon-xs shrink-0" />
  )
}

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
  small?: boolean
}

// One sidebar row. The picked row is tinted, with its count and an × at the end
function FilterRow({
  to,
  label,
  count,
  isPicked,
  tint,
  strandId,
  small = false,
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
      className={`-mx-sm row-xs justify-between rounded-row px-sm transition-colors ${
        small ? 'py-px text-sm' : 'py-xs text-sm'
      } ${isPicked ? `font-semibold ${pickedClass}` : 'text-muted hover:text-fg'}`}
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
      <span
        className={`row-xs text-xs font-normal ${isPicked ? '' : 'text-muted'}`}
      >
        {count}
        {isPicked && <Unpick />}
      </span>
    </Link>
  )
}

interface SubListProps {
  subList: FilterSubList
  colors: StrandColors
}

// The picked strand's codes or links, indented under it with a line
function SubList({ subList, colors }: SubListProps) {
  if (subList.kind === 'links') {
    return (
      <div className="mt-1 mb-1.5 ml-1 border-l border-gray-200 pl-4">
        {subList.links.map((link) => (
          <Link
            key={link.id}
            to={link.to}
            className={`block py-0.5 text-[13px] transition-colors ${
              link.isCurrent
                ? 'font-semibold text-gray-900'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    )
  }

  return (
    <div className="mt-1 mb-1.5 ml-1 flex flex-col gap-2 border-l border-gray-200 py-1 pl-4">
      {subList.groups.map((group) => (
        <div key={group.label}>
          <p className="text-label">{group.label}</p>
          <div className="grid grid-cols-3 gap-1.5 pt-1 lg:hidden">
            {group.codes.map((item) => (
              <Link
                key={item.id}
                to={item.to}
                aria-current={item.isPicked ? 'page' : undefined}
                className={squareClass(item.isPicked)}
                style={
                  item.isPicked
                    ? {
                        backgroundColor: colors.accent,
                        borderColor: colors.accent,
                      }
                    : undefined
                }
              >
                {item.code}
                {item.isPicked && <Unpick />}
              </Link>
            ))}
          </div>
          <div className="hidden pt-0.5 lg:block">
            {group.codes.map((item) => (
              <FilterRow
                key={item.id}
                to={item.to}
                label={item.code}
                isPicked={item.isPicked}
                tint={colors}
                small
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// The By grade and By strand groups of a subject's sidebar. Pick a grade, a
// strand, or both (or the subject's Overview, when given); clicking a picked item again unpicks it and keeps the
// other. Desktop lists rows; phones show squares, which are easier to tap.
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
}: CurriculumFilterProps) {
  const gradePath = (grade: number) =>
    path({
      grade: grade === picked.grade ? undefined : grade,
      strand: picked.strand,
    })

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

      <div className="col-xs">
        <p className={headingClass}>By grade</p>
        <div className="grid grid-cols-4 gap-sm pl-sm lg:hidden">
          {grades.map((grade) => (
            <Link
              key={grade}
              to={gradePath(grade)}
              aria-label={`Grade ${grade}`}
              aria-pressed={grade === picked.grade}
              className={squareClass(grade === picked.grade)}
            >
              {grade}
              {grade === picked.grade && <Unpick />}
            </Link>
          ))}
        </div>
        <div className="hidden pl-sm lg:block">
          {grades.map((grade) => (
            <FilterRow
              key={grade}
              to={gradePath(grade)}
              label={`Grade ${grade}`}
              count={count({ grade, strand: picked.strand })}
              isPicked={grade === picked.grade}
            />
          ))}
        </div>
      </div>

      <div className="col-xs">
        <p className={headingClass}>By strand</p>
        <div className="pl-sm">
          {strands.map((strand) => {
            const isPicked = strand.id === picked.strand
            return (
              <div key={strand.id}>
                <FilterRow
                  to={path({
                    grade: picked.grade,
                    strand: isPicked ? undefined : strand.id,
                  })}
                  label={strand.name}
                  count={count({ grade: picked.grade, strand: strand.id })}
                  isPicked={isPicked}
                  tint={strand.colors}
                  strandId={strand.colors ? undefined : strand.id}
                />
                {isPicked && subList && strand.colors && (
                  <SubList subList={subList} colors={strand.colors} />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default CurriculumFilter
