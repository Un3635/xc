export default [
  {
    title: '视频规范',
    tHeader: [
      {tName: '条件', tIdx: 'eventType'},
      {tName: '提示文案', tIdx: 'conditionText', minWidth: 220},
      {tName: '聊天值', tIdx: 'chatScore'},
      {tName: '触发警报', tIdx: 'isAlarm'}
    ],
    type: 1,
    list: 'getNormList',
    page: 1,
    data: [],
    tatalCount: 0
  },
  {
    title: 'Meets规范',
    tHeader: [
      {tName: '条件', tIdx: 'conditionText', minWidth: 480},
      {tName: 'M评分', tIdx: 'mScore'}
    ],
    type: 2,
    list: 'getNormList',
    page: 1,
    data: [],
    tatalCount: 0
  },
  {
    title: '用户规范',
    tHeader: [
      {tName: '条件', tIdx: 'conditionText', minWidth: 480},
      {tName: 'M评分', tIdx: 'mScore'}
    ],
    type: 3,
    list: 'getNormList',
    page: 1,
    data: [],
    tatalCount: 0
  },
  {
    title: '消费等级',
    tHeader: [
      {tName: '等级', tIdx: 'grade', minWidth: 480},
      {tName: '消费钻石数', tIdx: 'computerDiamonds'}
    ],
    type: 1,
    list: 'getGradeBase',
    page: 1,
    data: [],
    tatalCount: 0
  },
  {
    title: '收益等级',
    tHeader: [
      {tName: '等级', tIdx: 'grade', minWidth: 480},
      {tName: '消费钻石数', tIdx: 'computerDiamonds'}
    ],
    type: 2,
    list: 'getGradeBase',
    page: 1,
    data: [],
    tatalCount: 0
  }
]