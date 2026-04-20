export interface Author {
    name: string
    role: string
    avatarUrl?: string
}

export interface Post {
    id: string
    title: string
    excerpt: string
    content: string
    date: Date
    tags: string[]
    author: Author
    coverColor: string
}

export interface Resource {
    id: string
    title: string
    url: string
    description: string
    topic: string
    date: Date
}