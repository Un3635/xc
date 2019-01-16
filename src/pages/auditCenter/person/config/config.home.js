export default {
  title: {
    person: '主页动态管理'
  },
  tHeader: [
    {tName: 'ID', tIdx: 'id', minWidth: 140},
    {tName: 'MID', tIdx: 'mid'},
    {tName: '点赞', tIdx: 'likeCount'},
    {tName: '发布时间', tIdx: 'releaseTime', minWidth: 140},
    {tName: '状态', tIdx: 'statusName'},
    {tName: '复核人', tIdx: 'reviewer'},
  ],
  ops:{
    2: '复核',
    4: '复核'
  },
  list: {
    person: 'homeNewsList'
  }
}