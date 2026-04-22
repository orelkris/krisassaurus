import { useParams, Link } from 'react-router-dom'
import { mockPosts } from '@/data/mockData'
import TwoColumnLayout from '@/components/layout/TwoColumnLayout'

function BlogPostPage() {
  const { id } = useParams<{ id: string }>()
  const post = mockPosts.find((p) => p.id === id)

  if (!post) {
    return (
      <div className="max-w-2xl mx-auto px-8 py-16 text-center">
        <p className="text-gray-400 text-sm">Post not found.</p>
        <Link
          to="/"
          className="mt-4 inline-block text-sm text-gray-900 underline"
        >
          Back to blog
        </Link>
      </div>
    )
  }

  const formattedDate = post.date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  const sidebar = (
    <div className="flex flex-col gap-6">
      <Link
        to="/"
        className="text-sm text-gray-400 hover:text-gray-900 transition-colors"
      >
        ← Back to blog
      </Link>

      <div>
        <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
          Date
        </p>
        <p className="text-sm text-gray-600">{formattedDate}</p>
      </div>

      <div>
        <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
          Tags
        </p>
        <div className="flex flex-col gap-1">
          {post.tags.map((tag) => (
            <span key={tag} className="text-sm text-gray-600">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <TwoColumnLayout sidebar={sidebar} scrollable>
      <div className="max-w-prose">
        <div className={`w-full h-40 rounded-xl ${post.coverColor} mb-8`} />

        <span className="text-xs text-gray-400 uppercase tracking-wide">
          {post.tags[0]}
        </span>

        <h1 className="mt-2 text-3xl font-bold text-gray-900 leading-tight">
          {post.title}
        </h1>

        <div className="mt-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
            {post.author.name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">
              {post.author.name}
            </p>
            <p className="text-xs text-gray-400">{post.author.role}</p>
          </div>
        </div>

        <hr className="my-8 border-gray-200" />

        <div className="space-y-5">
          {post.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-gray-700 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </TwoColumnLayout>
  )
}

export default BlogPostPage
