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
  // Math and Drama pass their own colours. With just an id, the badge uses
  // the strand's token colours (the badge class in index.css)
  strand: BadgeStrand | { id: string; colors?: undefined }
  // Solid uses the accent colour with white text
  solid?: boolean
  size?: 'sm' | 'lg'
}

// The strand's letter in a small rounded square
function StrandBadge({ strand, solid = false, size = 'sm' }: StrandBadgeProps) {
  if (!strand.colors) {
    return (
      <span data-strand={strand.id} className="badge">
        {strand.id}
      </span>
    )
  }

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center font-extrabold ${
        size === 'lg'
          ? 'size-badge-md rounded-badge text-sm'
          : 'size-badge-sm rounded-badge text-xs'
      }`}
      style={{
        backgroundColor: solid ? strand.colors.accent : strand.colors.bg,
        color: solid ? 'var(--color-on-primary)' : strand.colors.text,
      }}
    >
      {strand.id}
    </span>
  )
}

export default StrandBadge
