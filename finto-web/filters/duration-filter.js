function duration(second) {
  second = Math.ceil(second);
  let minute = 0;
  let hour = 0;
  let day = 0;
  if (second >= 60) {
    minute = Math.floor(second / 60);
    second = Math.ceil(second % 60);
  }
  if (minute >= 60) {
    hour = Math.floor(minute / 60);
    minute = Math.floor(minute % 60);
  }
  if (hour >= 24) {
    day = Math.floor(hour / 24);
    hour = Math.floor(hour % 24);
  }
  let time = '';
  time += second + '秒';
  if (day === 0 && hour === 0 && minute === 0) {
    return time;
  }
  time = minute + '分' + time;
  if (day === 0 && hour === 0) {
    return time;
  }
  time = hour + '時間' + time;
  if (day === 0) {
    return time;
  }
  time = day + '日' + time;
  return time;
}

export default duration;
