import { Link, Navigate, useParams } from 'react-router-dom'
import Breadcrumb from '@/components/ui/Breadcrumb'
import StrategyChip from '@/components/drama/StrategyChip'
import { getGroup } from '@/data/drama/groups'
import { getPairs } from '@/data/drama/pairsWith'
import {
  getQuickFacts,
  getStrategiesInGroup,
  getStrategy,
} from '@/data/drama/strategies'

function StrategyPage() {
  const { slug = '' } = useParams<{ slug: string }>()
  const strategy = getStrategy(slug)

  if (!strategy) return <Navigate to="/blog/drama/strategies" replace />

  const group = getGroup(strategy.groupId)
  const facts = getQuickFacts(strategy)
  const details = strategy.details
  const pairs = getPairs(strategy.slug).flatMap((pair) => {
    const paired = getStrategy(pair.slug)
    return paired ? [{ strategy: paired, why: pair.why }] : []
  })

  const siblings = getStrategiesInGroup(strategy.groupId)
  const index = siblings.indexOf(strategy)
  const previous = siblings[index - 1]
  const next = siblings[index + 1]

  return (
    <div className="flex flex-col gap-7">
      <header
        className="flex flex-col gap-2 rounded-2xl p-5 sm:p-7"
        style={{ backgroundColor: group.colors.bg, color: group.colors.text }}
      >
        <Breadcrumb
          items={[
            { label: 'Drama', to: '/blog/drama' },
            { label: 'Strategies', to: '/blog/drama/strategies' },
            { label: group.name, to: `/blog/drama/strategies#${group.id}` },
            { label: strategy.name },
          ]}
        />
        <h1 className="text-2xl font-bold leading-tight sm:text-3xl">{strategy.name}</h1>
        <p className="max-w-prose opacity-90">{strategy.summary}</p>
      </header>

      <dl className="grid max-w-prose grid-cols-1 rounded-xl border border-gray-200 sm:grid-cols-3">
        {[
          ['Time', facts.time],
          ['Grouping', facts.grouping],
          ['Grades', facts.grades],
        ].map(([label, value]) => (
          <div
            key={label}
            className="border-t border-gray-200 px-3.5 py-2.5 first:border-t-0 sm:border-t-0 sm:border-l sm:first:border-l-0"
          >
            <dt className="text-[11px] uppercase tracking-wide text-gray-400">{label}</dt>
            <dd className="mt-0.5 text-sm font-semibold text-gray-900">{value}</dd>
          </div>
        ))}
      </dl>

      <article className="flex max-w-prose flex-col gap-6 text-gray-700 leading-relaxed">
        {details ? (
          <>
            <section>
              <h2 className="mb-1.5 text-lg font-bold text-gray-900">What it is</h2>
              <p>{details.what}</p>
            </section>

            <section>
              <h2 className="mb-1.5 text-lg font-bold text-gray-900">How to run it</h2>
              <ol className="list-decimal space-y-1 pl-5">
                {details.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </section>

            <section className="rounded-xl bg-gray-50 px-5 py-4">
              <p className="mb-1 text-xs uppercase tracking-wide text-gray-400">
                Classroom example
              </p>
              <p>{details.example}</p>
            </section>

            <section>
              <h2 className="mb-1.5 text-lg font-bold text-gray-900">Variations</h2>
              <ul className="list-disc space-y-1 pl-5">
                {details.variations.map((variation) => (
                  <li key={variation}>{variation}</li>
                ))}
              </ul>
            </section>
          </>
        ) : (
          <p className="rounded-xl border border-dashed border-gray-200 px-4 py-3 text-sm text-gray-500">
            This page is still being written. Steps, a classroom example and
            variations are coming.
          </p>
        )}

        {pairs.length > 0 && (
          <section>
            <h2 className="mb-2 text-lg font-bold text-gray-900">Pairs well with</h2>
            <ul className="flex flex-col gap-2">
              {pairs.map(({ strategy: paired, why }) => (
                <li key={paired.slug} className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <StrategyChip strategy={paired} />
                  {why && <span className="text-sm text-gray-500">{why}</span>}
                </li>
              ))}
            </ul>
          </section>
        )}

        <nav className="flex justify-between gap-3 border-t border-gray-200 pt-4 text-sm">
          {previous ? (
            <Link to={`/blog/drama/strategies/${previous.slug}`} className="text-gray-500 hover:text-gray-900">
              <span className="block text-xs text-gray-400">← Previous in {group.name}</span>
              {previous.name}
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link to={`/blog/drama/strategies/${next.slug}`} className="text-right text-gray-500 hover:text-gray-900">
              <span className="block text-xs text-gray-400">Next in {group.name} →</span>
              {next.name}
            </Link>
          )}
        </nav>
      </article>
    </div>
  )
}

export default StrategyPage
