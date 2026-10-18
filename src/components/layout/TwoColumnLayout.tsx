import type { ReactNode } from 'react'
import Container from '@/components/layout/Container'

interface TwoColumnLayoutProps {
  sidebar: ReactNode
  children: ReactNode
  scrollable?: boolean
}

// Only places the columns: the sidebar on the left with a line after it, the
// main area on the right. On phones they stack, with the line under the
// sidebar. Each column is a Container, which owns the padding and the gaps
function TwoColumnLayout({
  sidebar,
  children,
  scrollable = false,
}: TwoColumnLayoutProps) {
  return (
    <div
      className={`mx-auto flex max-w-6xl flex-col lg:flex-row ${
        scrollable ? 'min-h-full' : 'h-full'
      }`}
    >
      <aside className="w-full border-b border-gray-200 lg:w-68 lg:shrink-0 lg:border-r lg:border-b-0">
        <Container gap="section">{sidebar}</Container>
      </aside>
      <main
        className={`flex min-w-0 flex-1 flex-col ${scrollable ? '' : 'min-h-0'}`}
      >
        <Container fill={!scrollable}>{children}</Container>
      </main>
    </div>
  )
}

export default TwoColumnLayout
