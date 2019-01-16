<template>
  <div class="request-code">
    <view-box body-padding-top="46px" body-padding-bottom="0">
      <x-header :left-options="{backText:''}" class="custom-header" slot="header">邀请好友</x-header>
      <div class="figure">
        <img src="../../assets/images/yaoqing_bg@2x.png" alt="算立方">
        <div class="figcaption">
          <img src="../../assets/images/icon_kuanggonglinxiu_normal@2x.png" alt="算立方">
          <p class="awayWork">{{minerGrade || '--'}}</p>
          <p class="my-code">我的邀请码</p>
          <h4>{{myCode || '--'}}</h4>
          <div class="invite-code" @click="openQrCode">邀请二维码</div>
        </div>
        <div class="invite-data-show">
          <flexbox justify="space-between" class="flexbox">
            <flexbox-item v-for="(item,index) in inviteDataList" :key="index">
              <p class="inviteType">{{item.name}}(人)</p>
              <h5 class="inviteNum">{{item.num}}</h5>
            </flexbox-item>
          </flexbox>
        </div>
      </div>
      <div class="invite-list">
        <ul>
          <li v-for="(item,index) in inviteListArr" :key="index" class="clearfix" @click="gotoDetail(item)">
            <div class="left" :class="{'invite-first':item.currencyName==='有效算力'}">
              <p class="inviteName">{{item.currencyName}}<span v-if="item.currencyName!=='有效算力' && item.currencyName!=='已返现金额' ">总量</span></p>
              <p class="inviteNum">
                <span v-if="item.currencyName ==='已返现金额'">{{item.alreadyCashBack | currency('', 2)}}元</span>
                <span v-else-if="item.currencyName!=='有效算力'">{{item.totalRewardNumber | cryptocurrency}}{{item.currencyName}}</span>
                <span v-else>{{item.useRewardCount || 0 | cryptocurrency}}{{item.computingUnit}}</span></p>
              <p class="inviteTotal" v-if="item.currencyName=='有效算力'">
                总量&nbsp;<span>{{item.totalRewardCount || 0 | cryptocurrency}}{{item.computingUnit}}</span></p>
              <p class="inviteAwait">
                <span v-if="item.currencyName ==='已返现金额'">冻结中&nbsp;{{item.cashBackFreezeMoney | currency('', 2)}}元</span>
                <span v-else-if="item.currencyName!=='有效算力'">冻结中&nbsp;{{item.rewardFreezeNumber | cryptocurrency}}{{item.currencyName}}</span>
                <span v-else>待交割&nbsp;{{item.freezenRewardCount || 0 | cryptocurrency}}{{item.computingUnit}}</span></p>
            </div>
            <div class="right">
              <p>
                <img src="../../assets/images/suanlifang_normal@3x.png" alt="算立方" v-if="item.currencyName==='有效算力' || item.currencyName ==='已返现金额'">
                <img src="../../assets/images/walian_normal@3x.png" alt="算立方" v-else>
                <img src="../../assets/images/walian_normal@3x.png" alt="算立方" v-if="item.currencyName==='有效算力' || item.currencyName ==='已返现金额'">
              </p>
              <img src="../../assets/images/icon_cengji_normal@2x.png" alt="算立方"
                   :class="{nextImg:item.currencyName==='有效算力'}">
            </div>
          </li>
        </ul>
      </div>
      <divider class="invite-divider">详细数据请用PC打开www.hc.top查看</divider>
      <transition name="fade">
        <div v-transfer-dom class="alert-in" v-show="dialogVisible">
          <div class="in-content">
            <div class="bg-img">
              <div class="close" @click="dialogVisible=!dialogVisible"></div>
              <div class="qrcode">
                <img v-if="QrCodeImgUrl" :src="QrCodeImgUrl" alt="">
              </div>
            </div>
          </div>
          <div class="weui-mask"></div>
        </div>
      </transition>
    </view-box>
  </div>
