import { Plus } from 'lucide-react'
import TwoColumnLayout from '@/components/layout/TwoColumnLayout'
import PageHeader from '@/components/layout/PageHeader'
import Button from '@/components/ui/Button'
import ButtonLink from '@/components/ui/ButtonLink'
import ChoiceChips from '@/components/ui/ChoiceChips'
import ScenarioInput from '@/components/quickGame/ScenarioInput'
import { games, timerOptions } from '@/data/quickGame/games'
import type { QuickGame, ScenarioDraft } from '@/types/quickGame'

interface QuickGameSetupProps {
  game: QuickGame
  onGameChange: (slug: string) => void
  rows: ScenarioDraft[]
  onRowChange: (index: number, change: Partial<ScenarioDraft>) => void
  onAddRow: () => void
  onRemoveRow: (index: number) => void
  // The row just added, which gets the cursor
  addedId: string
  seconds: number
  onSecondsChange: (seconds: number) => void
  // False when there is no scenario to play yet
  canStart: boolean
  onStart: () => void
}

// Before the game, in the site's usual two columns: Start, the handout and the
// timer in the sidebar, the scenarios in the main area. The game picker
// only shows once there are two games
function QuickGameSetup({
  game,
  onGameChange,
  rows,
  onRowChange,
  onAddRow,
  onRemoveRow,
  addedId,
  seconds,
  onSecondsChange,
  canStart,
  onStart,
}: QuickGameSetupProps) {
  const sidebar = (
    <>
      <Button onClick={onStart} disabled={!canStart} variant="accent" size="lg">
        Start
      </Button>

      <ButtonLink href={game.handoutUrl} variant="secondary" size="lg">
        Handout
      </ButtonLink>

      {games.length > 1 && (
        <div className="col-stack">
          <p className="text-label">Game</p>
          <ChoiceChips
            label="Game"
            options={games.map((g) => ({ value: g.slug, label: g.title }))}
            value={game.slug}
            onChange={onGameChange}
          />
        </div>
      )}

      <div className="col-stack">
        <p className="text-label">Timer</p>
        <ChoiceChips
          label="Timer"
          options={timerOptions.map((s) => ({ value: s, label: `${s} s` }))}
          value={seconds}
          onChange={onSecondsChange}
          joined
        />
      </div>
    </>
  )

  return (
    <TwoColumnLayout sidebar={sidebar} scrollable>
      <PageHeader
        above={<p className="text-label">Quick Game</p>}
        title={game.title}
      />

      <section className="col-section">
        <h2 className="heading-section">Add Scenario</h2>
        <div className="col-stack">
          {rows.map((draft, index) => (
            <ScenarioInput
              key={draft.id}
              number={index + 1}
              draft={draft}
              autoFocus={draft.id === addedId}
              onChange={(change) => onRowChange(index, change)}
              onRemove={() => onRemoveRow(index)}
            />
          ))}
          <button
            type="button"
            aria-label="Add scenario"
            title="Add scenario"
            onClick={onAddRow}
            className="flex cursor-pointer justify-center rounded-xl border border-dashed border-gray-300 py-3 text-gray-400 transition-colors hover:border-gray-900 hover:text-gray-900"
          >
            <Plus size={22} />
          </button>
        </div>
      </section>
    </TwoColumnLayout>
  )
}

export default QuickGameSetup
