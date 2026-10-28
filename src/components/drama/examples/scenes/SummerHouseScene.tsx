import type { KeyboardEvent } from 'react'
import Figure from '@/components/ui/Figure'
import type { SceneProps } from './types'

// Our summer vacation tableau: C and D stand on chairs and join hands to
// make a roof over A, the new homeowner, and B, who hands her a red ball
// (the keys)
const people = [
  { id: 'C', x: 150, y: 200, arm: 'M166 128 Q200 92 233 66', rear: true },
  { id: 'D', x: 330, y: 200, arm: 'M314 128 Q280 92 247 66', rear: true },
  { id: 'A', x: 205, y: 258, arm: 'M222 196 L234 204' },
  { id: 'B', x: 275, y: 258, arm: 'M258 196 L246 204' },
]

// The roof's back row is a darker brown, so it reads as the house
const rearColor = '#B45309'

function Chair({ back, seat }: { back: number; seat: number }) {
  return (
    <g fill="#A16207" opacity={0.55} aria-hidden="true">
      <rect x={back} y={150} width={8} height={58} rx={3} />
      <rect x={seat} y={200} width={68} height={9} rx={3} />
      <rect x={seat + 4} y={209} width={7} height={49} rx={3} />
      <rect x={seat + 57} y={209} width={7} height={49} rx={3} />
    </g>
  )
}

function SummerHouseScene({ colors, active, faded, onTap }: SceneProps) {
  const hidden = faded ? 0.12 : 1
  const press = (id: string) => (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onTap?.(id)
    }
  }

  return (
    <svg
      viewBox="0 0 480 280"
      className="block h-auto w-full"
      role="img"
      aria-label="Summer vacation tableau: Students C and D stand on chairs and hold hands to make a roof over Students A and B, while B hands A an object"
    >
      <rect
        x={30}
        y={256}
        width={420}
        height={5}
        rx={2.5}
        fill={colors.accent}
        opacity={0.35}
      />
      <Chair back={116} seat={116} />
      <Chair back={356} seat={296} />
      <g style={{ opacity: hidden, transition: 'opacity .35s' }}>
        {people.map((person) => {
          const on = active.includes(person.id)
          const body = person.rear ? rearColor : colors.text
          return (
            <g
              key={person.id}
              role={onTap ? 'button' : undefined}
              tabIndex={onTap ? 0 : undefined}
              aria-label={`Student ${person.id}`}
              onClick={onTap && (() => onTap(person.id))}
              onKeyDown={onTap && press(person.id)}
              className={onTap ? 'cursor-pointer outline-none' : undefined}
              transform={on ? 'translate(0 -6)' : undefined}
            >
              <path
                d={person.arm}
                fill="none"
                stroke={body}
                strokeWidth={10}
                strokeLinecap="round"
              />
              <Figure
                x={person.x}
                y={person.y}
                label={person.id}
                colors={{ body, line: colors.text }}
                highlight={on ? colors.accent : undefined}
              />
            </g>
          )
        })}
        {/* C and D's joined hands, and the red ball B hands to A */}
        <circle cx={235} cy={65} r={8} fill={rearColor} />
        <circle cx={245} cy={65} r={8} fill={rearColor} />
        <circle cx={240} cy={204} r={9} fill="#EF4444" />
      </g>
    </svg>
  )
}

export default SummerHouseScene
