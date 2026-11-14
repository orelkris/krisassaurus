// One question on the board: up to four answers, A to D. A blank answer
// isn't shown, e.g. for true/false. correct lists the right answers by
// their place, from 0 (A)
export interface QuizQuestion {
  id: string
  text: string
  choices: [string, string, string, string]
  correct: number[]
  // The teacher's own note about the question. Not shown on the board
  note?: string
}

export interface Quiz {
  slug: string
  title: string
  // The line beside the clock on the board, e.g. "Pick the correct answer"
  prompt: string
  questions: QuizQuestion[]
}

// Music while the clock runs: one of Kris's tracks, music made in the
// browser, a file the teacher picks (it stays on their computer), or none
export type QuizMusic =
  | 'phrygian'
  | 'upbeat'
  | 'thinking'
  | 'suspense'
  | 'file'
  | 'off'

// The sound when time runs out
export type QuizEndSound = 'gong' | 'fanfare' | 'buzzer' | 'none'

// The setup page's choices, saved in this browser
export interface QuizSettings {
  seconds: number
  music: QuizMusic
  // 0 to 1
  volume: number
  endSound: QuizEndSound
  prompt: string
  // Starts the clock as soon as each question appears
  autoStart: boolean
  // A tick each second for the last 5
  ticks: boolean
  // Shows the right answer when time runs out
  autoReveal: boolean
  // A new order each time the quiz starts
  shuffle: boolean
}
