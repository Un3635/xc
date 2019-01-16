# 算力方M站
> 算立方针对移动端适配项目

## 代码规范
针对[standard](https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style)规则进行了一定的扩展，具体查看[.eslintrc.js](./.eslintrc.js)


## 核心模块
- [express](https://github.com/expressjs/express)
- [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware)
- [vue](https://github.com/vuejs/vue)
- [vue-router](https://github.com/vuejs/vue-router)
- [vuex](https://github.com/vuejs/vuex)
- [vuex-router-sync](https://github.com/vuejs/vuex-router-sync)
- [vue-server-renderer](https://github.com/vuejs/vue-ssr-docs/)

## Node版本要求

```bash
node ^6.x
```

## 本地运行

```bash
npm install
npm run dev
```

## 打包项目

``` bash
npm install
npm run build
npm start
```

## 删除已打包项目

``` bash
npm run del
```

## 项目部署
> 为了区分生产环境代码，做了一些打包脚本 npm run build 后生成dist文件夹，将dist文件夹放在生产服务器，安装依赖后通过npm run pm2 来启动项目(确保你已经安装了pm2)，了解[pm2](https://github.com/Unitech/pm2)。

``` bash
npm install
npm run pm2
```

## 参考资源
- [vue-ssr-template](https://github.com/eugeneCN/vue-ssr-template)
