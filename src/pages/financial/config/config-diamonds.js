export default {
  title: '钻石流水',
  searchList: [
    {
      title: "MID",
      placeholder: "输入MID模糊查找"
    }
  ],
  selectList: [
    {
      title: "类型",
      placeholder: "请选择收支类型",
      options: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "0",
          label: "收入"
        },
        {
          value: "1",
          label: "支出"
        }
      ]
    },
    {
      title: "行为",
      placeholder: "请选择触发行为",
      options: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "1",
          label: "发送礼包"
        },
        {
          value: "2",
          label: "返还礼包"
        },
        {
          value: "3",
          label: "接收礼包"
        },
        {
          value: "6",
          label: "提现"
        },
        {
          value: "7",
          label: "交换"
        },
        {
          value: "11",
          label: "发送礼物"
        },
        {
          value: "12",
          label: "接受礼物"
        },
        {
          value: "21",
          label: "打开图片"
        },
        {
          value: "31",
          label: "实时视频"
        },
        {
          value: "41",
          label: "实时语音"
        },
        {
          value: "51",
          label: "阅读文章"
        },
        {
          value: "61",
          label: "支付宝"
        },
        {
          value: "62",
          label: "微信"
        },
        {
          value: "63",
          label: "ios内购支付"
        }
      ]
    }
  ],
  tHeader: [
    {tName: 'MID', tIdx: 'mid', width: 180},
    {tName: '收支类型', tIdx: 'billTypeName', width: 150},
    {tName: '钻石', tIdx: 'count', width: 150},
    {tName: '触发行为', tIdx: 'behaviorTypeName', width: 150},
    {tName: '行为明细', tIdx: 'behaviorDetail'},
    {tName: '交易时间', tIdx: 'txTime'}
  ],
  behaviorTypeNames: {
    1: '发送礼包',
    2: '返还礼包',
    3: '接受礼包',
    6: '提现',
    7: '交换',
    11: '发送礼物',
    12: '接受礼物',
    21: '打开图片',
    31: '打开视频',
    32: '实时视频',
    41: '打开语音',
    42: '实时语音',
    51: '阅读文章',
    61: '支付宝',
    62: '微信',
    63: 'ios内购'
  },
  list: "diamondBillList"
}