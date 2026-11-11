const places = [
  'Hundred thousands',
  'Ten thousands',
  'Thousands',
  'Hundreds',
  'Tens',
  'Ones',
]

interface PlaceValueChartProps {
  // Up to six digits, e.g. "509608"
  number: string
}

// Thousands and ones periods, with zeros tinted so students see them hold a place
function PlaceValueChart({ number }: PlaceValueChartProps) {
  const digits = number.split('')
  const columns = places.slice(places.length - digits.length)

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-fixed border-collapse text-center tabular-nums">
        <thead>
          <tr>
            {digits.length > 3 && (
              <th
                colSpan={digits.length - 3}
                className="border border-line bg-soft px-px py-xs text-2xs font-semibold text-muted"
              >
                Thousands
              </th>
            )}
            <th
              colSpan={Math.min(3, digits.length)}
              className="border border-line bg-soft px-px py-xs text-2xs font-semibold text-muted"
            >
              Ones
            </th>
          </tr>
          <tr>
            {columns.map((place) => (
              <th
                key={place}
                className="border border-line bg-soft px-px py-xs text-2xs font-semibold text-muted"
              >
                {place}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {digits.map((digit, index) => (
              <td
                key={index}
                className={`border border-line px-px py-xs text-xl font-bold ${
                  digit === '0' ? 'bg-highlight-bg text-highlight' : ''
                }`}
              >
                {digit}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default PlaceValueChart
