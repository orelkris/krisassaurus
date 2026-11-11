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
    <>
      <ResourcesHeader
        activeTab="teaching"
        intro="Websites and tools I use with my classes."
      />
      {filteredResources.length === 0 ? (
        <div className="text-small flex items-center justify-center h-empty">
          No resources found.
        </div>
      ) : (
        <table className="w-full text-sm table-fixed">
          <thead>
            <tr className="border-b border-line">
              <th className="p-md text-left font-semibold text-fg">Resource</th>
              <th className="p-md text-left font-semibold text-fg hidden md:table-cell">
                Description
              </th>
              <th className="p-md text-left font-semibold text-fg w-topic">
                Topic
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredResources.map((resource) => (
              <tr
                key={resource.id}
                className="border-b border-line hover:bg-soft transition-colors"
              >
                <td className="p-md align-top">
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-fg hover:text-muted transition-colors"
                  >
                    {resource.title} ↗
                  </a>
                </td>
                <td className="p-md align-top text-muted leading-relaxed hidden md:table-cell">
                  {resource.description}
                </td>
                <td className="p-md align-top">
                  <span
                    className="inline-block px-sm py-xs text-xs rounded-pill whitespace-nowrap text-fg"
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
    </>
  )
}

export default TeachingResourcesPage
