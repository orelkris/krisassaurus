// A line someone says, set off from the text around it
function Quote({ text }: { text: string }) {
  return (
    <p className="border-l-[3px] border-gray-200 pl-3 font-semibold text-gray-900">
      {text}
    </p>
  )
}

export default Quote
