import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'

interface LinkTileProps {
  to: string
  title: string
  text?: string
  // The dot before the title, also the border colour on hover
  color: string
}

// A small clickable card: a coloured dot, a title and a short line of text
function LinkTile({ to, title, text, color }: LinkTileProps) {
  return (
    <Link
      to={to}
      // --accent lets the hover border use the colour
      style={{ '--accent': color } as CSSProperties}
      className="flex items-start gap-3 rounded-[10px] border border-gray-200 px-3.5 py-3 transition-colors hover:border-(--accent) hover:bg-gray-50"
    >
      <span
        className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span>
        <span className="block text-sm font-semibold text-gray-900">
          {title}
        </span>
        {text && (
          <span className="mt-0.5 block text-[12.5px] leading-snug text-gray-500">
            {text}
          </span>
        )}
      </span>
    </Link>
  )
}

export default LinkTile
