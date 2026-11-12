import { useState } from 'react'
import { Link, useMatch } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import type { StrategyGroupId } from '@/types/drama'
import { strategyGroups } from '@/data/drama/groups'
import { isGreyedOut } from '@/data/drama/greyedOut'
import {
  getStrategy,
  getStrategiesInGroup,
  strategies,
} from '@/data/drama/strategies'
import { dramaSubjects, getSubject } from '@/data/drama/subjects'
import { getLinksToPage } from '@/data/resources/documentLinks'
import { getMinistryDocument } from '@/data/resources/ministryDocuments'
import MobileSidebarToggle from '@/components/ui/MobileSidebarToggle'
import CurriculumFilter, {
  type CurriculumPick,
  type FilterSubList,
} from '@/components/ui/CurriculumFilter'
import type { DramaFilter, DramaStrandId } from '@/types/drama'
import {
  dramaPath,
  getDramaExpectations,
} from '@/data/drama/curriculum/expectations'
import {
  dramaGrades,
  dramaStrands,
  dramaTopics,
  getCodesInStrand,
} from '@/data/drama/curriculum/strands'
import { useDramaFilter } from '@/hooks/useDramaFilter'

// Ministry documents linked to the Drama page in documentLinks
const curriculumDocuments = getLinksToPage('/drama').flatMap((link) => {
  const document = getMinistryDocument(link.documentSlug)
  return document?.file ? [document] : []
})

const toFilter = ({ grade, strand }: CurriculumPick): DramaFilter => ({
  grade,
  strand: strand as DramaStrandId | undefined,
})

const linkClass = (isCurrent: boolean) =>
  `flex items-center justify-between gap-xs py-xs text-sm transition-colors ${
    isCurrent ? 'font-semibold text-fg' : 'text-muted hover:text-fg'
  }`

