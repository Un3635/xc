import Vue from 'vue';
import Router from 'vue-router';
import home from '@/components/home';
import homeDetail from '@/components/home-detail/home-detail';

// 云suanli
import calcStar from '@/components/calcstar';
import calcStarDetail from '@/components/calcstar-detail/calcstar-detail';

import about from '@/components/aboutUs';
import PersonalCenter from '@/components/PersonalCenter';

//个人中心
import General from '@/components/centerPages/general';
import Account from '@/components/centerPages/account';
import Repertory from '@/components/centerPages/hashRepertory';
import HashCloud from '@/components/centerPages/hashCloud';
import HashTable from '@/components/centerPages/hashTable';
import HashDetail from '@/components/centerPages/hashDetail';
import Income from '@/components/centerPages/income';
import Finance from '@/components/centerPages/finance';
import Invite from '@/components/centerPages/invite';
import detail from '@/components/centerPages/invit-detail';
import Profile from '@/components/centerPages/profile';
import verify from '@/components/centerPages/guge-verify';

//联盟须知
import login from '@/components/login/login';
import alliance from '@/components/alliance-intro/main-page';
import { WSAECANCELLED } from 'constants';


Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: '首页',
            component: home,
            redirect: '/home',
            children: [
                {
                    path: '/home',
                    name: 'homeDetail',
                    component: homeDetail,
                },
                {
                    path: '/center',
                    name: '个人中心',
                    component: PersonalCenter,
                    children: [
                        {
                            path: '',
                            name: '账户概况',
                            component: General,
                        },
                        {
                            path: 'account',
                            component: {template: '<router-view/>'},
                            children: [
                                {
                                    path: '',
                                    name: '我的账户',
                                    component: Account
                                },
                                {
                                    path: 'finance',
                                    name: '算力明细',
                                    component: Finance
                                }
                            ]
                        },
                        {
                            path: 'hash',
                            component: {template: '<router-view/>'},
                            children: [
                                {
                                    path: '',
                                    component: HashCloud,
                                    children: [
                                        {
                                            path: '',
                                            name: '我的云算力',
                                            component: HashTable
                                        },
                                        {
                                            path: 'detail',
                                            name: '收益详情',
                                            component: HashDetail
                                        }
                                    ]
                                },
                                {
                                    path: 'repertory',
                                    name: '算力明细',
                                    component: Repertory
                                }

                            ]
                        },
                        {
                            path: 'income',
                            name: '量化收益',
                            component: Income
                        },
                        {
                            path: 'invite',
                            component: {template: '<router-view/>'},
                            children: [
                                {
                                    path: '',
                                    name: '邀请列表',
                                    component: Invite
                                },
                                {
                                    path: 'detail',
                                    name: '邀请详情',
                                    component: detail
                                }
                            ]
                        },
                        {
                            path: 'verify',
                            name: '谷歌验证',
                            component: verify
                        },
                        {
                            path: 'profile',
                            name: '资料修改',
                            component: Profile
                        }
                    ]
                },
                {
                    path: '/alliance',
                    name: 'alliance',
                    component: alliance
                },
                {
                    path: '/calcstar',
                    name: 'calcStar',
                    component: {template: '<router-view />'},
                    children: [
                        {
                            path: '',
                            name: 'calcStar',
                            component: calcStar
                        },
                        {
                            path: '/calcstar/calcstar-detail',
                            name: 'calcStarDetail',
                            component: calcStarDetail
                        }
                    ]
                },
                {
                    path: '/about',
                    name: '联系我们',
                    component: about
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: login
        }
    ],
    scrollBehavior(to, from, savedPosition){
      to.meta.savePosition = savedPosition;
      // if(savedPosition) {
      //   return savedPosition;
      // }
      // else {
      //   return { x: 0, y: 0 }
      // }'
      var scrollPos;
      if (window.pageYOffset) {
        scrollPos = window.pageYOffset; 
      }
      else if (document.compatMode && document.compatMode != 'BackCompat') {
        scrollPos = document.documentElement.scrollTop; 
      }
      else if (document.body) { 
        scrollPos = document.body.scrollTop; 
      }
      console.log(savedPosition, scrollPos);
      if (savedPosition) {
        setTimeout(() => {
          window.scrollTo(savedPosition.x, savedPosition.y);
        }, 200);
      }
    }
});
