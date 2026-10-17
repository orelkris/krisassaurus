import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import type { Strategy } from '@/types/drama'
import { getGroup } from '@/data/drama/groups'

interface StrategyTileProps {
  strategy: Strategy
}

function StrategyTile({ strategy }: StrategyTileProps) {
  const { colors } = getGroup(strategy.groupId)

  return (
    <Link
      to={`/blog/drama/strategies/${strategy.slug}`}
      // --accent lets the hover border use the group's colour
      style={{ '--accent': colors.accent } as CSSProperties}
      className="flex items-start gap-3 rounded-[10px] border border-gray-200 px-3.5 py-3 transition-colors hover:bg-gray-50 hover:border-(--accent)"
    >
      <span
        className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
        style={{ backgroundColor: colors.accent }}
      />
      <span>
        <span className="block text-sm font-semibold text-gray-900">
          {strategy.name}
        </span>
        <span className="mt-0.5 block text-[12.5px] leading-snug text-gray-500">
          {strategy.summary}
        </span>
      </span>
    </Link>
  )
}

export default StrategyTile
