import { useEffect, useRef } from 'react'

interface TimerBarProps {
  // The full time and the time left, in milliseconds
  totalMs: number
  remainingMs: number
  // While running, the bar empties smoothly over remainingMs
  running: boolean
  // Turns the bar red, e.g. in the last few seconds
  warn?: boolean
}

// A thin full-width bar that empties as time runs out. The browser animates
// it in one go from the time left down to 0, instead of a step each second.
// On pause it keeps the spot it reached
function TimerBar({
  totalMs,
  remainingMs,
  running,
  warn = false,
}: TimerBarProps) {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return
    const from = totalMs > 0 ? Math.min(1, remainingMs / totalMs) : 0
    bar.style.transform = `scaleX(${from})`
    if (!running || remainingMs <= 0) return

    const animation = bar.animate(
      [{ transform: `scaleX(${from})` }, { transform: 'scaleX(0)' }],
      { duration: remainingMs, easing: 'linear', fill: 'forwards' }
    )
    return () => animation.cancel()
  }, [totalMs, remainingMs, running])

  return (
    <div className="h-2 bg-gray-200">
      <div
        ref={barRef}
        className={`h-full origin-left transition-colors ${
          warn ? 'bg-red-600' : 'bg-gray-900'
        }`}
      />
    </div>
  )
}

export default TimerBar
