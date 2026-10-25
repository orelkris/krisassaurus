import { useState } from 'react'
import { Link, useMatch } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import type { StrategyGroupId } from '@/types/drama'
import { strategyGroups } from '@/data/drama/groups'
import { getStrategy, getStrategiesInGroup, strategies } from '@/data/drama/strategies'
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
  dramaExpectationPath,
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
  `flex items-center justify-between gap-1.5 py-1 text-sm transition-colors ${
    isCurrent ? 'font-semibold text-gray-900' : 'text-gray-500 hover:text-gray-900'
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

  const {
    filter,
    strand: currentStrand,
    expectation,
  } = useDramaFilter()

  // The same grade and strand filter as Math. With a grade picked, the strand
  // opens onto its expectations in that grade; without, onto its numbers
  let subList: FilterSubList | undefined
  if (currentStrand && filter.grade) {
    subList = {
      kind: 'codes',
      groups: [
        {
          label: `${currentStrand.id} · ${currentStrand.name}`,
          codes: getDramaExpectations(filter).map((item) => {
            const isPicked = item.id === expectation?.id
            return {
              id: item.id,
              code: item.code,
              // Clicking the open expectation again goes back to its grade and strand
              to: isPicked ? dramaPath(filter) : dramaExpectationPath(item),
              isPicked,
            }
          }),
        },
      ],
    }
  } else if (currentStrand) {
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
  const [toggledGroups, setToggledGroups] = useState<Partial<Record<StrategyGroupId, boolean>>>({})
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
    <div className="lg:pr-4">
      <MobileSidebarToggle
        label="Browse Drama"
        current={currentLabel}
        isOpen={isMobileOpen}
        onToggle={() => setIsMobileOpen(!isMobileOpen)}
      />

      <div className={`${isMobileOpen ? 'block pt-3' : 'hidden'} lg:block lg:pt-0`}>
        <p className="text-label mb-1.5">Drama</p>

        <Link to="/drama" onClick={closeMobile} className={linkClass(!!overviewMatch)}>
          Overview
        </Link>

        <button
          onClick={() => setIsStrategiesOpen(!isStrategiesOpen)}
          aria-expanded={isStrategiesOpen}
          className="mt-2 flex w-full cursor-pointer items-center justify-between py-1 text-sm font-semibold text-gray-900"
        >
          Strategies
          <Chevron open={isStrategiesOpen} />
        </button>

        {isStrategiesOpen && (
          <div className="pl-2.5">
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Find a strategy"
              aria-label="Find a strategy"
              className="my-2 w-full rounded-lg border border-gray-200 px-2.5 py-1.5 text-[13px] placeholder:text-gray-400 focus:border-gray-400 focus:outline-none"
            />

            <Link
              to="/drama/strategies"
              onClick={closeMobile}
              className={linkClass(!!strategiesMatch)}
            >
              <span>
                All strategies{' '}
                <span className="text-muted font-normal">{strategies.length}</span>
              </span>
            </Link>

            {strategyGroups.map((group) => {
              const items = getStrategiesInGroup(group.id).filter(
                (strategy) => !search || strategy.name.toLowerCase().includes(search)
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
                    className="row-tight w-full cursor-pointer justify-between py-1 text-left text-[13px] text-gray-500 hover:text-gray-900"
                  >
                    <span className="row-stack">
                      <span
                        className="h-2 w-2 shrink-0 rounded-full"
                        style={{ backgroundColor: group.colors.accent }}
                      />
                      {group.name}
                      <span className="text-muted">
                        {getStrategiesInGroup(group.id).length}
                      </span>
                    </span>
                    <Chevron open={open} />
                  </button>

                  {open && (
                    <div className="mb-1.5 ml-1 border-l border-gray-200 pl-4">
                      {items.map((strategy) => (
                        <Link
                          key={strategy.slug}
                          to={`/drama/strategies/${strategy.slug}`}
                          onClick={closeMobile}
                          className={`block py-0.5 text-[13px] transition-colors ${
                            strategy.slug === currentStrategy?.slug
                              ? 'font-semibold text-gray-900'
                              : 'text-gray-500 hover:text-gray-900'
                          }`}
                        >
                          {strategy.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}

            {search && !strategies.some((s) => s.name.toLowerCase().includes(search)) && (
              <p className="py-1 text-[13px] text-gray-400">No strategy matches that.</p>
            )}
          </div>
        )}

        <div className="col-section mt-4 mb-2">
          <CurriculumFilter
            grades={dramaGrades}
            strands={dramaStrands}
            picked={{ grade: filter.grade, strand: filter.strand }}
            count={(pick) => getDramaExpectations(toFilter(pick)).length}
            path={(pick) =>
              dramaPath({
                ...toFilter(pick),
                // Unpicking the grade of an expectation keeps its number open
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
          className="mt-2 flex w-full cursor-pointer items-center justify-between py-1 text-sm font-semibold text-gray-900"
        >
          Subjects
          <Chevron open={isSubjectsOpen} />
        </button>

        {isSubjectsOpen && (
          <div className="pl-2.5">
            {dramaSubjects.map((subject) => (
              <Link
                key={subject.slug}
                to={`/drama/subjects/${subject.slug}`}
                onClick={closeMobile}
                className={linkClass(subject.slug === currentSubject?.slug)}
              >
                {subject.name}
                <span className="text-muted font-normal">soon</span>
              </Link>
            ))}
          </div>
        )}

        {curriculumDocuments.length > 0 && (
          <>
            <p className="mt-3 py-1 text-sm font-semibold text-gray-900">Curriculum</p>
            <div className="pl-2.5">
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
