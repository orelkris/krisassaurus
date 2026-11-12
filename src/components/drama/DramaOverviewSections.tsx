import { Link } from 'react-router-dom'
import PageSection from '@/components/layout/PageSection'
import ButtonLink from '@/components/ui/ButtonLink'
import { strategyGroups } from '@/data/drama/groups'
import { strategies } from '@/data/drama/strategies'
import { dramaSubjects } from '@/data/drama/subjects'

// Drama's Strategies panel, between the Curriculum box and the Grades
export function DramaStrategiesSection() {
  return (
    <PageSection
      box="panel"
      stripe={strategyGroups.map((group) => group.colors.accent)}
      title="Strategies"
    >
      <div className="col-stack items-start">
        <p className="text-lead">
          Drama strategies are short, structured activities that let students
          step inside a story, an idea or a problem. They need no stage,
          costumes or acting experience, and most take ten minutes or less. Each
          one gives students a different way in: speaking as a character,
          freezing a moment, building a sound, moving an idea, or replaying a
          scene with a new choice.
        </p>
        <p className="text-lead">
          The {strategies.length} strategies here are sorted into five colour
          families, and each has its own page with steps, a classroom example
          and variations.
        </p>
        <ButtonLink to="/drama/strategies">
          See all {strategies.length} →
        </ButtonLink>
      </div>
    </PageSection>
  )
}

// Drama & other subjects, at the end of the Overview
export function DramaSubjectsSection() {
  return (
    <PageSection title="Subjects">
      <div className="grid grid-cols-1 gap-grid sm:grid-cols-2">
        {dramaSubjects.map((subject) => (
          <Link
            key={subject.slug}
            to={`/drama/subjects/${subject.slug}`}
            className="card card-hover col-tight"
          >
            <span className="text-note">Drama &amp;</span>
            <h3 className="heading-card">{subject.name}</h3>
            <p className="text-small">{subject.intro}</p>
            <p className="text-note mt-auto pt-sm">Coming soon</p>
          </Link>
        ))}
      </div>
    </PageSection>
  )
}
