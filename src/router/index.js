import Vue from "vue";
import Router from "vue-router";
import coin_detail from "@/pages/coin_detail/index";
import new_hand from "@/pages/new_hand/index";
import new_handdetail from "@/pages/new_hand/detail";
import news_detail from "@/pages/news_detail/index";
import fast_news from "@/pages/fast_news/index";
import protocol from "@/pages/protocol/index";
import protocolreg from "@/pages/protocol/reg";
import video_detail from "@/pages/video_detail/index";
import audio_detail from "@/pages/audio_detail/index";
import newhand_detail from "@/pages/newhand_detail/index";
import inv from "@/pages/inv/index";
import inv_reg from "@/pages/inv_reg/index";
import inv_reg_download from "@/pages/inv_reg/download";
import myLevel from "@/pages/myLevel/index";
import myAward from "@/pages/myAward/index";
import inv_v130 from "@/pages/inv_v130/index";
import inv_reg_v130 from "@/pages/inv_reg_v130/index";
import inv_reg_download_v130 from "@/pages/inv_reg_v130/download";
Vue.use(Router);

import qa from "@/pages/qa/index";
import qaitem from "@/pages/qa/item";
import qasuccess from "@/pages/qa/success";
import qalogin from "@/pages/qa/login";
import qalucky from "@/pages/qa/lucky";
import qawinners from "@/pages/qa/winners";

import qashare from "@/pages/qashare/index";
import qashareitem from "@/pages/qashare/item";
import qasharesuccess from "@/pages/qashare/success";
import qasharedownload from "@/pages/qashare/download";

import test from "@/pages/test";
export default new Router({
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
  mode: 'history',
  routes: [
    {
      path: "/test",
      component: test
    },
    {
      path: "/qashare",
      component: qashare
    },
    {
      path: "/qasharesuccess",
      component: qasharesuccess
    },
    {
      path: "/qashareitem",
      component: qashareitem
    },
    {
      path: "/qasharedownload",
      component: qasharedownload
    },
    {
      path: "/qa",
      component: qa
    },
    {
      path: "/qaitem",
      component: qaitem
    },
    {
      path: "/qasuccess",
      component: qasuccess
    },
    {
      path: "/qalogin",
      component: qalogin
    },
    {
      path: "/qalucky",
      component: qalucky
    },
    {
      path: "/qawinners",
      component: qawinners
    },
    {
      path: "/protocol",
      name: "protocol",
      component: protocol,
      children: [
        {
          path: "reg",
          name: "protocolreg",
          component: protocolreg
        }
      ]
    },
    {
      path: "/coin_detail",
      name: "coin_detail",
      component: coin_detail
    },
    {
      path: "/fast_news",
      name: "fast_news",
      component: fast_news
    },
    {
      path: "/new_hand",
      name: "new_hand",
      component: new_hand
    },
    {
      path: "/new_hand_detail",
      name: "new_hand_detail",
      component: new_handdetail
    },
    {
      path: "/news_detail",
      name: "news_detail",
      component: news_detail
    },
    {
      path: "/protocol",
      name: "protocol",
      component: news_detail
    },
    {
      path: "/video_detail",
      name: "video_detail",
      component: video_detail
    },
    {
      path: "/audio_detail",
      name: "audio_detail",
      component: audio_detail
    },
    {
      path: "/newhand_detail",
      name: "newhand_detail",
      component: newhand_detail
    },
    {
      path: "/inv",
      name: "inv",
      component: inv
    },
    {
      path: "/inv_v130",
      name: "inv_v130",
      component: inv_v130
    },
    {
      path: "/inv_reg",
      name: "inv_reg",
      component: inv_reg
    },
    {
      path: "/inv_reg_v130",
      name: "inv_reg_v130",
      component: inv_reg_v130
    },
    {
      path: "/inv_reg_download",
      name: "inv_reg_download",
      component: inv_reg_download
    },
    {
      path: "/inv_reg_download_v130",
      name: "inv_reg_download_v130",
      component: inv_reg_download_v130
    },
    {
      path: "/myLevel",
      name: "myLevel",
      component: myLevel
    },
    {
      path: "/myAward",
      name: "myAward",
      component: myAward
    }
  ]
});
