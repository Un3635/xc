class Mytools {
  static currentTime () {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    month =(month<10 ? "0"+month:month);
    let mydate = (year.toString()+ '-' + month.toString());
    return mydate
  }
  static millisecond (time) {
    let millTime = (new Date(time)).getTime()
    return millTime
  }
}
export default Mytools
