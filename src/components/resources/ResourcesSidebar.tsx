import { useMemo, useState } from 'react'
import { Link, useMatch, useSearchParams } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import type { DocumentGroupId } from '@/types/resources'
import { documentGroups } from '@/data/resources/documentGroups'
import { getDocumentsInGroup } from '@/data/resources/ministryDocuments'
import { resources } from '@/data/resources'
import { getTopicColor } from '@/data/topicColors'

const linkClass = (isCurrent: boolean) =>
  `flex items-center justify-between gap-xs py-xs text-sm transition-colors ${
    isCurrent ? 'font-semibold text-fg' : 'text-muted hover:text-fg'
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
      <p className="text-label mt-md mb-xs">Subjects</p>
      {topics.map((topic) => (
        <Link
          key={topic}
          to={`/resources/teaching?topic=${encodeURIComponent(topic)}`}
          className={linkClass(selectedTopic === topic)}
        >
          <span className="row-stack">
            <span
              className="size-dot-lg shrink-0 rounded-pill"
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
          <div key={group.id} className="mt-sm">
            <div className="flex items-center justify-between">
              <Link
                to={`/resources?group=${group.id}`}
                className={`py-xs text-sm font-semibold transition-colors ${
                  selectedGroup === group.id
                    ? 'text-fg underline underline-offset-4'
                    : 'text-fg hover:underline hover:underline-offset-4'
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
                className="cursor-pointer p-xs text-muted hover:text-fg"
              >
                <ChevronDown
                  size={14}
                  className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
            </div>

            {isOpen && (
              <div className="mb-xs ml-xs border-l border-line pl-md">
                {documents.map((document) =>
                  document.file ? (
                    <Link
                      key={document.slug}
                      to={`/resources/documents/${document.slug}`}
                      className={`block py-px text-sm transition-colors ${
                        document.slug === currentSlug
                          ? 'font-semibold text-fg'
                          : 'text-muted hover:text-fg'
                      }`}
                    >
                      {document.shortName}
                    </Link>
                  ) : (
                    <span
                      key={document.slug}
                      className="flex justify-between gap-sm py-px text-sm text-faint"
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
    <div className="lg:pr-md">
      {teachingMatch ? <TeachingSidebar /> : <MinistrySidebar />}
    </div>
  )
}

export default ResourcesSidebar
