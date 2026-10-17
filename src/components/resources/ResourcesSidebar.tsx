import { useMemo, useState } from 'react'
import { Link, useMatch, useSearchParams } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import type { DocumentGroupId } from '@/types/resources'
import { documentGroups } from '@/data/resources/documentGroups'
import { getDocumentsInGroup } from '@/data/resources/ministryDocuments'
import { resources } from '@/data/resources'
import { getTopicColor } from '@/data/topicColors'

const linkClass = (isCurrent: boolean) =>
  `flex items-center justify-between gap-1.5 py-1 text-sm transition-colors ${
    isCurrent
      ? 'font-semibold text-gray-900'
      : 'text-gray-500 hover:text-gray-900'
  }`

// Teaching resources: All, then one link per topic
function TeachingSidebar() {
  const [searchParams] = useSearchParams()
  const selectedTopic = searchParams.get('topic')

  const topics = useMemo(
    () => [...new Set(resources.map((r) => r.topic))].sort(),
    []
  )

  return (
    <nav className="flex flex-col">
      <Link
        to="/resources/teaching"
        className={linkClass(selectedTopic === null)}
      >
        All
      </Link>
      <p className="mt-3 mb-1 text-xs uppercase tracking-wide text-gray-400">
        Subjects
      </p>
      {topics.map((topic) => (
        <Link
          key={topic}
          to={`/resources/teaching?topic=${encodeURIComponent(topic)}`}
          className={linkClass(selectedTopic === topic)}
        >
          <span className="flex items-center gap-2">
            <span
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: getTopicColor(topic) }}
            />
            {topic}
          </span>
        </Link>
      ))}
    </nav>
  )
}

// Ministry documents: All, then each group with its documents listed under it
function MinistrySidebar() {
  const listMatch = useMatch('/resources')
  const documentMatch = useMatch('/resources/documents/:slug')
  const [searchParams] = useSearchParams()
  const selectedGroup = listMatch ? searchParams.get('group') : null
  const currentSlug = documentMatch?.params.slug

  const [closedGroups, setClosedGroups] = useState<
    Partial<Record<DocumentGroupId, boolean>>
  >({})

  return (
    <nav className="flex flex-col">
      <Link
        to="/resources"
        className={linkClass(!!listMatch && selectedGroup === null)}
      >
        All
      </Link>

      {documentGroups.map((group) => {
        const documents = getDocumentsInGroup(group.id)
        const isOpen = !closedGroups[group.id]

        return (
          <div key={group.id} className="mt-2">
            <div className="flex items-center justify-between">
              <Link
                to={`/resources?group=${group.id}`}
                className={`py-1 text-sm font-semibold transition-colors ${
                  selectedGroup === group.id
                    ? 'text-gray-900 underline underline-offset-4'
                    : 'text-gray-900 hover:underline hover:underline-offset-4'
                }`}
              >
                {group.name}
              </Link>
              <button
                onClick={() =>
                  setClosedGroups({ ...closedGroups, [group.id]: isOpen })
                }
                aria-expanded={isOpen}
                aria-label={`${isOpen ? 'Hide' : 'Show'} ${group.name} documents`}
                className="cursor-pointer p-1 text-gray-500 hover:text-gray-900"
              >
                <ChevronDown
                  size={14}
                  className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
            </div>

            {isOpen && (
              <div className="mb-1.5 ml-1 border-l border-gray-200 pl-4">
                {documents.map((document) =>
                  document.file ? (
                    <Link
                      key={document.slug}
                      to={`/resources/documents/${document.slug}`}
                      className={`block py-0.5 text-[13px] transition-colors ${
                        document.slug === currentSlug
                          ? 'font-semibold text-gray-900'
                          : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      {document.shortName}
                    </Link>
                  ) : (
                    <span
                      key={document.slug}
                      className="flex justify-between gap-2 py-0.5 text-[13px] text-gray-400"
                    >
                      {document.shortName}
                      <span className="text-xs">soon</span>
                    </span>
                  )
                )}
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}

// The sidebar follows the tab: subjects for Teaching resources, document
// groups for Ministry documents and each document's page
function ResourcesSidebar() {
  const teachingMatch = useMatch('/resources/teaching')
  return (
    <div className="lg:pr-4">
      {teachingMatch ? <TeachingSidebar /> : <MinistrySidebar />}
    </div>
  )
}

export default ResourcesSidebar
