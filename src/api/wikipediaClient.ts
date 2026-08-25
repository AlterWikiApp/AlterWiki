// Wikipedia API client with User-Agent header and caching
// Implements Wikimedia API policy: https://meta.wikimedia.org/wiki/User-Agent_policy

import { currentLanguage } from '../state/language'

const USER_AGENT = 'AlterWiki/0.1.0 (https://github.com/AlterWikiApp/AlterWiki; lorddenti@protonmail.com)'

interface CacheEntry<T> {
  data: T
  timestamp: number
}

class WikipediaClient {
  private cache = new Map<string, CacheEntry<any>>()
  private readonly CACHE_TTL = 5 * 60 * 1000 // 5 minutes

  private getCacheKey(endpoint: string, params: Record<string, any>): string {
    return `${endpoint}:${JSON.stringify(params)}`
  }

  private getFromCache<T>(key: string): T | null {
    const entry = this.cache.get(key)
    if (!entry) return null

    const now = Date.now()
    if (now - entry.timestamp > this.CACHE_TTL) {
      this.cache.delete(key)
      return null
    }

    return entry.data as T
  }

  private setCache<T>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    })
  }

  private async fetchWithHeaders(url: string): Promise<Response> {
    const response = await fetch(url, {
      headers: {
        'User-Agent': USER_AGENT,
        'Api-User-Agent': USER_AGENT,
      },
    })
    return response
  }

  async search(query: string, lang?: string, limit: number = 10): Promise<any> {
    const resolvedLang = lang || currentLanguage.value
    const cacheKey = this.getCacheKey('search', { query, lang: resolvedLang, limit })
    const cached = this.getFromCache<any>(cacheKey)
    if (cached) return cached

    const url = `https://${resolvedLang}.wikipedia.org/w/rest.php/v1/search/page?q=${encodeURIComponent(query)}&limit=${limit}`
    const response = await this.fetchWithHeaders(url)

    if (!response.ok) {
      throw new Error(`Search failed: ${response.statusText}`)
    }

    const data = await response.json()
    this.setCache(cacheKey, data)
    return data
  }

  async getArticle(title: string, lang?: string): Promise<string> {
    const resolvedLang = lang || currentLanguage.value
    const cacheKey = this.getCacheKey('article', { title, lang: resolvedLang })
    const cached = this.getFromCache<string>(cacheKey)
    if (cached) return cached

    const url = `https://${resolvedLang}.wikipedia.org/api/rest_v1/page/html/${encodeURIComponent(title)}`
    const response = await this.fetchWithHeaders(url)

    if (!response.ok) {
      throw new Error(`Article fetch failed: ${response.statusText}`)
    }

    const html = await response.text()
    this.setCache(cacheKey, html)
    return html
  }

  async getRandomArticle(lang?: string): Promise<string> {
    const resolvedLang = lang || currentLanguage.value
    const url = `https://${resolvedLang}.wikipedia.org/api/rest_v1/page/random/title`
    const response = await this.fetchWithHeaders(url)

    if (!response.ok) {
      throw new Error(`Random article fetch failed: ${response.statusText}`)
    }

    const data = await response.json()
    // The random/title endpoint returns an object with items array
    if (data.items && data.items.length > 0) {
      return data.items[0].title
    }
    // Fallback for different response formats
    return typeof data === 'string' ? data : data.title || JSON.stringify(data)
  }

  async getSummary(title: string, lang?: string): Promise<any> {
    const resolvedLang = lang || currentLanguage.value
    const cacheKey = this.getCacheKey('summary', { title, lang: resolvedLang })
    const cached = this.getFromCache<any>(cacheKey)
    if (cached) return cached

    const url = `https://${resolvedLang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`
    const response = await this.fetchWithHeaders(url)

    if (!response.ok) {
      throw new Error(`Summary fetch failed: ${response.statusText}`)
    }

    const data = await response.json()
    this.setCache(cacheKey, data)
    return data
  }

  clearCache(): void {
    this.cache.clear()
  }
}

export const wikipediaClient = new WikipediaClient()
