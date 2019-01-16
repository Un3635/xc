import BigNumber from 'bignumber.js';
import * as moment from 'moment';
// 1Th/s=1000Gh/s=1000*1000Mh/s=1000*1000*1000kh/s=1*10^12h/s
export const COMPUTING_POWER = 1e12;
// 1kW=1000W

// eslint-disable-next-line no-unused-vars
const KILOWATT = 1000;
// 难度调整周期,理想值为1209600秒(两周)
// eslint-disable-next-line no-unused-vars
const BLOCK_PERIOD = 1209600;
// 每210000个块，奖励下降一半
const REWARD_HALVE_HEIGHT = 210000;
// 每2016个区块后，难度调整
const ADJUSTING_BLOCKS_NUM = new BigNumber(2016);
// 区块高度增长速度(大约每10分钟增长一个)
const BLOCK_HEIGHT_INC_SPEED = 10;
// 初始化奖励
const INITIAL_REWARD_BTC = 50;

/**
 * 根据给定开始时间及开始时间对应的区块高度计算目标时间的区块高度
 * @param {BigNumber} blockHeight 开始时间对应的区块高度
 * @param {moment.Moment} blockHeightTime 开始时间
 * @param {moment.Moment} targetTime 目标时间
 * @returns {BigNumber} 目标时间的区块高度
 */
export const blockHeight = (blockHeight, blockHeightTime, targetTime) => {
    const minuteDiff = targetTime.diff(moment(blockHeightTime), 'minutes');
    if (minuteDiff === 0) {
        return blockHeight;
    }
    return blockHeight.add(Math.floor(minuteDiff / BLOCK_HEIGHT_INC_SPEED));
};

/**
 * 给定区块高度下一次难度改变的高度
 * h + (2016 - h % 2016)
 * @param {BigNumber} height 给定的区块高度
 * @returns {BigNumber}
 */
const nextDiffChangeHeight = height =>
    height.add(ADJUSTING_BLOCKS_NUM.sub(height.mod(ADJUSTING_BLOCKS_NUM)));

/**
 * 两个区块间奖励是否发生了变化
 * @param {BigNumber} h1
 * @param {BigNumber} h2
 * @returns {boolean}
 */
const isRewardChange = (h1, h2) =>
    !h1.divToInt(REWARD_HALVE_HEIGHT).eq(h2.divToInt(REWARD_HALVE_HEIGHT));

/**
 * 计算指定区块高度时挖矿所得的奖励币数
 * @param {number} blockHeight 区块高度
 * @returns {number} 挖矿获得的奖励币数
 */
const rewardOfBTC = blockHeight =>
    INITIAL_REWARD_BTC / Math.pow(2, Math.floor(blockHeight / REWARD_HALVE_HEIGHT));

/**
 * 给定算力在指定起始区块和结束区块间的奖励
 * 计算公式为 算力(h/s) * 时间(s) * 挖矿收益 / 全网算力 / 2^32
 * @param power 算力
 * @param diff  难度
 * @param sH  开始区块
 * @param eH  结束区块
 * @param diffChange 难度增加比
 * @returns {BigNumber} total btc总收益
 */
export const totalRewardOfStartToEndHeight = (power = new BigNumber(0),
    sH = new BigNumber(0),
    eH = new BigNumber(0),
    diff = new BigNumber(0),
    diffChange = 0) => {
    // 获取的总收益(单位:btc)
    let total = new BigNumber(0);
    // 下一次难度改变的区块高度
    let dCH = new BigNumber(0);
    do {
        dCH = nextDiffChangeHeight(sH);
        // 能获取收益的区块
        const rH = dCH.lt(eH) ? dCH.sub(sH) : eH.sub(sH);
        // 区块的奖励
        const coin = rewardOfBTC(sH.toNumber());
        // 该阶段内奖励减半的区块数
        let nRB = new BigNumber(0);
        if (isRewardChange(sH, sH.add(rH))) { // 奖励是否减半
            // 计算奖励减半的区块数量
            nRB = (sH.add(rH)).mod(REWARD_HALVE_HEIGHT);
        }
        // 该区间初始总收益 - 变化区块的收益
        const r = power.mul(rH.mul(coin).sub(nRB.mul(coin / 2))).mul(10 * 60).div(diff.mul(new BigNumber(2).pow(32)));
        total = total.add(r);
        // 下一个难度区块
        sH = dCH;
        // 难度增加
        diff = diff.mul(1 + diffChange / 100);
    } while (dCH.lt(eH));
    return total;
};
