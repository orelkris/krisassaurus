import type { Scenario } from '@/types/quickGame'

// Each game's scenarios, in the order they show on the board.
// Ids are unique across all games, since answers.ts uses them on their own
export const scenarios: Record<string, Scenario[]> = {
  'minds-on': [
    {
      id: 'late-guardian',
      text: 'After school, a student’s guardian is more than 20 minutes late. It begins to rain so you decide to give them a ride yourself.',
    },
    {
      id: 'closed-door',
      text: 'A student is struggling with math and asks for extra help at lunch time. To block the noise from the hallway, you decide to close the door.',
    },
    {
      id: 'sharing-divorce',
      text: 'You’re going through a divorce, and one of your students is experiencing something similar. You decide to share all the details of your experience for bonding purposes.',
    },
  ],
}
