const report = {
  title: '举报处理',
  searchList: [
    {
      title: "举报人",
      placeholder: "举报人模糊查找",
    },
    {
      title: "被举报人",
      placeholder: "被举报人模糊查找",
    }
  ],
  selectList: [
    {
      title: "状态",
      placeholder: "选择处理状态",
      options: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "0",
          label: "待处理"
        },
        {
          value: "1",
          label: "已处理"
        }
      ]
    },
    {
      title: "结果",
      placeholder: "选择处理结果",
      options: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "1",
          label: "忽略"
        },
        {
          value: "2",
          label: "已受理"
        },
        {
          value: "3",
          label: "恶意举报"
        }
      ]
    },
  ],
  tHeader: [
    {tName: '举报人', tIdx: 'informerMid'},
    {tName: '被举报人', tIdx: 'reportedMid'},
    {tName: '举报时间', tIdx: 'reportTime', minWidth: 140},
    {tName: '状态', tIdx: 'statusName'},
    {tName: '处理结果', tIdx: 'resultName'}
  ],
  list: "reportList",
  detail: ""
}
export default {
  report
}
