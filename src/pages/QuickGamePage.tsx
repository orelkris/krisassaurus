import { useState } from 'react'
import QuickGameSetup from '@/components/quickGame/QuickGameSetup'
import QuickGameBoard from '@/components/quickGame/QuickGameBoard'
import { defaultSeconds, games, getGame } from '@/data/quickGame/games'
import { useCountdown } from '@/hooks/useCountdown'
import { useLoopingMusic } from '@/hooks/useLoopingMusic'
import { useScenarioDrafts } from '@/hooks/useScenarioDrafts'

// Quick Game: the teacher shows one scenario at a time on the board, with
// music and a timer, and students find the match on their handout
function QuickGamePage() {
  const [gameSlug, setGameSlug] = useState(games[0].slug)
  const [seconds, setSeconds] = useState(defaultSeconds)
  // On the board, and whether Play has been pressed yet
  const [onBoard, setOnBoard] = useState(false)
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

  const show = (next: number) => {
    setIndex(next)
    setRevealed(false)
    timer.restart()
    music.play()
  }

  // Start opens the board on the game's title. Nothing plays until Play,
  // so the teacher can go full screen first
  const openBoard = () => {
    setStarted(false)
    setOnBoard(true)
  }

  const end = () => {
    timer.pause()
    music.stop()
    setOnBoard(false)
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

  if (onBoard && scenario) {
    return (
      <QuickGameBoard
        title={game.title}
        started={started}
        scenario={scenario}
        prompt={game.prompt}
        index={index}
        total={list.length}
        // Before Play the clock shows the full time
        left={started ? timer.left : seconds}
        remainingMs={started ? timer.remainingMs : seconds * 1000}
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
  }

  return (
    <QuickGameSetup
      game={game}
      onGameChange={setGameSlug}
      rows={drafts.rows}
      onRowChange={drafts.update}
      onAddRow={drafts.add}
      addedId={drafts.addedId}
      seconds={seconds}
      onSecondsChange={setSeconds}
      canStart={list.length > 0}
      onStart={openBoard}
    />
  )
}

export default QuickGamePage
