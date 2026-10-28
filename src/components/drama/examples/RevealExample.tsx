import { useEffect, useRef, useState } from 'react'
import type { StrategyExample } from '@/types/drama'
import Button from '@/components/ui/Button'
import SlideSwitch from '@/components/ui/SlideSwitch'
import ExampleBox from './ExampleBox'

type RevealSettings = Extract<StrategyExample, { kind: 'reveal' }>

interface RevealExampleProps {
  example: RevealSettings
  colors: { bg: string; text: string; accent: string }
}

// How long the finished set stays lit before going back to normal
const holdMs = 2500

// A stack of cards. The button dims them all, then lights them up one at a
// time. A swap, if set, switches one card's text
function RevealExample({ example, colors }: RevealExampleProps) {
  // How many cards are lit while playing; null when not playing
  const [lit, setLit] = useState<number | null>(null)
  const [swapped, setSwapped] = useState(0)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  const stop = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }
  useEffect(() => stop, [])

  const play = () => {
    stop()
    setLit(0)
    example.cards.forEach((_, i) =>
      timers.current.push(
        setTimeout(() => setLit(i + 1), 300 + i * example.stepMs)
      )
    )
    timers.current.push(
      setTimeout(
        () => setLit(null),
        300 + example.cards.length * example.stepMs + holdMs
      )
    )
  }

  const { swap } = example

  return (
    <ExampleBox
      title={example.title}
      accent={colors.accent}
      actions={
        <Button size="sm" onClick={play}>
          {example.button}
        </Button>
      }
    >
      <ol className="col-tight">
        {example.cards.map((card, i) => {
          const text =
            swap && swap.card === i ? swap.options[swapped].text : card.text
          const on = lit !== null && i < lit
          const dim = lit !== null && !on
          return (
            <li
              key={card.label}
              className="col-tight rounded-xl border px-3.5 py-2.5 transition-all duration-300"
              style={{
                borderColor: on ? colors.accent : '#E5E7EB',
                backgroundColor: on ? colors.bg : undefined,
                opacity: dim ? 0.2 : 1,
                transform: dim ? 'translateY(4px)' : undefined,
              }}
            >
              <span className="text-label">{card.label}</span>
              <span className="text-sm">{text}</span>
            </li>
          )
        })}
      </ol>
      {swap && (
        <div className="row-stack flex-wrap items-center">
          <span className="text-small">{swap.label}</span>
          <SlideSwitch
            label={example.cards[swap.card].label}
            options={swap.options.map((option, index) => ({
              value: index,
              label: option.label,
            }))}
            value={swapped}
            onChange={setSwapped}
          />
        </div>
      )}
    </ExampleBox>
  )
}

export default RevealExample
