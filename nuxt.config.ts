// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      charset: 'utf-16',
      viewport: 'width=500, initial-scale=1',
      title: 'Tatsu',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;600&display=swap' },
      {rel: 'stylesheet',  href: 'https://fonts.googleapis.com/css2?family=Pacifico&display=swap'  },
      {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Satisfy&display=swap' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Allura&display=swap' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Alex+Brush&display=swap' },
    ],
    }
  },
  components: [
    {
      path: '~/components/',
      pathPrefix: false, // auto-import components based only on its name
    },
  ],
  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    '@fortawesome/fontawesome-svg-core/styles.css',
    '@/assets/main.css'
  ],
 postcss: { // 👈 aquí va postcss (no dentro de build)
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
