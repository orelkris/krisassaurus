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
        checked ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'
      }`}
    >
      <span
        className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${
          checked ? 'bg-gray-900' : 'bg-gray-200'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
            checked ? 'translate-x-4' : ''
          }`}
        />
      </span>
      {label}
    </button>
  )
}

export default Switch
