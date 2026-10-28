import { Navigate, useParams } from 'react-router-dom'
import PageHeader from '@/components/layout/PageHeader'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ButtonLink from '@/components/ui/ButtonLink'
import FileLink from '@/components/ui/FileLink'
import FramedGroup from '@/components/ui/FramedGroup'
import Pill from '@/components/ui/Pill'
import StrategyBlocks from '@/components/drama/StrategyBlocks'
import StrategyChip from '@/components/drama/StrategyChip'
import StrategyExample from '@/components/drama/StrategyExample'
import { getGroup } from '@/data/drama/groups'
import { isGreyedOut } from '@/data/drama/greyedOut'
import { getPairs } from '@/data/drama/pairsWith'
import { getStrategy } from '@/data/drama/strategies'
import { getStrategyPage } from '@/data/drama/strategyPages'
import { getStoriesFor } from '@/data/drama/strategyStories'

function StrategyPage() {
  const { slug = '' } = useParams<{ slug: string }>()
  const strategy = getStrategy(slug)

  if (!strategy) return <Navigate to="/drama/strategies" replace />

  const group = getGroup(strategy.groupId)
  const page = getStrategyPage(strategy.slug)
  const stories = getStoriesFor(strategy.slug)
  // Greyed-out strategies are left out of the pairs
  const pairs = getPairs(strategy.slug).flatMap((pair) => {
    const paired = getStrategy(pair.slug)
    return paired && !isGreyedOut(paired.slug)
      ? [{ strategy: paired, why: pair.why }]
      : []
  })

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
      >
        {/* The back button goes to this strategy's group on the Strategies
            page */}
        <div className="col-section items-start">
          <Pill colors={group.colors}>{group.name}</Pill>
          <ButtonLink to={`/drama/strategies#${group.id}`} variant="secondary">
            ← Back to Strategies
          </ButtonLink>
        </div>
      </PageHeader>

      {page?.example && (
        <StrategyExample example={page.example} colors={group.colors} />
      )}

      {page ? (
        page.sections.map((section) => (
          <FramedGroup
            key={section.heading}
            label={section.heading}
            tone={group.colors}
          >
            <StrategyBlocks blocks={section.blocks} colors={group.colors} />
          </FramedGroup>
        ))
      ) : strategy.sections ? (
        strategy.sections.map((section) => (
          <FramedGroup
            key={section.heading}
            label={section.heading}
            tone={group.colors}
          >
            <div className="col-stack">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </FramedGroup>
        ))
      ) : (
        <p className="text-small max-w-prose rounded-xl border border-dashed border-gray-200 pad-md">
          This page is still being written.
        </p>
      )}

      {stories.length > 0 && (
        <FramedGroup label="Story we used" tone={group.colors}>
          {stories.map((story) => (
            <FileLink
              key={story.slug}
              href={story.url}
              title={story.title}
              kind="PDF"
            />
          ))}
        </FramedGroup>
      )}

      {pairs.length > 0 && (
        <FramedGroup label="Pairs well with" tone={group.colors}>
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
        </FramedGroup>
      )}
    </>
  )
}

export default StrategyPage
