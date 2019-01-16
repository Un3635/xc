const feedback = {
  title: '反馈管理',
  searchList: [
    {
      title: "反馈者",
      placeholder: "反馈者MID模糊查找",
    },
  ],
  selectList: [
    {
      title: "状态",
      placeholder: "选择回复状态",
      options: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "0",
          label: "待回复"
        },
        {
          value: "1",
          label: "已回复"
        }
      ]
    }
  ],
  tHeader: [
    {tName: 'ID', tIdx: 'id', minWidth: 180},
    {tName: '反馈者', tIdx: 'userMid'},
    {tName: '反馈内容', tIdx: 'content', minWidth: 220},
    {tName: '反馈日期', tIdx: 'createTime', minWidth:140},
    {tName: '状态', tIdx: 'statusName'}
  ],
  list: "feedbackList",
  detail: ""
}
export default {
  feedback
}
