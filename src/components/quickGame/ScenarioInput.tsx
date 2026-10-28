import { useState } from 'react'
import { X } from 'lucide-react'
import Expand from '@/components/ui/Expand'
import IconButton from '@/components/ui/IconButton'
import type { ScenarioDraft } from '@/types/quickGame'

interface ScenarioInputProps {
  // Its place in the list, from 1
  number: number
  draft: ScenarioDraft
  // The page's "Show answers" switch
  showAnswers: boolean
  // Puts the cursor in the scenario box, e.g. for a row just added
  autoFocus?: boolean
  onChange: (change: Partial<ScenarioDraft>) => void
  onRemove: () => void
}

// One scenario on the Quick Game page: what goes on the board, and its
// matching question from the handout, shown when the answer is revealed.
// Filled-in matching questions stay hidden until the page's "Show answers"
// switch is on, so the list doesn't give the answers away. A row that had no
// question when it appeared (e.g. a new one) keeps its box open to type in
function ScenarioInput({
  number,
  draft,
  showAnswers,
  autoFocus = false,
  onChange,
  onRemove,
}: ScenarioInputProps) {
  // Decided once, so the box doesn't close while the question is being typed
  const [startedEmpty] = useState(!draft.answer.trim())

  return (
    <div className="card flex items-start gap-stack">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-200 text-sm font-semibold tabular-nums">
        {number}
      </span>

      <div className="flex min-w-0 flex-1 flex-col">
        <textarea
          aria-label={`Scenario ${number}`}
          placeholder="Scenario"
          rows={2}
          autoFocus={autoFocus}
          value={draft.text}
          onChange={(event) => onChange({ text: event.target.value })}
          className="field field-sizing-content min-h-16 resize-none"
        />

        <Expand open={showAnswers || startedEmpty}>
          {/* The gap sits inside, so a closed box leaves no space */}
          <div className="pt-stack">
            <textarea
              aria-label={`Matching question for scenario ${number}`}
              placeholder="Matching question"
              rows={1}
              value={draft.answer}
              onChange={(event) => onChange({ answer: event.target.value })}
              className="field field-sizing-content resize-none"
            />
          </div>
        </Expand>
      </div>

      <IconButton label={`Remove scenario ${number}`} onClick={onRemove}>
        <X size={18} />
      </IconButton>
    </div>
  )
}

export default ScenarioInput
