import { useEffect, useRef, useState } from 'react'
import type { StrategyExample } from '@/types/drama'
import Button from '@/components/ui/Button'
import SpeechBubble from '@/components/ui/SpeechBubble'
import ExampleBox from './ExampleBox'
import { scenes } from './scenes'

type SceneSettings = Extract<StrategyExample, { kind: 'scene' }>

interface SceneExampleProps {
  example: SceneSettings
  colors: { bg: string; text: string; accent: string }
}

// How long a tapped student stays lit up
const holdMs = 3000

// A drawn tableau. In tap mode each student is a button that says their
// thought, and the button taps them all in order. In freeze mode the button
// counts down and the picture appears
function SceneExample({ example, colors }: SceneExampleProps) {
  const { Drawing, bubbles } = scenes[example.scene]
  const people = example.people ?? []
  const [speaker, setSpeaker] = useState<string | null>(null)
  const [heard, setHeard] = useState<string[]>([])
  const [count, setCount] = useState('')
  const [faded, setFaded] = useState(false)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  const stop = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }
  useEffect(() => stop, [])

  const person = people.find((item) => item.id === speaker)
  // A student in a pair lights up and speaks with their partner
  const group = person?.pair
    ? people.filter((item) => item.pair === person.pair)
    : person
      ? [person]
      : []
  const who = (ids: string[]) =>
    ids.length > 1 ? `Students ${ids.join(' and ')}` : `Student ${ids[0]}`

  const say = (id: string, delay = 0) => {
    timers.current.push(
      setTimeout(() => {
        const tapped = people.find((item) => item.id === id)
        const pairKey = tapped?.pair ?? id
        setSpeaker(id)
        setHeard((list) => (list.includes(pairKey) ? list : [...list, pairKey]))
      }, delay),
      setTimeout(
        () => setSpeaker((now) => (now === id ? null : now)),
        delay + holdMs
      )
    )
  }

  const tap = (id: string) => {
    stop()
    say(id)
  }

  const playFlow = () => {
    stop()
    setHeard([])
    setSpeaker(null)
    ;(example.flow ?? []).forEach((id, i) => say(id, i * 1500))
  }

  const freeze = () => {
    stop()
    setFaded(true)
    ;['3', '2', '1', 'Freeze!'].forEach((step, i) =>
      timers.current.push(
        setTimeout(() => {
          setCount(step)
          if (i === 3) setFaded(false)
        }, i * 800)
      )
    )
    timers.current.push(setTimeout(() => setCount(''), 4 * 800 + 1200))
  }

  const bubble = person && bubbles[person.id]

  return (
    <ExampleBox
      title={example.title}
      accent={colors.accent}
      actions={
        <Button size="sm" onClick={example.mode === 'tap' ? playFlow : freeze}>
          {example.button}
        </Button>
      }
    >
      <div
        className="relative rounded-xl"
        style={{ backgroundColor: colors.bg }}
      >
        <Drawing
          colors={colors}
          active={group.map((item) => item.id)}
          faded={faded}
          onTap={example.mode === 'tap' ? tap : undefined}
        />
        {count && (
          <span
            aria-live="polite"
            className="pointer-events-none absolute top-3 right-4 text-[28px] font-extrabold"
            style={{ color: colors.text }}
          >
            {count}
          </span>
        )}
        {person && bubble && (
          <SpeechBubble left={bubble.left} top={bubble.top}>
            {person.line}
          </SpeechBubble>
        )}
      </div>
      {heard.length > 0 && (
        <ol className="col-tight list-decimal pl-5 text-sm">
          {heard.map((key) => {
            const members = people.filter(
              (item) => (item.pair ?? item.id) === key
            )
            return (
              <li key={key}>
                <b style={{ color: colors.text }}>
                  {who(members.map((item) => item.id))}:
                </b>{' '}
                “{members[0].line}”
              </li>
            )
          })}
        </ol>
      )}
    </ExampleBox>
  )
}

export default SceneExample
