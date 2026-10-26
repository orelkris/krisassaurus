import PageHeader from '@/components/layout/PageHeader'
import Button from '@/components/ui/Button'
import ButtonLink from '@/components/ui/ButtonLink'
import ChoiceChips from '@/components/ui/ChoiceChips'
import { games, timerOptions } from '@/data/quickGame/games'
import { scenarios } from '@/data/quickGame/scenarios'
import type { QuickGame } from '@/types/quickGame'

interface QuickGameSetupProps {
  game: QuickGame
  onGameChange: (slug: string) => void
  seconds: number
  onSecondsChange: (seconds: number) => void
  onStart: () => void
}

// Before the game: one panel with the game, the time per scenario, Start
// and the handout. The game picker only shows once there is more than one
function QuickGameSetup({
  game,
  onGameChange,
  seconds,
  onSecondsChange,
  onStart,
}: QuickGameSetupProps) {
  const count = scenarios[game.slug]?.length ?? 0

  return (
    <>
      <PageHeader title="Quick Game" />

      <section className="panel col-page max-w-xl">
        {games.length > 1 && (
          <ChoiceChips
            label="Game"
            options={games.map((g) => ({ value: g.slug, label: g.title }))}
            value={game.slug}
            onChange={onGameChange}
          />
        )}

        <div className="col-tight">
          <h2 className="heading-section">{game.title}</h2>
          <p className="text-small">{count} scenarios</p>
        </div>

        <div className="col-stack">
          <h3 className="text-label">Timer</h3>
          <ChoiceChips
            label="Timer"
            options={timerOptions.map((s) => ({ value: s, label: `${s} s` }))}
            value={seconds}
            onChange={onSecondsChange}
          />
        </div>

        <div className="row-stack flex-wrap">
          <Button onClick={onStart}>Start</Button>
          <ButtonLink href={game.handoutUrl} variant="secondary">
            Handout
          </ButtonLink>
        </div>
      </section>
    </>
  )
}

export default QuickGameSetup
