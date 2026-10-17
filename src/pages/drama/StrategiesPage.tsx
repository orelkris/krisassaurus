import { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import Breadcrumb from '@/components/ui/Breadcrumb'
import BackToTopButton from '@/components/ui/BackToTopButton'
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

  // Links like /blog/drama/strategies#tableaux open at that group
  useEffect(() => {
    const id = hash.slice(1)
    if (!groupIds.includes(id)) return
    const frame = requestAnimationFrame(() => jumpTo(id, 'auto'))
    return () => cancelAnimationFrame(frame)
  }, [hash, groupIds, jumpTo])

  return (
    <div className="flex flex-col gap-7">
      <header className="flex flex-col gap-2">
        <Breadcrumb
          className="text-gray-900"
          items={[{ label: 'Drama', to: '/blog/drama' }, { label: 'Strategies' }]}
        />
        <h1 className="text-3xl font-bold text-gray-900">Strategies</h1>
        <p className="max-w-prose text-gray-500 leading-relaxed">
          Every strategy, grouped by the five colour families. Each one opens a
          page with steps, an example and variations.
        </p>
        <p className="text-xs text-gray-400">{strategies.length} strategies</p>
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
          <section key={group.id} id={group.id} className="flex scroll-mt-16 flex-col gap-3.5">
            <div
              className="flex items-center gap-3.5 rounded-xl border-l-[6px] px-5 py-4"
              style={{
                backgroundColor: group.colors.bg,
                color: group.colors.text,
                borderLeftColor: group.colors.accent,
              }}
            >
              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold leading-tight">{group.name}</h2>
                <p className="mt-0.5 text-sm opacity-85">{group.blurb}</p>
              </div>
              <span className="shrink-0 text-[13px] font-medium opacity-80">
                {items.length} strategies
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
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
