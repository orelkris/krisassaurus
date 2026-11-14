import { useRef, useState, type ReactNode } from 'react'
import QuestionRow from '@/components/quiz/QuestionRow'
import QuizLetters from '@/components/quiz/QuizLetters'
import {
  endSoundOptions,
  musicOptions,
  timerOptions,
} from '@/data/quiz/quizzes'
import type {
  QuizEndSound,
  QuizMusic,
  QuizQuestion,
  QuizSettings,
} from '@/types/quiz'

interface QuizSetupProps {
  questions: QuizQuestion[]
  onQuestionChange: (index: number, change: Partial<QuizQuestion>) => void
  onAddQuestion: () => void
  onRemoveQuestion: (index: number) => void
  // Questions added on this visit, which keep their answers showing
  newIds: string[]
  // The question just added, which gets the cursor
  addedId: string
  settings: QuizSettings
  onSettingsChange: (change: Partial<QuizSettings>) => void
  // The name of the music file picked, if any
  fileName: string
  onFilePick: (file: File) => void
  onEndSoundTry: (sound: QuizEndSound) => void
  // How many questions are ready for the board
  playableCount: number
  onPresent: () => void
}

const keys = [
  ['Space', 'Start or pause the timer'],
  ['→ / ←', 'Next or previous question (clickers work too)'],
  ['R', 'Reveal the correct answer'],
  ['M', 'Mute or unmute'],
  ['F', 'Full screen'],
  ['Esc', 'Back to this screen'],
]

// A label over its control in "Timer and sound"
function Field({ children }: { children: ReactNode }) {
  return <div className="col-sm">{children}</div>
}

function Check({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <label className="flex cursor-pointer items-start gap-sm font-bold">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-[0.2rem] size-[1.15rem] flex-none accent-quiz-mint"
      />
      <span>{label}</span>
    </label>
  )
}

