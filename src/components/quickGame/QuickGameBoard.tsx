import { useEffect, useRef } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Maximize,
  Minimize,
  Pause,
  Play,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react'
import Button from '@/components/ui/Button'
import IconButton from '@/components/ui/IconButton'
import TimerBar from '@/components/ui/TimerBar'
import { useFullScreen } from '@/hooks/useFullScreen'
import type { Scenario } from '@/types/quickGame'

// The clock turns red for the last few seconds
const WARN_AT = 5

interface QuickGameBoardProps {
  title: string
  // The first Play also goes full screen, e.g. when opened from
  // /quick-game-start (browsers only allow full screen after a click or key)
  fullScreenOnFirstPlay?: boolean
  // False until the teacher presses Play the first time
  started: boolean
  scenario: Scenario
  prompt?: string
  // Which scenario this is, from 0, and how many there are
  index: number
  total: number
  // Whole seconds for the clock, and the exact time for the bar
  left: number
  remainingMs: number
  // Changes on every start of the countdown, for the bar
  startedAt: number
  seconds: number
  running: boolean
  // The matching question, shown when revealed
  answer?: string
  revealed: boolean
  muted: boolean
  onBack: () => void
  onPlayPause: () => void
  onReveal: () => void
  onNext: () => void
  onMute: () => void
  onEnd: () => void
}

// What the class sees on the board. It opens on the game's title and waits
// for Play, so the teacher can go full screen first.
// Keys: Space play/pause, arrows next/back, A answer, F full screen
function QuickGameBoard(props: QuickGameBoardProps) {
  const {
    title,
    started,
    scenario,
    prompt,
    index,
    total,
    left,
    remainingMs,
    startedAt,
    seconds,
    running,
    answer,
    revealed,
    muted,
  } = props
  const boardRef = useRef<HTMLDivElement>(null)
  const fullScreen = useFullScreen(boardRef)

  const playPause = () => {
    if (props.fullScreenOnFirstPlay && !started && !fullScreen.isFullScreen) {
      fullScreen.toggle()
    }
    props.onPlayPause()
  }
  const late = started && left <= WARN_AT

  // The key handler reads the latest props through a ref, so it is added once
  const latest = useRef({
    props,
    playPause,
    toggleFullScreen: fullScreen.toggle,
  })
  useEffect(() => {
    latest.current = { props, playPause, toggleFullScreen: fullScreen.toggle }
  })

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const { props, playPause, toggleFullScreen } = latest.current
      const actions: Record<string, () => void> = {
        ' ': playPause,
        ArrowRight: props.onNext,
        ArrowLeft: props.onBack,
        a: props.onReveal,
        f: toggleFullScreen,
      }
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key
      const action = actions[key]
      if (!action) return
      event.preventDefault()
      action()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div ref={boardRef} className="flex min-h-full flex-1 flex-col bg-white">
      <TimerBar
        totalMs={seconds * 1000}
        remainingMs={remainingMs}
        running={running}
        runKey={startedAt}
        warn={late}
      />

      <div className="flex items-start justify-between pad-page pb-0">
        <div className="row-stack">
          <IconButton label="End game" onClick={props.onEnd}>
            <X size={22} />
          </IconButton>
          {started && (
            <span className="text-board tabular-nums">
              {index + 1} / {total}
            </span>
          )}
        </div>
        <span className={`text-clock ${late ? 'text-red-600' : ''}`}>
          {left}
        </span>
      </div>

      <div className="col-page flex-1 items-center justify-center pad-page text-center">
        {started ? (
          <>
            <div className="col-section items-center">
              <p className="heading-board max-w-[28ch]">{scenario.text}</p>
              {prompt && <p className="text-board">{prompt}</p>}
            </div>

            {revealed && answer && (
              <p className="heading-answer max-w-3xl border-t border-gray-200 pt-6">
                {answer}
              </p>
            )}
          </>
        ) : (
          <div className="col-section items-center">
            <h1 className="heading-board">{title}</h1>
            <p className="text-board">{total} scenarios</p>
          </div>
        )}
      </div>

      {/* In full screen the controls fade until the pointer is over them */}
      <div
        className={`flex flex-wrap items-center justify-center gap-stack border-t border-gray-200 pad-md transition-opacity sm:grid sm:grid-cols-[1fr_auto_1fr] ${
          fullScreen.isFullScreen
            ? 'opacity-30 focus-within:opacity-100 hover:opacity-100'
            : ''
        }`}
      >
        {/* Keeps the play buttons centred on wider screens */}
        <span className="hidden sm:block" />

        <div className="row-stack">
          <IconButton
            label="Back"
            onClick={props.onBack}
            disabled={!started || index === 0}
          >
            <ChevronLeft size={24} />
          </IconButton>
          <IconButton
            label={running ? 'Pause' : 'Play'}
            onClick={playPause}
            variant="primary"
          >
            {running ? <Pause size={28} /> : <Play size={28} />}
          </IconButton>
          <IconButton
            label={index === total - 1 ? 'Finish' : 'Next'}
            onClick={props.onNext}
            disabled={!started}
          >
            <ChevronRight size={24} />
          </IconButton>
        </div>

        <div className="row-tight justify-end">
          <Button
            variant="secondary"
            onClick={props.onReveal}
            disabled={!started}
          >
            {revealed ? 'Hide answer' : 'Answer'}
          </Button>
          <IconButton
            label={muted ? 'Music on' : 'Music off'}
            onClick={props.onMute}
          >
            {muted ? <VolumeX size={22} /> : <Volume2 size={22} />}
          </IconButton>
          <IconButton
            label={
              fullScreen.isFullScreen ? 'Leave full screen' : 'Full screen'
            }
            onClick={fullScreen.toggle}
          >
            {fullScreen.isFullScreen ? (
              <Minimize size={22} />
            ) : (
              <Maximize size={22} />
            )}
          </IconButton>
        </div>
      </div>
    </div>
  )
}

export default QuickGameBoard
