import TwoColumnLayout from '@/components/layout/TwoColumnLayout'
import Sidebar from '@/components/layout/Sidebar'
import BlogGrid from '@/components/blog/BlogGrid'
import Pagination from '@/components/blog/Pagination'
import { mockPosts } from '@/data/mockData'
import { useFilter } from '@/context/FilterContext'
import { usePaginatedPosts } from '@/hooks/usePaginatedPosts'

function BlogListPage() {
  const { selectedMonth } = useFilter()
  const { currentPosts, currentPage, totalPages, setPage } = usePaginatedPosts(
    mockPosts,
    selectedMonth
  )

  return (
    <TwoColumnLayout sidebar={<Sidebar posts={mockPosts} />}>
      <BlogGrid posts={currentPosts} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </TwoColumnLayout>
  )
}

export default BlogListPage
