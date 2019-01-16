export const Captcha = ({el, mode = 'popup'}) => {
  return new Promise((res, rej) => {
    var _instance;
    initNECaptcha({
      captchaId: '33e973132ebf425e87d9eb69b3bbd4e5',
      element: el,
      mode: mode,
      width: 'auto',
      onReady: (instance) => {
        _instance = instance;
      },
      onVerify: (err, data) => {
        if (err) {
          return;
        }
        if (mode === 'float') {
          _instance.destroy();
        }
        res({
          validate: data.validate,
          instance: _instance
        });
      }
    }, (instance) => {
    }, (err) => {
      rej({msg: '验证码获取超时,请重试'});
    });
  });
};
