import BlogCard from '@/components/blog/BlogCard'
import type { Post } from '@/types'

interface BlogGridProps {
  posts: Post[]
}

function BlogGrid({ posts }: BlogGridProps) {
  if (posts.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
        No posts found.
      </div>
    )
  }

  return (
    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 content-start">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  )
}

export default BlogGrid
