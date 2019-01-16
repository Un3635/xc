export default {
  form: [
    {
      field: 'mid',
      label: 'MID: '
    },
    {
      field: 'regTime',
      label: '注册时间: '
    },
    {
      field: 'accountMark',
      label: '注册渠道: ',
      names:['手机号', '微信', 'QQ', '微博']
    },
    {
      field: 'invite',
      label: '邀请人: '
    },
    {
      field: 'nickName',
      label: '昵称: '
    },
    {
      field: 'sex',
      label: '性别: ',
      names:['女', '男']
    },
    {
      field: 'headImgUrl',
      label: '头像: ',
      type: 'pic'
    },
    {
      field: 'authenticateVideoUrl',
      label: '认证视频: ',
      type: 'video'
    },
    {
      field: 'applyTime',
      label: '申请时间: '
    }
  ],
  check: [
    {
      field: 'msType',
      label: 'Ms类型: '
    },
    {
      field: 'agencyName',
      label: '关联机构: '
    },
    {
      field: 'agencyReward',
      label: '机构收益占比: '
    },
    {
      field: 'platformReward',
      label: '平台收益占比: '
    },
    {
      field: 'userReward',
      label: 'Ms收益占比: '
    }
  ],
  tHeader: [
    {tName: '审核人', tIdx: 'reviewer'},
    {tName: '审核时间', tIdx: 'reviewTime'},
    {tName: '审核结果', tIdx: 'reviewResultName'},
    {tName: '备注', tIdx: 'remark'}
  ],
  reviewResult: ['申请中', '认证通过', '认证拒绝', '待机构审核', '机构通过', '机构拒绝']
}