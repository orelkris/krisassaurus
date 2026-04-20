import { useMemo } from 'react'
import type { Post } from '@/types'
import { useFilter } from '@/context/FilterContext'

interface SidebarProps {
  posts: Post[]
}

interface MonthEntry {
  key: string
  label: string
  count: number
}

function Sidebar({ posts }: SidebarProps) {
  const { selectedMonth, setSelectedMonth } = useFilter()

  const months = useMemo<MonthEntry[]>(() => {
    const monthMap = new Map<string, number>()

    posts.forEach((post) => {
      const year = post.date.getFullYear()
      const month = String(post.date.getMonth() + 1).padStart(2, '0')
      const key = `${year}-${month}`
      monthMap.set(key, (monthMap.get(key) ?? 0) + 1)
    })

    return Array.from(monthMap.entries())
      .sort(([a], [b]) => b.localeCompare(a))
      .map(([key, count]) => {
        const [year, month] = key.split('-').map(Number)
        const label = new Date(year, month - 1, 1).toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric',
        })
        return { key, label, count }
      })
  }, [posts])

  return (
    <aside className="w-full lg:w-52 lg:shrink-0 lg:border-r lg:border-gray-200">
      <nav className="flex flex-row flex-wrap gap-x-4 gap-y-1 lg:flex-col">
        <button
          onClick={() => setSelectedMonth(null)}
          className={`text-left text-sm py-1 transition-colors ${
            selectedMonth === null
              ? 'font-semibold text-gray-900'
              : 'text-gray-500 hover:text-gray-900 cursor-pointer'
          }`}
        >
          All Posts
        </button>

        {months.map((month) => (
          <button
            key={month.key}
            onClick={() => setSelectedMonth(month.key)}
            className={`text-left text-sm py-1 transition-colors ${
              selectedMonth === month.key
                ? 'font-semibold text-gray-900'
                : 'text-gray-500 hover:text-gray-900 cursor-pointer'
            }`}
          >
            {month.label}
            <span className="ml-1 text-xs text-gray-400">({month.count})</span>
          </button>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
