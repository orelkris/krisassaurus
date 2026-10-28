import { useEffect, useState } from 'react'
import type { StrategyExample } from '@/types/drama'
import Button from '@/components/ui/Button'
import SlideSwitch from '@/components/ui/SlideSwitch'
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
    </ExampleBox>
  )
}

export default PhrasesExample
