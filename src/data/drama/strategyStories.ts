import type { Story } from '@/types/stories'
import { getStory } from '@/data/stories'

// Which story a strategy was done with in class. Shown under "Story we used"
export const strategyStories: { strategy: string; story: string }[] = [
  {
    strategy: 'choral-speaking-choral-reading',
    story: 'wangaris-trees-of-peace',
  },
  { strategy: 'call-and-response', story: 'wangaris-trees-of-peace' },
  { strategy: 'writing-in-role', story: 'wangaris-trees-of-peace' },
  { strategy: 'group-monologue', story: 'wangaris-trees-of-peace' },
]

export function getStoriesFor(strategySlug: string): Story[] {
  return strategyStories
    .filter((link) => link.strategy === strategySlug)
    .flatMap((link) => getStory(link.story) ?? [])
}
