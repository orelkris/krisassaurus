import { Link, Navigate, useParams } from 'react-router-dom'
import PageHeader from '@/components/layout/PageHeader'
import PageSection from '@/components/layout/PageSection'
import Breadcrumb from '@/components/ui/Breadcrumb'
import FactList from '@/components/ui/FactList'
import FramedGroup from '@/components/ui/FramedGroup'
import Pill from '@/components/ui/Pill'
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

  if (!strategy) return <Navigate to="/drama/strategies" replace />

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
    <>
      <PageHeader
        above={
          <Breadcrumb
            className="text-gray-900"
            items={[
              { label: 'Drama' },
              { label: 'Strategies' },
              { label: group.name },
            ]}
          />
        }
        title={strategy.name}
        description={strategy.summary}
        meta={<Pill colors={group.colors}>{group.name}</Pill>}
      />

      <FactList
        facts={[
          { label: 'Time', value: facts.time },
          { label: 'Grouping', value: facts.grouping },
          { label: 'Grades', value: facts.grades },
        ]}
      />

      {details ? (
        <>
          <PageSection title="What it is">
            <p className="max-w-prose">{details.what}</p>
          </PageSection>

          <PageSection title="How to run it">
            <ol className="max-w-prose list-decimal space-y-tight pl-5">
              {details.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </PageSection>

          <div className="max-w-prose">
            <FramedGroup label="Classroom example">
              <p>{details.example}</p>
            </FramedGroup>
          </div>

          <PageSection title="Variations">
            <ul className="max-w-prose list-disc space-y-tight pl-5">
              {details.variations.map((variation) => (
                <li key={variation}>{variation}</li>
              ))}
            </ul>
          </PageSection>
        </>
      ) : (
        <p className="text-small max-w-prose rounded-xl border border-dashed border-gray-200 pad-md">
          This page is still being written. Steps, a classroom example and
          variations are coming.
        </p>
      )}

      {pairs.length > 0 && (
        <PageSection title="Pairs well with">
          <ul className="col-stack">
            {pairs.map(({ strategy: paired, why }) => (
              <li
                key={paired.slug}
                className="flex flex-wrap items-center gap-x-2 gap-y-1"
              >
                <StrategyChip strategy={paired} />
                {why && <span className="text-small">{why}</span>}
              </li>
            ))}
          </ul>
        </PageSection>
      )}

      <nav className="flex max-w-prose justify-between gap-3 border-t border-gray-200 pt-4">
        {previous ? (
          <Link
            to={`/drama/strategies/${previous.slug}`}
            className="text-sm text-gray-500 hover:text-gray-900"
          >
            <span className="text-muted block">← Previous in {group.name}</span>
            {previous.name}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            to={`/drama/strategies/${next.slug}`}
            className="text-right text-sm text-gray-500 hover:text-gray-900"
          >
            <span className="text-muted block">Next in {group.name} →</span>
            {next.name}
          </Link>
        )}
      </nav>
    </>
  )
}

export default StrategyPage
