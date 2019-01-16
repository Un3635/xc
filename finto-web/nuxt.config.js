module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'finto',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=1200, initial-scale=1'},
      {hid: 'description', name: 'description', content: '算立方日本站项目'},
      {hid: 'keywords', name: 'keywords', content: ''}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: 'stylesheet', href: '//at.alicdn.com/t/font_593980_4ft7bv0qsdk21emi.css'}
    ],
    script: [
      {src: '/googleTag.js'},
      {src: '//hm.baidu.com/hm.js?5e33a80c25589bb506d3e7dc375a026f'},
      {src: '/js/polyfill.js'}
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: {color: '#102243'},

  css: [
    'normalize.css/normalize.css',
    '~assets/style/common.scss'
  ],

  vendor: ['axios', 'element-ui', 'vuex'],

  plugins: [
    {src: '~plugins/locale', ssr: true},
    {src: '~plugins/element-ui', ssr: true},
    {src: '~plugins/vee-validate', ssr: true},
    {src: '~plugins/filter', ssr: true},
    {src: '~plugins/vue-clipboard', ssr: false},
    {src: '~plugins/vue-awesome-swiper', ssr: false},
    {src: '~plugins/tracker', ssr: false}
  ],

  router: {
    middleware: ['breadcrumb', 'route-guard']
  },

  /*
  ** Build configuration
  */
  build: {
    extractCSS: {allChunks: true},
    /*
    ** Run ESLint on save
    */
    extend(config, {isDev, isClient}) {
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
