import { useState } from 'react'
import type { StrategyExample } from '@/types/drama'
import { useCountdown } from '@/hooks/useCountdown'
import Button from '@/components/ui/Button'
import TimerBar from '@/components/ui/TimerBar'
import SlideSwitch from '@/components/ui/SlideSwitch'
import ExampleBox from './ExampleBox'

type TimerSettings = Extract<StrategyExample, { kind: 'timer' }>

interface TimerExampleProps {
  example: TimerSettings
  // The strategy group's colours. The box border uses the accent and the
  // writing uses the text colour
  colors: { bg: string; text: string; accent: string }
}

// A free-write timer: pick a length, start, and write in a box only you see.
// Changing the length or pressing Reset starts a fresh countdown
function TimerExample({ example, colors }: TimerExampleProps) {
  const [minutes, setMinutes] = useState(example.start)
  const [round, setRound] = useState(0)
  const [text, setText] = useState('')

  return (
    <Countdown
      key={`${minutes}-${round}`}
      example={example}
      colors={colors}
      minutes={minutes}
      onMinutes={setMinutes}
      onReset={() => {
        setRound((count) => count + 1)
        setText('')
      }}
      text={text}
      onText={setText}
    />
  )
}

interface CountdownProps extends TimerExampleProps {
  minutes: number
  onMinutes: (minutes: number) => void
  onReset: () => void
  text: string
  onText: (text: string) => void
}

function Countdown({
  example,
  colors,
  minutes,
  onMinutes,
  onReset,
  text,
  onText,
}: CountdownProps) {
  const clock = useCountdown(minutes * 60)
  const done = clock.remainingMs === 0 && !clock.running

  return (
    <ExampleBox
      title={example.title}
      accent={colors.accent}
      actions={
        <>
          <Button
            size="sm"
            onClick={clock.running ? clock.pause : clock.resume}
          >
            {clock.running ? 'Pause' : 'Start'}
          </Button>
          <Button size="sm" variant="secondary" onClick={onReset}>
            Reset
          </Button>
        </>
      }
    >
      <p className="text-timer text-center">
        {done
          ? 'Pens down'
          : `${Math.floor(clock.left / 60)}:${String(clock.left % 60).padStart(2, '0')}`}
      </p>
      <div className="flex justify-center">
        <SlideSwitch
          label="Length"
          options={example.minutes.map((value) => ({
            value,
            label: `${value} min`,
          }))}
          value={minutes}
          onChange={onMinutes}
        />
      </div>
      <TimerBar
        totalMs={minutes * 60_000}
        remainingMs={clock.remainingMs}
        running={clock.running}
        runKey={clock.startedAt}
      />
      <textarea
        rows={5}
        value={text}
        onChange={(event) => onText(event.target.value)}
        placeholder={example.placeholder}
        aria-label="Free-write space"
        className="field resize-y font-medium"
        style={{ color: colors.text }}
      />
    </ExampleBox>
  )
}

export default TimerExample