</template>
<script>
  import {Flexbox, FlexboxItem, Divider, XDialog, TransferDomDirective as TransferDom} from 'vux';
  import UserAPI from '../../services/user-api';
  import QRCode from 'qrcode';

  export default {
    data() {
      return {
        minerGrade: '',
        myCode: '',
        inviteDataList: [
          {
            num: 0,
            name: '今日邀请'
          },
          {
            num: 0,
            name: '昨日邀请'
          },
          {
            num: 0,
            name: '总邀请'
          }
        ],
        inviteListArr: [],
        QrCodeImgUrl: '',
        // 二维码图片
        shareLink: '',
        dialogVisible: false
      };
    },
    directives: {
      TransferDom
    },
    methods: {
      openQrCode() {
        this.dialogVisible = true;
        this.share();
      },
      gotoDetail(item) {
        let path;
        switch (item.currencyName) {
          case '有效算力':
            path = 1;
            break;
          case 'BTC':
            path = 2;
            break;
          case 'ETH':
            path = 3;
            break;
          case '已返现金额':
            path = 4;
            item.currencyId = 1;
            break;
        }
        if (item.currencyName === '有效算力') {
          this.$router.push({
            path: 'invitation-detail',
            query: {
              rewardType: path,
              computingUnit: item.computingUnit
            }
          });
        } else {
          this.$router.push({
            path: 'invitation-detail',
            query: {
              rewardType: path,
              currencyId: item.currencyId,
              currencyName: item.currencyName
            }
          });
        }
      },
      share() {
        QRCode.toDataURL(this.shareLink)
          .then(url => {
            this.QrCodeImgUrl = url;
          })
          .catch(() => {
          });
      },
      inviteCodeInfo() {
        UserAPI.inviteCodeInfo().then(res => {
          if (res) {
            this.shareLink = window.location.origin + '/invite?inviteCode=' + res.code;
          } else {
            return Promise.reject({msg: '无效得邀请新消息'});
          }
        });
      },
      inviteCurrenyList() {
        UserAPI.inviteCurrenyList().then(res => {
          this.myCode = res.code;
          this.minerGrade = res.minerGrade;
          this.inviteDataList.forEach((item, index) => {
            if (index === 0) {
              item.num = res.todayInvitedPeople;
            } else if (index === 1) {
              item.num = res.yesterdayInvitedPeople;
            } else {
              item.num = res.totalInvitedPeople;
            }
          });
          UserAPI.balanceInfo().then(res => {
            let userBalnceInfo = Object.assign({}, res);
            userBalnceInfo.currencyName = '已返现金额';
            this.inviteListArr.push(userBalnceInfo);
          }).then(() => {
            let calcForceItem = (res.computingInfoList || []).filter(item => item.computingUnit === 'T')[0] || {};
            calcForceItem['currencyName'] = '有效算力';
            calcForceItem['computingUnit'] = 'T';
            this.inviteListArr.push(calcForceItem);
            // 只显示 BTC 和 ETH 的算力
            // if( currencyName === 'BTC' || )
            let currencyArr = res.currencyInfoList.filter(item => {
              return item.currencyName === 'BTC' || item.currencyName === 'ETH';
            });
            this.inviteListArr = this.inviteListArr.concat(currencyArr || []);
          });
        });
      }
    },
    mounted() {
      this.inviteCodeInfo();
      this.inviteCurrenyList();
    },
    components: {
      Flexbox,
      FlexboxItem,
      Divider,
      XDialog
    }
  };
