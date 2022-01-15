export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Todo application with Nuxt & Supabase',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'This is a todo application created by Nizar Baihaqi. For portofolio use.' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    script: [
      {
        src: 'https://kit.fontawesome.com/0fcc578757.js'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icon/favicon.ico' }
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/main.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/color-mode',
    '@nuxtjs/google-fonts',
    '@nuxt/postcss8'
  ],

  // Color mode
  colorMode: {
    classSuffix: ''
  },

  // Google fonts
  googleFonts: {
    families: {
      'PT+Sans': {
        wght: [400, 700],
        ital: [400, 700]
      }
    }
  },

  generate: {
    fallback: true
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    ['nuxt-supabase', {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY
    }]
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
}
