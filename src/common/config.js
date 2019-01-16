var _appdevconfig = {
  check: false,
  version: "1.0",
  apiurl: "http://dev.renrenhua.com:8080",
  dev: true
};

var _apptestconfig = {
  check: false,
  version: "1.0",
  apiurl: "http://test.renrenhua.com:8080",
  dev: true
};
var _appconfig = {
  check: true,
  version: "1.0",
  apiurl: "https://api.walian.cn",
  dev: false
};

export default [_appconfig, _appdevconfig, _apptestconfig].filter(function(i) {
  return i.check == true;
})[0];
