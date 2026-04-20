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
    <div className="h-full max-w-6xl mx-auto px-8 py-8 flex flex-col lg:flex-row gap-8">
      <Sidebar posts={mockPosts} />
      <main className="flex-1 min-w-0 min-h-0 flex flex-col">
        <BlogGrid posts={currentPosts} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </main>
    </div>
  )
}

export default BlogListPage
