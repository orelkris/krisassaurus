import { useEffect, useRef, useState } from 'react'

// The Quiz's clock. It moves every frame so the ring and the bar run
// smoothly, and works from the end time so it stays right in a background
// tab. onSecond runs each time the whole seconds left change while running
// (for the ticks); onDone runs once when it reaches 0
export function useQuizTimer(
  seconds: number,
  onSecond: (left: number) => void,
  onDone: () => void
) {
  const [duration, setDuration] = useState(seconds)
  const [left, setLeft] = useState(seconds)
  const [running, setRunning] = useState(false)
  const [done, setDone] = useState(false)
  const endsAt = useRef(0)
  const callbacks = useRef({ onSecond, onDone })
  useEffect(() => {
    callbacks.current = { onSecond, onDone }
  })

  useEffect(() => {
    if (!running) return
    let frame = 0
    let lastWhole = Math.ceil((endsAt.current - performance.now()) / 1000)
    const step = () => {
      const now = Math.max(0, (endsAt.current - performance.now()) / 1000)
      setLeft(now)
      const whole = Math.ceil(now)
      if (whole !== lastWhole) {
        lastWhole = whole
        callbacks.current.onSecond(whole)
      }
      if (now <= 0) {
        setRunning(false)
        setDone(true)
        callbacks.current.onDone()
        return
      }
      frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [running])

  // Back to the full time, stopped
  const reset = () => {
    setDuration(seconds)
    setLeft(seconds)
    setRunning(false)
    setDone(false)
  }

  // Runs from the time left, or from the full time after time's up
  const start = () => {
    const from = done || left <= 0 ? seconds : left
    if (done || left <= 0) reset()
    endsAt.current = performance.now() + from * 1000
    setRunning(true)
  }

  // From the full time, e.g. when a new question appears
  const restart = () => {
    reset()
    endsAt.current = performance.now() + seconds * 1000
    setRunning(true)
  }

  const pause = () => {
    if (running)
      setLeft(Math.max(0, (endsAt.current - performance.now()) / 1000))
    setRunning(false)
  }

  return { duration, left, running, done, reset, start, restart, pause }
}
