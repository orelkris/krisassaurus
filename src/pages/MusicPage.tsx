import { useState, useMemo } from 'react'
import TwoColumnLayout from '@/components/layout/TwoColumnLayout'
import CompositionCard from '@/components/music/CompositionCard'
import { mockCompositions } from '@/data/mockData'

function MusicPage() {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null)

  const months = useMemo(() => {
    const monthMap = new Map<string, number>()

    mockCompositions.forEach((c) => {
      const year = c.date.getFullYear()
      const month = String(c.date.getMonth() + 1).padStart(2, '0')
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
  }, [])

  const filtered = useMemo(() => {
    if (selectedMonth === null) return mockCompositions
    return mockCompositions.filter((c) => {
      const year = c.date.getFullYear()
      const month = String(c.date.getMonth() + 1).padStart(2, '0')
      return `${year}-${month}` === selectedMonth
    })
  }, [selectedMonth])

  const sidebar = (
    <nav className="flex flex-col gap-1">
      <button
        onClick={() => setSelectedMonth(null)}
        className={`cursor-pointer text-left text-sm py-1 transition-colors ${
          selectedMonth === null
            ? 'font-semibold text-gray-900'
            : 'text-gray-500 hover:text-gray-900'
        }`}
      >
        All
      </button>

      {months.map((month) => (
        <button
          key={month.key}
          onClick={() => setSelectedMonth(month.key)}
          className={`cursor-pointer text-left text-sm py-1 transition-colors ${
            selectedMonth === month.key
              ? 'font-semibold text-gray-900'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          {month.label}
          <span className="ml-1 text-xs text-gray-400">({month.count})</span>
        </button>
      ))}
    </nav>
  )

  return (
    <TwoColumnLayout sidebar={sidebar} scrollable>
      {filtered.length === 0 ? (
        <div className="flex items-center justify-center h-48 text-sm text-gray-400">
          No compositions found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 content-start">
          {filtered.map((composition) => (
            <CompositionCard key={composition.id} composition={composition} />
          ))}
        </div>
      )}
    </TwoColumnLayout>
  )
}

export default MusicPage
