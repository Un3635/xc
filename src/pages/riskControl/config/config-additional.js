export default {
  title: '附加值管理',
  searchList: [
    {
      title: "MID",
      placeholder: "输入MID模糊查找"
    }
  ],
  selectList: [
     {
      title: "类型",
      placeholder: "选择附加值类型",
      options: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "0",
          label: "展示"
        },
        {
          value: "1",
          label: "用户"
        },
        {
          value: "2",
          label: "MS"
        }
      ]
    },
    {
      title: "状态",
      placeholder: "请选择状态",
      options: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "0",
          label: "生效中"
        },
        {
          value: "1",
          label: "已失效"
        }
      ]
    }
  ],
  tHeader: [
    {tName: 'ID', tIdx: 'id', minWidth: 180},
    {tName: 'MID', tIdx: 'userMid'},
    {tName: '类型', tIdx: 'typeName'},
    {tName: '属性', tIdx: 'attributeName'},
    {tName: '附加值', tIdx: 'addedValue'},
    {tName: '起始时间', tIdx: 'createTime', minWidth: 200},
    {tName: '结束时间', tIdx: 'endTime', minWidth: 200},
    {tName: '状态', tIdx: 'statusName'},
  ],
  statusName:['生效中', '已失效'],
  attributeName: ['正', '负'],
  typeName: ['展示', '用户', 'MS'],
  list: "addedList"
}