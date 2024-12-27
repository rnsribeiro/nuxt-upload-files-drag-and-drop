// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@vueuse/nuxt'
  ],
  runtimeConfig: {
    MONGO_URI: process.env.MONGO_URI
  },
  nitro: {
    storage: {
      fs: {
        driver: 'fs',
        base: './public'
      }
    },
    imports: {
      dirs: ['./server/models']
    }
  }
})