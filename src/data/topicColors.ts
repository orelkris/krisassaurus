// Each teaching-resource topic has a tint, from index.css (--color-topic-…)
const topicTokens: Record<string, string> = {
  Math: 'math',
  Science: 'science',
  'Social Studies': 'social-studies',
  English: 'english',
  'General Teaching': 'general',
}

export function getTopicColor(topic: string): string {
  const token = topicTokens[topic]
  return token ? `var(--color-topic-${token})` : 'var(--color-soft)'
}
