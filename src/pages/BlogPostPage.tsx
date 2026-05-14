import { useParams, Link } from 'react-router-dom'
import { mockPosts } from '@/data/mockData'
import TwoColumnLayout from '@/components/layout/TwoColumnLayout'
import { getTagColor } from '@/data/tagColors'
import AuthorTag from '@/components/blog/AuthorTag'

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
    timeZone: 'UTC',
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
        <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">
          Tags
        </p>
        <div className="flex flex-wrap gap-1">
          {post.tags.map((tag) => {
            const { bg, text } = getTagColor(tag)
            return (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs rounded-full font-medium"
                style={{ backgroundColor: bg, color: text }}
              >
                {tag}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )

  const { bg } = getTagColor(post.tags[0])

  return (
    <TwoColumnLayout sidebar={sidebar} scrollable>
      <div className="max-w-prose flex flex-col gap-8">
        <div
          className="w-full h-40 rounded-xl"
          style={{ backgroundColor: bg }}
        />

        <AuthorTag author={post.author} />

        <hr className="border-gray-200" />

        <div className="space-y-5">
          {post.content.map((paragraph, index) => (
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
