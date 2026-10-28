import { useEffect, useState } from 'react'
import type { StrategyExample } from '@/types/drama'
import Button from '@/components/ui/Button'
import Figure, { figureHeight } from '@/components/ui/Figure'
import SpeechBubble from '@/components/ui/SpeechBubble'
import SlideSwitch from '@/components/ui/SlideSwitch'
import ExampleBox from './ExampleBox'

type SequenceSettings = Extract<StrategyExample, { kind: 'sequence' }>

interface SequenceExampleProps {
  example: SequenceSettings
  colors: { bg: string; text: string; accent: string }
}

interface Spot {
  x: number
  y: number
  scale: number
  // The far line of a tunnel, seen from behind
  far?: boolean
}

// Where each student stands, in speaking order, inside a width × height
// drawing
function layoutSpots(layout: SequenceSettings['layout'], count: number) {
  if (layout === 'tunnel') {
    // Lines alternate: far side, near side, far side...
    const spots: Spot[] = Array.from({ length: count }, (_, i) => {
      const column = Math.floor(i / 2)
      return i % 2 === 0
        ? { x: 110 + column * 80, y: 150, scale: 0.55, far: true }
        : { x: 130 + column * 80, y: 240, scale: 0.62 }
    })
    return { width: 540, height: 250, ground: 236, spots }
  }
  const gap = count > 1 ? 480 / (count - 1) : 0
  const spots: Spot[] = Array.from({ length: count }, (_, i) => ({
    x: 40 + i * gap,
    y: 156,
    scale: 0.58,
  }))
  return { width: 560, height: 170, ground: 156, spots }
}

// Students speak one after another, each with a speech bubble. A tunnel also
// has a walker who passes between the two lines while they speak
function SequenceExample({ example, colors }: SequenceExampleProps) {
  const [versionIndex, setVersionIndex] = useState(0)
  const [run, setRun] = useState(0)
  const [speaker, setSpeaker] = useState<number | null>(null)
  const [walking, setWalking] = useState(false)
  const version = example.versions[versionIndex]
  const { width, height, ground, spots } = layoutSpots(
    example.layout,
    example.students
  )
  const travel = example.students * example.stepMs

  useEffect(() => {
    if (run === 0) return
    const timers = [
      ...spots.map((_, i) =>
        setTimeout(() => setSpeaker(i), i * example.stepMs + 300)
      ),
      setTimeout(() => {
        setSpeaker(null)
        setWalking(false)
      }, travel + 2500),
    ]
    return () => timers.forEach(clearTimeout)
    // A new run restarts the timers; spots only change with the settings
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run])

  const start = () => {
    setSpeaker(null)
    setWalking(example.layout === 'tunnel')
    setRun((count) => count + 1)
  }

  const pickVersion = (index: number) => {
    setVersionIndex(index)
    setRun(0)
    setSpeaker(null)
    setWalking(false)
  }

  const line =
    speaker === null ? null : (version.lines[speaker] ?? example.filler)
  const spot = speaker === null ? null : spots[speaker]
  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <ExampleBox
      title={example.title}
      accent={colors.accent}
      actions={
        <>
          {example.versions.length > 1 && (
            <SlideSwitch
              label="Version"
              options={example.versions.map((item, index) => ({
                value: index,
                label: item.label,
              }))}
              value={versionIndex}
              onChange={pickVersion}
            />
          )}
          <Button size="sm" onClick={start}>
            {example.button}
          </Button>
        </>
      }
    >
      {version.prompt && (
        <p className="font-semibold" style={{ color: colors.text }}>
          {version.prompt}
        </p>
      )}
      <div
        className="relative rounded-xl"
        style={{ backgroundColor: colors.bg }}
      >
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="block h-auto w-full"
          role="img"
          aria-label={`${example.students} students take turns speaking`}
        >
          <rect
            x={20}
            y={ground}
            width={width - 40}
            height={5}
            rx={2.5}
            fill={colors.accent}
            opacity={0.35}
          />
          {spots.map((place, i) => (
            <Figure
              key={i}
              x={place.x}
              y={place.y}
              scale={place.scale}
              label={example.numbered ? i + 1 : undefined}
              colors={{
                body: place.far ? colors.accent : colors.text,
                line: colors.text,
              }}
              faded={place.far}
              highlight={speaker === i ? colors.accent : undefined}
            />
          ))}
          {example.layout === 'tunnel' && (
            // The outer group moves; the figure inside keeps its own place
            <g
              style={{
                transform: walking ? 'translateX(470px)' : undefined,
                transition:
                  walking && !reduceMotion
                    ? `transform ${travel}ms linear`
                    : 'none',
              }}
            >
              <Figure
                x={40}
                y={200}
                scale={0.62}
                colors={{ body: '#EF4444', line: '#EF4444' }}
              />
            </g>
          )}
        </svg>
        {line && spot && (
          <SpeechBubble
            left={(spot.x / width) * 100}
            top={((spot.y - figureHeight * spot.scale - 4) / height) * 100}
            lineStyle={line.style}
          >
            {line.text}
          </SpeechBubble>
        )}
      </div>
    </ExampleBox>
  )
}

export default SequenceExample
