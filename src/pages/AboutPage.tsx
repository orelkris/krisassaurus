import TwoColumnLayout from '@/components/layout/TwoColumnLayout'
import { mockAbout } from '@/data/mockData'

const sections = [
  { label: 'Background', href: '#background' },
  { label: 'Teaching Philosophy', href: '#philosophy' },
  { label: 'About This Blog', href: '#blog' },
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
  const { name, role, coverColor, background, philosophy, blogDescription } =
    mockAbout

  return (
    <TwoColumnLayout sidebar={sidebar} scrollable>
      <div className="max-w-prose">
        <div className={`w-full h-40 rounded-xl ${coverColor} mb-8`} />

        <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
        <p className="mt-1 text-gray-500 mb-8">{role}</p>

        <hr className="mb-8 border-gray-200" />

        <section id="background" className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Background</h2>
          <div className="space-y-4">
            {background.map((paragraph, index) => (
              <p key={index} className="text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <section id="philosophy" className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Teaching Philosophy
          </h2>
          <div className="space-y-4">
            {philosophy.map((paragraph, index) => (
              <p key={index} className="text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <section id="blog" className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            About This Blog
          </h2>
          <div className="space-y-4">
            {blogDescription.map((paragraph, index) => (
              <p key={index} className="text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      </div>
    </TwoColumnLayout>
  )
}

export default AboutPage
