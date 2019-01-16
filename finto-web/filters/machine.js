function machine(value) {
  switch (value) {
    case 0:
      // 维护中
      return '一時停止中';
    case 1:
      // 运行中
      return '運営中';
    case 2:
      // 已报废
      return '終了';
    case 3:
      // 已取消
      return '一時停止中';
    case 4:
      // 已退回
      return '終了';
    case 5:
      // 暂停中
      return '一時停止中';
    case 6:
      // 维修中
      return '一時停止中';
  }
}

export default machine;
