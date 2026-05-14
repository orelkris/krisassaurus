const topicColors: Record<string, string> = {
  Math: '#DBEAFE',
  Science: '#DCFCE7',
  'Social Studies': '#FEF9C3',
  English: '#FCE7F3',
  'General Teaching': '#EDE9FE',
}

export function getTopicColor(topic: string): string {
  return topicColors[topic] ?? '#F3F4F6'
}
