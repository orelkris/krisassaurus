// Where a process's text comes from, at the end of its page
function ProcessSource({ pages }: { pages: string }) {
  return (
    <p className="text-note">
      The Ontario Curriculum, Grades 1–8: The Arts, 2009, pages {pages}. ©
      King’s Printer for Ontario.
    </p>
  )
}

export default ProcessSource
