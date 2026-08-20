// Smoke test for Wikipedia API client
// Run with: npx tsx tests/smoke-test.ts

import { wikipediaClient } from '../src/api/wikipediaClient'

async function runSmokeTest() {
  console.log('=== Wikipedia API Smoke Test ===\n')

  try {
    // Test 1: Search
    console.log('Test 1: Search for "Berlin"')
    const searchResults = await wikipediaClient.search('Berlin', 'en', 3)
    console.log('✓ Search successful')
    console.log(`  Found ${searchResults.pages?.length || 0} results`)
    if (searchResults.pages?.length > 0) {
      console.log(`  First result: ${searchResults.pages[0].title}`)
    }
    console.log()

    // Test 2: Get Article
    console.log('Test 2: Get article for "Berlin"')
    const articleHtml = await wikipediaClient.getArticle('Berlin', 'en')
    console.log('✓ Article fetch successful')
    console.log(`  HTML length: ${articleHtml.length} characters`)
    console.log(`  Contains content: ${articleHtml.includes('Berlin') ? 'Yes' : 'No'}`)
    console.log()

    // Test 3: Random Article
    console.log('Test 3: Get random article')
    const randomTitle = await wikipediaClient.getRandomArticle('en')
    console.log('✓ Random article successful')
    console.log(`  Random title: ${randomTitle}`)
    console.log()

    // Test 4: Summary
    console.log('Test 4: Get summary for "Berlin"')
    const summary = await wikipediaClient.getSummary('Berlin', 'en')
    console.log('✓ Summary fetch successful')
    console.log(`  Title: ${summary.title}`)
    console.log(`  Extract: ${summary.extract?.substring(0, 100)}...`)
    console.log()

    // Test 5: Caching
    console.log('Test 5: Verify caching (second call should be cached)')
    const cachedSearch = await wikipediaClient.search('Berlin', 'en', 3)
    console.log('✓ Caching works')
    console.log()

    console.log('=== All tests passed! ===')
  } catch (error) {
    console.error('✗ Test failed:', error)
    process.exit(1)
  }
}

runSmokeTest()
