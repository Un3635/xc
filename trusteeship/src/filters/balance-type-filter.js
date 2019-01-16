import {BalanceType} from "../config/constants";

export default function (value) {
  switch (value) {
    case BalanceType.BALANCE:
      return '优先余额支付';
    case BalanceType.COIN:
      return '优先以币抵费';
  }
};

