import Vue from 'vue';
import Toast from './views/err-toast.vue';

export default (() => {
  let ToastConstructor = Vue.extend(Toast);
  let toastInstance = null;

//  获取实例
  const getInstance = () => {
//     如果实例还未创建就创建新实例
    if (!toastInstance) {
      toastInstance = new ToastConstructor({
        el: document.createElement('div')
      });
      document.body.appendChild(toastInstance.$el);
    }
    return toastInstance;
  };

  return {
    install(Vue) {
      let methods = {
        show(content = '系统错误，请稍后重试') {
          getInstance().show(content);
        }
      };
      if (Vue) Vue.prototype.errToast = methods;
      return methods;
    }
  };
})();
