// A music file that repeats between two points, in seconds
export interface LoopingMusic {
  url: string
  loopStart: number
  loopEnd: number
}

export interface QuickGame {
  slug: string
  title: string
  // Shown under every scenario, e.g. "What should you have asked yourself first?"
  prompt?: string
  // The printed list students match the scenarios against
  handoutUrl: string
  music: LoopingMusic
}

// One numbered item on the handout. Its number is its place in the list
export interface HandoutQuestion {
  id: string
  text: string
}

// One screen on the board
export interface Scenario {
  id: string
  text: string
}

// A handout question with its number on the handout
export interface NumberedQuestion extends HandoutQuestion {
  number: number
}

// A scenario as the teacher types it on the Quick Game page, with its
// matching question as typed (shown when the answer is revealed)
export interface ScenarioDraft extends Scenario {
  answer: string
}
