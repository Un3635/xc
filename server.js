const express = require('express');
const app = express();

const isProd = process.env.NODE_ENV === 'production';

let renderer;
console.log('isProd', isProd);
if(isProd) {
  ;
} else {
  
  function createRenderer(bundle, template) {
    return require('vue-server-renderer').createBundleRenderer(bundle, {
      template
    });
  }

  require('./build/dev-server')(app, (bundle, template) => {
    renderer = createRenderer(bundle, template);
    console.log(renderer);
  });
}


app.get('*', (req, res) => {
  if (!renderer) {
    return res.end('waiting for compilation... refresh in a moment.');
  }
  res.setHeader('Content-Type', 'text/html;charset=utf-8;')
  const errorHandler = err => {
    if (err && err.code === 404) {
      // 未找到页面
      // res.status(404).sendFile(resolve('public/404.html'));
      res.status(404).end('404');
    } else {
      // 页面渲染错误
      res.status(500).end('500 - Internal Server Error');
      console.error(`error during render : ${req.url}`);
      console.error(err);
    }
  };
  // *** html 在前
  renderer.renderToString({ url: req.url }).then((html, err) => {
    if (err) {
      return errorHandler(err);
    }
    console.log('html',html);
    res.end(html);
  }).catch(err => console.log(err))
})
app.listen(8039, '0.0.0.0', () => {
  console.log('8039启动成功');
});