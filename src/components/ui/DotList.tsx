interface DotListProps {
  items: string[]
  // Colour of the dot before each item, e.g. the strand's accent
  color: string
}

// A list with a small coloured dot before each item, one item per line.
// Used for a strand's parts, e.g. in StrandCards and Math's Strand A panel
function DotList({ items, color }: DotListProps) {
  return (
    <ul className="text-small flex flex-col gap-px pl-md">
      {items.map((item) => (
        <li key={item} className="relative">
          <span
            className="absolute top-[0.55em] -left-md size-dot rounded-pill"
            style={{ backgroundColor: color }}
          />
          {item}
        </li>
      ))}
    </ul>
  )
}

export default DotList
