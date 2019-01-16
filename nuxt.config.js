module.exports = {
  vendor: ["axios", "moment", "vuex"],
  plugins: [
    { src: "~plugins/ga.js", ssr: true },
    { src: "~plugins/mint-ui.js", ssr: true },
    { src: "~plugins/filter", ssr: true }
  ],
  css: ["./other/common.scss"],
  /*
  ** Headers of the page
  */
  head: {
    title: "挖链网|挖掘新经济，链接新世界",
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, user-scalable=no"
      },
      { name: "format-detection", content: "telephone=no" },
      {
        hid: "keywords",
        name: "keywords",
        content: "区块链,区块链是什么,比特币,比特币资讯,虚拟货币,数字货币行业大数据,挖链指数,大数据,ai人工智能,云计算技术,新政策,新经济,前沿技术"
      },
      {
        hid: "description",
        name: "description",
        content:
          "挖链网是聚合区块链、新经济、新技术的综合媒体资讯门户网站，汇聚全球区块链交易机构大数据、以技术为核心，打造出挖链闪讯、挖链学院、数据行情等多个核心板块，为区块链创业者、区块链投资人提供一站式服务体系！"
      }
    ],
    link: [{ rel: "shortcut icon", href: "/favicon.ico" }],
    script: [
      { src: "/rem.js" },
      { src: "https://hm.baidu.com/hm.js?2dcef30c3242f0fbc223ea0d7e58b4a5" }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: "#3B8070" },
  /*
  ** Build configuration
  */
  build: {
    publicPath:
      "//static.walian.cn/wap/" + require("./package.json").version + "/",
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
  ]
};
