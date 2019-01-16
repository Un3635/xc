export const wy_captcha = ({ el, mode = "popup" }) => {
  return new Promise((res, rej) => {
    var _intance;
    initNECaptcha(
      {
        captchaId: "db7b168bbf8c435e8c36edc0c89ff445",
        element: el,
        mode: mode,
        width: "auto",
        onReady: intance => {
          _intance = intance;
        },
        onVerify: (err, data) => {
          if (!err) {
            if (mode == "float") {
              _intance.destroy();
            }
            res({
              validate: data.validate,
              intance: _intance
            });
          }
        }
      },
      intance => {
        if (mode == "popup") {
          intance.popUp();
        }
      },
      err => {
        rej({
          code: "验证码获取超时,请重试"
        });
      }
    );
  });
};
