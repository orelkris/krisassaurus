import type { QuizQuestion } from '@/types/quiz'

// What stops a question from going on the board, or '' when it's fine.
// A question with no text yet is just skipped, so it gets no warning
export function questionProblem(question: QuizQuestion) {
  if (!question.text.trim()) return ''
  const filled = question.choices.filter((choice) => choice.trim()).length
  if (filled < 2)
    return 'Add at least two answers so this question can be shown.'
  if (question.correct.length === 0) return 'Tick the correct answer.'
  if (question.correct.some((i) => !question.choices[i].trim()))
    return 'An answer marked correct is blank.'
  return ''
}

export function isPlayable(question: QuizQuestion) {
  return question.text.trim() !== '' && questionProblem(question) === ''
}

// A copy in a random order
export function shuffled<T>(list: T[]) {
  const copy = [...list]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

// Shrinks an element's text until it fits inside box, between min and max
// pixels, so long questions and answers stay readable from the back of the
// room. Returns the size it picked
export function fitText(
  el: HTMLElement,
  box: HTMLElement,
  max: number,
  min: number
) {
  if (!box.clientHeight || !box.clientWidth) return max
  const fits = () =>
    el.offsetHeight <= box.clientHeight && el.scrollWidth <= box.clientWidth
  let lo = min
  let hi = Math.min(max, box.clientHeight)
  el.style.fontSize = `${hi}px`
  if (fits()) return hi
  while (hi - lo > 1) {
    const mid = Math.floor((lo + hi) / 2)
    el.style.fontSize = `${mid}px`
    if (fits()) lo = mid
    else hi = mid
  }
  el.style.fontSize = `${lo}px`
  return lo
}
