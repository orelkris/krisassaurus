import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import QuizLetters from '@/components/quiz/QuizLetters'
import { answerLetters } from '@/data/quiz/quizzes'
import { fitText } from '@/lib/quiz'
import type { QuizQuestion } from '@/types/quiz'

// The clock ring's circle: radius 52 in a 120 box
const RING = 2 * Math.PI * 52

// The controls hide after this long without the pointer moving
const IDLE_MS = 3000

interface QuizBoardProps {
  prompt: string
  // Undefined after the last question
  question?: QuizQuestion
  // Which question this is, from 0, and how many there are
  index: number
  total: number
  // Seconds left (with fractions) and the full time
  left: number
  duration: number
  running: boolean
  timeUp: boolean
  revealed: boolean
  muted: boolean
  onPrev: () => void
  onPlayPause: () => void
  onRestart: () => void
  onReveal: () => void
  onNext: () => void
  onMute: () => void
  onFullScreen: () => void
  onAgain: () => void
  onExit: () => void
}

// The board the class sees: the count, the instruction and the clock ring,
// the question on a paper card with a bar that drains, and the answers as
// four coloured tiles
function QuizBoard(props: QuizBoardProps) {
  const {
    prompt,
    question,
    index,
    total,
    left,
    duration,
    running,
    timeUp,
    revealed,
    muted,
  } = props
  const finished = question === undefined
  const textBox = useRef<HTMLDivElement>(null)
  const tilesRef = useRef<HTMLDivElement>(null)

  const shownLeft = Math.max(0, left)
  const fraction = duration ? shownLeft / duration : 0
  const whole = Math.ceil(shownLeft)
  const digits =
    whole >= 100
      ? `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, '0')}`
      : String(whole)
  const level =
    timeUp || shownLeft <= 5 ? 'crit' : shownLeft <= 10 ? 'warn' : ''
  const levelStroke = {
    crit: 'stroke-quiz-coral',
    warn: 'stroke-quiz-sun',
    '': 'stroke-quiz-mint',
  }[level]
  const levelBg = {
    crit: 'bg-quiz-coral',
    warn: 'bg-quiz-sun',
    '': 'bg-quiz-mint',
  }[level]

  const playLabel = running
    ? '❚❚ Pause'
    : timeUp
      ? '↺ Again'
      : left < duration
        ? '▶ Resume'
        : '▶ Start'

  // The controls and the pointer hide after a few seconds without moving
  const [idle, setIdle] = useState(false)
  const idleTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const wake = () => {
    setIdle(false)
    clearTimeout(idleTimer.current)
    idleTimer.current = setTimeout(() => setIdle(true), IDLE_MS)
  }
  useEffect(() => {
    idleTimer.current = setTimeout(() => setIdle(true), IDLE_MS)
    return () => clearTimeout(idleTimer.current)
  }, [])

  // Long questions and answers shrink to fit, so they stay readable from the
  // back of the room. Every answer gets the same size, set by the one that
  // needs the smallest
  useLayoutEffect(() => {
    const fitAll = () => {
      const box = textBox.current
      const text = box?.firstElementChild as HTMLElement | null
      if (box && text) fitText(text, box, 160, 18)
      const lines = [
        ...(tilesRef.current?.querySelectorAll<HTMLElement>('[data-fit]') ??
          []),
      ]
      if (!lines.length) return
      const size = Math.min(
        ...lines.map((line) =>
          fitText(line, line.parentElement as HTMLElement, 96, 14)
        )
      )
      lines.forEach((line) => (line.style.fontSize = `${size}px`))
    }
    fitAll()
    const observer = new ResizeObserver(fitAll)
    if (textBox.current) observer.observe(textBox.current)
    if (tilesRef.current) observer.observe(tilesRef.current)
    return () => observer.disconnect()
  }, [question, revealed])

  // Keys while presenting. The handler reads the latest props through a
  // ref, so it is added once
  const latest = useRef({ props, wake })
  useEffect(() => {
    latest.current = { props, wake }
  })
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.altKey) return
      const { props, wake } = latest.current
      const actions: Record<string, () => void> = {
        ' ': () => {
          // So Space doesn't also press the focused button
          if (document.activeElement instanceof HTMLButtonElement)
            document.activeElement.blur()
          props.onPlayPause()
        },
        Spacebar: props.onPlayPause,
        ArrowRight: props.onNext,
        PageDown: props.onNext,
        ArrowLeft: props.onPrev,
        PageUp: props.onPrev,
        r: props.onReveal,
        m: props.onMute,
        f: props.onFullScreen,
        // In full screen, Escape only leaves full screen
        Escape: () => !document.fullscreenElement && props.onExit(),
      }
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key
      const action = actions[key]
      if (!action) return
      if (key !== 'r' && key !== 'm' && key !== 'f' && key !== 'Escape')
        event.preventDefault()
      action()
      wake()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <section
      data-quiz
      onPointerMove={wake}
      onPointerDown={wake}
      className={`fixed inset-none z-20 grid gap-quiz-board-gap bg-quiz-board px-quiz-board-x pt-quiz-board-y pb-md font-quiz-read text-md leading-normal text-quiz-text ${
        finished
          ? 'grid-rows-[auto_minmax(0,1fr)_auto]'
          : 'grid-rows-[auto_minmax(0,0.9fr)_minmax(0,1.1fr)_auto]'
      } ${idle ? 'cursor-none' : ''}`}
    >
      <div className="flex min-w-none items-center gap-quiz-bar-gap">
        <span className="rounded-pill border border-quiz-line bg-quiz-panel px-[0.9em] py-[0.25em] font-quiz-display text-quiz-count font-semibold whitespace-nowrap">
          {finished ? total : index + 1} / {total}
        </span>
        <span className="min-w-none flex-1 font-quiz-display text-quiz-prompt font-medium text-balance text-quiz-muted">
          {prompt}
        </span>
        <div
          role="timer"
          aria-label="Time left"
          className="relative aspect-square w-quiz-ring max-w-full flex-none"
        >
          <svg
            viewBox="0 0 120 120"
            aria-hidden="true"
            className="size-full -rotate-90"
          >
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              strokeWidth="12"
              className="stroke-quiz-panel"
            />
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={RING}
              strokeDashoffset={RING * (1 - fraction)}
              className={`transition-[stroke] duration-300 ${levelStroke}`}
            />
          </svg>
          <span
            className={`absolute inset-none grid place-items-center font-quiz-display text-quiz-digits font-bold tabular-nums ${
              level === 'crit' && !timeUp
                ? 'animate-quiz-pulse text-quiz-coral'
                : ''
            } ${!running && !timeUp ? 'opacity-55' : ''}`}
          >
            {digits}
          </span>
        </div>
      </div>

      <div className="relative flex min-h-none flex-col overflow-hidden rounded-quiz-card bg-quiz-paper text-quiz-paper-ink shadow-quiz-card">
        {timeUp && !finished && (
          <div className="absolute top-quiz-timesup left-1/2 z-10 -translate-x-1/2 animate-quiz-pop rounded-pill bg-quiz-coral px-[0.8em] py-[0.1em] font-quiz-display text-quiz-timesup font-bold whitespace-nowrap text-quiz-text shadow-quiz-timesup">
            Time's up!
          </div>
        )}

        {finished ? (
          <div className="col-lg flex-1 items-center justify-center p-lg text-center">
            <QuizLetters size="done" />
            <h2 className="font-quiz-display text-quiz-done font-bold">
              That's all of them!
            </h2>
            <p className="text-quiz-done-msg text-quiz-paper-muted">
              You went through {total} question{total > 1 ? 's' : ''}.
            </p>
            <div className="flex flex-wrap justify-center gap-md">
              <button
                type="button"
                onClick={props.onAgain}
                className="quiz-button border-transparent bg-quiz-paper-ink text-quiz-paper hover:bg-quiz-paper-ink"
              >
                Start again
              </button>
              <button
                type="button"
                onClick={props.onExit}
                className="quiz-button border-transparent bg-quiz-paper-ink text-quiz-paper hover:bg-quiz-paper-ink"
              >
                Back to setup
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex min-h-none flex-1 flex-col px-quiz-card-x py-quiz-card-y">
              <div
                ref={textBox}
                className="flex min-h-none flex-1 items-center justify-center overflow-hidden"
              >
                <div className="max-w-full text-center leading-[1.25] font-bold text-balance whitespace-pre-line">
                  {question.text}
                </div>
              </div>
            </div>
            <div className="h-quiz-drain flex-none bg-quiz-drain">
              <i
                className={`block h-full w-full origin-left transition-colors duration-300 ${levelBg}`}
                style={{ transform: `scaleX(${fraction})` }}
              />
            </div>
          </>
        )}
      </div>

      {!finished && (
        <div
          ref={tilesRef}
          className="grid min-h-none auto-rows-[minmax(0,1fr)] grid-cols-2 gap-quiz-tiles-gap"
        >
          {question.choices.map((choice, i) => {
            if (!choice) return null
            const right = question.correct.includes(i)
            return (
              <div
                key={i}
                data-answer={answerLetters[i]}
                className={`relative flex min-h-none min-w-none items-center gap-quiz-tile-gap overflow-hidden rounded-quiz-tile bg-(--answer) px-quiz-tile-x py-quiz-tile-y text-quiz-tile-ink transition-[opacity,scale,filter] duration-350 ${
                  revealed
                    ? right
                      ? 'animate-quiz-win shadow-quiz-right'
                      : 'scale-97 opacity-22 saturate-40'
                    : 'shadow-quiz-tile'
                }`}
              >
                <span className="flex min-w-none flex-1 items-center self-stretch overflow-hidden">
                  <span
                    data-fit
                    className="grid max-w-full grid-cols-[auto_minmax(0,1fr)] items-baseline gap-x-[0.4em]"
                  >
                    <span
                      aria-hidden="true"
                      className="min-w-[0.8em] rounded-[0.2em] bg-quiz-tile-ink px-[0.24em] py-[0.06em] text-center font-quiz-display text-[0.78em] leading-[1.15] font-bold text-(--answer)"
                    >
                      {answerLetters[i]}
                    </span>
                    <span className="block min-w-none leading-[1.2] font-bold first-letter:uppercase">
                      {choice}
                    </span>
                  </span>
                </span>
                {revealed && right && (
                  <span
                    aria-hidden="true"
                    className="flex-none font-quiz-display text-quiz-tick font-bold"
                  >
                    ✓
                  </span>
                )}
              </div>
            )
          })}
        </div>
      )}

      <div
        className={`flex flex-wrap justify-center gap-sm transition-opacity duration-300 max-sm:[&_button]:px-sm max-sm:[&_button]:text-sm ${
          idle ? 'opacity-0' : ''
        }`}
      >
        <button
          type="button"
          onClick={props.onPrev}
          disabled={index === 0}
          title="Previous (←)"
          className="quiz-button"
        >
          ◀ Prev
        </button>
        <button
          type="button"
          onClick={props.onPlayPause}
          title="Start or pause (Space)"
          className="quiz-button min-w-[7.5em] border-transparent bg-quiz-sky text-quiz-sky-ink hover:bg-quiz-sky"
        >
          {playLabel}
        </button>
        <button
          type="button"
          onClick={props.onRestart}
          title="Restart the timer"
          className="quiz-button"
        >
          ↺ Restart
        </button>
        <button
          type="button"
          onClick={props.onReveal}
          title="Reveal answer (R)"
          className="quiz-button border-transparent bg-quiz-mint text-quiz-mint-ink hover:bg-quiz-mint"
        >
          Reveal answer
        </button>
        <button
          type="button"
          onClick={props.onNext}
          title="Next (→)"
          className="quiz-button"
        >
          {index >= total - 1 ? 'Finish ▶' : 'Next ▶'}
        </button>
        <span
          aria-hidden="true"
          className="mx-xs my-xs hidden w-px bg-quiz-line sm:block"
        />
        <button
          type="button"
          onClick={props.onMute}
          title="Mute (M)"
          className="quiz-button"
        >
          {muted ? '🔇 Muted' : '🔊 Sound on'}
        </button>
        <button
          type="button"
          onClick={props.onFullScreen}
          title="Full screen (F)"
          className="quiz-button"
        >
          ⛶ Full screen
        </button>
        <button
          type="button"
          onClick={props.onExit}
          title="Back to setup (Esc)"
          className="quiz-button"
        >
          ✕ Exit
        </button>
      </div>
    </section>
  )
}

export default QuizBoard
