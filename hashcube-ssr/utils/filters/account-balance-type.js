function accountBalanceType(value) {
  switch (value) {
    case 0:
      return '邀请好友返现';
    case 1:
      return '提现';
    case 2:
      return '购买矿';
    case 3:
      return '购买矿机余额充值';
    case 4:
      return '对公转账';
    case 5:
      return '退还返回';
    case 6:
      return '算力购买';
    case 7:
      return '余额充值';
    case 8:
      return '矿机抵扣费用(电费和服务费)';
    case 9:
      return '算力抵扣费用(电费）';
    case 10:
      return '托管物流费用';
    case 11:
      return '托管上架费用';
    case 12:
      return '电费';
    case 13:
      return '管理费';
    case 14:
      return '维修费';
    case 15:
      return '服务费';
    case 16:
      return '保险费';
    case 17:
      return '其他';
    case 18:
      return '用户间算力出售';
    case 19:
      return '用户间算力购买';
    case 20:
      return '算力交易手续费';
  }
}

export default accountBalanceType;
