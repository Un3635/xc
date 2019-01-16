export default {
  title: '签约管理',
  searchList: [
    {
      title: "MID",
      placeholder: "输入MID查找"
    },
    {
      title: "备注",
      placeholder: "备注查找"
    },
  ],
  selectList: [
    {
      title: "状态",
      placeholder: "请选择合约状态",
      options: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "0",
          label: "正常"
        },
        {
          value: "1",
          label: "拒绝"
        },
        {
          value: "2",
          label: "待签约"
        },
        {
          value: "3",
          label: "已失效"
        },
      ]
    }
  ],
  tHeader: [
    {tName: 'MID', tIdx: 'userMid',width:'80px'},
    {tName: 'Ms类型', tIdx: 'msTypeName',width:'88px'},
    {tName: 'Ms评分', tIdx: 'mScore',width:'88px'},
    {tName: '机构收益', tIdx: 'agencyReward',width:'96px'},
    {tName: 'Ms收益', tIdx: 'bReward',width:'88px'},
    {tName: '备注', tIdx: 'remark',width:'100px'},
    {tName: '在线状态', tIdx: 'onlineName',width:'96px'},
    {tName: '签约时间', tIdx: 'msSignTime',width:'118px'},
    {tName: '到期时间', tIdx: 'msExpireTime',width:'118px'},
    {tName: '合约状态', tIdx: 'status',width:'96px'}
  ],
  list: "signList",
  detail: ""
}