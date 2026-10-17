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
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {items.map((tile) => (
        <div
          key={tile.big}
          className={`grid min-w-0 grid-rows-subgrid content-start gap-y-[3px] rounded-xl border border-gray-200 px-3 py-2.5 ${
            onColor ? 'bg-white' : ''
          }`}
          style={{ gridRow: `span ${rows}` }}
        >
          {rows === 3 && (
            <b className="text-[12.5px] font-bold">{tile.label}</b>
          )}
          <span className="text-[14.5px] font-semibold leading-snug">
            <MathText text={tile.big} />
          </span>
          <span className="text-xs text-gray-500">
            <MathText text={tile.sub} />
          </span>
        </div>
      ))}
    </div>
  )
}

export default Tiles
