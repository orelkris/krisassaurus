interface PeriodsChartProps {
  // e.g. Millions, Thousands, Ones
  periods: string[]
}

// Each period with its own hundreds, tens and ones
function PeriodsChart({ periods }: PeriodsChartProps) {
  return (
    <div className="flex flex-col gap-sm">
      <p className="text-xs text-faint">H = hundreds, T = tens, O = ones</p>
      <div
        className="grid gap-xs"
        style={{
          gridTemplateColumns: `repeat(${periods.length}, minmax(0, 1fr))`,
        }}
      >
        {periods.map((period) => (
          <div
            key={period}
            className="overflow-hidden rounded-row border border-line text-center"
          >
            <b className="block bg-highlight-bg p-xs text-xs text-highlight">
              {period}
            </b>
            <div className="grid grid-cols-3 divide-x divide-line">
              {['H', 'T', 'O'].map((place) => (
                <span key={place} className="py-xs text-sm font-bold">
                  {place}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PeriodsChart
