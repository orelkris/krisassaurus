import FramedGroup from '@/components/ui/FramedGroup'
import TermList from '@/components/ui/TermList'
import { getElements } from '@/data/drama/curriculum/elements'

interface ElementsOfDramaProps {
  grade: number
}

// The five elements of drama a grade focuses on. It always comes first on
// the pages that show it
function ElementsOfDrama({ grade }: ElementsOfDramaProps) {
  return (
    <FramedGroup label={`Elements of drama · Grade ${grade}`}>
      <TermList terms={getElements(grade)} />
    </FramedGroup>
  )
}

export default ElementsOfDrama
