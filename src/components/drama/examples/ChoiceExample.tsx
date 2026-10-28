import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import type { StrategyExample } from '@/types/drama'
import Button from '@/components/ui/Button'
import Figure, { figureHeight } from '@/components/ui/Figure'
import SpeechBubble from '@/components/ui/SpeechBubble'
import SlideSwitch from '@/components/ui/SlideSwitch'
import ExampleBox from './ExampleBox'

type ChoiceSettings = Extract<StrategyExample, { kind: 'choice' }>
type Colors = { bg: string; text: string; accent: string }

interface ChoiceExampleProps {
  example: ChoiceSettings
  colors: Colors
}

// How long a picked answer's line stays up
const holdMs = 3000

// The chair drawing is 300 by 260. Each pose draws the student and says
// where their head is, for the speech bubble
const chairPoses: Record<
  string,
  {
    front: boolean
    head: { x: number; y: number }
    draw: (c: Colors) => ReactNode
  }
> = {
  'on-top': {
    front: true,
    head: { x: 150, y: 182 - figureHeight },
    draw: (c) => (
      <Figure x={150} y={182} colors={{ body: c.text, line: c.text }} />
    ),
  },
  sitting: {
    front: true,
    head: { x: 150, y: 246 - figureHeight - 28 },
    draw: (c) => (
      <Figure
        x={150}
        y={246}
        legs={62}
        colors={{ body: c.text, line: c.text }}
      />
    ),
  },
  // Drawn before the chair, so the chair's back hides most of them
  behind: {
    front: false,
    head: { x: 176, y: 246 - figureHeight * 0.92 },
    draw: (c) => (
      <Figure
        x={176}
        y={246}
        scale={0.92}
        colors={{ body: c.text, line: c.text }}
      />
    ),
  },
  under: {
    front: true,
    head: { x: 162, y: 214 },
    draw: (c) => (
      <g transform="translate(96 231) rotate(90)">
        <Figure
          x={0}
          y={0}
          scale={0.6}
          colors={{ body: c.text, line: c.text }}
        />
      </g>
    ),
  },
}

// Solid, so a student behind it is hidden. The same colour as the summer
// house chairs on a yellow background
function Chair() {
  return (
    <g fill="#CBA65C" aria-hidden="true">
      <rect x={118} y={110} width={64} height={72} rx={8} />
      <rect x={108} y={182} width={84} height={11} rx={4} />
      <rect x={114} y={193} width={9} height={53} rx={4} />
      <rect x={177} y={193} width={9} height={53} rx={4} />
    </g>
  )
}

// pick: one student and a chair, with a button per answer
function PickChoice({ example, colors }: ChoiceExampleProps) {
  const [picked, setPicked] = useState(example.start ?? 0)
  const [talking, setTalking] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)
  useEffect(() => () => clearTimeout(timer.current), [])

  const option = example.options[picked]
  const pose = chairPoses[option.pose]

  const pick = (index: number) => {
    clearTimeout(timer.current)
    setPicked(index)
    setTalking(true)
    timer.current = setTimeout(() => setTalking(false), holdMs)
  }

  return (
    <ExampleBox
      title={example.title}
      accent={colors.accent}
      actions={
        <SlideSwitch
          label="Answer"
          options={example.options.map((item, index) => ({
            value: index,
            label: item.label,
          }))}
          value={picked}
          onChange={pick}
        />
      }
    >
      <p className="font-semibold" style={{ color: colors.text }}>
        {example.prompt}
      </p>
      <div
        className="relative rounded-xl"
        style={{ backgroundColor: colors.bg }}
      >
        <svg
          viewBox="0 0 300 260"
          className="mx-auto block h-auto w-full max-w-[360px]"
          role="img"
          aria-label={`A student answers with a chair: ${option.label}`}
        >
          <rect
            x={30}
            y={246}
            width={240}
            height={5}
            rx={2.5}
            fill={colors.accent}
            opacity={0.35}
          />
          {pose && !pose.front && pose.draw(colors)}
          <Chair />
          {pose?.front && pose.draw(colors)}
        </svg>
        {talking && pose && option.line && (
          // The svg is centred and at most 360px wide, so the bubble is
          // placed on a box the same size
          <div className="pointer-events-none absolute inset-0 mx-auto max-w-[360px]">
            <SpeechBubble
              left={(pose.head.x / 300) * 100}
              top={((pose.head.y - 4) / 260) * 100}
            >
              {option.line}
            </SpeechBubble>
          </div>
        )}
      </div>
    </ExampleBox>
  )
}

// Which way each thumb is turned, from pointing up
const thumbTurn: Record<string, number> = { up: 0, middle: -90, down: 180 }

// poll: a row of students who each hold up a thumb
function PollChoice({ example, colors }: ChoiceExampleProps) {
  const students = example.students ?? 8
  const [answers, setAnswers] = useState<number[] | null>(null)

  const ask = () =>
    setAnswers(
      Array.from({ length: students }, () =>
        Math.floor(Math.random() * example.options.length)
      )
    )

  const gap = 480 / Math.max(students - 1, 1)
  const scale = 0.58
  const headTop = 186 - figureHeight * scale

  return (
    <ExampleBox
      title={example.title}
      accent={colors.accent}
      actions={
        <Button size="sm" onClick={ask}>
          {example.button}
        </Button>
      }
    >
      <p className="font-semibold" style={{ color: colors.text }}>
        {example.prompt}
      </p>
      <div className="rounded-xl" style={{ backgroundColor: colors.bg }}>
        <svg
          viewBox="0 0 560 200"
          className="block h-auto w-full"
          role="img"
          aria-label={`${students} students answer with a thumb`}
        >
          <rect
            x={20}
            y={186}
            width={520}
            height={5}
            rx={2.5}
            fill={colors.accent}
            opacity={0.35}
          />
          {Array.from({ length: students }, (_, i) => {
            const x = 40 + i * gap
            const answer = answers && example.options[answers[i]]
            return (
              <g key={i}>
                <Figure
                  x={x}
                  y={186}
                  scale={scale}
                  colors={{ body: colors.text, line: colors.text }}
                />
                {answer && (
                  <g transform={`translate(${x} ${headTop - 28})`}>
                    <circle
                      r={17}
                      fill="#fff"
                      stroke={colors.accent}
                      strokeWidth={2}
                    />
                    <g
                      transform={`rotate(${thumbTurn[answer.pose] ?? 0})`}
                      fill={colors.text}
                    >
                      {/* A fist with three finger lines, and the thumb */}
                      <rect x={-8} y={-3} width={16} height={14} rx={4} />
                      <rect x={-8} y={-14} width={6} height={13} rx={3} />
                      <path
                        d="M0 1.5 H8 M0 5 H8 M0 8.5 H8"
                        stroke="#fff"
                        strokeWidth={1.2}
                      />
                    </g>
                  </g>
                )}
              </g>
            )
          })}
        </svg>
      </div>
      <p aria-live="polite" className="text-sm font-semibold">
        {answers &&
          example.options
            .map(
              (option, index) =>
                `${option.label} ${answers.filter((a) => a === index).length}`
            )
            .join(' · ')}
      </p>
    </ExampleBox>
  )
}

// Students answer a question with their body, picked one at a time or
// asked of the whole class
function ChoiceExample(props: ChoiceExampleProps) {
  return props.example.mode === 'pick' ? (
    <PickChoice {...props} />
  ) : (
    <PollChoice {...props} />
  )
}

export default ChoiceExample
