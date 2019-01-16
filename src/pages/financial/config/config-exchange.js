export default {
  title: '兑换管理',
  searchList: [
    {
      title: "流水号",
      placeholder: "输入流水号模糊查找"
    },
    {
      title: "MID",
      placeholder: "输入MID模糊查找"
    }
  ],
  selectList: [
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
          label: "兑换中"
        },
        {
          value: "1",
          label: "兑换成功"
        },
        {
          value: "2",
          label: "兑换失败"
        }
      ]
    }
  ],
  tHeader: [
    {tName: '流水号', tIdx: 'serialNumber', minWidth: 180},
    {tName: 'MID', tIdx: 'mid'},
    {tName: '扣除宝石', tIdx: 'deductionGems'},
    {tName: '兑换钻石', tIdx: 'exchangeDiamond'},
    {tName: '状态', tIdx: 'statusName'},
    {tName: '交易时间', tIdx: 'exchangeTime', minWidth: 140}
  ],
  list: "exchangeList"
}