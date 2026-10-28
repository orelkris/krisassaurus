import type { Story } from '@/types/stories'

export const stories: Story[] = [
  {
    slug: 'wangaris-trees-of-peace',
    title: 'Wangari’s Trees of Peace',
    url: 'https://readwj.wordpress.com/wp-content/uploads/2023/03/wangaris-trees-of-peace.pdf',
  },
]

export function getStory(slug: string): Story | undefined {
  return stories.find((story) => story.slug === slug)
}
