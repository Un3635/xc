export default {
  title: '宝石流水',
  searchList: [
    {
      title: "MID",
      placeholder: "请输入MID模糊查找"
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
          value: "0",
          label: "红包"
        },
        {
          value: "1",
          label: "礼物"
        },
        {
          value: "2",
          label: "图片"
        },
        {
          value: "3",
          label: "视频"
        },
        {
          value: "4",
          label: "语音"
        },
        {
          value: "5",
          label: "聊天"
        },
        {
          value: "8",
          label: "解锁SHOW"
        }
      ]
    }
  ],
  tHeader: [
    {tName: 'MID', tIdx: 'mid',width: 180},
    {tName: '收支类型', tIdx: 'billTypeName',width: 150},
    {tName: '宝石', tIdx: 'count', width: 150},
    {tName: '触发行为', tIdx: 'behaviorTypeName', width: 150},
    {tName: '行为明细', tIdx: 'behaviorDetail'},
    {tName: '交易时间', tIdx: 'txTime'}
  ],
  behaviorTypeNames: {
    0: '红包',
    1: '礼物',
    2: '图片',
    3: '视频',
    4: '语音',
    5: '聊天'
  },
  list: "gemBillList"
}