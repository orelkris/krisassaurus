import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'

interface LinkTileProps {
  to: string
  title: string
  text?: string
  // The dot before the title, also the border colour on hover
  color: string
  // Greyed out with a dashed border, and can't be opened
  disabled?: boolean
}

// A small clickable card: a coloured dot, a title and a short line of text
function LinkTile({ to, title, text, color, disabled = false }: LinkTileProps) {
  const body = (
    <>
      <span
        className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${disabled ? 'bg-gray-200' : ''}`}
        style={disabled ? undefined : { backgroundColor: color }}
      />
      <span>
        <span
          className={`block text-sm font-semibold ${disabled ? 'text-gray-400' : 'text-gray-900'}`}
        >
          {title}
        </span>
        {text && (
          <span
            className={`mt-0.5 block text-[12.5px] leading-snug ${disabled ? 'text-gray-400' : 'text-gray-500'}`}
          >
            {text}
          </span>
        )}
      </span>
    </>
  )

  if (disabled) {
    return (
      <div
        aria-disabled="true"
        className="flex items-start gap-3 rounded-[10px] border border-dashed border-gray-200 px-3.5 py-3"
      >
        {body}
      </div>
    )
  }

  return (
    <Link
      to={to}
      // --accent lets the hover border use the colour
      style={{ '--accent': color } as CSSProperties}
      className="flex items-start gap-3 rounded-[10px] border border-gray-200 px-3.5 py-3 transition-colors hover:border-(--accent) hover:bg-gray-50"
    >
      {body}
    </Link>
  )
}

export default LinkTile
