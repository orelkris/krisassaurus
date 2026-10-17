import { splitMathText } from '@/lib/mathText'

interface MathTextProps {
  text: string
}

// Plain text where numbers and expressions stay on one line.
// **Double stars** mark bold words, as in the concept cards
function MathText({ text }: MathTextProps) {
  return (
    <>
      {text.split(/\*\*(.+?)\*\*/).map((part, index) => {
        const pieces = splitMathText(part).map((piece, i) =>
          piece.keep ? (
            <span key={i} className="whitespace-nowrap">
              {piece.text}
            </span>
          ) : (
            piece.text
          )
        )
        // split() puts the bold parts at odd positions
        return index % 2 ? (
          <b key={index} className="font-bold">
            {pieces}
          </b>
        ) : (
          <span key={index}>{pieces}</span>
        )
      })}
    </>
  )
}

export default MathText
