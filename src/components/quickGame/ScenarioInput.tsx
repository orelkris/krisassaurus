import type { ScenarioDraft } from '@/types/quickGame'

interface ScenarioInputProps {
  // Its place in the list, from 1
  number: number
  draft: ScenarioDraft
  // Puts the cursor in the scenario box, e.g. for a row just added
  autoFocus?: boolean
  onChange: (change: Partial<ScenarioDraft>) => void
}

// One scenario on the Quick Game page: what goes on the board, and its
// matching question from the handout, shown when the answer is revealed
function ScenarioInput({
  number,
  draft,
  autoFocus = false,
  onChange,
}: ScenarioInputProps) {
  return (
    <div className="card flex items-start gap-stack">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-200 text-sm font-semibold tabular-nums">
        {number}
      </span>

      <div className="col-stack min-w-0 flex-1">
        <textarea
          aria-label={`Scenario ${number}`}
          placeholder="Scenario"
          rows={2}
          autoFocus={autoFocus}
          value={draft.text}
          onChange={(event) => onChange({ text: event.target.value })}
          className="field field-sizing-content min-h-16 resize-none"
        />
        <textarea
          aria-label={`Matching question for scenario ${number}`}
          placeholder="Matching question"
          rows={1}
          value={draft.answer}
          onChange={(event) => onChange({ answer: event.target.value })}
          className="field field-sizing-content resize-none"
        />
      </div>
    </div>
  )
}

export default ScenarioInput
