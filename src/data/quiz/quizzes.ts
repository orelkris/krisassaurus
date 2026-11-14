import type { Quiz, QuizEndSound, QuizMusic, QuizSettings } from '@/types/quiz'
import { bodySystems } from '@/data/quiz/bodySystems'
import phrygian from '@/assets/music/phrygian.mp3'

// The starting questions. The teacher's own edits are saved in their browser
export const quizzes: Quiz[] = [
  {
    slug: 'body-systems',
    title: 'Body Systems',
    prompt: 'Pick the correct answer',
    questions: bodySystems,
  },
]

// The answers' letters. Each has its own colour (data-answer in index.css)
export const answerLetters = ['A', 'B', 'C', 'D'] as const

// Seconds on the clock for each question
export const timerOptions = [20, 30, 45]

// Kris's own tracks, which repeat while the clock runs
export const musicTracks: Partial<Record<QuizMusic, string>> = {
  phrygian,
}

export const musicOptions: { value: QuizMusic; label: string }[] = [
  { value: 'phrygian', label: 'Phrygian' },
  { value: 'upbeat', label: 'Game show (upbeat)' },
  { value: 'thinking', label: 'Thinking time (calm)' },
  { value: 'suspense', label: 'Countdown (suspense)' },
  { value: 'file', label: 'My music' },
  { value: 'off', label: 'No music' },
]

export const endSoundOptions: { value: QuizEndSound; label: string }[] = [
  { value: 'gong', label: 'Gong' },
  { value: 'fanfare', label: 'Fanfare' },
  { value: 'buzzer', label: 'Buzzer' },
  { value: 'none', label: 'No sound' },
]

export const defaultSettings: QuizSettings = {
  seconds: 30,
  music: 'phrygian',
  volume: 0.7,
  endSound: 'gong',
  prompt: quizzes[0].prompt,
  autoStart: true,
  ticks: true,
  autoReveal: false,
  shuffle: false,
}

export function getQuiz(slug: string): Quiz | undefined {
  return quizzes.find((quiz) => quiz.slug === slug)
}
