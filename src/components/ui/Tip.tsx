interface TipProps {
  // The bold start, e.g. "Bonus tip:"
  lead: string
  text: string
  // The band's colour
  tint: string
}

// A paragraph on a tinted band that starts with a bold label
function Tip({ lead, text, tint }: TipProps) {
  return (
    <p className="rounded-xl px-3.5 py-2.5" style={{ backgroundColor: tint }}>
      <b>{lead}</b> {text}
    </p>
  )
}

export default Tip
