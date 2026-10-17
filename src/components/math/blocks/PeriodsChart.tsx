interface PeriodsChartProps {
  // e.g. Millions, Thousands, Ones
  periods: string[]
}

// Each period with its own hundreds, tens and ones
function PeriodsChart({ periods }: PeriodsChartProps) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[12.5px] text-gray-400">
        H = hundreds, T = tens, O = ones
      </p>
      <div
        className="grid gap-1.5"
        style={{
          gridTemplateColumns: `repeat(${periods.length}, minmax(0, 1fr))`,
        }}
      >
        {periods.map((period) => (
          <div
            key={period}
            className="overflow-hidden rounded-[10px] border border-gray-200 text-center"
          >
            <b className="block bg-amber-100 p-1 text-[11.5px] text-amber-800">
              {period}
            </b>
            <div className="grid grid-cols-3 divide-x divide-gray-200">
              {['H', 'T', 'O'].map((place) => (
                <span key={place} className="py-1.5 text-[13px] font-bold">
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
