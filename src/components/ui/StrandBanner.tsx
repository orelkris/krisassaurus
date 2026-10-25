import Banner from '@/components/ui/Banner'
import StrandBadge, { type BadgeStrand } from '@/components/ui/StrandBadge'

interface StrandBannerProps {
  strand: BadgeStrand & { name: string }
  // How many expectations follow, shown on the right
  count?: number
}

// A strand's heading on a grade page: the solid badge, the strand's name and
// how many expectations follow
function StrandBanner({ strand, count }: StrandBannerProps) {
  return (
    <Banner
      colors={strand.colors}
      start={<StrandBadge strand={strand} solid />}
      title={strand.name}
      count={count}
    />
  )
}

export default StrandBanner
