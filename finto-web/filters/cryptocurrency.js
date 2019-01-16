import currency from './currency';


/**
 * 加密货币格式化
 * e.g. '10.00'|cryptocurrency => 10
 * e.g. '1.3450000'|cryptocurrency =>1.345
 */
const cryptocurrency = (value, decimal = 10) => currency(value, '', decimal).replace(/\.?0+$/, '');

export default cryptocurrency;

