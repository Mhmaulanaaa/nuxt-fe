// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
    },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
  ],

  css: [
    '~/assets/css/main.css'
  ],

  app: {
    head: {
      title: 'Nuxt 3 Tailwind CSS',
      titleTemplate: '%s  | Tailwind CSS',

      meta: [
        {
          name: 'description',
          content: 'Nuxt 3 Tailwind CSS'
        }
      ]
    }
  }
})