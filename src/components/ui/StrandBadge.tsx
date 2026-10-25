export interface StrandColors {
  // Light tint, dark text on it, and the strong colour for dots and squares
  bg: string
  text: string
  accent: string
}

export interface BadgeStrand {
  // The letter or code shown, e.g. B
  id: string
  colors: StrandColors
}

interface StrandBadgeProps {
  strand: BadgeStrand
  // Solid uses the accent colour with white text
  solid?: boolean
  size?: 'sm' | 'lg'
}

// The strand's letter in a small rounded square
function StrandBadge({ strand, solid = false, size = 'sm' }: StrandBadgeProps) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center font-extrabold ${
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
