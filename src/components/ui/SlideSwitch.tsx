interface SlideSwitchProps<T extends string | number> {
  // Read out by screen readers, e.g. "Version"
  label: string
  options: { value: T; label: string }[]
  value: T
  onChange: (value: T) => void
}

// A small pill-shaped switch where exactly one option is picked, e.g. Count
// off / Level it up. The same height as a small Button, so they sit side by
// side in a strategy example
function SlideSwitch<T extends string | number>({
  label,
  options,
  value,
  onChange,
}: SlideSwitchProps<T>) {
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex flex-wrap gap-0.5 rounded-full border border-gray-200 p-0.5"
    >
      {options.map((option) => {
        const picked = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={picked}
            onClick={() => onChange(option.value)}
            className={`cursor-pointer rounded-full px-2.5 py-1 text-xs whitespace-nowrap transition-colors ${
              picked
                ? 'bg-gray-900 text-white'
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

export default SlideSwitch
