import { wikipediaClient } from '../src/api/wikipediaClient'
import { sanitizeHtml } from '../src/security/sanitizer'

async function testSanitizer() {
  console.log('=== Sanitizer Test ===')
  
  // Get raw HTML from API
  const rawHtml = await wikipediaClient.getArticle('Berlin', 'en')
  console.log(`Raw HTML length: ${rawHtml.length} characters`)
  
  // Sanitize the HTML
  const sanitizedHtml = sanitizeHtml(rawHtml)
  console.log(`Sanitized HTML length: ${sanitizedHtml.length} characters`)
  
  const difference = rawHtml.length - sanitizedHtml.length
  const percentage = (difference / rawHtml.length) * 100
  
  console.log(`Difference: ${difference} characters (${percentage.toFixed(2)}%)`)
  
  if (percentage > 10) {
    console.log('⚠️  WARNING: Sanitizer removed significant content (>10%)')
  } else {
    console.log('✓ Sanitizer removed minimal content (<10%)')
  }
  
  // Check for specific patterns
  const rawSectionCount = (rawHtml.match(/<section/g) || []).length
  const sanitizedSectionCount = (sanitizedHtml.match(/<section/g) || []).length
  
  console.log(`Raw <section> tags: ${rawSectionCount}`)
  console.log(`Sanitized <section> tags: ${sanitizedSectionCount}`)
  
  if (rawSectionCount !== sanitizedSectionCount) {
    console.log('⚠️  WARNING: Sanitizer removed <section> tags')
  } else {
    console.log('✓ All <section> tags preserved')
  }
  
  const rawH2Count = (rawHtml.match(/<h2/g) || []).length
  const sanitizedH2Count = (sanitizedHtml.match(/<h2/g) || []).length
  
  console.log(`Raw <h2> tags: ${rawH2Count}`)
  console.log(`Sanitized <h2> tags: ${sanitizedH2Count}`)
  
  if (rawH2Count !== sanitizedH2Count) {
    console.log('⚠️  WARNING: Sanitizer removed <h2> tags')
  } else {
    console.log('✓ All <h2> tags preserved')
  }
}

testSanitizer().catch(console.error)
