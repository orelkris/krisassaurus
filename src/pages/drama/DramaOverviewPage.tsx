import { Link } from 'react-router-dom'
import { strategyGroups } from '@/data/drama/groups'
import { strategies } from '@/data/drama/strategies'
import { dramaSubjects } from '@/data/drama/subjects'
import CurriculumBox from '@/components/resources/CurriculumBox'
import ButtonLink from '@/components/ui/ButtonLink'

function DramaOverviewPage() {
  return (
    <div className="col-page">
      <header className="col-stack">
        <h1 className="heading-page">Drama</h1>
        <p className="text-lead">
          Drama strategies I’ve learned and tried, and how I’ve used them across
          subjects. Pick a strategy to see how to run it, or a subject to read
          what happened in class.
        </p>
        <p className="text-muted">
          {strategies.length} strategies · {dramaSubjects.length} subjects
        </p>
      </header>

      <CurriculumBox subject="drama" />

      <section className="overflow-hidden rounded-2xl border border-gray-200">
        {/* One stripe per colour family */}
        <div className="flex h-2.5" aria-hidden="true">
          {strategyGroups.map((group) => (
            <span
              key={group.id}
              className="flex-1"
              style={{ backgroundColor: group.colors.accent }}
            />
          ))}
        </div>
        <div className="col-stack pad-lg items-start">
          <h2 className="heading-section">Strategies</h2>
          <p className="text-lead">
            Drama strategies are short, structured activities that let students
            step inside a story, an idea or a problem. They need no stage,
            costumes or acting experience, and most take ten minutes or less.
            Each one gives students a different way in: speaking as a character,
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
      </section>

      <section className="col-section">
        <h2 className="heading-section">Subjects</h2>
        <div className="grid grid-cols-1 gap-grid sm:grid-cols-2">
          {dramaSubjects.map((subject) => (
            <Link
              key={subject.slug}
              to={`/drama/subjects/${subject.slug}`}
              className="card card-hover col-tight"
            >
              <span className="text-muted">Drama &amp;</span>
              <h3 className="heading-card">{subject.name}</h3>
              <p className="text-small">{subject.intro}</p>
              <p className="text-muted mt-auto pt-2">Coming soon</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export default DramaOverviewPage