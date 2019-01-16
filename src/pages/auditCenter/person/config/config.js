export default {
  title: {
    pic: '图片管理',
    videoComponent: '视频管理',
    voiceComponent: '语音管理'
  },
  tHeader: [
    {tName: 'ID', tIdx: 'id', minWidth: 210},
    {tName: 'MID', tIdx: 'mid'},
    {tName: '类型', tIdx: 'typeName'},
    {tName: '钻石', tIdx: 'needDiamond'},
    {tName: '付费浏览', tIdx: 'browseCount'},
    {tName: '系统打分', tIdx: 'systemScore'},
    {tName: '发布时间', tIdx: 'releaseTime', minWidth: 140},
    {tName: '状态', tIdx: 'statusName'},
    {tName: '复核人', tIdx: 'reviewer'}
  ],
  ops:{
    2: '复核',
    4: '复核' 
  },
  list: {
    pic: 'homePhotoList',
    videoComponent: 'homeVideoList',
    voiceComponent: 'homeVoiceList'
  },
  typeName: ['动态', 'show', '语音试听', '聊天']
}