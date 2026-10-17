import { Link } from 'react-router-dom'
import { strategyGroups } from '@/data/drama/groups'
import { strategies } from '@/data/drama/strategies'
import { dramaSubjects } from '@/data/drama/subjects'

function DramaOverviewPage() {
  return (
    <div className="flex flex-col gap-7">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gray-900">Drama</h1>
        <p className="max-w-prose text-gray-500 leading-relaxed">
          Drama strategies I’ve learned and tried, and how I’ve used them across
          subjects. Pick a strategy to see how to run it, or a subject to read
          what happened in class.
        </p>
        <p className="text-xs text-gray-400">
          {strategies.length} strategies · {dramaSubjects.length} subjects
        </p>
      </header>

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
        <div className="flex flex-col items-start gap-2.5 px-7 py-6">
          <h2 className="text-xl font-bold text-gray-900">Strategies</h2>
          <p className="max-w-prose text-gray-500 leading-relaxed">
            Drama strategies are short, structured activities that let students
            step inside a story, an idea or a problem. They need no stage,
            costumes or acting experience, and most take ten minutes or less.
            Each one gives students a different way in: speaking as a character,
            freezing a moment, building a sound, moving an idea, or replaying a
            scene with a new choice.
          </p>
          <p className="max-w-prose text-gray-500 leading-relaxed">
            The {strategies.length} strategies here are sorted into five colour
            families, and each has its own page with steps, a classroom example
            and variations.
          </p>
          <Link
            to="/blog/drama/strategies"
            className="mt-1.5 rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-700"
          >
            See all {strategies.length} →
          </Link>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold text-gray-900">Subjects</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {dramaSubjects.map((subject) => (
            <Link
              key={subject.slug}
              to={`/blog/drama/subjects/${subject.slug}`}
              className="flex flex-col gap-1.5 rounded-xl border border-gray-200 p-4 transition-shadow hover:shadow-md"
            >
              <span className="text-xs text-gray-400">Drama &amp;</span>
              <h3 className="font-bold text-gray-900">{subject.name}</h3>
              <p className="text-sm text-gray-500">{subject.intro}</p>
              <p className="mt-auto pt-2 text-xs text-gray-400">Coming soon</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export default DramaOverviewPage
