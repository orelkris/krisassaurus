import { useState } from 'react'
import { Link, useMatch } from 'react-router-dom'
import NavChevron from '@/components/drama/NavChevron'
import { navLinkClass } from '@/lib/nav'
import type { StrategyGroupId } from '@/types/drama'
import { strategyGroups } from '@/data/drama/groups'
import { isGreyedOut } from '@/data/drama/greyedOut'
import {
  getStrategy,
  getStrategiesInGroup,
  strategies,
} from '@/data/drama/strategies'

// Drama's strategies in the sidebar, under Overview: a search box, All
// strategies, then each colour family, which opens to its strategies
function StrategiesNav() {
  const strategiesMatch = useMatch('/drama/strategies')
  const strategyMatch = useMatch('/drama/strategies/:slug')
  const currentStrategy = getStrategy(strategyMatch?.params.slug ?? '')

  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(true)
  // Only groups the reader has opened or closed are stored; the group of the
  // strategy being viewed is open by default
  const [toggledGroups, setToggledGroups] = useState<
    Partial<Record<StrategyGroupId, boolean>>
  >({})

  const search = query.trim().toLowerCase()
  const isGroupOpen = (id: StrategyGroupId) =>
    search !== '' || (toggledGroups[id] ?? currentStrategy?.groupId === id)

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="flex w-full cursor-pointer items-center justify-between py-xs text-sm font-semibold text-fg"
      >
        Strategies
        <NavChevron open={isOpen} />
      </button>

      {isOpen && (
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
            className={navLinkClass(!!strategiesMatch)}
          >
            <span>
              All strategies{' '}
              <span className="text-note font-normal">{strategies.length}</span>
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
                  <NavChevron open={open} />
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
            !strategies.some((s) => s.name.toLowerCase().includes(search)) && (
              <p className="py-xs text-sm text-faint">
                No strategy matches that.
              </p>
            )}
        </div>
      )}
    </div>
  )
}

export default StrategiesNav
