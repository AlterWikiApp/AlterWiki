// Central sanitizer wrapper for Wikipedia HTML content
// MANDATORY: All Wikipedia HTML must pass through this before rendering
// See PRINCIPLES.md section 4 and AGENTS.md section 4

import DOMPurify from 'dompurify'

interface SanitizerConfig {
  ALLOWED_TAGS?: string[]
  ALLOWED_ATTR?: string[]
  ALLOW_DATA_ATTR?: boolean
}

// Default configuration for Wikipedia content
const DEFAULT_CONFIG: SanitizerConfig = {
  ALLOWED_TAGS: [
    // Text structure
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'p', 'div', 'span', 'br', 'hr',
    'strong', 'b', 'em', 'i', 'u', 's', 'strike',
    'blockquote', 'pre', 'code',
    
    // Lists
    'ul', 'ol', 'li',
    
    // Tables
    'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td',
    
    // Links and images
    'a', 'img',
    
    // Semantic elements
    'section', 'article', 'aside', 'header', 'footer',
    'figure', 'figcaption',
    
    // Math and formulas (if needed)
    'math', 'svg',
  ],
  ALLOWED_ATTR: [
    // Links
    'href', 'title',
    
    // Images
    'src', 'alt', 'width', 'height', 'loading',
    
    // Tables
    'colspan', 'rowspan',
    
    // General
    'class', 'id', 'style',
    
    // ARIA
    'role', 'aria-label', 'aria-hidden',
  ],
  ALLOW_DATA_ATTR: false,
}

/**
 * Sanitize Wikipedia HTML content
 * This is MANDATORY for all Wikipedia content before rendering
 * @param html - Raw HTML from Wikipedia API
 * @param config - Optional custom sanitizer config
 * @returns Sanitized HTML safe for rendering
 */
export function sanitizeHtml(html: string, config?: SanitizerConfig): string {
  const finalConfig = { ...DEFAULT_CONFIG, ...config }
  
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: finalConfig.ALLOWED_TAGS,
    ALLOWED_ATTR: finalConfig.ALLOWED_ATTR,
    ALLOW_DATA_ATTR: finalConfig.ALLOW_DATA_ATTR,
    // Additional security measures
    FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'form'],
    FORBID_ATTR: ['onclick', 'onload', 'onerror', 'onmouseover', 'onfocus', 'onblur'],
  })
}

/**
 * Check if a URL is an internal Wikipedia link
 * @param href - URL to check
 * @returns true if internal Wikipedia link
 */
export function isInternalWikipediaLink(href: string): boolean {
  if (!href) return false
  
  // Relative links are internal
  if (href.startsWith('./') || href.startsWith('../') || href.startsWith('/wiki/')) {
    return true
  }
  
  // Links to same domain are internal
  try {
    const url = new URL(href, window.location.origin)
    return url.hostname.includes('wikipedia.org')
  } catch {
    return false
  }
}

/**
 * Extract article title from Wikipedia URL
 * @param href - Wikipedia URL
 * @returns Article title or null
 */
export function extractArticleTitle(href: string): string | null {
  if (!href) return null
  
  // Handle relative links like ./Article_Title
  if (href.startsWith('./')) {
    return href.substring(2).replace(/_/g, ' ')
  }
  
  // Handle /wiki/Article_Title
  if (href.startsWith('/wiki/')) {
    return href.substring(6).replace(/_/g, ' ')
  }
  
  // Handle full URLs
  try {
    const url = new URL(href, window.location.origin)
    if (url.hostname.includes('wikipedia.org') && url.pathname.startsWith('/wiki/')) {
      return url.pathname.substring(6).replace(/_/g, ' ')
    }
  } catch {
    return null
  }
  
  return null
}
