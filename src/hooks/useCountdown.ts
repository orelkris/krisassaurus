import { useEffect, useRef, useState } from 'react'

// A countdown. It works from the end time rather than counting ticks, so it
// stays accurate when the tab is in the background.
// left is whole seconds for the clock; remainingMs is the exact time left at
// the last start or pause, for things that animate on their own (TimerBar);
// startedAt changes on every start, so they can tell a restart from the same
// run carrying on.
// onDone runs once when the clock reaches 0
export function useCountdown(seconds: number, onDone?: () => void) {
  const [left, setLeft] = useState(seconds)
  const [remainingMs, setRemainingMs] = useState(seconds * 1000)
  const [running, setRunning] = useState(false)
  const [startedAt, setStartedAt] = useState(0)
  const endsAt = useRef(0)
  const onDoneRef = useRef(onDone)

  useEffect(() => {
    onDoneRef.current = onDone
  })

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => {
      const ms = Math.max(0, endsAt.current - Date.now())
      setLeft(Math.ceil(ms / 1000))
      if (ms === 0) {
        setRemainingMs(0)
        setRunning(false)
        onDoneRef.current?.()
      }
    }, 200)
    return () => clearInterval(id)
  }, [running])

  const startFrom = (ms: number) => {
    endsAt.current = Date.now() + ms
    setRemainingMs(ms)
    setLeft(Math.ceil(ms / 1000))
    setStartedAt(Date.now())
    setRunning(true)
  }

  const pause = () => {
    if (running) {
      const ms = Math.max(0, endsAt.current - Date.now())
      setRemainingMs(ms)
      setLeft(Math.ceil(ms / 1000))
    }
    setRunning(false)
  }

  return {
    left,
    remainingMs,
    startedAt,
    running,
    // Starts over from the full time
    restart: () => startFrom(seconds * 1000),
    // Carries on from where it stopped, or starts over if it ran out
    resume: () => startFrom(remainingMs > 0 ? remainingMs : seconds * 1000),
    pause,
  }
}
