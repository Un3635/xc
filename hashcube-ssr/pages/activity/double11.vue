<template>
  <div class="d11">
    <div class="banner">
      <img src="../../assets/images/activity/d11/banner.png" alt="">
    </div>
    <div class="inner d11-strategy">
      <h2 class="d11-t">
        <span>算立方双11玩法揭秘</span>
      </h2>
      <div class="d11-step">
        <img src="../../assets/images/activity/d11/step.png" alt="">
        <ul class="clearfix">
          <li class="left w33"><span>11月7日<br>8折券每日限量抢</span></li>
          <li class="left w33"><span>11月7日<br>全场云算力直降</span></li>
          <li class="left w33"><span>11月15日<br>狂欢最后一天</span></li>
        </ul>
      </div>
      <div class="d11-desc">
        <h3>消费有礼！价值<span>¥4288</span>冷钱包壕送！</h3>
        <div class="dd-i">
          <div class="img-box">
            <img src="../../assets/images/activity/d11/desc.png" alt="">
          </div>
          <p>·活动期间，消费金额累计达到10万元<br>&nbsp;即送￥4288元库神冷钱包<br>·赠品将在11月20日前寄出</p>
        </div>
      </div>
    </div>
    <div class="d11-coupon">
      <h2 class="d11-t">
        <span>8折券首登场！每日限量送！</span>
      </h2>
      <div class="coupon-wrap">
        <div class="inner coupon">
          <img src="../../assets/images/activity/d11/coupon.jpg" alt="">
          <div class="btn-wrap">
            <button @click="getCoupon" :class="isStart ? 'red' : ''">
              <span>{{getText()}} <img src="../../assets/images/activity/d11/arrow.png" alt=""></span>
            </button>
            <p v-if="!isStart && info.couponTime != null">下一轮抢券时间:{{info.couponTime | date('MM月DD日')}}0时开抢</p>
          </div>
        </div>
      </div>
    </div>
    <div class="d11-hash">
      <div class="inner">
        <span class="sale">
        <img src="../../assets/images/activity/d11/sale.png" alt="">
      </span>
        <h2 class="d11-t">
          <span>云算力全场直降！</span>
        </h2>
        <div class="d11-hash-list clearfix">
          <div class="plus-hash-item" @click="$router.push('/hash/detail?goodsId=101')">
            <div class="new">
              <img src="../../assets/images/activity/d11/new.png" alt="">
            </div>
            <div class="item-i">
              <img src="../../assets/images/activity/d11/hash1.png" alt="">
              <header>
                DAYUN Z1+ 7G MONA云算力
              </header>
              <div class="item-c">
                <del>原价：¥ 4.8／M</del>
                <p>活动直降：¥ 4.6／M</p>
                <strong>折后价：¥ 3.68／M</strong>
              </div>
            </div>
          </div>

          <div class="left hash-item" @click="$router.push('/hash/detail?goodsId=102')">
            <header>蚂蚁S9 13.5T BTC云算力</header>
            <img src="../../assets/images/activity/d11/hash2.png" alt="">
            <div class="item-c">
              <del>原价：¥ 369／T</del>
              <p>活动直降：¥ 359／T</p>
              <strong>折后价：¥ 287.2／T</strong>
            </div>
          </div>
          <div class="right hash-item" @click="$router.push('/hash/detail?goodsId=103')">
            <header>iBeLink DSM6T DCR云算力</header>
            <img src="../../assets/images/activity/d11/hash3.png" alt="">
            <div class="item-c">
              <del>原价：¥ 1.6／G</del>
              <p>活动直降：¥ 1.5／G</p>
              <strong>折后价：¥ 1.2／G</strong>
            </div>
          </div>

          <div class="left hash-item" @click="$router.push('/hash/detail?goodsId=104')">
            <header>掘金者miner 200 ETH云算力</header>
            <img src="../../assets/images/activity/d11/hash4.png" alt="">
            <div class="item-c">
              <del>原价：¥ 69／M</del>
              <p>活动直降：¥ 65／M</p>
              <strong>折后价：¥ 52／M</strong>
            </div>
          </div>
          <div class="right hash-item" @click="$router.push('/hash/detail?goodsId=105')">
            <header>iBeLink DSM6T HCASH云算力</header>
            <img src="../../assets/images/activity/d11/hash5.png" alt="">
            <div class="item-c">
              <del>原价：¥ 1.8／G</del>
              <p>活动直降：¥ 1.6／G</p>
              <strong>折后价：¥ 1.28／G</strong>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div class="photo">
      <div class="inner">
        <h3><strong class="title">算立方矿场实拍图</strong></h3>
        <ul>
          <li>
            <img src="../../assets/images/activity/d11/p1.png" alt="">
            <p>大型成熟、稳定矿场</p>
          </li>
          <li>
            <img src="../../assets/images/activity/d11/p2.png" alt="">
            <p>7*24专业维修服务</p>
          </li>
          <li>
            <img src="../../assets/images/activity/d11/p3.png" alt="">
            <p>挖矿收益有保证</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import CouponAPI from '../../services/coupon-api';
  import errorHandler from '../../services/error-handler';

  export default {
    head: {
      title: '双十一狂欢节_云算力购买平台_算立方', // set a title
    },
    data() {
      return {
        info: {
          id: '',
          activityStatus: 0,
          status: 0,
          couponTime: ''
        }
      };
    },
    mounted() {
      this.getActivityCouponInfo();
    },
    computed: {
      isStart() {
        return Number(this.info.activityStatus) === 1 && Number(this.info.status) === 1;
      }
    },
    methods: {
      getActivityCouponInfo() {
        CouponAPI.getActivityCouponInfo()
          .then(res => {
            this.info = res;
          });
      },
      getText() {
        switch (Number(this.info.activityStatus)) {
          case 0:
            return '未开始';
          case 1:
            if (Number(this.info.status) === 1) {
              return '立即抢';
            } else {
              return '已抢完';
            }
          case 2:
            return '已结束';
        }
      },
      getCoupon() {
        if (!this.isStart) {
          return;
        }
        CouponAPI.getCoupon(this.info.id)
          .then(res => {
            this.$alert('恭喜您，成功抢到8折云算力折扣券！', '提示', {confirmButtonText: '确定', type: 'success'});
          })
          .catch(error => {
            if (error.code === '100014') {
              // 用户已领取改优惠券
              return this.$alert('您已成功领取云算力8折券！<br>本次活动中您的领券名额已用完！', '提示', {
                confirmButtonText: '确定',
                type: 'warning',
                dangerouslyUseHTMLString: true
              });
            } else if (error.code === '100015') {
              // 优惠券领取失败，优惠券已结束或已领完
              this.$alert('今日8折券已抢完！', '提示', {confirmButtonText: '确定', type: 'warning'});
              this.info.activityStatus = 2;
              return;
            } else {
              errorHandler(error);
            }
          });
      }
    }
  };
