// Strategies greyed out for now. On the Strategies page and in the sidebar
// they show in grey and can't be opened, and they're left out of Pairs well
// with. Remove a slug to bring that strategy back
export const greyedOut: string[] = [
  // Role Play
  'flash-forward-flashback',
  'hot-seating',
  'teacher-in-role',
  'news-reporting',
  'alter-ego',
  'remote-control',
  'a-day-in-the-life',
  'role-on-the-wall',

  // Tableaux
  'caption-making',
  'thought-mapping-positioning',
  'guided-tour',
  'pop-up-story',
  'sequenced-tableaux-storyboards',
  'in-a-group-of',

  // Voice and Sound
  'soundscape',
  'guided-visualization',
  'gibberish',
  'readers-theatre',
  'conductor',
  'graffiti',

  // Movement
  'magnetic-attraction',
  'mirrors',
  'pantomime',
  'masks',
  'voice-over-narration',
  'verb-chains',

  // Scene Work and Forms
  'rolling-theatre',
  'forum-theatre',
  'cross-cutting',
  'puppets-props',
  'chamber-theatre',
  'what-if',
  'stop-animation',
]

export function isGreyedOut(slug: string): boolean {
  return greyedOut.includes(slug)
}
