import person from './detail.config.home'
import other from './detail.config'

export default {
  attachment: ['正常', '异常', '已删除', '人工审核','', '禁止', '强制恢复', '强制禁止'], // 附件status
  attachmentType: ['文字', '照片', '视频', '音频','语音试听'], // 附件 type
  personStatusName: ['', '安全', '正常', '已删除', '异常', '禁止', '强制恢复', '强制禁止'], // 列表的status
  picStatusName: ['', '安全', '正常', '已删除', '异常', '禁止', '强制恢复', '强制禁止'], // 列表的status
  videoComponentStatusName: ['', '安全', '正常', '已删除', '异常', '禁止', '强制恢复', '强制禁止'], // 列表的status
  voiceComponentStatusName:['', '安全', '正常', '已删除', '异常', '禁止', '强制恢复', '强制禁止'], // 列表的status
  person,
  other
}