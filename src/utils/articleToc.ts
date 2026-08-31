/** Extract heading jump targets from sanitized article HTML. */

export interface TocHeading {
  id: string
  text: string
  level: number
}

const HEADING_SELECTOR = 'h2, h3, h4, h5, h6'

function slugify(text: string, used: Set<string>): string {
  let base = text
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  if (!base) base = 'abschnitt'

  let id = base
  let n = 2
  while (used.has(id)) {
    id = `${base}-${n++}`
  }
  used.add(id)
  return id
}

function headingText(el: Element): string {
  const clone = el.cloneNode(true) as HTMLElement
  clone.querySelectorAll('style, script').forEach((node) => node.remove())
  return (clone.textContent || '').replace(/\s+/g, ' ').trim()
}

/**
 * Ensure headings have unique ids and return TOC entries + rewritten HTML.
 */
export function prepareArticleToc(html: string): {
  html: string
  headings: TocHeading[]
} {
  if (typeof DOMParser === 'undefined') {
    return { html, headings: [] }
  }

  const doc = new DOMParser().parseFromString(html, 'text/html')
  const usedIds = new Set<string>()
  const headings: TocHeading[] = []

  doc.querySelectorAll('[id]').forEach((el) => {
    const id = el.getAttribute('id')
    if (id) usedIds.add(id)
  })

  doc.body.querySelectorAll(HEADING_SELECTOR).forEach((el) => {
    const text = headingText(el)
    if (!text) return

    const level = Number(el.tagName.charAt(1))
    let id = el.getAttribute('id')

    if (!id) {
      const nested = el.querySelector('[id]')
      const nestedId = nested?.getAttribute('id')
      if (nestedId) {
        id = nestedId
        el.setAttribute('id', nestedId)
      }
    }

    if (!id) {
      id = slugify(text, usedIds)
      el.setAttribute('id', id)
    }

    headings.push({ id, text, level })
  })

  return {
    html: doc.body.innerHTML,
    headings,
  }
}
