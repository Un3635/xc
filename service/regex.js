//身份证号（18位）正则
var is_idcard = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
//Email正则
var is_email = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
//手机号正则
var is_phone = /^1[34578]\d{9}$/;
//人名
var is_name = /^[\u4e00-\u9fa5]{2,4}$/;
//注册用的密码正则
var is_regpwd = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,18}$/;

var _data = {
    is_phone, is_email, is_idcard, is_name, is_regpwd
}
export default _data;