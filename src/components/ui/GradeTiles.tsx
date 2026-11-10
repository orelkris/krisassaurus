import { Link } from 'react-router-dom'

export interface GradeTile {
  grade: number
  to: string
  // A small line under the grade, e.g. "9 expectations"
  meta?: string
}

interface GradeTilesProps {
  tiles: GradeTile[]
}

// One tile per grade, four across (two on phones). Each subject's Overview
// uses it for "Start with your grade"
function GradeTiles({ tiles }: GradeTilesProps) {
  return (
    <div className="grid grid-cols-2 gap-md sm:grid-cols-4">
      {tiles.map((tile) => (
        <Link key={tile.grade} to={tile.to} className="card card-hover col-xs">
          <b className="heading-card">Grade {tile.grade}</b>
          {tile.meta && <span className="text-small">{tile.meta}</span>}
        </Link>
      ))}
    </div>
  )
}

export default GradeTiles
