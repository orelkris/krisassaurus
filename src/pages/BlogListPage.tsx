import TwoColumnLayout from '@/components/layout/TwoColumnLayout'
import Sidebar from '@/components/layout/Sidebar'
import BlogGrid from '@/components/blog/BlogGrid'
import Pagination from '@/components/blog/Pagination'
import { useFilter } from '@/context/FilterContext'
import { usePaginatedPosts } from '@/hooks/usePaginatedPosts'
import { mockPosts as posts } from '@/data/mockData'

function BlogListPage() {
  // const { posts, loading, error } = usePosts()
  // const {posts} = usePosts();
  const { selectedMonth } = useFilter()
  const { currentPosts, currentPage, totalPages, setPage } =
    // usePaginatedPosts(posts, selectedMonth)
    usePaginatedPosts(posts, selectedMonth)

  // if (loading) {
  //   return (
  //     <div className="h-full flex items-center justify-center text-sm text-gray-400">
  //       Loading posts...
  //     </div>
  //   )
  // }

  // if (error) {
  //   return (
  //     <div className="h-full flex items-center justify-center text-sm text-red-400">
  //       {error}
  //     </div>
  //   )
  // }

  return (
    <TwoColumnLayout sidebar={<Sidebar posts={posts} />}>
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