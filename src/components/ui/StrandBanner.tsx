import StrandBadge, { type BadgeStrand } from '@/components/ui/StrandBadge'

interface StrandBannerProps {
  strand: BadgeStrand & { name: string }
  // How many expectations follow, shown on the right
  count?: number
}

// A strand's heading on a grade page: a tinted bar with the solid badge, the
// strand's name and how many expectations follow
function StrandBanner({ strand, count }: StrandBannerProps) {
  return (
    <div
      className="row-stack pad-sm rounded-xl"
      style={{ backgroundColor: strand.colors.bg, color: strand.colors.text }}
    >
      <StrandBadge strand={strand} solid />
      <h2 className="heading-section">{strand.name}</h2>
      {count !== undefined && (
        <span className="ml-auto text-[12.5px] opacity-80">{count}</span>
      )}
    </div>
  )
}

export default StrandBanner
