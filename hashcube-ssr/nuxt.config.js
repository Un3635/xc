module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '算立方-专业的云算力交易、矿机托管、算力租赁平台',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {
        hid: 'keywords',
        name: 'keywords',
        content: '算立方,矿机,云算力,算力,矿池,算力交易出租平台,雪豹矿机官网,矿机销售,矿机托管,挖矿矿场'
      },
      {
        hid: 'description',
        name: 'description',
        content: '算立方是全球先进的云算力租赁服务平台。“工业级矿机”雪豹矿机官方销售网站。算立方提供矿机购买、矿机托管、算力租赁及交易等全方位服务，为矿圈人士打造高效灵活、收益强劲、品质可靠的托管平台，让挖矿更简单、让托管更省心！'
      }
    ],
    link: [
      {rel: 'shortcut icon', href: '/favicon.ico'},
      {
        rel: 'stylesheet',
        href: '//at.alicdn.com/t/font_593980_4ft7bv0qsdk21emi.css'
      }
    ],
    script: [
      {src: '//hm.baidu.com/hm.js?f545ec2cc723bbfa08c1d408f2cab4c5'},
      {src: '//cstaticdun.126.net/load.min.js'},
      {src: '/js/polyfill.js'}
    ]
  },

  css: [
    'normalize.css/normalize.css',
    'swiper/dist/css/swiper.css'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: {color: '#303137'},

  router: {
    middleware: ['breadcrumb', 'route-guard']
  },

  plugins: [
    {src: '~plugins/ga', ssr: true},
    {src: '~plugins/element-ui', ssr: true},
    {src: '~plugins/vee-validate', ssr: true},
    {src: '~plugins/filter', ssr: true},
    {src: '~plugins/vue-clipboard', ssr: false},
    {src: '~plugins/vue-awesome-swiper', ssr: false},
    {src: '~plugins/baidu-tracker', ssr: false}
  ],

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
  ],
  cache: true
};

