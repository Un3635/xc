const fs = require('fs');
const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');
const resolve = file => path.resolve(__dirname, file);
const proxyMiddleware = require('http-proxy-middleware');

const config = require('./config');
const isProd = process.env.NODE_ENV === 'production';

const app = express();

let renderer;
if (isProd) {
  // 生产环境使用本地打包文件来渲染
  const bundle = require('./output/vue-ssr-bundle.json');
  const template = fs.readFileSync(resolve('./output/index.html'), 'utf-8');
  renderer = createRenderer(bundle, template);
} else {
  // 开发环境使用webpack热更新服务
  require('./build/dev-server')(app, (bundle, template) => {
    renderer = createRenderer(bundle, template);
  });
}

function createRenderer(bundle, template) {
  return require('vue-server-renderer').createBundleRenderer(bundle, {
    template,
    cache: require('lru-cache')({
      max: 1000,
      maxAge: 1000 * 60 * 15
    })
  });
}

const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && isProd ? 60 * 60 * 24 * 30 : 0
});

// 客户端跨域代理
const proxyTable = {
  '/api': {
    target: config.baseURL,
    changeOrigin: true,
    pathRewrite: {
      '^/api': '/api'
    }
  }
};

Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context];
  if (typeof options === 'string') {
    options = {target: options};
  }
  app.use(proxyMiddleware(options.filter || context, options));
});

const v = Date.now();

app.use(require('cookie-parser')());
app.use('/output', serve('./output', true));
app.use('/service-worker.js', serve('./output/service-worker.js'));
app.use(favicon(path.resolve(__dirname, 'public/images/favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  if (!renderer) {
    return res.end('waiting for compilation... refresh in a moment.');
  }

  const s = Date.now();

  res.setHeader('Content-Type', 'text/html');

  const errorHandler = err => {
    if (err && err.code === 404) {
      // 未找到页面
      res.status(404).sendFile(resolve('public/404.html'));
    } else {
      // 页面渲染错误
      res.status(500).end('500 - Internal Server Error');
      console.error(`error during render : ${req.url}`);
      console.error(err);
    }
  };

  const context = {
    title: '小虫快租-全方案企业电脑租赁电商平台，零押金，免费送货',
    keywords: '电脑租赁,电脑出租,租电脑,租笔记本,小虫快租,免押金租赁,企业租赁电脑,出租办公电脑,IBM笔记本租赁,IBM电脑租赁,租苹果电脑,服务器租赁,高配台式机出租,笔记本电脑租赁,苹果电脑出租,高端笔记本电脑出租,电脑免押金租赁',
    description: '小虫快租是一站式电脑租赁和IT服务电商平台,主要为全国企业用户提供笔记本电脑租赁,台式机租赁,苹果电脑租赁以及各类办公用IT设备,打印机,复印机租赁等,同时提供免押金,随借随还,最低90元可租电脑服务',
    version: v,
    url: req.url,
    cookies: req.cookies
  };

  renderer.renderToString(context, (err, html) => {
    if (err) {
      return errorHandler(err);
    }
    res.end(html);
    console.log(`whole request: ${Date.now() - s}ms`);
  });
});

const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
