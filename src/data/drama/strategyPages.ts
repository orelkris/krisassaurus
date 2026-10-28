import type { StrategyPageContent } from '@/types/drama'

// One JSON file per strategy page, named by its slug
const files = import.meta.glob<StrategyPageContent>('./strategyPages/*.json', {
  eager: true,
  import: 'default',
})

export function getStrategyPage(slug: string): StrategyPageContent | undefined {
  return files[`./strategyPages/${slug}.json`]
}
