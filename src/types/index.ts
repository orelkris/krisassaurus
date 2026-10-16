export interface Author {
  name: string
  role: string
  avatarUrl?: string
}

export interface Post {
  id: string
  title: string
  excerpt: string
  content: string[]
  date: Date
  tags: string[]
  author: Author
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
