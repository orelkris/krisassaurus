import { Fragment, type ReactNode } from 'react'
import ExpectationRow, {
  type ExpectationItem,
} from '@/components/ui/ExpectationRow'
import FramedGroup from '@/components/ui/FramedGroup'

export interface ExpectationSection {
  id: string
  // e.g. an idea or topic name, shown above its rows
  heading?: string
  items: ExpectationItem[]
}

export interface ExpectationGroup {
  id: string
  // Shown on the top border, e.g. B1 · Number Sense or Grade 6
  label: ReactNode
  // Colour of the headings and codes, e.g. the strand's text colour
  color?: string
  // Colours the frame and its label, e.g. the strand's colours
  tone?: { bg: string; text: string; accent: string }
  sections: ExpectationSection[]
  // Shown when the group has no rows
  empty?: string
}

interface ExpectationGroupsProps {
  groups: ExpectationGroup[]
}

// Each group is a bordered box with its label centred on the top border,
// in the group's colours when it has a tone.
// Inside, each section is an optional heading in the group's colour over its
// rows, with a line between sections. The boxes are handed to the page's
// container, so they sit the same distance apart as everything else
function ExpectationGroups({ groups }: ExpectationGroupsProps) {
  return (
    <>
      {groups.map((group) => (
        <FramedGroup key={group.id} label={group.label} tone={group.tone}>
          {group.sections.length === 0 && group.empty && (
            <p className="text-muted ml-3">{group.empty}</p>
          )}
          {group.sections.map((section, index) => (
            <Fragment key={section.id}>
              {index > 0 && <hr className="border-gray-200" />}
              <div className="col-tight">
                {section.heading && (
                  <p
                    className="text-small ml-3 font-semibold"
                    style={{ color: group.color }}
                  >
                    {section.heading}
                  </p>
                )}
                <div className="flex flex-col">
                  {section.items.map((item) => (
                    <ExpectationRow
                      key={item.id}
                      item={item}
                      color={group.color}
                    />
                  ))}
                </div>
              </div>
            </Fragment>
          ))}
        </FramedGroup>
      ))}
    </>
  )
}

export default ExpectationGroups
