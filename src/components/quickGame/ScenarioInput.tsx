import { useState } from 'react'
import { Minus, Plus, X } from 'lucide-react'
import Expand from '@/components/ui/Expand'
import IconButton from '@/components/ui/IconButton'
import type { ScenarioDraft } from '@/types/quickGame'

interface ScenarioInputProps {
  // Its place in the list, from 1
  number: number
  draft: ScenarioDraft
  // Puts the cursor in the scenario box, e.g. for a row just added
  autoFocus?: boolean
  onChange: (change: Partial<ScenarioDraft>) => void
  onRemove: () => void
}

// One scenario on the Quick Game page: what goes on the board, and its
// matching question from the handout, shown when the answer is revealed.
// A matching question that is already filled in starts hidden, so the list
// doesn't give the answers away; the + beside the scenario slides it open.
// A new scenario starts with the box open
function ScenarioInput({
  number,
  draft,
  autoFocus = false,
  onChange,
  onRemove,
}: ScenarioInputProps) {
  const [showAnswer, setShowAnswer] = useState(!draft.answer.trim())

  return (
    <div className="card flex items-start gap-stack">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-200 text-sm font-semibold tabular-nums">
        {number}
      </span>

      {/* Two columns, so the matching question lines up under the scenario
          and the + sits beside the scenario */}
      <div className="grid min-w-0 flex-1 grid-cols-[1fr_auto] items-start gap-x-tight">
        <textarea
          aria-label={`Scenario ${number}`}
          placeholder="Scenario"
          rows={2}
          autoFocus={autoFocus}
          value={draft.text}
          onChange={(event) => onChange({ text: event.target.value })}
          className="field field-sizing-content min-h-16 resize-none"
        />
        <IconButton
          label={
            showAnswer ? 'Hide matching question' : 'Show matching question'
          }
          onClick={() => setShowAnswer(!showAnswer)}
        >
          {showAnswer ? <Minus size={18} /> : <Plus size={18} />}
        </IconButton>

        <Expand open={showAnswer}>
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
