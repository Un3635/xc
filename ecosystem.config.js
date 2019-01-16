module.exports = {
  deploy : {
    dev : {
      user : 'root',
      host : '101.37.91.50',
      port: "50021",
      ref  : 'origin/dev1.4.3',
      repo : 'git@code.aliyun.com:walian/wl_Web.git',
      path : '/usr/share/nginx/html/wlweb',
      'post-deploy' : 'node dingdingclose.js && git pull origin dev1.4.3over  && cnpm install && npm run build && pm2 delete all && pm2 --name wlwebtest143 start npm -- run start && node dingdingopen.js'
    }
  }
};
