import { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import PageHeader from '@/components/layout/PageHeader'
import Breadcrumb from '@/components/ui/Breadcrumb'
import LinkTile from '@/components/ui/LinkTile'
import StrandTabs from '@/components/ui/StrandTabs'
import StrategyGroupBanner from '@/components/drama/StrategyGroupBanner'
import { strategyGroups } from '@/data/drama/groups'
import { getStrategiesInGroup, strategies } from '@/data/drama/strategies'
import { useScrollSpy } from '@/hooks/useScrollSpy'

function StrategiesPage() {
  const { hash } = useLocation()
  // One tab per colour family, showing its letter; each tab jumps to the
  // section with the same id
  const tabs = useMemo(
    () =>
      strategyGroups.map((group) => ({
        id: group.id,
        strand: { id: group.code, name: group.name, colors: group.colors },
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
    <>
      <PageHeader
        above={
          <Breadcrumb
            className="text-gray-900"
            items={[{ label: 'Drama' }, { label: 'Strategies' }]}
          />
        }
        title="Strategies"
        description="Every strategy, grouped by the five colour families. Each one opens a page with steps, an example and variations."
        meta={`${strategies.length} strategies`}
      />

      <StrandTabs
        tabs={tabs}
        activeId={activeId}
        onSelect={jumpTo}
        title="Strategies"
        label="Jump to a group"
      />

      {strategyGroups.map((group) => {
        const items = getStrategiesInGroup(group.id)
        return (
          <section
            key={group.id}
            id={group.id}
            className="col-section scroll-mt-28 md:scroll-mt-16"
          >
            <StrategyGroupBanner group={group} count={items.length} />
            <div className="grid grid-cols-1 gap-grid sm:grid-cols-2 xl:grid-cols-3">
              {items.map((strategy) => (
                <LinkTile
                  key={strategy.slug}
                  to={`/drama/strategies/${strategy.slug}`}
                  title={strategy.name}
                  text={strategy.summary}
                  color={group.colors.accent}
                />
              ))}
            </div>
          </section>
        )
      })}
    </>
  )
}

export default StrategiesPage
