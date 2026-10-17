import type { ConceptCard } from '@/types/math'

// Key concepts rewritten as cards, keyed by expectation id. One card per
// ministry key concept, in the same order, so each card can fold open the
// ministry's wording. Expectations without cards show the ministry text
export const conceptCards: Record<string, ConceptCard[]> = {
  'g6-b1.1': [
    {
      title: 'Reading Numbers',
      summary: 'A number can be expressed in different ways.',
      body: 'Reading a number means understanding the quantity it represents, whether it is written in **words**, **standard notation**, or **expanded notation**.',
      blocks: [
        {
          type: 'rows',
          rows: [
            ['Standard notation', '1500'],
            ['Word form', 'One thousand five hundred'],
            ['Expanded form', '1000 + 500'],
          ],
        },
      ],
    },
    {
      title: 'Digits & Place Value',
      summary: 'A digit’s position determines its value.',
      body: 'The numerals 0 to 9 are called **digits**. Each digit contributes a value based on its position in a number.',
      blocks: [
        {
          type: 'digits',
          number: '945107',
          note: 'Each digit has a different value depending on its place. The zero holds the tens place.',
        },
      ],
    },
    {
      title: 'The Pattern Repeats',
      summary: 'Every period follows the same pattern.',
      body: 'Each **period** (ones, thousands, millions) repeats the same **hundreds, tens, ones** pattern, and each place counts 0 to 9.',
      blocks: [{ type: 'periods', periods: ['Millions', 'Thousands', 'Ones'] }],
    },
    {
      title: 'More Than One Name',
      summary: 'Big numbers can be said in different ways.',
      body: 'Any quantity, no matter how large, can be described by its **place value**. The same number can have more than one name.',
      blocks: [
        {
          type: 'tiles',
          items: [
            { big: 'Fifteen hundred', sub: '15 hundreds' },
            {
              big: 'One thousand five hundred',
              sub: '1 thousand + 5 hundreds',
            },
          ],
        },
      ],
    },
    {
      title: 'Expanded Form',
      summary: 'Break a number apart to see each place.',
      body: 'Writing a number in **expanded form** shows how much each digit is worth.',
      blocks: [
        {
          type: 'rows',
          rows: [
            ['Number', '634 187'],
            ['As a sum', '600 000 + 30 000 + 4000 + 100 + 80 + 7'],
            [
              'With multiplication',
              '6 × 100 000 + 3 × 10 000 + 4 × 1000 + 1 × 100 + 8 × 10 + 7',
            ],
          ],
        },
      ],
    },
    {
      title: 'Why Numbers Matter',
      summary: 'Numbers describe and compare amounts.',
      body: 'We use numbers all day. Most often they tell us the **size** of something and help answer two questions.',
      blocks: [
        {
          type: 'tiles',
          items: [
            {
              label: 'Describe',
              big: 'How much?',
              sub: 'The size of one amount',
            },
            {
              label: 'Compare',
              big: 'How much more?',
              sub: 'The gap between two amounts',
            },
          ],
        },
      ],
    },
  ],
}

export function getConceptCards(
  expectationId: string
): ConceptCard[] | undefined {
  return conceptCards[expectationId]
}
