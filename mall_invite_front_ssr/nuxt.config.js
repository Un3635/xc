module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'mall_invite_front_new',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: '\"算力星球\"'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: 'stylesheet', href: '//at.alicdn.com/t/font_593980_4ft7bv0qsdk21emi.css'}
    ],
    script: [
      {src: '/jquery-1.9.1.min.js'},
      {src: '/config.js'},
      {src: '/navigator.js'}
    ]
  },
  /*
   ** Customize the progress bar color
   */
  loading: {color: '#3B8070'},

  css: [
    'normalize.css/normalize.css',
    '~assets/css/reset.scss'
  ],

  vender: ['element-ui', 'vuex'],

  plugins: [
    {src: '~plugins/element-ui', ssr: true},
    {src: '~plugins/filter', ssr: true},
    {src: '~plugins/vue-clipboard', ssr: true}
  ],

  router: {
    middleware: ['breadcrumb', 'initCenter']
  },
  /*
   ** Build configuration
   */
  build: {
    extractCSS: {allChunks: true},
    /*
     ** Run ESLint on save
     */
    extend (config, {isDev, isClient}) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    }
  },
  babel: {
    presets: [
      [
        'env',
        {
          modules: false,
          targets: {
            browsers: ['> 1%', 'last 2 versions', 'not ie <= 8']
          }
        }
      ],
      'stage-2'
    ],
    plugins: [
      'transform-vue-jsx',
      'transform-runtime',
      [
        'component',
        [
          {
            libraryName: 'element-ui',
            styleLibraryName: 'theme-chalk'
          }
        ]
      ]
    ]
  },
  loaders: [
    {
      test: /\.(png|jpe?g|gif|svg)$/,
      loader: 'url-loader',
      query: {
        limit: 1000, // 1KO
        name: 'img/[name].[hash:7].[ext]'
      }
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      query: {
        limit: 1000, // 1 KO
        name: 'fonts/[name].[hash:7].[ext]'
      }
    }
  ]
};
