import { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import Breadcrumb from '@/components/ui/Breadcrumb'
import BackToTopButton from '@/components/ui/BackToTop'
import SectionTabs from '@/components/ui/SectionTabs'
import StrategyTile from '@/components/drama/StrategyTile'
import { strategyGroups } from '@/data/drama/groups'
import { getStrategiesInGroup, strategies } from '@/data/drama/strategies'
import { useScrollSpy } from '@/hooks/useScrollSpy'

function StrategiesPage() {
  const { hash } = useLocation()
  // One tab per colour family; each tab jumps to the section with the same id
  const tabs = useMemo(
    () =>
      strategyGroups.map((group) => ({
        id: group.id,
        label: group.name,
        color: group.colors.accent,
      })),
    []
  )
  const groupIds = useMemo<string[]>(() => tabs.map((tab) => tab.id), [tabs])
  const { activeId, jumpTo } = useScrollSpy(groupIds)

  // Links like /drama/strategies#tableaux open at that group
  useEffect(() => {
    const id = hash.slice(1)
    if (!groupIds.includes(id)) return
    const frame = requestAnimationFrame(() => jumpTo(id, 'auto'))
    return () => cancelAnimationFrame(frame)
  }, [hash, groupIds, jumpTo])

  return (
    <div className="col-page">
      <header className="col-stack">
        <Breadcrumb
          className="text-gray-900"
          items={[{ label: 'Drama' }, { label: 'Strategies' }]}
        />
        <h1 className="heading-page">Strategies</h1>
        <p className="text-lead">
          Every strategy, grouped by the five colour families. Each one opens a
          page with steps, an example and variations.
        </p>
        <p className="text-muted">{strategies.length} strategies</p>
      </header>

      <SectionTabs
        tabs={tabs}
        activeId={activeId}
        onSelect={jumpTo}
        label="Jump to a group"
      />

      {strategyGroups.map((group) => {
        const items = getStrategiesInGroup(group.id)
        return (
          <section key={group.id} id={group.id} className="col-section scroll-mt-16">
            <div
              className="flex items-center gap-3.5 rounded-xl border-l-[6px] pad-md"
              style={{
                backgroundColor: group.colors.bg,
                color: group.colors.text,
                borderLeftColor: group.colors.accent,
              }}
            >
              <div className="min-w-0 flex-1">
                <h2 className="heading-section">{group.name}</h2>
                <p className="mt-tight text-sm opacity-85">{group.blurb}</p>
              </div>
              <span className="shrink-0 text-[13px] font-medium opacity-80">
                {items.length} strategies
              </span>
            </div>

            <div className="grid grid-cols-1 gap-grid sm:grid-cols-2 xl:grid-cols-3">
              {items.map((strategy) => (
                <StrategyTile key={strategy.slug} strategy={strategy} />
              ))}
            </div>
          </section>
        )
      })}

      <BackToTopButton />
    </div>
  )
}

export default StrategiesPage