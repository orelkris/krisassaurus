import { useMemo } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionTabs from '@/components/ui/SectionTabs'
import ExpectationRow from '@/components/math/ExpectationRow'
import StrandBadge from '@/components/math/StrandBadge'
import { getExpectationsInGrade } from '@/data/math/expectations'
import { mathStrands } from '@/data/math/strands'
import { useScrollSpy } from '@/hooks/useScrollSpy'

const buttonClass =
  'self-start rounded-full border border-gray-200 px-4 py-2 text-[13px] font-semibold text-gray-900 hover:bg-gray-50'

function GradePage() {
  const grade = Number(useParams<{ grade: string }>().grade)
  const isGrade = Number.isInteger(grade) && grade >= 1 && grade <= 8
  const list = useMemo(
    () => (isGrade ? getExpectationsInGrade(grade) : []),
    [isGrade, grade]
  )

  // One tab per strand; each tab jumps to the strand's section
  const tabs = useMemo(
    () =>
      mathStrands.map((strand) => ({
        id: `strand-${strand.slug}`,
        label: `${strand.name} · ${list.filter((e) => e.strand === strand.id).length}`,
        color: strand.colors.accent,
      })),
    [list]
  )
  const sectionIds = useMemo(() => tabs.map((tab) => tab.id), [tabs])
  const { activeId, jumpTo } = useScrollSpy(sectionIds)

  if (!isGrade) return <Navigate to="/blog/math" replace />

  return (
    <div className="flex flex-col gap-7">
      <header className="flex flex-col gap-2">
        <Breadcrumb
          className="text-gray-900"
          items={[
            { label: 'Math', to: '/blog/math' },
            { label: `Grade ${grade}` },
          ]}
        />
        <h1 className="text-3xl font-bold text-gray-900">Grade {grade} Math</h1>
        <p className="max-w-prose leading-relaxed text-gray-500">
          All {list.length} expectations for Grade {grade}, in plain lists. You
          don’t have to teach them in this order, and many can be taught
          together.
        </p>
      </header>

      <SectionTabs
        tabs={tabs}
        activeId={activeId}
        onSelect={jumpTo}
        label="Jump to a strand"
      />

      {mathStrands.map((strand) => {
        const items = list.filter(
          (expectation) => expectation.strand === strand.id
        )
        const overalls = [
          ...new Set(items.map((expectation) => expectation.overall)),
        ]

        return (
          <section
            key={strand.id}
            id={`strand-${strand.slug}`}
            className="flex scroll-mt-16 flex-col gap-2.5"
          >
            <div
              className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5"
              style={{
                backgroundColor: strand.colors.bg,
                color: strand.colors.text,
              }}
            >
              <StrandBadge strand={strand} solid />
              <h2 className="text-base font-bold">{strand.name}</h2>
              <span className="ml-auto text-[12.5px] opacity-80">
                {items.length}
              </span>
            </div>

            {/* A divider separates each overall expectation (B1, B2...) */}
            <div className="flex flex-col divide-y divide-gray-200">
              {overalls.map((overall) => {
                const group = items.filter(
                  (expectation) => expectation.overall === overall
                )
                return (
                  <div
                    key={overall}
                    className="flex flex-col gap-1 py-3 first:pt-1.5"
                  >
                    <p className="ml-0.5 text-xs uppercase tracking-wide text-gray-400">
                      {overall} · {group[0].overallTitle}
                    </p>
                    {group.map((expectation) => (
                      <ExpectationRow
                        key={expectation.id}
                        expectation={expectation}
                      />
                    ))}
                  </div>
                )
              })}
            </div>

            <Link
              to={`/blog/math/strand/${strand.slug}`}
              className={buttonClass}
            >
              See {strand.name} across all grades →
            </Link>
          </section>
        )
      })}

      <nav className="flex flex-wrap gap-2.5">
        {grade > 1 && (
          <Link to={`/blog/math/grade/${grade - 1}`} className={buttonClass}>
            ← Grade {grade - 1}
          </Link>
        )}
        {grade < 8 && (
          <Link to={`/blog/math/grade/${grade + 1}`} className={buttonClass}>
            Grade {grade + 1} →
          </Link>
        )}
      </nav>
    </div>
  )
}

export default GradePage
