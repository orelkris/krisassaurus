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
        className={`mt-xs size-dot-lg shrink-0 rounded-pill ${disabled ? 'bg-line' : ''}`}
        style={disabled ? undefined : { backgroundColor: color }}
      />
      <span>
        <span
          className={`block text-sm font-semibold ${disabled ? 'text-faint' : 'text-fg'}`}
        >
          {title}
        </span>
        {text && (
          <span
            className={`mt-px block text-xs leading-snug ${disabled ? 'text-faint' : 'text-muted'}`}
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
        className="flex items-start gap-md rounded-row border border-dashed border-line px-md py-md"
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
      className="flex items-start gap-md rounded-row border border-line px-md py-md transition-colors hover:border-(--accent) hover:bg-soft"
    >
      {body}
    </Link>
  )
}

export default LinkTile
