import { sanitizeHtml } from '../src/security/sanitizer'

function testScriptPayload() {
  console.log('=== Script Payload Test ===')
  
  const maliciousHtml = `
    <div>
      <p>Safe content</p>
      <script>alert('XSS')</script>
      <img src="x" onerror="alert('XSS2')">
      <a href="#" onclick="alert('XSS3')">Click me</a>
      <iframe src="evil.com"></iframe>
    </div>
  `
  
  console.log('Original HTML:')
  console.log(maliciousHtml)
  console.log('\n---\n')
  
  const sanitized = sanitizeHtml(maliciousHtml)
  
  console.log('Sanitized HTML:')
  console.log(sanitized)
  console.log('\n---\n')
  
  // Check for dangerous elements
  const hasScript = sanitized.includes('<script>')
  const hasOnclick = sanitized.includes('onclick')
  const hasOnerror = sanitized.includes('onerror')
  const hasIframe = sanitized.includes('<iframe')
  
  console.log('Security checks:')
  console.log(`  Contains <script>: ${hasScript ? '❌ FAIL' : '✅ PASS'}`)
  console.log(`  Contains onclick: ${hasOnclick ? '❌ FAIL' : '✅ PASS'}`)
  console.log(`  Contains onerror: ${hasOnerror ? '❌ FAIL' : '✅ PASS'}`)
  console.log(`  Contains <iframe>: ${hasIframe ? '❌ FAIL' : '✅ PASS'}`)
  
  if (!hasScript && !hasOnclick && !hasOnerror && !hasIframe) {
    console.log('\n✅ All security checks passed - Sanitizing is working correctly')
  } else {
    console.log('\n❌ Security checks failed - Sanitizing is NOT working correctly')
  }
}

testScriptPayload()
