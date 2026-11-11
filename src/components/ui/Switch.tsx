interface SwitchProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

// An on/off switch with its label beside it
function Switch({ label, checked, onChange }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`row-stack cursor-pointer text-sm transition-colors ${
        checked ? 'text-fg' : 'text-muted hover:text-fg'
      }`}
    >
      <span
        className={`relative h-switch w-switch-w shrink-0 rounded-pill transition-colors ${
          checked ? 'bg-primary' : 'bg-line'
        }`}
      >
        <span
          className={`absolute top-px left-px size-knob rounded-pill bg-page shadow-float transition-transform ${
            checked ? 'translate-x-knob' : ''
          }`}
        />
      </span>
      {label}
    </button>
  )
}

export default Switch
