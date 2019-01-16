import HeaderAside from "./layouts/HeaderAside";
import service from './pages/auditCenter/service';
import person from './pages/auditCenter/person/person.vue'
import pic from './pages/auditCenter/person/pic.vue';
import video from './pages/auditCenter/person/video.vue';
import voice from './pages/auditCenter/person/voice.vue';

import personDetail from './pages/auditCenter/person/detail/index.vue';

import serviceDetail from './pages/auditCenter/detail';
import report from './pages/auditCenter/report/report';
import reportDetail from './pages/auditCenter/report/detail';
import feedback from './pages/auditCenter/feedback/feedback';
import feedbackDetail from './pages/auditCenter/feedback/detail';

const auditrouterConfig = [
  // 服务认证
  {
    path: "/audit/service",
    name: "service",
    layout: HeaderAside,
    component: service,
    meta: {
      requiresAuth: true,
      title: "服务认证"
    }
  },
  {
    path: "/audit/person",
    name: "person",
    layout: HeaderAside,
    component: person,
    meta: {
      requiresAuth: true,
      title: "主页动态管理"
    }
  },
  {
    path: "/audit/pic",
    name: "pic",
    layout: HeaderAside,
    component: pic,
    meta: {
      requiresAuth: true,
      title: "图片管理",
      switch: true
    }
  },
  {
    path: "/audit/video",
    name: "videoComponent",
    layout: HeaderAside,
    component: video,
    meta: {
      requiresAuth: true,
      title: "视频管理",
      switch: true
    }
  },
  {
    path: "/audit/voice",
    name: "voiceComponent",
    layout: HeaderAside,
    component: voice,
    meta: {
      requiresAuth: true,
      title: "语音管理",
      switch: true
    }
  },
  {
    path: "/audit/report",
    name: "report",
    layout: HeaderAside,
    component: report,
    meta: {
      title: "举报",
      requiresAuth: true
    }
  },
  {
    path: "/audit/feedback",
    name: "feedback",
    layout: HeaderAside,
    component: feedback,
    meta: {
      title: "反馈",
      requiresAuth: true
    }
  }
]

const auditrouterConfigMenuOut = [
  {
    path: '/audit/service/detail',
    name: "serviceDetail",
    layout: HeaderAside,
    component: serviceDetail,
    meta: {
      requiresAuth: true,
      title: "服务认证详情"
    }
  },
  {
    path: "/audit/person/detail",
    name: "personDetail",
    layout: HeaderAside,
    component: personDetail,
    meta: {
      title: "主页动态详情",
      requiresAuth: true
    }
  },
  {
    path: '/audit/feedback/detail',
    name: "feedbackDetail",
    layout: HeaderAside,
    component: feedbackDetail,
    meta: {
      title: "反馈处理",
      requiresAuth: true
    }
  },
  {
    path: '/audit/report/detail',
    name: "reportDetail",
    layout: HeaderAside,
    component: reportDetail,
    meta: {
      title: "举报处理",
      requiresAuth: true
    },
  }
]

export { auditrouterConfig, auditrouterConfigMenuOut }