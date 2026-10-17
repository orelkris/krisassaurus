import type { MathBlock } from '@/types/math'
import MathText from '@/components/math/MathText'
import Tiles from '@/components/math/blocks/Tiles'
import PlaceValueChart from '@/components/math/blocks/PlaceValueChart'
import DigitGrid from '@/components/math/blocks/DigitGrid'
import PeriodsChart from '@/components/math/blocks/PeriodsChart'
import NumberLine from '@/components/math/blocks/NumberLine'

interface MathBlockViewProps {
  block: MathBlock
}

// One piece of a concept or activity card
function MathBlockView({ block }: MathBlockViewProps) {
  switch (block.type) {
    case 'text':
      return (
        <p className="text-sm leading-relaxed">
          <MathText text={block.body} />
        </p>
      )
    case 'tiles':
      return <Tiles items={block.items} />
    case 'steps':
      return (
        <ol className="flex flex-col gap-2.5">
          {block.items.map((step, index) => (
            <li
              key={step}
              className="grid grid-cols-[26px_minmax(0,1fr)] gap-2.5 text-sm leading-normal"
            >
              <span className="grid h-6 w-6 place-items-center rounded-full border border-gray-200 bg-gray-50 text-xs font-bold">
                {index + 1}
              </span>
              <span>
                <MathText text={step} />
              </span>
            </li>
          ))}
        </ol>
      )
    case 'tip':
      return (
        <p className="flex items-start gap-2.5 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-[13px] leading-normal">
          <span aria-hidden="true">💡</span>
          <span>
            <MathText text={block.body} />
          </span>
        </p>
      )
    case 'ask':
      return (
        <div
          className={`flex flex-col gap-1 rounded-xl border px-4 py-3.5 ${
            block.mistake
              ? 'border-rose-500 bg-rose-100'
              : 'border-gray-200 bg-gray-50'
          }`}
        >
          {block.head && (
            <span
              className={`text-[11px] font-bold uppercase tracking-wide ${
                block.mistake ? 'text-rose-800' : 'text-gray-400'
              }`}
            >
              {block.head}
            </span>
          )}
          <p className="text-sm font-medium">
            <MathText text={block.question} />
          </p>
          {block.items && (
            <div className="mt-1.5">
              <Tiles items={block.items} onColor />
            </div>
          )}
        </div>
      )
    case 'rows':
      return (
        <dl className="flex flex-col divide-y divide-gray-200">
          {block.rows.map(([label, value], index) => (
            <div
              key={label}
              className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5 px-0.5 py-2 text-[13px]"
            >
              <dt className="shrink-0 text-gray-500">{label}</dt>
              <dd
                className={`min-w-0 text-right font-semibold ${index === 0 ? 'text-base text-blue-800' : ''}`}
              >
                <MathText text={value} />
              </dd>
            </div>
          ))}
        </dl>
      )
    case 'placeValue':
      return <PlaceValueChart number={block.number} />
    case 'digits':
      return <DigitGrid number={block.number} note={block.note} />
    case 'periods':
      return <PeriodsChart periods={block.periods} />
    case 'numberLine':
      return (
        <NumberLine start={block.start} end={block.end} marks={block.marks} />
      )
  }
}

export default MathBlockView
