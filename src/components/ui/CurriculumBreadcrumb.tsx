import Breadcrumb from '@/components/ui/Breadcrumb'

interface CurriculumBreadcrumbProps {
  // e.g. Math or Drama
  subject: string
  grade?: number
  // The strand's name, e.g. Number
  strand?: string
  // The expectation's code, e.g. B1.1
  code?: string
  className?: string
}

// Where you are in a subject's curriculum: Math / Grade 6 / Number / B1.1.
// Parts that aren't picked are left out. Pages show it on desktop; on phones
// the sidebar shows it above the filters
function CurriculumBreadcrumb({
  subject,
  grade,
  strand,
  code,
  className = '',
}: CurriculumBreadcrumbProps) {
  const labels = [subject, grade && `Grade ${grade}`, strand, code].filter(
    (label): label is string => !!label
  )

  return (
    <Breadcrumb
      className={`text-gray-900 ${className}`}
      items={labels.map((label) => ({ label }))}
    />
  )
}

export default CurriculumBreadcrumb
