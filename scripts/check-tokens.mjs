// Lists class names that use Tailwind's own colours, sizes or corners
// instead of our tokens in src/index.css. Tailwind skips class names it
// doesn't know without a warning, so once its defaults are off this is how
// a leftover gets found. Run: npm run check:tokens
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const PALETTE =
  'slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|white|black'
const COLOUR_UTILS =
  'bg|text|border|border-[trblxy]|ring|divide|outline|fill|stroke|from|via|to|decoration|placeholder|accent|caret|shadow'
const SPACE_UTILS =
  'p|px|py|pt|pr|pb|pl|ps|pe|m|mx|my|mt|mr|mb|ml|ms|me|gap|gap-x|gap-y|space-x|space-y|w|h|size|min-w|min-h|max-w|max-h|top|right|bottom|left|inset|inset-x|inset-y|start|end|translate-x|translate-y|scroll-m|scroll-mt|scroll-mb|scroll-p|basis|leading'

const rules = [
  ['Tailwind colour', new RegExp(`^-?(?:${COLOUR_UTILS})-(?:${PALETTE})(?:-\\d+)?(?:/\\d+)?$`)],
  ['numbered size', new RegExp(`^-?(?:${SPACE_UTILS})-\\d+(?:\\.\\d+)?$`)],
  ['Tailwind text size', /^text-base$/],
  ['Tailwind corner', /^rounded(?:-[trbl]{1,2})?(?:-(?:xs|sm|md|lg|xl|2xl|3xl))?$/],
  ['Tailwind shadow', /^shadow(?:-(?:2xs|xs|sm|md|lg|xl|2xl))?$/],
  ['pixel or hex value', /\[[^\]]*(?:\d+px|#[0-9a-fA-F]{3,8})[^\]]*\]/],
  ['max-w-prose', /^max-w-prose$/],
]

function files(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) return files(path)
    return /\.(tsx?|css)$/.test(name) ? [path] : []
  })
}

// Class names live in strings: '…', "…", `…` and @apply lines
const STRING = /'([^'\n]*)'|"([^"\n]*)"|`([^`]*)`|@apply ([^;]+);/g

let count = 0
for (const file of files('src')) {
  const lines = readFileSync(file, 'utf8').split('\n')
  lines.forEach((line, index) => {
    if (/^\s*(\/\/|\/\*|\*)/.test(line)) return
    for (const match of line.matchAll(STRING)) {
      const text = match[1] ?? match[2] ?? match[3] ?? match[4]
      for (const word of text.split(/\s+/)) {
        // Drop variants like sm: and hover:
        const cls = word.replace(/^(?:[a-z0-9-]+:)+/, '').replace(/^!/, '')
        const hit = rules.find(([, re]) => re.test(cls))
        if (hit) {
          count++
          console.log(`${file}:${index + 1}  ${word}  (${hit[0]})`)
        }
      }
    }
  })
}

console.log(count ? `\n${count} to change` : 'Only our tokens are used')
process.exit(count ? 1 : 0)
