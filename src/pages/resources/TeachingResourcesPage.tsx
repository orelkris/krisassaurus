import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import ResourcesHeader from '@/components/resources/ResourcesHeader'
import { resources } from '@/data/resources'
import { getTopicColor } from '@/data/topicColors'

function TeachingResourcesPage() {
  // The sidebar sets ?topic=Math; no topic shows everything
  const [searchParams] = useSearchParams()
  const selectedTopic = searchParams.get('topic')

  const filteredResources = useMemo(() => {
    if (selectedTopic === null) return resources
    return resources.filter((r) => r.topic === selectedTopic)
  }, [selectedTopic])

  return (
    <div className="flex flex-col gap-7">
      <ResourcesHeader
        activeTab="teaching"
        intro="Websites and tools I use with my classes."
      />
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
    </div>
  )
}

export default TeachingResourcesPage
