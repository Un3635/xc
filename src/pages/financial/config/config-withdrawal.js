export default {
  title: 'Ms提现记录',
  searchList: [
    {
      title: "流水号",
      placeholder: "输入流水号模糊查找"
    },
    {
      title: "MID",
      placeholder: "输入MID模糊查找"
    },
    {
      title: "地址",
      placeholder: "输入地址模糊查找"
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
          label: "提现中"
        },
        {
          value: "1",
          label: "提现成功"
        },
        {
          value: "2",
          label: "提现失败"
        }
      ]
    }
  ],
  tHeader: [
    {tName: '流水号', tIdx: 'serialNumber', minWidth: 210},
    {tName: 'MID', tIdx: 'mid'},
    {tName: '提现金额', tIdx: 'withdrawAmount'},
    {tName: '打款地址', tIdx: 'receiveAddress', minWidth: 140},
    {tName: '状态', tIdx: 'statusName'},
    {tName: '交易时间', tIdx: 'withdrawTime',minWidth: 140},
  ],
  list: "withdrawList"
}