import type { Tile } from '@/types/math'
import MathText from '@/components/math/MathText'

interface TilesProps {
  items: Tile[]
  // Tiles inside a coloured box get a white background
  onColor?: boolean
}

// Black and white tiles, two per row. They share row tracks (subgrid), so
// labels, main lines and notes line up across a row
function Tiles({ items, onColor = false }: TilesProps) {
  const rows = items.some((tile) => tile.label) ? 3 : 2

  return (
    <div className="grid grid-cols-1 gap-sm sm:grid-cols-2">
      {items.map((tile) => (
        <div
          key={tile.big}
          className={`grid min-w-none grid-rows-subgrid content-start gap-y-xs rounded-card border border-line px-md py-sm ${
            onColor ? 'bg-page' : ''
          }`}
          style={{ gridRow: `span ${rows}` }}
        >
          {rows === 3 && <b className="text-xs font-bold">{tile.label}</b>}
          <span className="text-sm font-semibold leading-snug">
            <MathText text={tile.big} />
          </span>
          <span className="text-xs text-muted">
            <MathText text={tile.sub} />
          </span>
        </div>
      ))}
    </div>
  )
}

export default Tiles
