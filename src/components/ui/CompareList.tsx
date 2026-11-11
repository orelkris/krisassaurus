export interface CompareRow {
  // e.g. Grade 7, or Grades 1–6 when those grades say the same thing
  label: string
  // What those grades say. A code is shown when it differs between grades,
  // e.g. Strand D, where one topic sits under different codes
  entries: { code?: string; text: string }[]
}

interface CompareListProps {
  rows: CompareRow[]
}

// One expectation across the grades: the grades on the left (above the text
// on phones), what they say on the right, lines between them
function CompareList({ rows }: CompareListProps) {
  return (
    <div className="divide-y divide-line">
      {rows.map((row) => (
        <div
          key={row.label}
          className="flex flex-col gap-xs py-md sm:flex-row sm:gap-xl"
        >
          <p className="pl-sm text-md font-bold whitespace-nowrap text-strand-text sm:w-grade-col sm:shrink-0">
            {row.label}
          </p>
          <div className="col-md max-w-read min-w-none flex-1">
            {row.entries.map((entry, index) => (
              <p key={index} className="text-lg text-fg">
                {entry.code && (
                  <span className="mr-sm font-semibold text-strand-text">
                    {entry.code}
                  </span>
                )}
                {entry.text}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default CompareList
