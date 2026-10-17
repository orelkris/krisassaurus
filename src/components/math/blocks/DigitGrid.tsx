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
    <div className="flex flex-col gap-2">
      <span className="text-[12.5px] text-gray-400">
        Example: {formatNumber(Number(number)).replace(/ /g, '\u00a0')}
      </span>
      <div
        className="grid gap-1"
        style={{
          gridTemplateColumns: `repeat(${digits.length}, minmax(0, 1fr))`,
        }}
      >
        {digits.map((digit, index) => (
          <div
            key={index}
            className="grid min-w-0 grid-rows-[36px_34px_28px] divide-y divide-gray-200 overflow-hidden rounded-[10px] border border-gray-200 bg-gray-50 text-center"
          >
            <span className="grid place-items-center text-lg font-bold text-green-800">
              {digit}
            </span>
            <span className="grid place-items-center px-0.5 text-[8px] leading-tight sm:text-[9.5px] text-gray-500">
              {columns[index]}
            </span>
            <span className="grid place-items-center text-[9.5px] font-bold tabular-nums sm:text-[11.5px]">
              {formatNumber(
                Number(digit) * 10 ** (digits.length - 1 - index)
              ).replace(/ /g, '\u00a0')}
            </span>
          </div>
        ))}
      </div>
      {note && (
        <p className="text-[12.5px] leading-snug text-gray-400">{note}</p>
      )}
    </div>
  )
}

export default DigitGrid
