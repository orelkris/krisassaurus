import PageHeader from '@/components/layout/PageHeader'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ProcessSource from '@/components/arts/ProcessSource'
import ProcessSteps from '@/components/arts/ProcessSteps'
import { StepBox, StepList, StepText } from '@/components/arts/StepBox'
import {
  criticalAspects,
  criticalProcess,
} from '@/data/subjects/arts/processes'
import { useHashJump } from '@/hooks/useHashJump'
import { STRAND_IDS } from '@/types/curriculum'

const aspectId = (num: number) => `aspect-${num}`

// The Arts' critical analysis process: its five aspects as numbered
// circles, then a box per aspect with its description and guiding
// questions. Each aspect takes a strand letter's colour, for now
function CriticalProcessPage() {
  useHashJump()
  return (
    <>
      <PageHeader
        above={
          <Breadcrumb
            className="text-fg"
            items={[{ label: 'Arts' }, { label: criticalProcess.name }]}
          />
        }
        title={criticalProcess.name}
        description={criticalProcess.intro}
      />
      <ProcessSteps
        names={criticalAspects.map((aspect) => aspect.name)}
        hrefOf={(num) => `#${aspectId(num)}`}
        label="Aspects"
      />
      {criticalAspects.map((aspect, index) => (
        <StepBox
          key={aspect.name}
          id={aspectId(index + 1)}
          num={index + 1}
          name={aspect.name}
          strandId={STRAND_IDS[index]}
        >
          <StepText>{aspect.description}</StepText>
          <StepList strand label="Guiding questions" items={aspect.questions} />
          {aspect.ownWork && (
            <StepList
              strand
              label="About their own work"
              items={aspect.ownWork}
            />
          )}
        </StepBox>
      ))}
      <ProcessSource pages={criticalProcess.pages} />
    </>
  )
}

export default CriticalProcessPage
