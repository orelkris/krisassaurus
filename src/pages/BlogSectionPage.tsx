import { Navigate, useParams } from 'react-router-dom'
import { getBlogSection } from '@/data/drama/blogSections'
import ComingSoon from '@/components/ui/ComingSoon'

// Blog sections that don't have their own pages yet (Math, Language, Gym)
function BlogSectionPage() {
  const { section: slug = '' } = useParams<{ section: string }>()
  const section = getBlogSection(slug)

  if (!section) return <Navigate to="/" replace />

  return (
    <div className="max-w-6xl mx-auto px-8 py-8 flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-gray-900">{section.name}</h1>
      <ComingSoon
        title="Coming soon"
        text="This section will follow the same pattern as Drama once its content is ready."
        related={section.related}
      />
    </div>
  )
}

export default BlogSectionPage
