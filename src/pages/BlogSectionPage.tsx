import { Navigate, useParams } from 'react-router-dom'
import { getBlogSection } from '@/data/drama/blogSections'
import ComingSoon from '@/components/ui/ComingSoon'
import TwoColumnLayout from '@/components/layout/TwoColumnLayout'
import BlogSectionsSidebar from '@/components/blog/BlogSectionsSidebar'

// Blog sections that don't have their own pages yet (Math, Language, Gym)
function BlogSectionPage() {
  const { section: slug = '' } = useParams<{ section: string }>()
  const section = getBlogSection(slug)

  if (!section) return <Navigate to="/" replace />

  return (
    <TwoColumnLayout sidebar={<BlogSectionsSidebar name={section.name} />} scrollable>
      <div className="flex flex-1 flex-col gap-6">
        <h1 className="text-3xl font-bold text-gray-900">{section.name}</h1>
        <ComingSoon
          title="Coming soon"
          text="This section will follow the same pattern as Drama once its content is ready."
          related={section.related}
        />
      </div>
    </TwoColumnLayout>
  )
}

export default BlogSectionPage
