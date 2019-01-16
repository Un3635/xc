export default {
  title: '充值管理',
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
      title: "渠道",
      placeholder: "请选择渠道",
      options: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "0",
          label: "支付宝"
        },
        {
          value: "1",
          label: "微信"
        },
        {
          value: "2",
          label: "内购"
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
          label: "充值中"
        },
        {
          value: "1",
          label: "充值成功"
        },
         {
          value: "2",
          label: "充值失败"
        }
      ]
    }
  ],
  tHeader: [
    {tName: '流水号', tIdx: 'serialNumber', minWidth: 140},
    {tName: 'MID', tIdx: 'mid'},
    {tName: '充值金额', tIdx: 'rechargeMoney'},
    {tName: '渠道', tIdx: 'channelName'},
    {tName: '状态', tIdx: 'statusName'},
    {tName: '交易时间', tIdx: 'rechargeTime', minWidth: 100}
  ],
  list: "rechargeList"
}