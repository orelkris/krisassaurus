import Breadcrumb from '@/components/ui/Breadcrumb'
import { useMathFilter } from '@/hooks/useMathFilter'

interface MathBreadcrumbProps {
  className?: string
}

// Where you are in Math, read from the filter: Math / Grade 6 / Number / B1.1.
// Pages show it on desktop; on phones the sidebar shows it above the filters
function MathBreadcrumb({ className = '' }: MathBreadcrumbProps) {
  const { filter, strand, expectation } = useMathFilter()
  const labels = [
    'Math',
    filter.grade && `Grade ${filter.grade}`,
    strand?.name,
    expectation?.code,
  ].filter((label): label is string => !!label)

  return (
    <Breadcrumb
      className={`text-gray-900 ${className}`}
      items={labels.map((label) => ({ label }))}
    />
  )
}

export default MathBreadcrumb