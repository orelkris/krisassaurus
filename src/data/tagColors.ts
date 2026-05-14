const tagColors: Record<string, { bg: string; text: string }> = {
  reflection: { bg: '#EDE9FE', text: '#5B21B6' },
  philosophy: { bg: '#E0E7FF', text: '#3730A3' },
  'social studies': { bg: '#FEF3C7', text: '#92400E' },
  'classroom setup': { bg: '#CCFBF1', text: '#115E59' },
  inquiry: { bg: '#E0F2FE', text: '#075985' },
  'instructional approaches': { bg: '#FFE4E6', text: '#9F1239' },
  translanguaging: { bg: '#FDF4FF', text: '#86198F' },
  integration: { bg: '#FFEDD5', text: '#9A3412' },
  'curriculum design': { bg: '#D1FAE5', text: '#065F46' },
  'student engagement': { bg: '#FEF9C3', text: '#854D0E' },
  communication: { bg: '#DBEAFE', text: '#1E40AF' },
  assessment: { bg: '#F1F5F9', text: '#334155' },
}

const fallback = { bg: '#F3F4F6', text: '#374151' }

export function getTagColor(tag: string) {
  return tagColors[tag.toLowerCase()] ?? fallback
}
