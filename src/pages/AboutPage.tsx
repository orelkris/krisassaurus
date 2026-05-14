import TwoColumnLayout from '@/components/layout/TwoColumnLayout'
import { mockAbout } from '@/data/mockData'
import AuthorTag from '@/components/blog/AuthorTag'

const sections = [
  { label: 'About Me', href: '#about' },
  { label: 'About This Blog', href: '#blog' },
  { label: 'Background', href: '#background' },
  { label: 'Teaching Philosophy', href: '#philosophy' },
  { label: 'Standpoint', href: '#standpoint' },
]

const sidebar = (
  <div className="flex flex-col gap-6">
    <div>
      <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">
        On This Page
      </p>
      <nav className="flex flex-col gap-1">
        {sections.map((section) => (
          <a
            key={section.href}
            href={section.href}
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors py-1 cursor-pointer"
          >
            {section.label}
          </a>
        ))}
      </nav>
    </div>
  </div>
)

function AboutPage() {
  const {
    coverColor,
    imageUrl,
    aboutMe,
    blogDescription,
    background,
    philosophy,
    standpoint,
  } = mockAbout

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
        <section id="about" className="flex flex-col gap-4">
          <h2 className="text-lg font-bold text-gray-900">About Me</h2>
          {aboutMe.map((paragraph, index) => (
            <p key={index} className="text-gray-700 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </section>

        <section id="blog" className="flex flex-col gap-4">
          <h2 className="text-lg font-bold text-gray-900">About This Blog</h2>
          {blogDescription.map((paragraph, index) => (
            <p key={index} className="text-gray-700 leading-relaxed">
              {paragraph}
            </p>
          ))}
          <p>
            <a href="https://adunsiger.com/" target="_blank" className="link">
              Support Aviva!
            </a>
          </p>
        </section>

        <section id="background" className="flex flex-col gap-4">
          <h2 className="text-lg font-bold text-gray-900">Background</h2>
          {background.map((paragraph, index) => (
            <p key={index} className="text-gray-700 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </section>

        <section id="philosophy" className="flex flex-col gap-4">
          <h2 className="text-lg font-bold text-gray-900">
            Teaching Philosophy
          </h2>
          {philosophy.map((paragraph, index) => (
            <p key={index} className="text-gray-700 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </section>

        {standpoint && (
          <section id="standpoint" className="flex flex-col gap-4">
            <h2 className="text-lg font-bold text-gray-900">Standpoint</h2>
            {standpoint.text.map((paragraph, index) => (
              <p key={index} className="text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
            <iframe
              src={`https://www.youtube.com/embed/${standpoint.youtubeId}`}
              title="Standpoint video"
              allowFullScreen
              className="w-full aspect-video rounded-xl"
            />
          </section>
        )}
      </div>
    </TwoColumnLayout>
  )
}

export default AboutPage