// Before presenting: the questions beside the timer and sound settings
function QuizSetup({
  questions,
  onQuestionChange,
  onAddQuestion,
  onRemoveQuestion,
  newIds,
  addedId,
  settings,
  onSettingsChange,
  fileName,
  onFilePick,
  onEndSoundTry,
  playableCount,
  onPresent,
}: QuizSetupProps) {
  const [showAnswers, setShowAnswers] = useState(false)
  const fileInput = useRef<HTMLInputElement>(null)
  const shortName =
    fileName.length > 32 ? `${fileName.slice(0, 30)}…` : fileName

  return (
    <div
      data-quiz
      className="min-h-full bg-quiz-ink font-quiz-read text-md leading-normal text-quiz-text"
    >
      <div className="mx-auto flex max-w-quiz flex-col gap-lg px-md pt-xl pb-xl">
        <div className="flex flex-wrap items-center justify-between gap-x-lg gap-y-md">
          <div className="col-xs min-w-none">
            <div className="row-md">
              <QuizLetters />
              <h1 className="font-quiz-display text-quiz-title font-bold tracking-[0.005em] text-balance">
                Quiz
              </h1>
            </div>
            <p className="max-w-[62ch] text-quiz-muted">
              Show one question on the board with four colored answers, music
              and a countdown. Students pick their answer by color, letter or
              corner of the room, then you reveal the right one.
            </p>
          </div>
          <button
            type="button"
            onClick={onPresent}
            disabled={playableCount === 0}
            className="quiz-button rounded-quiz-go border-transparent bg-quiz-mint px-xl py-md font-quiz-display text-quiz-go text-quiz-mint-ink shadow-quiz-go hover:bg-quiz-mint-hover active:translate-y-xs active:shadow-quiz-go-pressed"
          >
            Present ▶
          </button>
        </div>

        <div className="grid items-start gap-lg wide:grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)]">
          <section className="quiz-panel" aria-labelledby="quiz-questions">
            <div className="flex flex-wrap items-baseline justify-between gap-x-md gap-y-sm">
              <h2
                id="quiz-questions"
                className="font-quiz-display text-quiz-heading font-semibold"
              >
                Questions{' '}
                {playableCount > 0 && (
                  <span className="quiz-hint">({playableCount})</span>
                )}
              </h2>
              <button
                type="button"
                role="switch"
                aria-checked={showAnswers}
                onClick={() => setShowAnswers(!showAnswers)}
                className="row-sm cursor-pointer text-sm font-bold"
              >
                <span
                  aria-hidden="true"
                  className={`relative h-quiz-track w-quiz-track-w flex-none rounded-pill transition-colors ${
                    showAnswers ? 'bg-quiz-mint' : 'bg-quiz-line'
                  }`}
                >
                  <span
                    className={`absolute top-quiz-knob-gap left-quiz-knob-gap size-quiz-knob rounded-pill bg-quiz-text transition-transform ${
                      showAnswers ? 'translate-x-quiz-knob' : ''
                    }`}
                  />
                </span>
                Show answers
              </button>
            </div>

            {showAnswers && (
              <p className="quiz-hint">
                Write up to four answers and tick the box beside the correct one
                (tick more than one if several are right). Leave an answer blank
                for true/false or three-answer questions.
              </p>
            )}

            <ol className="col-md">
              {questions.map((question, index) => (
                <QuestionRow
                  key={question.id}
                  number={index + 1}
                  question={question}
                  showAnswers={showAnswers || newIds.includes(question.id)}
                  autoFocus={question.id === addedId}
                  onChange={(change) => onQuestionChange(index, change)}
                  onRemove={() => onRemoveQuestion(index)}
                />
              ))}
            </ol>

            {questions.length === 0 && (
              <p className="quiz-hint">No questions yet. Add one below.</p>
            )}

            <div>
              <button
                type="button"
                onClick={onAddQuestion}
                className="quiz-button rounded-row px-sm py-xs text-sm"
              >
                + Add question
              </button>
            </div>
          </section>

          <aside className="quiz-panel" aria-labelledby="quiz-settings">
            <h2
              id="quiz-settings"
              className="font-quiz-display text-quiz-heading font-semibold"
            >
              Timer and sound
            </h2>

            <Field>
              <span className="font-bold" id="quiz-seconds">
                Time per question
              </span>
              <div
                role="group"
                aria-labelledby="quiz-seconds"
                className="flex flex-wrap gap-xs"
              >
                {timerOptions.map((s) => {
                  const picked = settings.seconds === s
                  return (
                    <button
                      key={s}
                      type="button"
                      aria-pressed={picked}
                      onClick={() => onSettingsChange({ seconds: s })}
                      className={`quiz-button flex-auto rounded-row px-sm py-xs text-sm ${
                        picked
                          ? 'border-transparent bg-quiz-sky text-quiz-sky-ink hover:bg-quiz-sky'
                          : ''
                      }`}
                    >
                      {s}s
                    </button>
                  )
                })}
              </div>
            </Field>

            <Field>
              <label className="font-bold" htmlFor="quiz-music">
                Music
              </label>
              <select
                id="quiz-music"
                value={settings.music}
                onChange={(event) => {
                  const value = event.target.value
                  if (value === 'pick') fileInput.current?.click()
                  else onSettingsChange({ music: value as QuizMusic })
                }}
                className="quiz-select"
              >
                {musicOptions.map((option) =>
                  option.value === 'file' ? (
                    fileName && (
                      <option key="file" value="file">
                        {option.label}: {shortName}
                      </option>
                    )
                  ) : (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  )
                )}
                <option value="pick">Choose a music file…</option>
              </select>
              <input
                ref={fileInput}
                type="file"
                accept="audio/*"
                hidden
                onChange={(event) => {
                  const file = event.target.files?.[0]
                  if (!file) return
                  onFilePick(file)
                  onSettingsChange({ music: 'file' })
                }}
              />
              {fileName && (
                <span className="quiz-hint">
                  Your song stays on this computer. Choose it again after
                  reloading the page.
                </span>
              )}
            </Field>

            <Field>
              <label className="font-bold" htmlFor="quiz-volume">
                Volume
              </label>
              <input
                id="quiz-volume"
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={settings.volume}
                onChange={(event) =>
                  onSettingsChange({ volume: Number(event.target.value) })
                }
                className="w-full accent-quiz-sky"
              />
            </Field>

            <Field>
              <label className="font-bold" htmlFor="quiz-end">
                When time runs out
              </label>
              <select
                id="quiz-end"
                value={settings.endSound}
                onChange={(event) => {
                  const endSound = event.target.value as QuizEndSound
                  onSettingsChange({ endSound })
                  onEndSoundTry(endSound)
                }}
                className="quiz-select"
              >
                {endSoundOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </Field>

            <Field>
              <label className="font-bold" htmlFor="quiz-prompt">
                Instruction shown on the board
              </label>
              <input
                id="quiz-prompt"
                type="text"
                maxLength={90}
                value={settings.prompt}
                onChange={(event) =>
                  onSettingsChange({ prompt: event.target.value })
                }
                className="quiz-field"
              />
            </Field>

            <Field>
              <Check
                label="Start the timer as soon as each question appears"
                checked={settings.autoStart}
                onChange={(autoStart) => onSettingsChange({ autoStart })}
              />
              <Check
                label="Tick for the last 5 seconds"
                checked={settings.ticks}
                onChange={(ticks) => onSettingsChange({ ticks })}
              />
              <Check
                label="Show the correct answer when time runs out"
                checked={settings.autoReveal}
                onChange={(autoReveal) => onSettingsChange({ autoReveal })}
              />
              <Check
                label="Shuffle the question order each time I present"
                checked={settings.shuffle}
                onChange={(shuffle) => onSettingsChange({ shuffle })}
              />
            </Field>

            <Field>
              <span className="font-bold">Keys while presenting</span>
              <dl className="grid grid-cols-[auto_1fr] gap-x-md gap-y-xs text-sm text-quiz-muted">
                {keys.map(([key, action]) => (
                  <div key={key} className="contents">
                    <dt className="rounded-quiz-chip border border-quiz-line bg-quiz-panel px-xs text-center font-mono text-quiz-text">
                      {key}
                    </dt>
                    <dd>{action}</dd>
                  </div>
                ))}
              </dl>
            </Field>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default QuizSetup
