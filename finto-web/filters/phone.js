function phone(value) {
  if (String(value).indexOf('@') > 0) {
    let str = value.split('@'),
      _s = '';
    if (str[0].length > 3) {
      for (let i = 0; i < str[0].length - 3; i++) {
        _s += '*';
      }
    }
    return str[0].substr(0, 3) + _s + '@' + str[1];
  }
  return value.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
}

export default phone;