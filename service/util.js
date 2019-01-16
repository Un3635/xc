export default {
  min: arr => Math.min.apply(Math, arr),
  max: arr => Math.max.apply(Math, arr),
  splitArr: (arr, len) => {
    let result = [];
    let i = 0;
    while (arr.length > 0) {
      result[i] = arr.splice(0, len);
      i++;
    }
    return result;
  }
};
