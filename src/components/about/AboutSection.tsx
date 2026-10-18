import type { AboutSectionData } from '@/types'
import MediaBlock from '@/components/about/MediaBlock'

interface AboutSectionProps {
  section: AboutSectionData
}

function AboutSection({ section }: AboutSectionProps) {
  return (
    <section id={section.id} className="col-section">
      <h2 className="heading-section">{section.label}</h2>
      {section.paragraphs.map((paragraph, index) => (
        <p key={index} className="text-gray-700 leading-relaxed">
          {paragraph}
        </p>
      ))}
      {section.links?.map((link) => (
        <p key={link.href}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            {link.label}
          </a>
        </p>
      ))}
      {section.media && <MediaBlock media={section.media} />}
    </section>
  )
}

export default AboutSection
