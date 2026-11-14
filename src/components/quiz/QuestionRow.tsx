import { answerLetters } from '@/data/quiz/quizzes'
import { questionProblem } from '@/lib/quiz'
import type { QuizQuestion } from '@/types/quiz'

interface QuestionRowProps {
  // Its place in the list, from 1
  number: number
  question: QuizQuestion
  // Hidden while "Show answers" is off, unless the question is new
  showAnswers: boolean
  // Puts the cursor in the question box, e.g. for a question just added
  autoFocus?: boolean
  onChange: (change: Partial<QuizQuestion>) => void
  onRemove: () => void
}

// One question on the setup page: what goes on the board, then up to four
// answers with a box to tick beside the correct one (more than one can be).
// A blank answer isn't shown, e.g. for true/false
function QuestionRow({
  number,
  question,
  showAnswers,
  autoFocus = false,
  onChange,
  onRemove,
}: QuestionRowProps) {
  const problem = questionProblem(question)

  const setChoice = (index: number, text: string) => {
    const choices = [...question.choices] as QuizQuestion['choices']
    choices[index] = text
    onChange({ choices })
  }

  const toggleCorrect = (index: number) => {
    const correct = question.correct.includes(index)
      ? question.correct.filter((i) => i !== index)
      : [...question.correct, index].sort()
    onChange({ correct })
  }

  return (
    <li className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-md gap-y-sm rounded-card border border-quiz-line bg-quiz-panel p-md sm:grid-cols-[auto_minmax(0,1fr)_auto]">
      <span className="grid size-quiz-num place-items-center rounded-pill bg-quiz-text font-quiz-display text-lg font-bold text-quiz-paper-ink">
        {number}
      </span>

      <div className="col-sm min-w-none">
        <label className="quiz-label" htmlFor={`q-t-${question.id}`}>
          Question on the board
        </label>
        <textarea
          id={`q-t-${question.id}`}
          rows={2}
          autoFocus={autoFocus}
          value={question.text}
          onChange={(event) => onChange({ text: event.target.value })}
          className="quiz-field min-h-[3.2em] resize-y leading-[1.4]"
        />

        {showAnswers && (
          <div className="col-sm">
            <span className="quiz-label">Answers</span>
            <div className="grid gap-sm sm:grid-cols-2">
              {answerLetters.map((letter, index) => {
                const right = question.correct.includes(index)
                return (
                  <div
                    key={letter}
                    data-answer={letter}
                    className={`row-sm min-w-none rounded-row border bg-quiz-ink py-px pr-px pl-sm focus-within:border-quiz-sun ${
                      right
                        ? 'border-quiz-mint shadow-quiz-mint'
                        : 'border-quiz-line'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={right}
                      onChange={() => toggleCorrect(index)}
                      aria-label={`Answer ${letter} is correct`}
                      title="Mark as a correct answer"
                      className="size-[1.1rem] flex-none cursor-pointer accent-quiz-mint"
                    />
                    <span
                      aria-hidden="true"
                      className="quiz-letter size-[1.6em] text-quiz-letter"
                    >
                      {letter}
                    </span>
                    <input
                      type="text"
                      value={question.choices[index]}
                      onChange={(event) => setChoice(index, event.target.value)}
                      placeholder={`Answer ${letter}`}
                      aria-label={`Question ${number}, answer ${letter}`}
                      className="min-w-none flex-1 border-0 bg-transparent px-sm py-sm placeholder:text-quiz-muted focus-visible:outline-none"
                    />
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {problem && <p className="text-sm text-quiz-sun">{problem}</p>}
      </div>

      <div className="col-span-2 flex justify-end sm:col-span-1 sm:flex-col sm:justify-start">
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Delete question ${number}`}
          title="Delete question"
          className="quiz-button rounded-row px-sm py-xs text-sm hover:border-quiz-danger-line hover:bg-quiz-danger-bg"
        >
          ✕
        </button>
      </div>
    </li>
  )
}

export default QuestionRow
