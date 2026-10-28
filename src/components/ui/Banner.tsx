import type { ReactNode } from 'react'

interface BannerProps {
  // Light tint and the dark text on it
  colors: { bg: string; text: string }
  title: ReactNode
  // Before the title, e.g. a badge
  start?: ReactNode
  // A line under the title
  description?: ReactNode
  // What follows, on the right, e.g. 12 or "9 strategies"
  count?: ReactNode
}

// A tinted bar that heads a section of a page. With a description, the start
// lines up with the title; the count always sits in the middle
function Banner({ colors, title, start, description, count }: BannerProps) {
  return (
    <div
      className={`row-stack pad-sm rounded-xl ${description ? 'items-start' : ''}`}
      style={{ backgroundColor: colors.bg, color: colors.text }}
    >
      {start && (
        <span className={description ? 'flex pt-[1.5px]' : 'flex'}>
          {start}
        </span>
      )}
      <div className="min-w-0 flex-1">
        <h2 className="heading-section">{title}</h2>
        {description && <p className="text-sm opacity-85">{description}</p>}
      </div>
      {count !== undefined && (
        <span className="shrink-0 self-center text-[12.5px] opacity-80">
          {count}
        </span>
      )}
    </div>
  )
}

export default Banner
