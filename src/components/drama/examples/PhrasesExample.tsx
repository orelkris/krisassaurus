import { useEffect, useState } from 'react'
import type { StrategyExample } from '@/types/drama'
import Button from '@/components/ui/Button'
import Figure, { figureHeight } from '@/components/ui/Figure'
import SlideSwitch from '@/components/ui/SlideSwitch'
import SpeechBubble from '@/components/ui/SpeechBubble'
import ExampleBox from './ExampleBox'

type PhrasesSettings = Extract<StrategyExample, { kind: 'phrases' }>

interface PhrasesExampleProps {
  example: PhrasesSettings
  colors: { bg: string; text: string; accent: string }
}

// Each phrase as [column, row], in the order they are said
function playOrder(
  columns: PhrasesSettings['columns'],
  order: 'columns' | 'alternate'
) {
  const byColumn = columns.flatMap((column, c) =>
    column.phrases.map((_, r) => [c, r] as const)
  )
  if (order === 'columns') return byColumn
  const rows = Math.max(...columns.map((column) => column.phrases.length))
  return Array.from({ length: rows }, (_, r) =>
    columns.flatMap((column, c) =>
      r < column.phrases.length ? [[c, r] as const] : []
    )
  ).flat()
}

const stage = { width: 560, height: 190, ground: 176, scale: 0.58, gap: 56 }

interface SpeakersProps {
  columns: PhrasesSettings['columns']
  people: NonNullable<PhrasesSettings['people']>
  current: string | null
  colors: { bg: string; text: string; accent: string }
}

// Students who say the phrases. Each column can be its own group, which
// lights up when its phrase is said, or the whole class can stand in one
// line and say every phrase together. The phrase shows in a bubble over the
// speakers
function Speakers({ columns, people, current, colors }: SpeakersProps) {
  const { students, together = false } = people
  const [column, row] = current ? current.split('-').map(Number) : [-1, -1]
  const groups = together
    ? [
        {
          key: 'class',
          centre: stage.width / 2,
          gap: Math.min(64, 480 / Math.max(students - 1, 1)),
          body: colors.text,
          on: column >= 0,
        },
      ]
    : columns.map((item, c) => ({
        key: item.heading,
        centre: (stage.width / columns.length) * (c + 0.5),
        gap: stage.gap,
        // Every other group wears the accent, so they are easy to tell apart
        body: c % 2 === 0 ? colors.text : colors.accent,
        on: c === column,
      }))
  const speaking = groups.find((group) => group.on)
  const headTop = stage.ground - figureHeight * stage.scale

  return (
    <div className="col-stack">
      <div
        className="relative rounded-xl"
        style={{ backgroundColor: colors.bg }}
      >
        <svg
          viewBox={`0 0 ${stage.width} ${stage.height}`}
          className="block h-auto w-full"
          role="img"
          aria-label={
            together
              ? `${students} students say the phrases together`
              : `${columns.length} groups of students take turns saying their phrases`
          }
        >
          <rect
            x={20}
            y={stage.ground}
            width={stage.width - 40}
            height={5}
            rx={2.5}
            fill={colors.accent}
            opacity={0.35}
          />
          {groups.map((group) =>
            Array.from({ length: students }, (_, i) => (
              <g
                key={`${group.key}-${i}`}
                transform={group.on ? 'translate(0 -6)' : undefined}
              >
                <Figure
                  x={group.centre + (i - (students - 1) / 2) * group.gap}
                  y={stage.ground}
                  scale={stage.scale}
                  colors={{ body: group.body, line: colors.text }}
                  highlight={group.on ? colors.accent : undefined}
                />
              </g>
            ))
          )}
        </svg>
        {speaking && (
          <SpeechBubble
            // Kept off the edges, so a long phrase still fits on a phone
            left={Math.min(
              Math.max((speaking.centre / stage.width) * 100, 30),
              70
            )}
            top={((headTop - 10) / stage.height) * 100}
          >
            {columns[column].phrases[row]}
          </SpeechBubble>
        )}
      </div>
      {!together && (
        <div
          className="grid"
          style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
        >
          {columns.map((item, c) => (
            <h3
              key={item.heading}
              className="text-label text-center"
              style={{ color: c === column ? colors.text : undefined }}
            >
              {item.heading}
            </h3>
          ))}
        </div>
      )}
    </div>
  )
}

// Columns of phrases that light up one at a time, as the class says them
function PhrasesExample({ example, colors }: PhrasesExampleProps) {
  const [roundIndex, setRoundIndex] = useState(0)
  const [run, setRun] = useState(0)
  const [current, setCurrent] = useState<string | null>(null)
  const order = example.rounds?.[roundIndex]?.order ?? 'columns'

  useEffect(() => {
    if (run === 0) return
    const steps = playOrder(example.columns, order)
    const timers = [
      ...steps.map(([c, r], i) =>
        setTimeout(() => setCurrent(`${c}-${r}`), i * example.stepMs)
      ),
      setTimeout(() => setCurrent(null), steps.length * example.stepMs + 600),
    ]
    return () => timers.forEach(clearTimeout)
    // A new run restarts the timers
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run])

  const pickRound = (index: number) => {
    setRoundIndex(index)
    setRun(0)
    setCurrent(null)
  }

  return (
    <ExampleBox
      title={example.title}
      note={example.note}
      accent={colors.accent}
      actions={
        <>
          {example.rounds && example.rounds.length > 1 && (
            <SlideSwitch
              label="Round"
              options={example.rounds.map((round, index) => ({
                value: index,
                label: round.label,
              }))}
              value={roundIndex}
              onChange={pickRound}
            />
          )}
          <Button size="sm" onClick={() => setRun((count) => count + 1)}>
            {example.button}
          </Button>
        </>
      }
    >
      {(!example.people || example.people.together) && (
        <div className="grid gap-3 sm:grid-cols-2">
          {example.columns.map((column, c) => (
            <div key={column.heading} className="col-stack min-w-0">
              <h3 className="text-label">{column.heading}</h3>
              {column.phrases.map((phrase, r) => {
                const on = current === `${c}-${r}`
                return (
                  <p
                    key={phrase}
                    className={`rounded-[10px] border border-l-[3px] px-3 py-2.5 text-sm ${on ? 'font-semibold' : 'border-gray-200'}`}
                    style={
                      on
                        ? {
                            backgroundColor: colors.bg,
                            borderColor: colors.accent,
                          }
                        : { borderLeftColor: colors.text }
                    }
                  >
                    {phrase}
                  </p>
                )
              })}
            </div>
          ))}
        </div>
      )}
      {example.people && (
        <Speakers
          columns={example.columns}
          people={example.people}
          current={current}
          colors={colors}
        />
      )}
    </ExampleBox>
  )
}

export default PhrasesExample
