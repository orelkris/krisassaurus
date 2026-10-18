export type Step = 'page' | 'section' | 'stack' | 'tight'

export const gapClass: Record<Step, string> = {
  page: 'col-page',
  section: 'col-section',
  stack: 'col-stack',
  tight: 'col-tight',
}

export interface Author {
  name: string
  role: string
  avatarUrl?: string
}

export interface Resource {
  id: string
  title: string
  url: string
  description: string
  topic: string
  date: Date
}

export type AboutMedia =
  | { type: 'youtube'; youtubeId: string; title: string }
  | { type: 'video'; src: string; title: string; poster?: string }
  | { type: 'image'; src: string; alt: string; caption?: string }
  | { type: 'audio'; src: string; title: string }

export interface AboutSectionData {
  id: string
  label: string
  paragraphs: string[]
  media?: AboutMedia
  links?: { label: string; href: string }[]
}

export interface AboutData {
  name: string
  role: string
  coverColor: string
  imageUrl?: string
  sections: AboutSectionData[]
}

export interface Composition {
  id: string
  title: string
  audioUrl: string
  coverColor?: string
  date: Date
  description?: string
  tags?: string[]
  duration?: string
}