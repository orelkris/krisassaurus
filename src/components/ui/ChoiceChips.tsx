interface ChoiceChipsProps<T extends string | number> {
  // Read out by screen readers, e.g. "Timer"
  label: string
  options: { value: T; label: string }[]
  value: T
  onChange: (value: T) => void
}

// A row of rounded buttons where exactly one is picked
function ChoiceChips<T extends string | number>({
  label,
  options,
  value,
  onChange,
}: ChoiceChipsProps<T>) {
  return (
    <div role="group" aria-label={label} className="row-stack flex-wrap">
      {options.map((option) => {
        const picked = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={picked}
            onClick={() => onChange(option.value)}
            className={`cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors ${
              picked
                ? 'border-gray-900 bg-gray-900 text-white'
                : 'border-gray-200 text-gray-900 hover:bg-gray-50'
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
