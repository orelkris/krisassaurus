import { Link } from 'react-router-dom'
import type { Post } from '@/types'

interface BlogCardProps {
  post: Post
}

function BlogCard({ post }: BlogCardProps) {
  const formattedDate = post.date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <Link
      to={`/post/${post.id}`}
      className="group flex flex-col rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className={`h-24 w-full shrink-0 ${post.coverColor}`} />
      <div className="flex flex-col flex-1 p-4">
        <span className="text-xs text-gray-400 uppercase tracking-wide">
          {post.tags[0]}
        </span>

        <h2 className="mt-1 font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-gray-600 transition-colors">
          {post.title}
        </h2>

        <p className="mt-1 text-sm text-gray-500 leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>

        <div className="mt-auto pt-4 flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 shrink-0">
            {post.author.name.charAt(0)}
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-800">
              {post.author.name}
            </p>
            <p className="text-xs text-gray-400">{formattedDate}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default BlogCard
