import type { QuizQuestion } from '@/types/quiz'

// Body Systems, from Kris's Kahoot spreadsheet
export const bodySystems: QuizQuestion[] = [
  {
    id: 'body-system',
    text: 'A body system is…',
    choices: [
      'a group of organs that work together to do a job',
      'one organ that does many jobs',
      'all the bones in your body',
      'the food you eat',
    ],
    correct: [0],
    note: 'SC1 – defines a body system: Wrong answers are common confusions: one organ, one system only, food.',
  },
  {
    id: 'digestive',
    text: 'You just ate lunch. Which system breaks it down?',
    choices: ['circulatory', 'digestive', 'respiratory', 'muscular'],
    correct: [1],
    note: 'SC3 – digestive: Scenario style: students apply the job, not just recall it.',
  },
  {
    id: 'respiratory',
    text: "You're running and breathing hard. Which system brings oxygen into your body?",
    choices: ['circulatory', 'digestive', 'nervous', 'respiratory'],
    correct: [3],
    note: 'SC3 – respiratory: Circulatory is a strong distractor because blood carries oxygen.',
  },
  {
    id: 'circulatory',
    text: 'Which system uses the heart to pump blood carrying oxygen and nutrients around the body?',
    choices: ['respiratory', 'circulatory', 'digestive', 'muscular'],
    correct: [1],
    note: "SC3 – circulatory: Fixes the weak 'movement of blood' wording from the reading.",
  },
  {
    id: 'skeletal',
    text: 'Your skull protects your brain. Which system is doing that job?',
    choices: ['muscular', 'nervous', 'skeletal', 'circulatory'],
    correct: [2],
    note: 'SC3 – skeletal: Protection is a job the reading skipped. Teach it in We do or Consolidation if missed.',
  },
  {
    id: 'muscular',
    text: 'You smile at a friend. Which system pulls to move your face?',
    choices: ['muscular', 'skeletal', 'nervous', 'digestive'],
    correct: [0],
    note: 'SC3 – muscular: Skeletal and nervous are both reasonable traps. Talk through why muscles pull.',
  },
  {
    id: 'nervous',
    text: 'You touch a hot pan and pull your hand away fast. Which system felt the heat and sent the message?',
    choices: ['muscular', 'skeletal', 'nervous', 'circulatory'],
    correct: [2],
    note: 'SC3 – nervous: Muscular moves the hand, but nervous senses and signals.',
  },
  {
    id: 'controls-breathing',
    text: 'Which system CONTROLS your breathing?',
    choices: ['respiratory', 'circulatory', 'muscular', 'nervous'],
    correct: [3],
    note: 'Misconception: Most will pick respiratory. Stop and discuss: the brain controls breathing; the lungs do the work.',
  },
]
