import PageHeader from '@/components/layout/PageHeader'
import Breadcrumb from '@/components/ui/Breadcrumb'
import CreativeCycle from '@/components/arts/CreativeCycle'
import { StepBox, StepList } from '@/components/arts/StepBox'
import {
  creativeCentre,
  creativeProcess,
  creativeStages,
} from '@/data/subjects/arts/processes'
import { useHashJump } from '@/hooks/useHashJump'
import ProcessSource from '@/components/arts/ProcessSource'

const stageId = (num: number) => `stage-${num}`

// The Arts' creative process: the cycle, then a box per stage with what
// the student and the teacher do
function CreativeProcessPage() {
  useHashJump()
  return (
    <>
      <PageHeader
        above={
          <Breadcrumb
            className="text-fg"
            items={[{ label: 'Arts' }, { label: creativeProcess.name }]}
          />
        }
        title={creativeProcess.name}
        description={creativeProcess.intro}
      />
      <CreativeCycle
        stages={creativeStages}
        centre={creativeCentre}
        hrefOf={(num) => `#${stageId(num)}`}
      />
      {creativeStages.map((stage, index) => (
        <StepBox
          key={stage.name}
          id={stageId(index + 1)}
          num={index + 1}
          name={stage.name}
        >
          <StepList label="The student" items={stage.student} />
          <StepList label="The teacher" items={stage.teacher} />
        </StepBox>
      ))}
      <ProcessSource pages={creativeProcess.pages} />
    </>
  )
}

export default CreativeProcessPage
