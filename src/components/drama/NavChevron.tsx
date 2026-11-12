import { ChevronDown } from 'lucide-react'

// The chevron beside a sidebar group that opens and closes
function NavChevron({ open }: { open: boolean }) {
  return (
    <ChevronDown
      size={14}
      className={`shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
    />
  )
}

export default NavChevron