</script>
<style lang="scss" scoped>
  .banner {
    margin: 0 auto;
    width: 100vw;
    min-width: 1200px;
    img {
      width: 100%;
    }
  }

  .inner {
    width: 1200px;
    margin: 0 auto;
    position: relative;
  }

  .d11-t {
    color: #2d2c47;
    font-weight: bold;
    font-size: 48px;
    line-height: 48px;
    position: relative;
    text-align: center;
    margin-bottom: 100px;
    z-index: 1;
    span {
      position: relative;
      &:before {
        position: absolute;
        z-index: -1;
        content: '';
        height: 24px;
        background: #ff7f4d;
        bottom: -2px;
        left: -2px;
        width: 70%;
      }
    }
  }

  .d11-strategy {
    padding-top: 100px;
  }

  .d11-step {
    text-align: center;
    margin-bottom: 80px;
    .w33 {
      width: 400px;
      color: #2d2c47;
      line-height: 40px;
      font-size: 24px;
      font-weight: bold;
      &:nth-child(2) {
        width: 420px;
      }
      &:last-child {
        width: 380px;
        span {
          position: relative;
          left: 20px;
        }
      }
    }
  }

  .d11-desc {
    text-align: center;
    h3 {
      color: #2d2c47;
      font-weight: bold;
      font-size: 36px;
      line-height: 62px;
      margin-bottom: 40px;
      span {
        color: #d32a45;
        padding: 0 5px;
      }
    }
    > .dd-i {
      position: relative;
      padding-left: 46%;
      height: 152px;
      .img-box {
        position: absolute;
        left: 27.5%;
        width: 133px;
        height: 152px;
      }
      p {
        padding-top: 26px;
        text-align: left;
        color: #79758f;
        font-size: 18px;
        line-height: 33px;
      }
    }
  }

  .d11-coupon {
    padding-top: 100px;
    padding-bottom: 120px;
    .coupon-wrap {
      position: relative;
      &:after {
        position: absolute;
        background: #abd1f4;
        box-shadow: 0 4px 10px rgba(146, 162, 183, 0.3);
        content: '';
        width: 100%;
        height: 144px;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
      .coupon {
        position: relative;
        z-index: 2;
        width: 880px;
        margin: 0 auto;
        box-shadow: 0 4px 10px rgba(146, 162, 183, 0.3);
        > img {
          display: block;
          width: 100%;
        }
      }
      .btn-wrap {
        position: absolute;
        z-index: 3;
        left: 42.5%;
        top: 270px;
        width: 400px;
        text-align: center;
        p {
          padding-top: 14px;
          color: #fff;
          font-weight: bold;
        }
        button {
          border: none;
          padding: 0 45px;
          line-height: 50px;
          height: 50px;
          background: #a8bbce;
          color: #fff;
          border-radius: 10px;
          font-size: 28px;
          font-weight: bold;
          cursor: pointer;
          &:active {
            opacity: 0.8;
          }
          &.red {
            background: #d32b45;
          }
          img {
            width: 14px;
            height: 26px;
            vertical-align: middle;
            position: relative;
            top: -3px;
            margin-left: 4px;
          }
        }
      }
    }
  }

  .d11-hash {
    border-top: 10px solid #abd1f4;
    box-shadow: 0 4px 10px rgba(146, 162, 183, 0.3) inset;
    background-image: linear-gradient(0deg, rgba(146, 162, 183, 0.2) 4%, rgba(255, 255, 255, 1) 8%);
    .inner {
      padding-top: 60px;
      padding-bottom: 100px;
    }
    .sale {
      position: absolute;
      top: -8px;
      left: 160px;
    }
  }

  .d11-hash-list {
    padding: 0 100px;
  }

  .plus-hash-item {
    cursor: pointer;
    border: 2px solid #f4f7fa;
    padding-top: 60px;
    overflow: hidden;
    position: relative;
    margin-bottom: 56px;
    .new {
      position: absolute;
      width: 246px;
      right: -70px;
      top: -4px;
      z-index: 1;
      opacity: 0.2;
    }
    .item-i {
      position: relative;
      z-index: 2;
      > img {
        position: absolute;
        left: 40px;
        top: 20px;
        width: 150px;
      }
      header {
        padding-left: 268px;
        background: rgba(211, 228, 244, .4);
        height: 75px;
        line-height: 75px;
        font-weight: bold;
        font-size: 30px;
        color: #131313;
      }
    }
    .item-c {
      padding: 0 0 0 268px;
      height: 140px;
    }
  }

  .hash-item {
    cursor: pointer;
    width: 480px;
    border: 2px solid #f4f7fa;
    margin-bottom: 56px;
    position: relative;
    header {
      text-align: center;
      background: rgba(211, 228, 244, .4);
      height: 75px;
      line-height: 75px;
      font-weight: bold;
      font-size: 30px;
      color: #131313;
    }
    > img {
      position: absolute;
      top: 93px;
      left: 40px;
    }
  }

  .item-c {
    padding: 20px 0 0 194px;
    height: 165px;
    font-weight: bold;
    color: #404040;
    font-size: 22px;
    position: relative;
    &:after {
      content: '';
      position: absolute;
      width: 23px;
      height: 44px;
      right: 30px;
      top: 50%;
      transform: translateY(-50%);
      background: url("../../assets/images/activity/d11/go-detail-arrow.png") no-repeat center;
      background-size: 100% 100%;
    }
    del {
      line-height: 22px;
      padding-top: 10px;
      margin-bottom: 16px;
      display: block;
    }
    p {
      margin-bottom: 16px;
    }
    strong {
      color: #d32b45;
    }
  }

  .photo {
    box-shadow: 0 4px 10px rgba(146, 162, 183, 0.3) inset;
    .title {
      padding: 66px 0 90px;
      color: #2d2c47;
      font-size: 36px;
      font-weight: bold;
      line-height: 1em;
      text-align: center;
      display: block;
    }
    ul {
      padding: 0 100px 45px;
      overflow: hidden;
    }
    li {
      width: 260px;
      margin-right: 110px;
      text-align: center;
      float: left;
      &:last-child {
        margin: 0;
      }
      img {
        display: block;
        width: 100%;
      }
      p {
        line-height: 70px;
        color: #2d2c47;
        font-size: 24px;
        font-weight: bold;
      }
    }
  }
</style>
