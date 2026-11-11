import { formatNumber } from '@/lib/mathText'

const places = [
  'Hundred thousands',
  'Ten thousands',
  'Thousands',
  'Hundreds',
  'Tens',
  'Ones',
]

interface DigitGridProps {
  // Up to six digits, e.g. "945107"
  number: string
  note?: string
}

// Each digit over its place and the value it adds, e.g. 4 · Ten thousands · 40 000
function DigitGrid({ number, note }: DigitGridProps) {
  const digits = number.split('')
  const columns = places.slice(places.length - digits.length)

  return (
    <div className="flex flex-col gap-sm">
      <span className="text-xs text-faint">
        Example: {formatNumber(Number(number)).replace(/ /g, '\u00a0')}
      </span>
      <div
        className="grid gap-xs"
        style={{
          gridTemplateColumns: `repeat(${digits.length}, minmax(0, 1fr))`,
        }}
      >
        {digits.map((digit, index) => (
          <div
            key={index}
            className="grid min-w-none grid-rows-[var(--spacing-digit-row)_var(--spacing-digit-name)_var(--spacing-digit-value)] divide-y divide-line overflow-hidden rounded-row border border-line bg-soft text-center"
          >
            <span className="grid place-items-center text-lg font-bold text-correct">
              {digit}
            </span>
            <span className="grid place-items-center px-px text-3xs leading-tight sm:text-2xs text-muted">
              {columns[index]}
            </span>
            <span className="grid place-items-center text-2xs font-bold tabular-nums sm:text-xs">
              {formatNumber(
                Number(digit) * 10 ** (digits.length - 1 - index)
              ).replace(/ /g, '\u00a0')}
            </span>
          </div>
        ))}
      </div>
      {note && <p className="text-xs leading-snug text-faint">{note}</p>}
    </div>
  )
}

export default DigitGrid
