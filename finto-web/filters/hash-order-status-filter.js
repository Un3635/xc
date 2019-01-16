function hashOrderStatus(value) {
  switch (value) {
    case 1:
      return 'マイニング中';
    case 2:
      return '已终止';
    case 3:
      return '一時停止中';
    default:
      return '- -';
  }
}

export default hashOrderStatus;
