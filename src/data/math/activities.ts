import type { ActivityCard } from '@/types/math'

// Sample tasks rewritten as activities, keyed by expectation id. One card per
// ministry sample task, in the same order, so each card can fold open the
// ministry's wording. Expectations without cards show the ministry text
export const activityCards: Record<string, ActivityCard[]> = {
  'g6-b1.1': [
    {
      title: 'How Big Is a Million?',
      summary: 'Make 1 000 000 feel real with things students know.',
      blocks: [
        {
          type: 'text',
          body: 'Students choose one way to represent 1 000 000 and share what they find.',
        },
        {
          type: 'tiles',
          items: [
            {
              label: 'Base ten blocks',
              big: '1000 cubes',
              sub: 'How big is a block for 1 000 000?',
            },
            {
              label: 'Money',
              big: '$100 bills',
              sub: 'How many make $1 million?',
            },
            {
              label: 'People',
              big: 'Hockey arenas',
              sub: 'How many full arenas?',
            },
            {
              label: 'Length and time',
              big: '1 000 000 mm',
              sub: 'Also try cm, km and 1 million seconds.',
            },
          ],
        },
        {
          type: 'tip',
          body: 'Students can also research their own real-life million and share it with the class.',
        },
      ],
    },
    {
      title: 'The Zero Holds the Place',
      summary: 'Zeros keep every other digit in its spot.',
      blocks: [
        {
          type: 'text',
          body: 'Read numbers with zeros, like 509 608, and talk about what each zero is doing.',
        },
        { type: 'placeValue', number: '509608' },
        {
          type: 'ask',
          mistake: true,
          head: 'Spot the mistake',
          question:
            'Someone wrote five hundred nine thousand six hundred eight as 509 000 608. What place-value idea are they missing? How would you help them?',
          items: [
            {
              label: 'What they meant',
              big: '509 608',
              sub: 'Five hundred nine thousand six hundred eight',
            },
            {
              label: 'What they wrote',
              big: '509 000 608',
              sub: 'Five hundred nine million six hundred eight',
            },
          ],
        },
        {
          type: 'tip',
          body: 'Listen for the word “thousand”. It tells you where the digits go.',
        },
      ],
    },
    {
      title: 'A Metre Stick Million',
      summary: 'Use a metre stick to see where 1000 really is.',
      wide: true,
      blocks: [
        {
          type: 'steps',
          items: [
            'Imagine a metre stick is a number line from 0 to 1 000 000.',
            'Each student predicts where 1000 goes and writes it down.',
            'Partners share, then check by counting on the metre stick.',
          ],
        },
        {
          type: 'numberLine',
          start: '0',
          end: '1 000 000',
          marks: [
            { at: 0.1, label: '1000 is just 1 mm in', tone: 'right' },
            { at: 50, label: 'Halfway is 500 000', tone: 'wrong' },
          ],
        },
        {
          type: 'tip',
          body: 'If students put 1000 halfway, ask: then how many thousands would make a million? Only 2, so the guess needs to change.',
        },
      ],
    },
  ],
}

export function getActivityCards(
  expectationId: string
): ActivityCard[] | undefined {
  return activityCards[expectationId]
}
