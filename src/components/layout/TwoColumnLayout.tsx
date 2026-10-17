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
      className={`max-w-6xl mx-auto px-8 flex flex-col lg:flex-row gap-8 lg:gap-0 ${
        scrollable ? 'min-h-full' : 'h-full'
      }`}
    >
      <aside className="w-full pt-8 lg:w-52 lg:shrink-0 lg:pb-8 lg:border-r lg:border-gray-200">
        {sidebar}
      </aside>
      <main
        className={`flex-1 min-w-0 flex flex-col pb-8 lg:pt-8 lg:pl-8 ${
          scrollable ? '' : 'min-h-0'
        }`}
      >
        {children}
      </main>
    </div>
  )
}

export default TwoColumnLayout
