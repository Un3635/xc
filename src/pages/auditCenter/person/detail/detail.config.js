export default {
  title: {
    pic: '图片管理',
    videoComponent: '视频管理',
    voiceComponent: '语音管理'
  },
  form: {
    pic: [
      {
        field: 'mid',
        label: 'MID: '
      },
      {
        field: 'nickName',
        label: '昵称: '
      },
      {
        field: 'imgUrl',
        label: '图片内容: ',
        type: 'pic'
      },
      {
        field: 'releaseTime',
        label: '发布时间: '
      },
      {
        field: 'type',
        label: '图片类型: '
      },
      {
        field: 'browseCount',
        label: '付费浏览数: '
      },
      {
        field: 'status',
        label: '状态: ',
        names:['','安全', '正常', '已删除', '异常', '禁止', '强制恢复', '强制禁止']
      }
    ],
    videoComponent: [
      {
        field: 'mid',
        label: 'MID: '
      },
      {
        field: 'nickName',
        label: '昵称: '
      },
      {
        field: 'videoUrl',
        label: '视频内容: ',
        type: 'video'
      },
      {
        field: 'releaseTime',
        label: '发布时间: '
      },
      {
        field: 'type',
        label: '视频类型: '
      },
      {
        field: 'browseCount',
        label: '付费浏览数: '
      },
      {
        field: 'status',
        label: '状态: ',
        names:['','安全', '正常', '已删除', '异常', '禁止', '强制恢复', '强制禁止']
      }
    ],
    voiceComponent: [
      {
        field: 'mid',
        label: 'MID: '
      },
      {
        field: 'nickName',
        label: '昵称: '
      },
      {
        field: 'voiceUrl',
        label: '语音内容: ',
        type: 'voice'
      },
      {
        field: 'releaseTime',
        label: '发布时间: '
      },
      {
        field: 'type',
        label: '语音类型: '
      },
      {
        field: 'browseCount',
        label: '付费浏览数: '
      },
      {
        field: 'status',
        label: '状态: ',
        names:['','安全', '正常', '已删除', '异常', '禁止', '强制恢复', '强制禁止']
      }
    ]
  },
 
  tHeader: [
    {tName: '复核人', tIdx: 'reviewer'},
    {tName: '复核时间', tIdx: 'reviewTime'},
    {tName: '复核结果', tIdx: 'reviewResultName'},
    {tName: '备注', tIdx: 'remark'}
  ],
  // reviewResult: ['申请中', '认证通过', '认证拒绝', '待审核', '机构通过', '机构拒绝'],
  detail: {
    pic: 'homePhotoDetail',
    videoComponent: 'homeVideoDetail',
    voiceComponent: 'homeVoiceDetail'
  },
  review: {
    pic: 'homePhotoReview',
    videoComponent: 'homeVideoReview',
    voiceComponent: 'homeVoiceReview'
  }
}