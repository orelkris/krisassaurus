import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import QuickGameSetup from '@/components/quickGame/QuickGameSetup'
import QuickGameBoard from '@/components/quickGame/QuickGameBoard'
import { defaultSeconds, games, getGame } from '@/data/quickGame/games'
import { useCountdown } from '@/hooks/useCountdown'
import { useLoopingMusic } from '@/hooks/useLoopingMusic'
import { useScenarioDrafts } from '@/hooks/useScenarioDrafts'
import { useStoredState } from '@/hooks/useStoredState'

interface QuickGamePageProps {
  // Opened from /quick-game-start: straight onto the board with no navbar,
  // and ending the game goes to /quick-game
  direct?: boolean
}

// Quick Game: the teacher shows one scenario at a time on the board, with
// music and a timer, and students find the match on their handout
function QuickGamePage({ direct = false }: QuickGamePageProps) {
  const navigate = useNavigate()
  const [gameSlug, setGameSlug] = useState(games[0].slug)
  // Saved, so /quick-game-start uses the time last picked on the setup page
  const [seconds, setSeconds] = useStoredState(
    'quick-game:seconds',
    defaultSeconds
  )
  // On the board, and whether Play has been pressed yet
  const [onBoard, setOnBoard] = useState(direct)
  const [started, setStarted] = useState(false)
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)

  const game = getGame(gameSlug) ?? games[0]
  const drafts = useScenarioDrafts(game.slug)
  const list = drafts.playable
  const scenario = list[index]

  const music = useLoopingMusic(game.music)
  // The music fades out when time is up
  const timer = useCountdown(seconds, music.pause)

  // A new scenario waits with the full time on the clock, so the teacher
  // can read it out first. Play starts the timer and the music
  const show = (next: number) => {
    setIndex(next)
    setRevealed(false)
    timer.reset()
    music.pause()
  }

  // Start opens the board on the game's title. The first Play shows the
  // first scenario, so the teacher can go full screen first
  const openBoard = () => {
    setStarted(false)
    setOnBoard(true)
  }

  const end = () => {
    timer.pause()
    music.stop()
    if (direct) navigate('/quick-game')
    else setOnBoard(false)
  }

  const playPause = () => {
    if (!started) {
      setStarted(true)
      show(0)
    } else if (timer.running) {
      timer.pause()
      music.pause()
    } else {
      timer.resume()
      music.play()
    }
  }

  // Showing the answer stops the clock and the music
  const reveal = () => {
    if (!started) return
    if (!revealed) {
      timer.pause()
      music.pause()
    }
    setRevealed(!revealed)
  }

  // Nothing to play yet: write some scenarios first
  if (direct && !scenario) return <Navigate to="/quick-game" replace />

  if (onBoard && scenario) {
    const board = (
      <QuickGameBoard
        title={game.title}
        fullScreenOnFirstPlay={direct}
        started={started}
        scenario={scenario}
        prompt={game.prompt}
        index={index}
        total={list.length}
        // Before Play the clock shows the full time
        left={started ? timer.left : seconds}
        remainingMs={started ? timer.remainingMs : seconds * 1000}
        startedAt={timer.startedAt}
        seconds={seconds}
        running={timer.running}
        answer={scenario.answer.trim() || undefined}
        revealed={revealed}
        muted={music.muted}
        onBack={() => started && index > 0 && show(index - 1)}
        onPlayPause={playPause}
        onReveal={reveal}
        onNext={() => {
          if (!started) return
          if (index < list.length - 1) show(index + 1)
          else end()
        }}
        onMute={music.toggleMute}
        onEnd={end}
      />
    )
    // Without the site's frame the board fills the whole window
    return direct ? (
      <div className="flex h-screen flex-col">{board}</div>
    ) : (
      board
    )
  }

  return (
    <QuickGameSetup
      game={game}
      onGameChange={setGameSlug}
      rows={drafts.rows}
      onRowChange={drafts.update}
      onAddRow={drafts.add}
      onRemoveRow={drafts.remove}
      addedId={drafts.addedId}
      seconds={seconds}
      onSecondsChange={setSeconds}
      canStart={list.length > 0}
      onStart={openBoard}
    />
  )
}

export default QuickGamePage
