export default {
  form: [
    {
      field: 'userMid',
      label: 'MID: '
    },
    {
      field: 'deviceModel',
      label: '设备型号: '
    },
    {
      field: 'deviceSystem',
      label: '设备系统: ',
    },
    {
      field: 'version',
      label: 'App版本: '
    },
    {
      field: 'content',
      label: '反馈内容: '
    },
    {
      field: 'createTime',
      label: '反馈时间: ',
    },
    {
      field: 'imageUrlList',
      label: '反馈截图: ',
      type: 'picGroup'
    },
    {
      field: 'statusName',
      label: '反馈状态: '
    }
  ],
  // check: [
  //   {
  //     field: 'msType',
  //     label: '回复者: '
  //   },
  //   {
  //     field: 'agencyName',
  //     label: '回复时间: '
  //   },
  //   {
  //     field: 'agencyReward',
  //     label: '回复内容: '
  //   },
  //   {
  //     field: 'platformReward',
  //     label: '备注: '
  //   },
  // ],
  tHeader: [
    {tName: '回复者', tIdx: 'reviewer'},
    {tName: '回复时间', tIdx: 'reviewTime'},
    {tName: '回复内容', tIdx: 'reviewContent'},
    {tName: '备注', tIdx: 'remark'}
  ],
  // reviewResult: ['申请中', '认证通过', '认证拒绝', '待审核', '机构通过', '机构拒绝']
}