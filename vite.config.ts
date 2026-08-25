import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/icon-192.png', 'icons/icon-512.png'],
      manifest: {
        name: 'AlterWiki',
        short_name: 'AlterWiki',
        description:
          'Open-Source Wikipedia-App mit Fokus auf Privatsphäre und Barrierefreiheit',
        theme_color: '#3b82f6',
        background_color: '#f9fafb',
        display: 'standalone',
        lang: 'de',
        start_url: '/',
        icons: [
          {
            src: 'icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/[\w-]+\.wikipedia\.org\/api\/rest_v1\/page\/html\/.+/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'wikipedia-articles',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/[\w-]+\.wikipedia\.org\/w\/rest\.php\/v1\/search\/.+/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'wikipedia-search',
              networkTimeoutSeconds: 3,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/[\w-]+\.wikipedia\.org\/api\/rest_v1\/page\/summary\/.+/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'wikipedia-summaries',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 7,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
})
