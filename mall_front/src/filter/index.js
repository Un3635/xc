import moment from 'moment';

export default {
  date(time, format){
    if (!time || time == '无') {
      return '-';
    }
    return moment(time).format(format);
  }
};
