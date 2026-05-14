import { useState, useMemo } from 'react'
import TwoColumnLayout from '@/components/layout/TwoColumnLayout'
import { mockResources } from '@/data/mockData'
import { getTopicColor } from '@/data/topicColors'

function ResourcesPage() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)

  const topics = useMemo(() => {
    return [...new Set(mockResources.map((r) => r.topic))].sort()
  }, [])

  const filteredResources = useMemo(() => {
    if (selectedTopic === null) return mockResources
    return mockResources.filter((r) => r.topic === selectedTopic)
  }, [selectedTopic])

  const sidebar = (
    <nav className="flex flex-col gap-1">
      <button
        onClick={() => setSelectedTopic(null)}
        className={`cursor-pointer text-left text-sm py-1 transition-colors ${
          selectedTopic === null
            ? 'font-semibold text-gray-900'
            : 'text-gray-500 hover:text-gray-900'
        }`}
      >
        All Resources
      </button>

      {topics.map((topic) => (
        <button
          key={topic}
          onClick={() => setSelectedTopic(topic)}
          className={`cursor-pointer text-left text-sm py-1 transition-colors flex items-center gap-2 ${
            selectedTopic === topic
              ? 'font-semibold text-gray-900'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ backgroundColor: getTopicColor(topic) }}
          />
          {topic}
        </button>
      ))}
    </nav>
  )

  return (
    <TwoColumnLayout sidebar={sidebar} scrollable>
      {filteredResources.length === 0 ? (
        <div className="flex items-center justify-center h-48 text-sm text-gray-400">
          No resources found.
        </div>
      ) : (
        <table className="w-full text-sm table-fixed">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="p-4 text-left font-semibold text-gray-900">
                Resource
              </th>
              <th className="p-4 text-left font-semibold text-gray-900 hidden md:table-cell">
                Description
              </th>
              <th className="p-4 text-left font-semibold text-gray-900 w-32">
                Topic
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredResources.map((resource) => (
              <tr
                key={resource.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="p-4 align-top">
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-gray-900 hover:text-gray-500 transition-colors"
                  >
                    {resource.title} ↗
                  </a>
                </td>
                <td className="p-4 align-top text-gray-500 leading-relaxed hidden md:table-cell">
                  {resource.description}
                </td>
                <td className="p-4 align-top">
                  <span
                    className="inline-block px-2 py-1 text-xs rounded-full whitespace-nowrap text-gray-700"
                    style={{ backgroundColor: getTopicColor(resource.topic) }}
                  >
                    {resource.topic}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </TwoColumnLayout>
  )
}

export default ResourcesPage