function Chevron({ open }: { open: boolean }) {
  return (
    <ChevronDown
      size={14}
      className={`shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
    />
  )
}

function DramaSidebar() {
  const overviewMatch = useMatch('/drama')
  const strategiesMatch = useMatch('/drama/strategies')
  const strategyMatch = useMatch('/drama/strategies/:slug')
  const subjectMatch = useMatch('/drama/subjects/:slug')

  const { filter, strand: currentStrand, expectation } = useDramaFilter()

  // The same grade or strand filter as Math. A picked strand (with no grade)
  // opens onto its numbers
  let subList: FilterSubList | undefined
  if (currentStrand && !filter.grade) {
    const codes = getCodesInStrand(currentStrand.id)
    const currentCode = filter.code ?? codes[0]
    subList = {
      kind: 'links',
      links: codes.map((code) => ({
        id: code,
        label: `${code} ${dramaTopics[code]}`,
        to: dramaPath({ strand: currentStrand.id, code }),
        isCurrent: code === currentCode,
      })),
    }
  }

  const currentStrategy = getStrategy(strategyMatch?.params.slug ?? '')
  const currentSubject = getSubject(subjectMatch?.params.slug ?? '')

  const [query, setQuery] = useState('')
  const [isStrategiesOpen, setIsStrategiesOpen] = useState(true)
  const [isSubjectsOpen, setIsSubjectsOpen] = useState(true)
  // Only groups the reader has opened or closed are stored; the group of the
  // strategy being viewed is open by default
  const [toggledGroups, setToggledGroups] = useState<
    Partial<Record<StrategyGroupId, boolean>>
  >({})
  // On phones the whole list folds into the "Browse Drama" button
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const search = query.trim().toLowerCase()
  const isGroupOpen = (id: StrategyGroupId) =>
    search !== '' || (toggledGroups[id] ?? currentStrategy?.groupId === id)

  const currentLabel = currentStrategy
    ? currentStrategy.name
    : expectation
      ? `Grade ${expectation.grade} · ${expectation.code}`
      : filter.grade || currentStrand
        ? [filter.grade && `Grade ${filter.grade}`, currentStrand?.name]
            .filter(Boolean)
            .join(' · ')
        : currentSubject
          ? `Drama & ${currentSubject.name}`
          : strategiesMatch
            ? 'Strategies'
            : 'Overview'

  const closeMobile = () => setIsMobileOpen(false)

  return (
    <div className="lg:pr-md">
      <MobileSidebarToggle
        label="Browse Drama"
        current={currentLabel}
        isOpen={isMobileOpen}
        onToggle={() => setIsMobileOpen(!isMobileOpen)}
      />

      <div
        className={`${isMobileOpen ? 'block pt-md' : 'hidden'} lg:block lg:pt-none`}
      >
        <p className="text-label mb-xs">Drama</p>

        <Link
          to="/drama"
          onClick={closeMobile}
          className={`-mx-sm block rounded-row px-sm py-xs text-sm transition-colors ${
            overviewMatch
              ? 'bg-soft font-semibold text-fg'
              : 'text-muted hover:bg-soft hover:text-fg'
          }`}
        >
          Overview
        </Link>

        <button
          onClick={() => setIsStrategiesOpen(!isStrategiesOpen)}
          aria-expanded={isStrategiesOpen}
          className="mt-sm flex w-full cursor-pointer items-center justify-between py-xs text-sm font-semibold text-fg"
        >
          Strategies
          <Chevron open={isStrategiesOpen} />
        </button>

        {isStrategiesOpen && (
          <div className="pl-sm">
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Find a strategy"
              aria-label="Find a strategy"
              className="my-sm w-full rounded-row border border-line px-sm py-xs text-sm placeholder:text-faint focus:border-faint focus:outline-none"
            />

            <Link
              to="/drama/strategies"
              onClick={closeMobile}
              className={linkClass(!!strategiesMatch)}
            >
              <span>
                All strategies{' '}
                <span className="text-note font-normal">
                  {strategies.length}
                </span>
              </span>
            </Link>

            {strategyGroups.map((group) => {
              const items = getStrategiesInGroup(group.id).filter(
                (strategy) =>
                  !search || strategy.name.toLowerCase().includes(search)
              )
              if (search && items.length === 0) return null
              const open = isGroupOpen(group.id)

              return (
                <div key={group.id}>
                  <button
                    onClick={() =>
                      setToggledGroups({ ...toggledGroups, [group.id]: !open })
                    }
                    aria-expanded={open}
                    className="row-tight w-full cursor-pointer justify-between py-xs text-left text-sm text-muted hover:text-fg"
                  >
                    <span className="row-stack">
                      <span
                        className="size-dot-lg shrink-0 rounded-pill"
                        style={{ backgroundColor: group.colors.accent }}
                      />
                      {group.name}
                      <span className="text-note">
                        {getStrategiesInGroup(group.id).length}
                      </span>
                    </span>
                    <Chevron open={open} />
                  </button>

                  {open && (
                    <div className="mb-xs ml-xs border-l border-line pl-md">
                      {items.map((strategy) =>
                        // Greyed-out strategies show in grey and can't be opened
                        isGreyedOut(strategy.slug) ? (
                          <span
                            key={strategy.slug}
                            className="block py-px text-sm text-faint"
                          >
                            {strategy.name}
                          </span>
                        ) : (
                          <Link
                            key={strategy.slug}
                            to={`/drama/strategies/${strategy.slug}`}
                            onClick={closeMobile}
                            className={`block py-px text-sm transition-colors ${
                              strategy.slug === currentStrategy?.slug
                                ? 'font-semibold text-fg'
                                : 'text-muted hover:text-fg'
                            }`}
                          >
                            {strategy.name}
                          </Link>
                        )
                      )}
                    </div>
                  )}
                </div>
              )
            })}

            {search &&
              !strategies.some((s) =>
                s.name.toLowerCase().includes(search)
              ) && (
                <p className="py-xs text-sm text-faint">
                  No strategy matches that.
                </p>
              )}
          </div>
        )}

        <div className="col-section mt-md mb-sm">
          <CurriculumFilter
            grades={dramaGrades}
            strands={dramaStrands}
            picked={{ grade: filter.grade, strand: filter.strand }}
            count={(pick) => getDramaExpectations(toFilter(pick)).length}
            path={(pick) =>
              dramaPath({
                ...toFilter(pick),
                // Going from an expectation to its strand keeps its number open
                code:
                  !pick.grade && pick.strand === filter.strand
                    ? filter.code
                    : undefined,
              })
            }
            subList={subList}
          />
        </div>

        <button
          onClick={() => setIsSubjectsOpen(!isSubjectsOpen)}
          aria-expanded={isSubjectsOpen}
          className="mt-sm flex w-full cursor-pointer items-center justify-between py-xs text-sm font-semibold text-fg"
        >
          Subjects
          <Chevron open={isSubjectsOpen} />
        </button>

        {isSubjectsOpen && (
          <div className="pl-sm">
            {dramaSubjects.map((subject) => (
              <Link
                key={subject.slug}
                to={`/drama/subjects/${subject.slug}`}
                onClick={closeMobile}
                className={linkClass(subject.slug === currentSubject?.slug)}
              >
                {subject.name}
                <span className="text-note font-normal">soon</span>
              </Link>
            ))}
          </div>
        )}

        {curriculumDocuments.length > 0 && (
          <>
            <p className="mt-md py-xs text-sm font-semibold text-fg">
              Curriculum
            </p>
            <div className="pl-sm">
              {curriculumDocuments.map((document) => (
                <Link
                  key={document.slug}
                  to={`/resources/documents/${document.slug}`}
                  onClick={closeMobile}
                  className={linkClass(false)}
                >
                  {document.shortName}
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default DramaSidebar
