import type { CurriculumItem } from '@/types/math'
import MathText from '@/components/math/MathText'

interface CurriculumListProps {
  items: CurriculumItem[]
}

const capitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1)

// A short line ending in ":" with points under it is a heading, not a bullet
const isHeading = (item: CurriculumItem) =>
  item.items.length > 0 &&
  item.text.endsWith(':') &&
  item.text.split(/\s+/).length <= 8

function BulletList({ items }: CurriculumListProps) {
  return (
    <ul className="flex list-disc flex-col gap-xs pl-md text-sm [&_ul]:mt-xs [&_ul]:gap-px [&_ul]:list-[circle] [&_ul]:pl-md [&_ul]:text-sm [&_ul]:text-muted">
      {items.map((item, index) => (
        <li key={index}>
          <MathText text={capitalize(item.text)} />
          {item.items.length > 0 && <BulletList items={item.items} />}
        </li>
      ))}
    </ul>
  )
}

// The ministry's key concepts or examples, keeping the PDF's nesting
function CurriculumList({ items }: CurriculumListProps) {
  // Runs of plain bullets stay together; each heading starts its own list
  const groups: { heading?: string; items: CurriculumItem[] }[] = []
  items.forEach((item) => {
    if (isHeading(item)) {
      groups.push({
        heading: capitalize(item.text.slice(0, -1)),
        items: item.items,
      })
    } else if (groups.length && !groups[groups.length - 1].heading) {
      groups[groups.length - 1].items.push(item)
    } else {
      groups.push({ items: [item] })
    }
  })

  return (
    <div className="flex flex-col gap-sm">
      {groups.map((group, index) => (
        <div key={index} className="flex flex-col gap-xs">
          {group.heading && (
            <p className="text-sm font-semibold">{group.heading}</p>
          )}
          <BulletList items={group.items} />
        </div>
      ))}
    </div>
  )
}

export default CurriculumList
