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
          ? 'grid auto-cols-fr grid-flow-col gap-xs rounded-pill border border-line p-xs'
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
            className={`cursor-pointer rounded-pill border py-sm text-sm whitespace-nowrap transition-colors ${
              joined ? 'px-xs' : 'px-md'
            } ${
              picked
                ? 'border-primary bg-primary text-on-primary'
                : `hover:bg-soft ${joined ? 'border-transparent text-muted' : 'border-line text-fg'}`
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
