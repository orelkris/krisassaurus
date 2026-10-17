import type { MathStrand } from '@/types/math'

interface StrandBadgeProps {
  strand: Pick<MathStrand, 'colors'> & { id: string }
  // Solid uses the accent colour with white text
  solid?: boolean
  size?: 'sm' | 'lg'
}

// The strand's letter in a small rounded square
function StrandBadge({ strand, solid = false, size = 'sm' }: StrandBadgeProps) {
  return (
    <span
      className={`inline-grid shrink-0 place-items-center font-extrabold ${
        size === 'lg'
          ? 'h-[30px] w-[30px] rounded-md text-[15px]'
          : 'h-[22px] w-[22px] rounded-md text-xs'
      }`}
      style={{
        backgroundColor: solid ? strand.colors.accent : strand.colors.bg,
        color: solid ? '#fff' : strand.colors.text,
      }}
    >
      {strand.id}
    </span>
  )
}

export default StrandBadge
