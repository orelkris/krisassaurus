import { useEffect, useRef, useState } from 'react'
import QuizSetup from '@/components/quiz/QuizSetup'
import QuizBoard from '@/components/quiz/QuizBoard'
import { defaultSettings, musicTracks, quizzes } from '@/data/quiz/quizzes'
import { useQuizQuestions } from '@/hooks/useQuizQuestions'
import { useQuizTimer } from '@/hooks/useQuizTimer'
import { useStoredState } from '@/hooks/useStoredState'
import { QuizAudio } from '@/lib/quizAudio'
import { shuffled } from '@/lib/quiz'
import type { QuizQuestion, QuizSettings } from '@/types/quiz'

// How long after time's up the answer shows, when that is switched on
const AUTO_REVEAL_MS = 1400

// Quiz: one question at a time on the board with four coloured answers,
// music and a countdown. Students pick by colour, letter or corner of the
// room, then the teacher reveals the right one
function QuizPage() {
  const quiz = quizzes[0]
  const questions = useQuizQuestions(quiz)

  const [savedSettings, setSavedSettings] = useStoredState<QuizSettings>(
    'quiz:v2:settings',
    defaultSettings
  )
  // A music file isn't saved, so after a reload the music goes back to the
  // default until a file is picked again
  const [fileName, setFileName] = useState('')
  const settings: QuizSettings = { ...defaultSettings, ...savedSettings }
  if (settings.music === 'file' && !fileName)
    settings.music = defaultSettings.music
  const changeSettings = (change: Partial<QuizSettings>) =>
    setSavedSettings((saved) => ({ ...saved, ...change }))

  // The sounds, made once
  const audioRef = useRef<QuizAudio | null>(null)
  const audio = () => (audioRef.current ??= new QuizAudio())
  useEffect(() => () => audioRef.current?.close(), [])
  useEffect(() => {
    const a = audio()
    const track = musicTracks[settings.music]
    if (track) a.setTrack(settings.music, track)
    a.music = settings.music
    a.volume = settings.volume
    a.applyVolume()
  }, [settings.music, settings.volume])
  const [muted, setMuted] = useState(false)

  const [presenting, setPresenting] = useState(false)
  // The questions in the order they are shown, set on Present
  const [order, setOrder] = useState<QuizQuestion[]>([])
  // order.length means past the last question
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const revealTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const wakeLock = useRef<WakeLockSentinel | null>(null)

  const finished = index >= order.length

  const reveal = () => {
    if (finished || revealed) return
    if (timer.running) pauseTimer()
    setRevealed(true)
    audio().reveal()
  }

  const timer = useQuizTimer(
    settings.seconds,
    // A tick for each of the last 5 seconds, and busier music for the last 10
    (left) => {
      if (left <= 10) audio().hot = true
      if (settings.ticks && left > 0 && left <= 5) audio().tick(left === 1)
    },
    () => {
      audio().stop()
      audio().end(settings.endSound)
      if (settings.autoReveal)
        revealTimer.current = setTimeout(() => {
          setRevealed(true)
          audio().reveal()
        }, AUTO_REVEAL_MS)
    }
  )

  const pauseTimer = () => {
    timer.pause()
    audio().pause()
  }

  const startTimer = () => {
    if (finished) return
    timer.start()
    audio().hot = !timer.done && timer.left <= 10
    audio().play()
  }

  // A question starts the clock right away, or waits for Start
  const showSlide = (i: number) => {
    clearTimeout(revealTimer.current)
    setIndex(Math.max(0, Math.min(order.length - 1, i)))
    setRevealed(false)
    audio().stop()
    if (settings.autoStart) {
      timer.restart()
      audio().play()
    } else {
      timer.reset()
    }
  }

  const goFullScreen = () => {
    if (document.fullscreenElement) return
    document.documentElement.requestFullscreen?.().catch(() => {})
  }

  const present = () => {
    audio().stop(true)
    const list = questions.playable.map((q) => ({
      ...q,
      text: q.text.trim(),
      choices: q.choices.map((c) => c.trim()) as QuizQuestion['choices'],
    }))
    if (!list.length) return
    const ordered = settings.shuffle ? shuffled(list) : list
    setOrder(ordered)
    setPresenting(true)
    goFullScreen()
    navigator.wakeLock
      ?.request('screen')
      .then((lock) => (wakeLock.current = lock))
      .catch(() => {})
    // order is set on the next render, so the first question starts here
    clearTimeout(revealTimer.current)
    setIndex(0)
    setRevealed(false)
    if (settings.autoStart) {
      timer.restart()
      audio().play()
    } else {
      timer.reset()
    }
  }

  const exit = () => {
    clearTimeout(revealTimer.current)
    pauseTimer()
    audio().stop()
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {})
    wakeLock.current?.release().catch(() => {})
    wakeLock.current = null
    setPresenting(false)
  }

  const showDone = () => {
    clearTimeout(revealTimer.current)
    pauseTimer()
    audio().stop()
    timer.reset()
    setIndex(order.length)
  }

  const next = () => {
    if (finished) return
    if (index === order.length - 1) showDone()
    else showSlide(index + 1)
  }

  const prev = () => {
    if (finished) showSlide(order.length - 1)
    else if (index > 0) showSlide(index - 1)
  }

  const restart = () => {
    if (finished) return
    clearTimeout(revealTimer.current)
    setRevealed(false)
    audio().stop()
    timer.restart()
    audio().play()
  }

  const toggleMute = () => {
    audio().setMuted(!muted)
    setMuted(!muted)
  }

  const toggleFullScreen = () => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {})
    else goFullScreen()
  }

  // While presenting, the board covers the whole window
  return (
    <>
      <div hidden={presenting} className="h-full">
        <QuizSetup
          questions={questions.questions}
          onQuestionChange={questions.update}
          onAddQuestion={questions.add}
          onRemoveQuestion={questions.remove}
          newIds={questions.newIds}
          addedId={questions.addedId}
          settings={settings}
          onSettingsChange={changeSettings}
          fileName={fileName}
          onFilePick={(file) => {
            audio().setFile(file)
            setFileName(file.name)
          }}
          onEndSoundTry={(sound) => audio().end(sound)}
          playableCount={questions.playable.length}
          onPresent={present}
        />
      </div>
      {presenting && (
        <QuizBoard
          prompt={settings.prompt}
          question={order[index]}
          index={index}
          total={order.length}
          left={timer.left}
          duration={timer.duration}
          running={timer.running}
          timeUp={timer.done}
          revealed={revealed}
          muted={muted}
          onPrev={prev}
          onPlayPause={() => (timer.running ? pauseTimer() : startTimer())}
          onRestart={restart}
          onReveal={reveal}
          onNext={next}
          onMute={toggleMute}
          onFullScreen={toggleFullScreen}
          onAgain={() => showSlide(0)}
          onExit={exit}
        />
      )}
    </>
  )
}

export default QuizPage
