// A line someone says, set off from the text around it
function Quote({ text }: { text: string }) {
  return (
    <p className="border-l-3 border-line pl-md font-semibold text-fg">{text}</p>
  )
}

export default Quote
