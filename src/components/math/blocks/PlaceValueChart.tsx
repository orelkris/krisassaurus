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
                className="border border-gray-200 bg-gray-50 px-0.5 py-1 text-[9.5px] font-semibold text-gray-500"
              >
                Thousands
              </th>
            )}
            <th
              colSpan={Math.min(3, digits.length)}
              className="border border-gray-200 bg-gray-50 px-0.5 py-1 text-[9.5px] font-semibold text-gray-500"
            >
              Ones
            </th>
          </tr>
          <tr>
            {columns.map((place) => (
              <th
                key={place}
                className="border border-gray-200 bg-gray-50 px-0.5 py-1 text-[9.5px] font-semibold text-gray-500"
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
                className={`border border-gray-200 px-0.5 py-1.5 text-xl font-bold ${
                  digit === '0' ? 'bg-amber-100 text-amber-800' : ''
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
