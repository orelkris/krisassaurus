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
        <ol className="flex flex-col gap-sm">
          {block.items.map((step, index) => (
            <li
              key={step}
              className="grid grid-cols-[var(--spacing-step)_minmax(0,1fr)] gap-sm text-sm leading-normal"
            >
              <span className="grid size-step place-items-center rounded-pill border border-line bg-soft text-xs font-bold">
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
        <p className="flex items-start gap-sm rounded-card border border-line bg-soft px-md py-sm text-sm leading-normal">
          <span aria-hidden="true">💡</span>
          <span>
            <MathText text={block.body} />
          </span>
        </p>
      )
    case 'ask':
      return (
        <div
          className={`flex flex-col gap-xs rounded-card border px-md py-md ${
            block.mistake
              ? 'border-wrong-mark bg-wrong-bg'
              : 'border-line bg-soft'
          }`}
        >
          {block.head && (
            <span
              className={`text-xs font-bold uppercase tracking-wide ${
                block.mistake ? 'text-wrong' : 'text-faint'
              }`}
            >
              {block.head}
            </span>
          )}
          <p className="text-sm font-medium">
            <MathText text={block.question} />
          </p>
          {block.items && (
            <div className="mt-xs">
              <Tiles items={block.items} onColor />
            </div>
          )}
        </div>
      )
    case 'rows':
      return (
        <dl className="flex flex-col divide-y divide-line">
          {block.rows.map(([label, value], index) => (
            <div
              key={label}
              className="flex flex-wrap items-baseline justify-between gap-x-md gap-y-px px-px py-sm text-sm"
            >
              <dt className="shrink-0 text-muted">{label}</dt>
              <dd
                className={`min-w-none text-right font-semibold ${index === 0 ? 'text-md text-answer' : ''}`}
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
