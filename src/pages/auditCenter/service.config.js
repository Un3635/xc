const service = {
  title: '服务认证',
  searchList: [
    {
      title: "MID",
      placeholder: "输入MID模糊查找",
    }
  ],
  selectList: [
    {
      title: "认证状态",
      placeholder: "请选择认证状态",
      options: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "0",
          label: "申请中"
        },
        {
          value: "1",
          label: "认证通过"
        },
        {
          value: "2",
          label: "认证拒绝"
        },
        {
          value: "3",
          label: "待机构审核"
        },
        {
          value: "4",
          label: "机构通过"
        },
        {
          value: "5",
          label: "机构拒绝"
        }
      ]
    }
  ],
  tHeader: [
    {tName: 'ID', tIdx: 'id', minWidth: 140},
    {tName: 'MID', tIdx: 'mid'},
    {tName: '申请时间', tIdx: 'applyTime', minWidth: 100},
    {tName: '认证状态', tIdx: 'statusName'},
    {tName: '审核人', tIdx: 'reviewer'},
    {tName: '审核时间', tIdx: 'reviewTime', minWidth: 100},
  ],
  list: "serviceCertificationList",
  detail: ""
}
export default {
  service
}