</script>
<style lang="scss" scoped>
  .bg-img {
    width: 280px;
    height: 461px;
    background-image: url("../../assets/images/erweima_bg@2x.png");
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-position: center center;
    position: relative;
    .close {
      position: absolute;
      background: url("../../assets/images/erweimaguanbi_normal@2x.png") center no-repeat;
      background-size: 14px 14px;
      padding: 24px;
      right: -7px;
      top: 38px;
    }

  }

  .qrcode {
    width: 140px;
    height: 140px;
    position: absolute;
    bottom: 57px;
    left: 0;
    right: 0;
    margin: auto;
    background: #fff;
    border-radius: 6px;
    overflow: hidden;
  }

  .in-content {
    position: absolute;
    display: table;
    z-index: 1001;
    max-width: 280px;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    text-align: center;
    border-radius: 9px;
    overflow: hidden;
  }

  .alert-in {
    position: absolute;
    z-index: 1000;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }

  .request-code {
    height: 100%;
    overflow: hidden;
    background: #F4F4F4;
  }

  .figure {
    position: relative;
    >img {
      width: 100%;
      display: block;
      height: 326px;
    }
    .figcaption {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      padding-top: 33px;
      img {
        width: 67px;
        display: block;
        margin: 0 auto;
      }
      .awayWork {
        font-size: 15px;
        color: #fff;
        text-align: center;
        margin: 10px 0 15px;
      }
      .my-code {
        font-size: 16px;
        color: #fff;
        opacity: 0.6;
        text-align: center;
      }
      h4 {
        font-size: 48px;
        color: #D2A86A;
        margin: 15px 0 30px;
        text-align: center;
      }
      .invite-code {
        width: 160px;
        height: 40px;
        line-height: 40px;
        border: 1px solid #fff;
        border-radius: 100px;
        text-align: center;
        color: #fff;
        font-size: 16px;
        margin: 0 auto;
      }
    }
  }

  .invite-data-show {
    width: 100%;
    position: absolute;
    bottom: -50px;
    padding: 0 10px;
    z-index: 2;
    .flexbox {
      padding: 14px 20px;
      background: #fff;
      box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.08);
      z-index: 100;
      border-radius: 8px;
    }
    .inviteNum {
      font-size: 16px;
      text-align: center;
      color: #303137;
      margin-top: 8px;
      span {
        font-weight: 700;
      }
    }
    .inviteType {
      font-size: 13px;
      color: #606166;
      text-align: center;
    }
  }

  .invite-list {
    ul {
      li {
        padding: 15px 14px 15px 20px;
        width: 100%;
        background: #fff;
        margin-bottom: 10px;
        &:first-child {
          padding-top: 70px;
        }
        .left {
          padding-top: 5px;
          &.invite-first {
            padding-top: 10px;
          }
          .inviteName {
            color: #666666;
            font-size: 14px;
          }
          .inviteNum {
            font-size: 20px;
            height: 20px;
            line-height: 20px;
            color: #333;
            margin: 10px 0 10px;
          }
          .inviteTotal {
            font-size: 14px;
            color: #303137;
            height: 14px;
            line-height: 14px;
          }
          .inviteAwait {
            color: #969699;
            font-size: 13px;
            margin-top: 10px;
          }
        }
        .right {
          p {
            img {
              width: 32px;
              &:first-child {
                margin-right: 10px;
              }
              &:last-child {
                margin-right: 0;
              }
            }
          }
          > img {
            height: 10px;
            float: right;
            margin-top: 5px;
            &.nextImg {
              margin-top: 20px;
            }
          }
        }
      }
    }
  }

  .invite-divider {
    margin: 6px 30px;
    font-size: 11px;
    color: #ACACAC;
  }

  .codeDialog {
    width: 80%;
    img {
      display: block;
      width: 60%;
      margin: 0 auto;
    }
    x-icon {
      font-size: 13px;
      position: absolute;
      right: 12px;
      top: 12px;
    }
    .icon-close {
      text-align: right;
    }
    .code-one {
      font-size: 15px;
      color: #303137;
      margin: 12px 0 17px;
    }
    .code-two {
      font-size: 14px;
      color: #606166;
    }
    .code-three {
      background: #F7F7F7;
      margin: 11px 15px 16px;
      padding: 14px 0 14px 15px;
      text-align: left;
      color: #666666;
      font-size: 14px;
      border: 1px solid #E7E7E7;
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      border-radius: 5px;
      span {
        font-size: 15px;
        color: #151515;
        font-weight: 600;
        margin-left: 20px;
      }
    }

    .code-four {
      font-size: 12px;
      color: #999999;
      margin-bottom: 10px;
    }

  }
</style>
