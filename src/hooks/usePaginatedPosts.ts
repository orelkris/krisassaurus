import { useState, useMemo, useEffect } from 'react'
import type { Post } from '@/types'

const POSTS_PER_PAGE = 4

interface UsePaginatedPostsResult {
  currentPosts: Post[]
  currentPage: number
  totalPages: number
  setPage: (page: number) => void
}

export function usePaginatedPosts(
  allPosts: Post[],
  selectedMonth: string | null
): UsePaginatedPostsResult {
  const [currentPage, setCurrentPage] = useState(1)

  const filteredPosts = useMemo(() => {
    if (selectedMonth === null) return allPosts

    return allPosts.filter((post) => {
      const year = post.date.getFullYear()
      const month = String(post.date.getMonth() + 1).padStart(2, '0')
      return `${year}-${month}` === selectedMonth
    })
  }, [allPosts, selectedMonth])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedMonth])

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)

  const currentPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE
    return filteredPosts.slice(start, start + POSTS_PER_PAGE)
  }, [filteredPosts, currentPage])

  return { currentPosts, currentPage, totalPages, setPage: setCurrentPage }
}
