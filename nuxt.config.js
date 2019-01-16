module.exports = {
  css: [
    "normalize.css/normalize.css",
    "swiper/dist/css/swiper.css",
    "element-ui/lib/theme-chalk/index.css",
    "~assets/style/_reset.css",
    "~assets/style/_custom-element-ui.css",
    "~assets/style/_layout.css",
    "~assets/style/_link.css",
    "~assets/style/_util.css",
    "~assets/style/article.css",
    "~assets/style/base.css",
    "~assets/style/_message.scss",
    "quill/dist/quill.snow.css",
    "quill/dist/quill.bubble.css",
    "quill/dist/quill.core.css"
  ],
  vendor: ["axios", "element-ui", "moment"],
  plugins: [
    { src: "~plugins/ga.js", ssr: true },
    { src: "~plugins/growingio.js", ssr: false },
    { src: "~plugins/element-ui", ssr: true },
    { src: "~plugins/vue-awesome-swiper", ssr: false },
    { src: "~plugins/filter", ssr: true },
    { src: "~/plugins/vue2-filters", ssr: true },
    { src: "~plugins/editor.js", ssr: false }
  ],
  /*
  ** Headers of the page
  */
  head: {
    title: "挖链网_挖掘新经济，链接新世界_区块链行业闪讯门户_walian.cn",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "keywords",
        name: "keywords",
        content: "区块链，闪讯，币圈，矿圈，虚拟货币行情，挖链指数"
      },
      {
        hid: "description",
        name: "description",
        content:
          "挖链网提供区块链行业闪讯、新闻资讯、挖链指数等一站式区块链产业服务平台，我们挖掘区块链价值，提供一个人人都能读懂区块链的网站。"
      }
    ],
    link: [
      { rel: "shortcut icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "//at.alicdn.com/t/font_514604_ymnfzh3go1fhto6r.css"
      }
    ],
    script: [
      { src: "https://hm.baidu.com/hm.js?1529245b6f0354a30e9a02e850d987a0" },
      { src: "//cstaticdun.126.net/load.min.js" },
      { src: "/js/polyfill.js" },
      { src: "//connect.qq.com/widget/loader/loader.js" ,widget:"shareqq" ,charset:"utf-8" }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: "#0063ee" },
  /*
  ** Build configuration
  */
  build: {
    publicPath:
      "//static.walian.cn/webhome/" + require("./package.json").version + "/",
    /*
    ** Run ESLint on save
    */
    extractCSS: { allChunks: true },
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  },
  babel: {
    presets: [
      [
        "env",
        {
          modules: false,
          targets: {
            browsers: ["> 1%", "last 2 versions", "not ie <= 8"]
          }
        }
      ],
      "stage-2"
    ],
    plugins: [
      "transform-vue-jsx",
      "transform-runtime",
      [
        "component",
        [
          {
            libraryName: "element-ui",
            styleLibraryName: "theme-chalk"
          }
        ]
      ]
    ]
  },
  loaders: [
    {
      test: /\.(png|jpe?g|gif|svg)$/,
      loader: "url-loader",
      query: {
        limit: 1000, // 1KO
        name: "img/[name].[hash:7].[ext]"
      }
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: "url-loader",
      query: {
        limit: 1000, // 1 KO
        name: "fonts/[name].[hash:7].[ext]"
      }
    }
  ],
  cache: true
};
