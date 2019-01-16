export default ({ el }) => {
  return new Promise((res, rej) => {
    var _intance;
    initNECaptcha(
      {
        captchaId: "db7b168bbf8c435e8c36edc0c89ff445",
        element: el,
        mode: "popup",
        width: "auto",
        onVerify: (err, data) => {
          if (!err) {
            res(data.validate);
          }
        }
      },
      intance => {
        intance.popUp();
      },
      err => {
        rej({
          code: "验证码获取超时,请重试"
        });
      }
    );
  });
};
