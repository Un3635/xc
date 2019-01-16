import {Message} from 'element-ui';

/**
 * 默认错误信息处理,以悬浮窗方式提示用户
 * @param {object} err 错误信息对象
 * @param {string} err.msg 具体错误信息
 */
const errorHandler = err => {
  if (err) {
    Message.error(err.msg || '系统错误');
  }
};

export default errorHandler;
