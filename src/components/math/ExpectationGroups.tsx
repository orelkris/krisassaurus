import { Fragment } from 'react'
import type { Expectation } from '@/types/math'
import ExpectationRow from '@/components/math/ExpectationRow'
import FramedGroup from '@/components/ui/FramedGroup'
import { groupByIdea, groupByOverall } from '@/data/math/expectations'
import { getStrand } from '@/data/math/strands'

interface ExpectationGroupsProps {
  expectations: Expectation[]
}

// A strand's expectations in one grade. Each overall expectation (B1, B2...)
// is a bordered box with its name centred on the top border. Inside, each
// idea (Whole & rational numbers...) is a heading in the strand's colour over
// its expectations, with a line between ideas. The boxes are handed to the
// page's container, so they sit the same distance apart as everything else
function ExpectationGroups({ expectations }: ExpectationGroupsProps) {
  return (
    <>
      {groupByOverall(expectations).map((group) => (
        <FramedGroup
          key={group[0].overall}
          label={`${group[0].overall} · ${group[0].overallTitle}`}
        >
          {groupByIdea(group).map(({ idea, expectations: items }, index) => (
            <Fragment key={items[0].id}>
              {index > 0 && <hr className="border-gray-200" />}
              <div className="col-tight">
                {idea && (
                  <p
                    className="text-small ml-3 font-semibold"
                    style={{ color: getStrand(idea.strand).colors.text }}
                  >
                    {idea.name}
                  </p>
                )}
                <div className="flex flex-col">
                  {items.map((expectation) => (
                    <ExpectationRow
                      key={expectation.id}
                      expectation={expectation}
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