/**
 * 默认错误信息处理,以悬浮窗方式提示用户
 * @param {object} err 错误信息对象
 * @param {string} err.msg 具体错误信息
 * @param {object} _this 当前组件实例
 */
const errorHandler = (err, _this) => {
  if (process.env.NODE_ENV !== 'production') {
    console.error(err);
  }
  if (err && process.env.VUE_ENV === 'client') {
    _this.errToast.show(err.msg);
  }
};

export default errorHandler;
