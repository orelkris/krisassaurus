import type { StrategyExample as Example } from '@/types/drama'
import ChoiceExample from './examples/ChoiceExample'
import PhrasesExample from './examples/PhrasesExample'
import RevealExample from './examples/RevealExample'
import SceneExample from './examples/SceneExample'
import SequenceExample from './examples/SequenceExample'
import TimerExample from './examples/TimerExample'

interface StrategyExampleProps {
  example: Example
  // The strategy group's colours
  colors: { bg: string; text: string; accent: string }
}

// Picks the widget for a strategy page's example from its kind
function StrategyExample({ example, colors }: StrategyExampleProps) {
  switch (example.kind) {
    case 'timer':
      return <TimerExample example={example} colors={colors} />
    case 'sequence':
      return <SequenceExample example={example} colors={colors} />
    case 'phrases':
      return <PhrasesExample example={example} colors={colors} />
    case 'scene':
      return <SceneExample example={example} colors={colors} />
    case 'choice':
      return <ChoiceExample example={example} colors={colors} />
    case 'reveal':
      return <RevealExample example={example} colors={colors} />
  }
}

export default StrategyExample
