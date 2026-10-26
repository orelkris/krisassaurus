interface ChoiceChipsProps<T extends string | number> {
  // Read out by screen readers, e.g. "Timer"
  label: string
  options: { value: T; label: string }[]
  value: T
  onChange: (value: T) => void
  // Joins the options into one bar of equal parts that fills its column
  joined?: boolean
}

// A row of rounded buttons where exactly one is picked, or with joined, one
// bar split into equal parts
function ChoiceChips<T extends string | number>({
  label,
  options,
  value,
  onChange,
  joined = false,
}: ChoiceChipsProps<T>) {
  return (
    <div
      role="group"
      aria-label={label}
      className={
        joined
          ? 'grid auto-cols-fr grid-flow-col gap-1 rounded-full border border-gray-200 p-1'
          : 'row-stack flex-wrap'
      }
    >
      {options.map((option) => {
        const picked = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={picked}
            onClick={() => onChange(option.value)}
            className={`cursor-pointer rounded-full border py-2 text-sm whitespace-nowrap transition-colors ${
              joined ? 'px-1' : 'px-4'
            } ${
              picked
                ? 'border-gray-900 bg-gray-900 text-white'
                : `hover:bg-gray-50 ${joined ? 'border-transparent text-gray-500' : 'border-gray-200 text-gray-900'}`
            }`}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

export default ChoiceChips
