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
      to={`/drama/strategies/${strategy.slug}`}
      className="inline-flex items-center gap-xs whitespace-nowrap rounded-pill px-sm py-px text-xs font-medium hover:brightness-95"
      style={{ backgroundColor: colors.bg, color: colors.text }}
    >
      <span
        className="size-dot-lg rounded-pill"
        style={{ backgroundColor: colors.accent }}
      />
      {strategy.name}
    </Link>
  )
}

export default StrategyChip
