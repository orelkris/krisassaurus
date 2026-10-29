import type { ReactNode } from 'react'

interface FigureProps {
  // Where the feet touch the ground, in the drawing's units
  x: number
  y: number
  scale?: number
  // Text on the shirt, e.g. a student's number
  label?: ReactNode
  // body: shirt and legs; line: head outline, eyes and smile
  colors: { body: string; line: string }
  // A thicker head outline in the highlight colour, e.g. while speaking
  highlight?: string
  // Seen from behind, e.g. the far line of a tunnel: a lighter body
  faded?: boolean
  // How long the legs are. Longer legs hang down, e.g. sitting on a chair
  legs?: number
}

// The cute student used in every strategy example, drawn with its feet at
// (x, y) inside an SVG. Every figure is the same height before scaling
function Figure({
  x,
  y,
  scale = 1,
  label,
  colors,
  highlight,
  faded = false,
  legs = 34,
}: FigureProps) {
  const body = { fill: colors.body, opacity: faded ? 0.85 : 1 }
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x={-15} y={-legs} width={12} height={legs} rx={6} style={body} />
      <rect x={3} y={-legs} width={12} height={legs} rx={6} style={body} />
      <g transform={`translate(0 ${34 - legs})`}>
        <rect x={-22} y={-86} width={44} height={56} rx={20} style={body} />
        {label !== undefined && (
          <text
            x={0}
            y={-52}
            fill="#fff"
            // Longer labels, e.g. a name, are smaller so they fit the shirt
            fontSize={typeof label === 'string' && label.length > 2 ? 12 : 17}
            fontWeight={800}
            textAnchor="middle"
          >
            {label}
          </text>
        )}
        <circle
          cx={0}
          cy={-110}
          r={25}
          fill="#fff"
          stroke={highlight ?? colors.line}
          strokeWidth={highlight ? 6 : 3}
        />
        <circle cx={-8} cy={-112} r={3} fill={colors.line} />
        <circle cx={8} cy={-112} r={3} fill={colors.line} />
        <circle cx={-14} cy={-103} r={4} fill="#FDA4AF" opacity={0.7} />
        <circle cx={14} cy={-103} r={4} fill="#FDA4AF" opacity={0.7} />
        <path
          d="M-6 -103 Q0 -97 6 -103"
          fill="none"
          stroke={colors.line}
          strokeWidth={2.5}
          strokeLinecap="round"
        />
      </g>
    </g>
  )
}

// Top of the head above the feet, before scaling. Speech bubbles sit here
export const figureHeight = 135

export default Figure
