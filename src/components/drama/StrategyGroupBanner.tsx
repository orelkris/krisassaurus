import Banner from '@/components/ui/Banner'
import StrandBadge from '@/components/ui/StrandBadge'
import type { StrategyGroup } from '@/types/drama'

interface StrategyGroupBannerProps {
  group: StrategyGroup
  count: number
}

// A strategy family's heading: its letter, name, blurb and how many
// strategies follow
function StrategyGroupBanner({ group, count }: StrategyGroupBannerProps) {
  return (
    <Banner
      colors={group.colors}
      start={
        <StrandBadge strand={{ id: group.code, colors: group.colors }} solid />
      }
      title={group.name}
      description={group.blurb}
      count={`${count} strategies`}
    />
  )
}

export default StrategyGroupBanner
