export default {
  title: '聊天警报',
  searchList: [
    {
      title: "用户",
      placeholder: "用户MID模糊查找"
    }
  ],
  tHeader: [
    {tName: 'ID', tIdx: 'id'},
    {tName: 'ROOM', tIdx: 'roomId'},
    {tName: '用户', tIdx: 'pornMid'},
    {tName: 'Ms', tIdx: 'mScore'},
    {tName: '异常截图', tIdx: 'img'},
    {tName: '警报时间', tIdx: 'createTime'},
    {tName: '状态', tIdx: 'status'},
  ],
  statusName:['', '待处理', '掐断', '忽略'],
  list: "addedAlarmList"
}