interface NumberedStepsProps {
  // Each step starts with a bold lead-in, e.g. "Read the story.", and can
  // end with a short bullet list
  items: { lead: string; text: string; items?: string[] }[]
  // The circles take the accent, the line between them the tint
  colors: { bg: string; accent: string }
}

// A numbered list where each number sits in a coloured circle, joined to
// the next by a thin line. The circle is one line tall (leading-6), so it
// lines up with the step's first line
function NumberedSteps({ items, colors }: NumberedStepsProps) {
  return (
    <ol>
      {items.map((item, step) => (
        <li key={item.lead} className="relative pb-4 pl-10 leading-6 last:pb-0">
          <span
            aria-hidden="true"
            className="absolute top-0 left-0 grid h-6 w-6 place-items-center rounded-full text-xs leading-none font-bold text-white tabular-nums"
            style={{ backgroundColor: colors.accent }}
          >
            {step + 1}
          </span>
          {step < items.length - 1 && (
            <span
              aria-hidden="true"
              className="absolute top-7 bottom-1 left-[11px] w-0.5"
              style={{ backgroundColor: colors.bg }}
            />
          )}
          <b>{item.lead}</b> {item.text}
          {item.items && (
            <ul className="col-tight mt-1.5 list-disc pl-5">
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
