import type { NumberLineMark } from '@/types/math'
import MathText from '@/components/math/MathText'

interface NumberLineProps {
  start: string
  end: string
  marks: NumberLineMark[]
}

const toneClass = {
  right: { text: 'text-green-800', tick: 'bg-green-500' },
  wrong: { text: 'text-rose-800', tick: 'bg-rose-500' },
}

// A bar with tick marks. Marks near the start sit on a lower row, pointing back
// to their spot, so their labels don't run into the start label
function NumberLine({ start, end, marks }: NumberLineProps) {
  return (
    <div className="relative mx-2 h-[92px] text-xs text-gray-500">
      <div className="absolute inset-x-0 top-5 h-3.5 rounded-[3px] border border-gray-400 bg-[repeating-linear-gradient(90deg,#e5e7eb_0_1px,transparent_1px_10%),linear-gradient(#f9fafb,#f9fafb)]" />

      <span className="absolute left-0 top-10 whitespace-nowrap">
        <i className="absolute -top-[26px] left-0 h-[22px] w-0.5 bg-gray-400" />
        {start}
      </span>
      <span className="absolute right-0 top-10 whitespace-nowrap">
        <i className="absolute -top-[26px] right-0 h-[22px] w-0.5 bg-gray-400" />
        <MathText text={end} />
      </span>

      {marks.map((mark) => {
        const tone = mark.tone
          ? toneClass[mark.tone]
          : { text: '', tick: 'bg-gray-400' }
        const nearStart = mark.at < 10
        return (
          <span
            key={mark.label}
            className={`absolute whitespace-nowrap ${tone.text} ${
              nearStart ? 'top-[62px]' : 'top-10 -translate-x-1/2'
            }`}
            style={{ left: `${mark.at}%` }}
          >
            <i
              className={`absolute w-0.5 ${tone.tick} ${
                nearStart
                  ? '-top-12 left-0 h-11'
                  : '-top-[26px] left-1/2 h-[22px]'
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
