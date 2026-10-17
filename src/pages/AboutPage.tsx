import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import TwoColumnLayout from '@/components/layout/TwoColumnLayout'
import AboutSection from '@/components/about/AboutSection'
import BackToTopButton from '@/components/ui/BackToTopButton'
import AuthorTag from '@/components/blog/AuthorTag'
import { about } from '@/data/about'
import { scrollToTop } from '@/lib/scroll'

const navButtonClass = (isActive: boolean) =>
  `text-left text-sm py-1 transition-colors ${
    isActive
      ? 'font-semibold text-gray-900'
      : 'text-gray-500 hover:text-gray-900 cursor-pointer'
  }`

const stepButtonClass =
  'text-sm text-gray-500 hover:text-gray-900 transition-colors cursor-pointer'

function AboutPage() {
  const { coverColor, imageUrl, sections } = about
  const [searchParams, setSearchParams] = useSearchParams()

  // No ?section= (or an unknown one) means "show all sections"
  const activeIndex = sections.findIndex(
    (section) => section.id === searchParams.get('section')
  )
  const activeSection = activeIndex >= 0 ? sections[activeIndex] : null
  const previousSection = activeSection ? sections[activeIndex - 1] : undefined
  const nextSection = activeSection ? sections[activeIndex + 1] : undefined

  useEffect(() => {
    scrollToTop()
  }, [activeSection?.id])

  const showSection = (id: string) => setSearchParams({ section: id })
  const showAll = () => setSearchParams({})

  const sidebar = (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">
          On This Page
        </p>
        <nav className="flex flex-row flex-wrap gap-x-4 gap-y-1 lg:flex-col">
          <button
            onClick={showAll}
            aria-current={activeSection === null ? 'page' : undefined}
            className={navButtonClass(activeSection === null)}
          >
            All Sections
          </button>
          {sections.map((section) => {
            const isActive = section.id === activeSection?.id
            return (
              <button
                key={section.id}
                onClick={() => showSection(section.id)}
                aria-current={isActive ? 'page' : undefined}
                className={navButtonClass(isActive)}
              >
                {section.label}
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )

  return (
    <TwoColumnLayout sidebar={sidebar} scrollable>
      <div className="max-w-prose flex flex-col gap-8">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="About banner"
            className="w-full h-40 rounded-xl object-cover"
          />
        ) : (
          <div className={`w-full h-40 rounded-xl ${coverColor}`} />
        )}

        <AuthorTag
          author={{
            name: 'Kris Orel',
            role: 'Teacher Candidate, Brock University',
          }}
        />

        <hr className="border-gray-200" />

        {activeSection ? (
          <>
            <AboutSection key={activeSection.id} section={activeSection} />

            <div className="flex justify-between gap-4">
              {previousSection ? (
                <button
                  onClick={() => showSection(previousSection.id)}
                  className={stepButtonClass}
                >
                  ← Previous: {previousSection.label}
                </button>
              ) : (
                <span />
              )}
              {nextSection && (
                <button
                  onClick={() => showSection(nextSection.id)}
                  className={stepButtonClass}
                >
                  Next: {nextSection.label} →
                </button>
              )}
            </div>
          </>
        ) : (
          <>
            {sections.map((section) => (
              <AboutSection key={section.id} section={section} />
            ))}
            <BackToTopButton />
          </>
        )}
      </div>
    </TwoColumnLayout>
  )
}

export default AboutPage
