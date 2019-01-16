function hashOrderStatus(value) {
  switch (value) {
    case 0:
      return '待交割';
    case 1:
      return '已交割';
    case 2:
      return '已结束';
    default:
      return '- -';
  }
}

export default hashOrderStatus;
