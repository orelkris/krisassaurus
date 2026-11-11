interface NumberedStepsProps {
  // Each step starts with a bold lead-in, e.g. "Read the story.", and can
  // end with a short bullet list
  items: { lead: string; text: string; items?: string[] }[]
  // The circles take the accent, the line between them the tint
  colors: { bg: string; accent: string }
}

// A numbered list where each number sits in a coloured circle, joined to
// the next by a thin line. The circle is one line tall (leading-step), so it
// lines up with the step's first line
function NumberedSteps({ items, colors }: NumberedStepsProps) {
  return (
    <ol>
      {items.map((item, step) => (
        <li
          key={item.lead}
          className="relative pb-md pl-xl leading-step last:pb-none"
        >
          <span
            aria-hidden="true"
            className="absolute top-none left-none grid size-step place-items-center rounded-pill text-xs leading-none font-bold text-on-primary tabular-nums"
            style={{ backgroundColor: colors.accent }}
          >
            {step + 1}
          </span>
          {step < items.length - 1 && (
            <span
              aria-hidden="true"
              className="absolute top-xl bottom-xs left-step-line w-rule"
              style={{ backgroundColor: colors.bg }}
            />
          )}
          <b>{item.lead}</b> {item.text}
          {item.items && (
            <ul className="col-tight mt-xs list-disc pl-lg">
              {item.items.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ol>
  )
}

export default NumberedSteps
