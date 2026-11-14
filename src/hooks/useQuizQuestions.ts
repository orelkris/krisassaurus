import { useState } from 'react'
import { useStoredState } from '@/hooks/useStoredState'
import { isPlayable } from '@/lib/quiz'
import type { Quiz, QuizQuestion } from '@/types/quiz'

const blankQuestion = (): QuizQuestion => ({
  id: `new-${Date.now()}`,
  text: '',
  choices: ['', '', '', ''],
  correct: [0],
})

// The quiz's questions as the teacher edits them on the Quiz page. Saved in
// this browser, so they are still there next time. Until the teacher changes
// something, the questions come from the quiz's data file
export function useQuizQuestions(quiz: Quiz) {
  const [questions, setQuestions] = useStoredState<QuizQuestion[]>(
    `quiz:v1:${quiz.slug}`,
    quiz.questions
  )
  // The question just added, which gets the cursor
  const [addedId, setAddedId] = useState('')
  // Questions added on this visit keep their answers showing while written
  const [newIds, setNewIds] = useState<string[]>([])

  const update = (index: number, change: Partial<QuizQuestion>) =>
    setQuestions((list) =>
      list.map((q, i) => (i === index ? { ...q, ...change } : q))
    )

  const add = () => {
    const question = blankQuestion()
    setAddedId(question.id)
    setNewIds((ids) => [...ids, question.id])
    setQuestions((list) => [...list, question])
  }

  const remove = (index: number) =>
    setQuestions((list) => list.filter((_, i) => i !== index))

  return {
    questions,
    // The ones ready for the board: text, two answers, a right one ticked
    playable: questions.filter(isPlayable),
    addedId,
    newIds,
    update,
    add,
    remove,
  }
}
