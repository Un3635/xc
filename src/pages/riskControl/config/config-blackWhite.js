export default {
  title: '黑白名单',
  searchList: [
    {
      title: "用户",
      placeholder: "输入用户MID模糊查找"
    }
  ],
  tHeader: [
    {tName: 'MID', tIdx: 'userMid'},
    {tName: '昵称', tIdx: 'nicknameStatusName'},
    {tName: '动态', tIdx: 'dynamicStatusName'},
    {tName: '图片', tIdx: 'photoStatusName'},
    {tName: '视频', tIdx: 'videoStatusName'},
    {tName: '提现', tIdx: 'withdrawStatusName'}
  ],
  dynamicStatusName:['正常', '白名单', '黑名单'],
  nicknameStatusName: ['正常', '白名单', '黑名单'],
  photoStatusName: ['正常', '白名单', '黑名单'],
  videoStatusName: ['正常', '白名单', '黑名单'],
  withdrawStatusName : ['正常', '', '禁用'],
  list: "whitelistList",
  detail: ""
}