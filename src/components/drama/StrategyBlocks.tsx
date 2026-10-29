import type { StrategyBlock } from '@/types/drama'
import Callout from '@/components/ui/Callout'
import NumberedSteps from '@/components/ui/NumberedSteps'
import Quote from '@/components/ui/Quote'
import Tip from '@/components/ui/Tip'

interface StrategyBlocksProps {
  blocks: StrategyBlock[]
  // The strategy group's colours, for the step circles and tip bands
  colors: { bg: string; text: string; accent: string }
  // Closer together, e.g. inside an example box
  tight?: boolean
}

// The text of one strategy page section, built from its JSON blocks. Blocks
// are a section step apart, so paragraphs read as separate
function StrategyBlocks({
  blocks,
  colors,
  tight = false,
}: StrategyBlocksProps) {
  return (
    <div className={tight ? 'col-stack' : 'col-section'}>
      {blocks.map((block, index) => {
        if (block.type === 'steps') {
          return (
            <NumberedSteps key={index} items={block.items} colors={colors} />
          )
        }
        if (block.type === 'tip') {
          return (
            <Tip
              key={index}
              lead={block.lead}
              text={block.text}
              tint={colors.bg}
            />
          )
        }
        if (block.type === 'bullets') {
          return (
            <ul key={index} className="col-tight list-disc pl-5">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )
        }
        if (block.type === 'example') {
          return (
            <Callout key={index} label="Example" colors={colors}>
              <StrategyBlocks blocks={block.blocks} colors={colors} tight />
            </Callout>
          )
        }
        if (block.type === 'quote') {
          return <Quote key={index} text={block.text} />
        }
        return <p key={index}>{block.text}</p>
      })}
    </div>
  )
}

export default StrategyBlocks
