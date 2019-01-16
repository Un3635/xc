// 服务端这边，需要把访问的路径给到 vue-router

import {createApp} from './main.js'

// 外面的express服务使用  {url: / /about}
// 访问 / 的时候 会自动匹配到 /favicon.ico
export default (context) => {
  
  return new Promise((resolve, reject) => {
    let { app, router, store} = createApp();
    router.push(context.url);

    router.onReady(() => {
      // 访问路径，可定匹配到组件
      let matchedCompoents = router.getMatchedComponents();
      console.log(matchedCompoents)
      if (!matchedCompoents.length) {
        return reject({ code: 40456 })
      }
      process.Cookies = context.cookies;
      Promise.all(matchedComponents.map(Component => {
        if (Component.asyncData) {
          return Component.asyncData({
            store,
            route: router.currentRoute,
            cookies: context.cookies
          });
        }
      })).then(() => {
        context.state = store.state;
        resolve(app);
      }).catch(reject);
    }, reject)

  })
}