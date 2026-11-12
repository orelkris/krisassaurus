import { Link } from 'react-router-dom'
import type { CreativeStage } from '@/types/arts'

interface CreativeCycleProps {
  stages: CreativeStage[]
  // In the middle, on two lines
  centre: [string, string]
  // Each stage's box on the page, e.g. #stage-3
  hrefOf: (num: number) => string
}

// Wide enough for the longest names beside the ring
const SIZE = { x: -48, w: 736, h: 440 }
const CENTRE = { x: 320, y: 220 }
const RING = 150
const NODE = 18
// How far a stage's name sits from its circle
const GAP = 26

// The creative process as a cycle: numbered circles round a ring, each with
// its name beside it and a link to its box, and Feedback and reflection in
// the middle. Drawn in the subject's colour
function CreativeCycle({ stages, centre, hrefOf }: CreativeCycleProps) {
  return (
    <div className="flex justify-center">
      <svg
        viewBox={`${SIZE.x} 0 ${SIZE.w} ${SIZE.h}`}
        role="img"
        aria-label={`The creative process: ${stages.length} stages in a cycle around ${centre.join(' ').toLowerCase()}`}
        className="h-auto w-full max-w-diagram"
      >
        <circle
          cx={CENTRE.x}
          cy={CENTRE.y}
          r={RING}
          fill="none"
          strokeWidth={2}
          className="stroke-line"
        />
        <circle
          cx={CENTRE.x}
          cy={CENTRE.y}
          r={62}
          className="fill-subject-bg"
        />
        {centre.map((line, index) => (
          <text
            key={line}
            x={CENTRE.x}
            y={CENTRE.y - 3 + index * 18}
            textAnchor="middle"
            fontSize={13}
            fontWeight={600}
            className="fill-subject"
          >
            {line}
          </text>
        ))}
        {stages.map((stage, index) => {
          // Clockwise from the top
          const angle = (index / stages.length) * 2 * Math.PI
          const x = CENTRE.x + RING * Math.sin(angle)
          const y = CENTRE.y - RING * Math.cos(angle)
          const sin = Math.round(Math.sin(angle) * 100) / 100
          const cos = Math.round(Math.cos(angle) * 100) / 100
          // Names at the top and bottom sit above and below their circle;
          // the others to the side, away from the ring
          const anchor = sin > 0 ? 'start' : sin < 0 ? 'end' : 'middle'
          const tx = x + Math.sign(sin) * GAP
          const ty = sin === 0 ? (cos > 0 ? y - 41 : y + 36) : y - 3
          return (
            <Link
              key={stage.name}
              to={hrefOf(index + 1)}
              aria-label={stage.name}
              className="group"
            >
              <circle
                cx={x}
                cy={y}
                r={NODE}
                strokeWidth={2}
                className="fill-page stroke-subject transition-colors group-hover:fill-subject-bg"
              />
              <text
                x={x}
                y={y + 5}
                textAnchor="middle"
                fontSize={15}
                fontWeight={700}
                className="fill-subject"
              >
                {index + 1}
              </text>
              {stage.lines.map((line, lineIndex) => (
                <text
                  key={line}
                  x={tx}
                  y={ty + lineIndex * 16}
                  textAnchor={anchor}
                  fontSize={13}
                  className="fill-fg"
                >
                  {line}
                </text>
              ))}
            </Link>
          )
        })}
      </svg>
    </div>
  )
}

export default CreativeCycle
