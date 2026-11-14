import { answerLetters } from '@/data/quiz/quizzes'

interface QuizLettersProps {
  // Beside the title, or big on the last screen
  size?: 'title' | 'done'
}

// The four answer letters in their colours, as a logo
function QuizLetters({ size = 'title' }: QuizLettersProps) {
  return (
    <span
      aria-hidden="true"
      className={`flex ${
        size === 'done'
          ? 'gap-sm text-quiz-shapes-done'
          : 'gap-xs text-quiz-shapes'
      }`}
    >
      {answerLetters.map((letter) => (
        <span
          key={letter}
          data-answer={letter}
          className="quiz-letter size-[1.5em] text-[0.62em]"
        >
          {letter}
        </span>
      ))}
    </span>
  )
}

export default QuizLetters
