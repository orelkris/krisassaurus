import type { QuickFacts, Strategy, StrategyGroupId } from '@/types/drama'
import { getGroup } from '@/data/drama/groups'

// Order within each group follows the course handout, with strategies from
// class added at the end of their group. Page text comes only from Kris;
// most summaries are still placeholders.
export const strategies: Strategy[] = [
  // Role Play
  { slug: 'flash-forward-flashback', name: 'Flash Forward / Flashback', groupId: 'role-play', summary: 'Jump a scene forward or back in time to show cause and consequence.' },
  { slug: 'hot-seating', name: 'Hot Seating', groupId: 'role-play', summary: 'One student stays in role while the class asks the character questions.', facts: { time: '10 min', grouping: 'Whole class, 1 in role' } },
  { slug: 'teacher-in-role', name: 'Teacher-in-Role', groupId: 'role-play', summary: 'The teacher takes on a role to frame the drama and guide it from inside.' },
  { slug: 'news-reporting', name: 'News Reporting', groupId: 'role-play', summary: 'Students report on a story event as journalists, witnesses or experts.' },
  { slug: 'writing-in-role', name: 'Writing in Role', groupId: 'role-play', summary: 'Students write a letter, diary or note as a character.' },
  { slug: 'alter-ego', name: 'Alter Ego', groupId: 'role-play', summary: 'A second student voices what the character is really thinking.' },
  { slug: 'remote-control', name: 'Remote Control', groupId: 'role-play', summary: 'The teacher pauses, rewinds or fast-forwards a scene with a pretend remote.' },
  { slug: 'a-day-in-the-life', name: 'A Day in the Life', groupId: 'role-play', summary: 'Short scenes show a character’s ordinary day leading up to a key moment.' },
  { slug: 'role-on-the-wall', name: 'Role on the Wall', groupId: 'role-play', summary: 'An outline of a character is filled with their traits, feelings and outside pressures.' },

  // Tableaux
  { slug: 'tableaux-still-image', name: 'Tableaux / Still Image', groupId: 'tableaux', summary: 'Groups freeze in a picture that captures one moment or idea.' },
  { slug: 'thought-tracking-tap-in', name: 'Thought Tracking / Tap In', groupId: 'tableaux', summary: 'Tap a frozen student to hear their character’s thought aloud.' },
  { slug: 'caption-making', name: 'Caption Making', groupId: 'tableaux', summary: 'Groups give their tableau a title or headline.' },
  { slug: 'thought-mapping-positioning', name: 'Thought Mapping / Positioning', groupId: 'tableaux', summary: 'Students place themselves in space to show relationships or opinions.' },
  { slug: 'guided-tour', name: 'Guided Tour', groupId: 'tableaux', summary: 'A guide leads visitors through a gallery of tableaux, explaining each one.' },
  { slug: 'pop-up-story', name: 'Pop-up Story', groupId: 'tableaux', summary: 'Tableaux appear one after another as a story is read aloud.' },
  { slug: 'sequenced-tableaux-storyboards', name: 'Sequenced Tableaux / Storyboards', groupId: 'tableaux', summary: 'A series of still images tells the beginning, middle and end.' },
  { slug: 'in-a-group-of', name: 'In a Group Of…', groupId: 'tableaux', summary: 'The teacher calls a number and a prompt; groups form a picture fast.' },
  { slug: 'position-mapping', name: 'Position Mapping', groupId: 'tableaux', summary: 'Students express their feelings through their physical relation to an object.' },

  // Voice and Sound
  { slug: 'corridor-of-voices-voice-alley', name: 'Corridor of Voices / Voice Alley', groupId: 'voice-and-sound', summary: 'A character walks between two lines of classmates offering advice or doubts.' },
  { slug: 'soundscape', name: 'Soundscape', groupId: 'voice-and-sound', summary: 'The class layers sounds to create the atmosphere of a place.', facts: { time: '10 min' } },
  { slug: 'guided-visualization', name: 'Guided Visualization', groupId: 'voice-and-sound', summary: 'The teacher narrates a scene while students imagine it in detail.' },
  { slug: 'choral-speaking-choral-reading', name: 'Choral Speaking / Choral Reading', groupId: 'voice-and-sound', summary: 'The group speaks a text together, shaping pace and volume.' },
  { slug: 'gibberish', name: 'Gibberish', groupId: 'voice-and-sound', summary: 'Scenes are played in invented language so tone and body carry the meaning.' },
  { slug: 'readers-theatre', name: 'Reader’s Theatre', groupId: 'voice-and-sound', summary: 'Students read a script aloud expressively without staging.' },
  { slug: 'conductor', name: 'Conductor', groupId: 'voice-and-sound', summary: 'A conductor raises and lowers the volume of voices or sounds.' },
  { slug: 'call-and-response', name: 'Call and Response', groupId: 'voice-and-sound', summary: 'A leader calls a line and the group answers.' },
  { slug: 'graffiti', name: 'Graffiti', groupId: 'voice-and-sound', summary: 'Students add words or phrases to a shared wall in response to a prompt.' },
  { slug: 'roll-call', name: 'Roll Call', groupId: 'voice-and-sound', summary: 'A fun way to complete your daily attendance!' },
  { slug: 'group-monologue', name: 'Group Monologue', groupId: 'voice-and-sound', summary: 'Students string their most impactful phrases together into one collective voice.' },

  // Movement
  { slug: 'magnetic-attraction', name: 'Magnetic Attraction', groupId: 'movement', summary: 'Students move toward or away from ideas as if pulled by magnets.' },
  { slug: 'mirrors', name: 'Mirrors', groupId: 'movement', summary: 'Partners copy each other’s movements as exactly as they can.' },
  { slug: 'pantomime', name: 'Pantomime', groupId: 'movement', summary: 'Actions and objects are shown without words or props.' },
  { slug: 'masks', name: 'Masks', groupId: 'movement', summary: 'Neutral or character masks shift the focus to the body.' },
  { slug: 'voice-over-narration', name: 'Voice Over Narration', groupId: 'movement', summary: 'A narrator speaks while performers move silently.' },
  { slug: 'verb-chains', name: 'Verb Chains', groupId: 'movement', summary: 'A chain of action words becomes a sequence of movements.' },
  { slug: 'thumbs-up-thumbs-down', name: 'Thumbs Up / Thumbs Down', groupId: 'movement', summary: 'Students show their experience with a thumbs up, a thumbs down or a thumb in the middle.' },

  // Scene Work and Forms
  { slug: 'rolling-theatre', name: 'Rolling Theatre', groupId: 'scene-work', summary: 'Groups perform scenes one after another, picking up where the last left off.' },
  { slug: 'forum-theatre', name: 'Forum Theatre', groupId: 'scene-work', summary: 'The audience stops a scene and steps in to try a different choice.', facts: { time: '20–30 min', grades: 'Grades 4–8' } },
  { slug: 'cross-cutting', name: 'Cross-cutting', groupId: 'scene-work', summary: 'Two scenes are cut together to compare them.' },
  { slug: 'puppets-props', name: 'Puppets / Props', groupId: 'scene-work', summary: 'Objects or puppets carry the story.' },
  { slug: 'chamber-theatre', name: 'Chamber Theatre', groupId: 'scene-work', summary: 'Narrators and actors stage a piece of prose as written.' },
  { slug: 'what-if', name: 'What If…', groupId: 'scene-work', summary: 'A scene is replayed with one detail changed.' },
  { slug: 'stop-animation', name: 'Stop Animation', groupId: 'scene-work', summary: 'A scene moves in jerky frames, as if filmed in stop-motion.' },
  { slug: 'elements-mix-and-match', name: 'Elements Mix and Match', groupId: 'scene-work', summary: 'Brainstorm ideas for each element, then mix and match them to create a story quickly.' },
]

export function getStrategy(slug: string): Strategy | undefined {
  return strategies.find((strategy) => strategy.slug === slug)
}

export function getStrategiesInGroup(groupId: StrategyGroupId): Strategy[] {
  return strategies.filter((strategy) => strategy.groupId === groupId)
}

// The group's typical facts, with anything set on the strategy taking priority
export function getQuickFacts(strategy: Strategy): QuickFacts {
  return { ...getGroup(strategy.groupId).defaultFacts, ...strategy.facts }
}
