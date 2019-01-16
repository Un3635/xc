import moment from 'moment'

// export default {
//   date(time, format){
//     return moment(time).format(format);
//   }
// };

export default function (time,format) {
  return moment(time).format(format);
}