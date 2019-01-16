function trusteeship(value) {
  switch (value) {
    case 0:
      return '待托管';
    case 1:
      return '托管中';
    case -1:
      return '已终止';
  }
}

export default trusteeship;
