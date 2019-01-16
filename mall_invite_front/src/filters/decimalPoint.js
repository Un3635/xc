function decimalPoint(value, decimals = 0) {
  value = Number(value);
  return value.toFixed(decimals);
}

export default decimalPoint;
