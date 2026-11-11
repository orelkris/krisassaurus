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
      className="inline-flex flex-wrap gap-px rounded-pill border border-line p-px"
    >
      {options.map((option) => {
        const picked = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={picked}
            onClick={() => onChange(option.value)}
            className={`cursor-pointer rounded-pill px-sm py-xs text-xs whitespace-nowrap transition-colors ${
              picked ? 'bg-primary text-on-primary' : 'text-muted hover:bg-soft'
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
