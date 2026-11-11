import type { NumberLineMark } from '@/types/math'
import MathText from '@/components/math/MathText'

interface NumberLineProps {
  start: string
  end: string
  marks: NumberLineMark[]
}

const toneClass = {
  right: { text: 'text-correct', tick: 'bg-correct-mark' },
  wrong: { text: 'text-wrong', tick: 'bg-wrong-mark' },
}

// A bar with tick marks. Marks near the start sit on a lower row, pointing back
// to their spot, so their labels don't run into the start label
function NumberLine({ start, end, marks }: NumberLineProps) {
  return (
    <div className="relative mx-sm h-numberline text-xs text-muted">
      <div className="absolute inset-x-none top-lg h-numberline-bar rounded-tiny border border-faint bg-[repeating-linear-gradient(90deg,var(--color-line)_0_1px,transparent_1px_10%),linear-gradient(var(--color-soft),var(--color-soft))]" />

      <span className="absolute left-none top-xl whitespace-nowrap">
        <i className="absolute -top-numberline-tick-top left-none h-numberline-tick w-rule bg-faint" />
        {start}
      </span>
      <span className="absolute right-none top-xl whitespace-nowrap">
        <i className="absolute -top-numberline-tick-top right-none h-numberline-tick w-rule bg-faint" />
        <MathText text={end} />
      </span>

      {marks.map((mark) => {
        const tone = mark.tone
          ? toneClass[mark.tone]
          : { text: '', tick: 'bg-faint' }
        const nearStart = mark.at < 10
        return (
          <span
            key={mark.label}
            className={`absolute whitespace-nowrap ${tone.text} ${
              nearStart ? 'top-numberline-label' : 'top-xl -translate-x-1/2'
            }`}
            style={{ left: `${mark.at}%` }}
          >
            <i
              className={`absolute w-rule ${tone.tick} ${
                nearStart
                  ? '-top-xl left-none h-numberline-mark'
                  : '-top-numberline-tick-top left-1/2 h-numberline-tick'
              }`}
            />
            <MathText text={mark.label} />
          </span>
        )
      })}
    </div>
  )
}

export default NumberLine
