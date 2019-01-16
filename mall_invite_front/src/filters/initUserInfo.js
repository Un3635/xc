export default function (phone) {
  if(!phone){
    return '';
  }
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
}