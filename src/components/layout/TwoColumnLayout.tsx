import type { ReactNode } from 'react'

interface TwoColumnLayoutProps {
  sidebar: ReactNode
  children: ReactNode
  scrollable?: boolean
}

function TwoColumnLayout({
  sidebar,
  children,
  scrollable = false,
}: TwoColumnLayoutProps) {
  return (
    <div
      className={`max-w-6xl mx-auto px-8 py-8 flex flex-col lg:flex-row gap-8 ${
        scrollable ? '' : 'h-full'
      }`}
    >
      <aside className="w-full lg:w-52 lg:shrink-0 lg:border-r lg:border-gray-200">
        {sidebar}
      </aside>
      <main
        className={`flex-1 min-w-0 flex flex-col ${
          scrollable ? '' : 'min-h-0'
        }`}
      >
        {children}
      </main>
    </div>
  )
}

export default TwoColumnLayout
