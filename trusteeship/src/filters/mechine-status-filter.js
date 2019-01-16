function machine(value) {
  switch (value) {
    case 0:
      return '维护中';
    case 1:
      return '运行中';
    case 3:
      return '已取消';
    case 4:
      return '已退回';
    case -1:
      return '已报废';
    case -2:
      return '已退回';
  }
}

export default machine;
