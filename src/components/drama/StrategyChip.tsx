import { Link } from 'react-router-dom'
import type { Strategy } from '@/types/drama'
import { getGroup } from '@/data/drama/groups'

interface StrategyChipProps {
  strategy: Strategy
}

function StrategyChip({ strategy }: StrategyChipProps) {
  const { colors } = getGroup(strategy.groupId)

  return (
    <Link
      to={`/blog/drama/strategies/${strategy.slug}`}
      className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium hover:brightness-95"
      style={{ backgroundColor: colors.bg, color: colors.text }}
    >
      <span
        className="h-2 w-2 rounded-full"
        style={{ backgroundColor: colors.accent }}
      />
      {strategy.name}
    </Link>
  )
}

export default StrategyChip
