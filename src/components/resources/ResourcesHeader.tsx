import { useNavigate } from 'react-router-dom'
import SectionTabs from '@/components/ui/SectionTabs'

const tabs = [
  { id: 'ministry', label: 'Ministry documents', to: '/resources' },
  { id: 'teaching', label: 'Teaching resources', to: '/resources/teaching' },
]

interface ResourcesHeaderProps {
  activeTab: 'ministry' | 'teaching'
  intro: string
}

function ResourcesHeader({ activeTab, intro }: ResourcesHeaderProps) {
  const navigate = useNavigate()

  return (
    <header className="flex flex-col gap-3">
      <h1 className="text-3xl font-bold text-gray-900">Resources</h1>
      <SectionTabs
        tabs={tabs}
        activeId={activeTab}
        label="Resources"
        onSelect={(id) =>
          navigate(tabs.find((tab) => tab.id === id)?.to ?? '/resources')
        }
      />
      <p className="max-w-prose text-gray-500 leading-relaxed">{intro}</p>
    </header>
  )
}

export default ResourcesHeader
