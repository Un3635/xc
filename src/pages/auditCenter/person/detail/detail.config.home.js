export default {
  title: {
    person: '主页动态管理'
  },
  form: {
    person:  [
      {
        field: 'mid',
        label: 'MID: '
      },
      {
        field: 'nickName',
        label: '昵称: '
      },
      {
        field: 'accountMark',
        label: '动态内容: '
      },
      {
        field: 'releaseTime',
        label: '发布时间: '
      },
      {
        field: 'pushAddress',
        label: '发布位置: '
      },
      {
        field: 'likeCount',
        label: '点赞数: '
      },
      {
        field: 'status',
        label: '状态: ',
        names:['','安全', '正常', '已删除', '异常', '禁止', '强制恢复', '强制禁止']
      }
    ]
  },
  attachment: [
    {tName: '附件类型', tIdx: 'typeName', width: 100},
    {tName: '附件ID', tIdx: 'id'},
    {tName: '解锁钻石', tIdx: 'consumeDiamond'},
    {tName: '付费浏览', tIdx: 'browseCount'},
    {tName: '状态', tIdx: 'statusName'}
  ],
  tHeader: [
    {tName: '复核人', tIdx: 'reviewer'},
    {tName: '复核时间', tIdx: 'reviewTime'},
    {tName: '复核结果', tIdx: 'reviewResultName'},
    {tName: '备注', tIdx: 'remark'}
  ],
  detail: {
    person: 'homeNewsDetail'
  },
  review: {
    person: 'homeNewsReview'
  }
}