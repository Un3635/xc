<template>
  <div>
    <h2 class="main-header">我的邀请</h2>
    <div class="main-container">
      <div class="top-container">
        <el-row>
          <el-col :span="24" class="card">
            <h4 class="sub-title">我的邀请码</h4>
            <div class="card-content">
              <div class="left-content">
                <div class="img">
                  <img src="../../assets/images/miner-level-1.png" alt="" v-if="minerInfoVo.minerGrade==='矿工小白'">
                  <img src="../../assets/images/miner-level-2.png" alt="" v-if="minerInfoVo.minerGrade==='矿工达人'">
                  <img src="../../assets/images/miner-level-3.png" alt="" v-if="minerInfoVo.minerGrade==='矿工精英'">
                  <img src="../../assets/images/miner-level-4.png" alt="" v-if="minerInfoVo.minerGrade==='矿工大牛'">
                  <img src="../../assets/images/miner-level-5.png" alt="" v-if="minerInfoVo.minerGrade==='矿工领袖'">
                </div>
                <p class="imgInfo" style="padding-top: 10px">
                  <strong v-if="minerInfoVo.minerGrade==='矿工小白'"
                          style="color: #888;">{{minerInfoVo.minerGrade}}</strong>
                  <strong v-if="minerInfoVo.minerGrade==='矿工达人'"
                          style="color: #dda586;">{{minerInfoVo.minerGrade}}</strong>
                  <strong v-if="minerInfoVo.minerGrade==='矿工精英'"
                          style="color: #c97e63;">{{minerInfoVo.minerGrade}}</strong>
                  <strong v-if="minerInfoVo.minerGrade==='矿工大牛'"
                          style="color: #ae8f61;">{{minerInfoVo.minerGrade}}</strong>
                  <strong v-if="minerInfoVo.minerGrade==='矿工领袖'"
                          style="color: #404046;">{{minerInfoVo.minerGrade}}</strong>
                </p>
              </div>
              <div class="middle-content">
                <h3 class="card-content__header">
                  {{data.code}}
                  <span class="code"
                        :class="'lv-' + data.codeGrade">{{getCodeName(data.codeGrade)}}</span>
                </h3>
                <p class="description" v-if="minerInfoVo.minerGrade!=='矿工领袖'">
                  当前账户消费额为<strong>{{minerInfoVo.consumeAmount}}</strong>元，还差<strong>{{minerInfoVo.poorAmount}}</strong>元升级为<strong>{{minerInfoVo.nextMinerGrade}}</strong>
                </p>
                <p class="description" v-if="minerInfoVo.minerGrade==='矿工领袖'">
                  您当前账户消费额为<strong>{{minerInfoVo.consumeAmount}}</strong>元
                </p>
              </div>
              <div class="footer">
                <el-button class="btn" size="medium" style="padding: 10px 19px;margin-right: 25px"
                           v-clipboard:copy="shareLink" v-clipboard:success="onCopy">
                  复制邀请链接
                </el-button>
                <el-button class="btn" @click="share" type="primary" style="padding: 10px 19px;" size="medium">微信扫码分享
                </el-button>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="30" style="margin-top: 30px;">
          <el-col :span="12" class="card">
            <h4 class="sub-title"><strong>返现金额</strong></h4>
            <div class="card-content">
              <h3 class="card-content__header clearfix">
                <span class="left status" style="padding-right: 80px">总量
                  <em style="color: #FD7220">{{balanceInfo.alreadyCashBack | currency}}</em>
                  <span class="unit">元</span>
                </span>
                <span class="left status" v-if="balanceInfo.cashBackFreezeMoney">
                  冻结中
                  <el-popover placement="bottom" width="268" popper-class="custom"
                              trigger="hover" content="冻结中，好友矿机收货后，解除冻结">
                    <i slot="reference" class="iconfont icon-help"></i>
                  </el-popover>
                  <em>{{balanceInfo.cashBackFreezeMoney | currency}}</em>
                  <span class="unit">元</span>
                </span>
              </h3>
              <div style="margin-top: 56px;">
                <nuxt-link to="account">
                  <el-button class="btn" type="primary" size="medium">去提现</el-button>
                </nuxt-link>
              </div>
            </div>
          </el-col>
          <el-col :span="12" class="card">
            <h4 class="sub-title"><strong>算力</strong></h4>
            <div class="card-content">
              <h3 class="card-content__header clearfix" style="padding-bottom: 12px;">
                <span class="left status" style="padding-right: 80px">有效算力
                  <em style="color: #FD7220">{{suanliData.useRewardCount||0}}</em>
                  <span class="unit">{{suanliData.computingUnit}}</span>
                </span>
                <div class="right status">
                  <p style="padding-bottom: 10px">
                    <span class="status">
                      <span class="label">总量</span>
                      <em>{{suanliData.totalRewardCount||0}}</em>
                      <span class="unit">{{suanliData.computingUnit}}</span>
                    </span>
                  </p>
                  <span class="label">待交割</span>
                  <em>{{suanliData.freezenRewardCount||0}}</em>
                  <span class="unit">{{suanliData.computingUnit}}</span>
                </div>
              </h3>
              <div>
                <nuxt-link to="power">
                  <el-button class="btn" type="primary" size="medium">去查看</el-button>
                </nuxt-link>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="30" style="margin-top: 30px;"
                v-if="minerInfoVo.currencyInfoList&&minerInfoVo.currencyInfoList.length>0">
          <el-col :span="12" class="card" v-for="item in minerInfoVo.currencyInfoList" :key="item.currencyId">
            <h4 class="sub-title"><strong>{{item.currencyName}}奖励({{item.currencyName}})</strong></h4>
            <div class="card-content">
              <el-row class="card-content__top">
                <el-col :span="12">总量<em style="color: #FD7220">{{(item.totalRewardNumber||0) | cryptocurrency}}</em>
                </el-col>
                <el-col :span="12">冻结中<em>{{(item.rewardFreezeNumber||0) | cryptocurrency}}</em></el-col>
              </el-row>
              <nuxt-link to="account">
                <el-button class="btn" type="primary" size="medium">去提现</el-button>
              </nuxt-link>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="bottom-container">
        <h4 class="sub-title">我邀请的好友</h4>
        <div class="types">
          <ul class="type__list">
            <li class="type__item" @click="selected=0" :class="{active:selected===0}">全部好友</li>
            <li class="type__item" @click="selected=4" :class="{active:selected===4}">返现</li>
            <li class="type__item" @click="selected=1" :class="{active:selected===1}">算力</li>
            <li class="type__item" @click="selected=2" :class="{active:selected===2}">BTC</li>
            <li class="type__item" @click="selected=3" :class="{active:selected===3}">ETH</li>
          </ul>

          <div class="type__desc" v-if="selected===0">
            <p class="message">您在挖链平台邀请的所有好友</p>
          </div>
          <div class="type__desc" v-if="selected===4">
            <ul class="type__slist">
              <li class="type__sitem" @click="inner_selected=0" :class="{inner_active:inner_selected===0}">未奖励</li>
              <li class="type__sitem" @click="inner_selected=1" :class="{inner_active:inner_selected===1}">已奖励</li>
            </ul>
            <p class="message" v-if="inner_selected===0">您邀请的好友，还未购买矿机或云算力的用户</p>
            <p class="message" v-if="inner_selected===1">您邀请的好友购买矿机或算力后，系统返现</p>
            <p class="message" v-if="inner_selected===2">好友支付成功，您已获得邀请奖励</p>
          </div>
          <div class="type__desc" v-if="[1,2,3].indexOf(selected)>-1">
            <ul class="type__slist">
              <li class="type__sitem" @click="inner_selected=0" :class="{inner_active:inner_selected===0}">未奖励</li>
              <li class="type__sitem" @click="inner_selected=1" :class="{inner_active:inner_selected===1}">已奖励</li>
            </ul>
            <p class="message" v-if="inner_selected===0">您邀请的好友中，未在挖链APP中获取30WT的用户</p>
            <p class="message" v-if="inner_selected===1">好友已达成奖励所需的要求</p>
          </div>
        </div>
        <div class="table-wrapper">
          <!--全部好友-->
          <el-table class="tb" :data="userData" border stripe>
            <el-table-column prop="moblie" label="好友手机号"/>
            <el-table-column prop="awardNum" label="奖励金额" v-if="selected===4&&inner_selected===1">
              <template slot-scope="{row}"><span>{{row.awardNum||0}}元</span>
              </template>
            </el-table-column>
            <el-table-column label="奖励金额" v-if="selected===4&&inner_selected===2">
              <template slot-scope="scope"><span>{{scope.row.couponMoney||0}}*{{scope.row.number}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="rewardCount" label="未奖励数量（T）" v-if="selected===1&&inner_selected===0">
              <template slot-scope="scope"><span>{{scope.row.rewardCount}}</span></template>
            </el-table-column>
            <el-table-column prop="rewardCount" label="奖励数量（T）" v-if="selected===1&&inner_selected===1">
              <template slot-scope="scope"><span>{{scope.row.rewardCount}}</span></template>
            </el-table-column>
            <el-table-column label="未奖励数量（BTC）" v-if="selected===2&&inner_selected===0">
              <template slot-scope="scope"><span>{{scope.row.rewardCount || 0}}</span></template>
            </el-table-column>
            <el-table-column label="奖励数量（BTC）" v-if="selected===2&&inner_selected===1">
              <template slot-scope="scope"><span>{{scope.row.rewardCount || 0}}</span></template>
            </el-table-column>
            <el-table-column label="未奖励数量（ETH）" v-if="selected===3&&inner_selected===0">
              <template slot-scope="scope"><span>{{scope.row.rewardCount || 0}}</span></template>
            </el-table-column>
            <el-table-column label="奖励数量（ETH）" v-if="selected===3&&inner_selected===1">
              <template slot-scope="scope"><span>{{scope.row.rewardCount || 0}}</span></template>
            </el-table-column>
            <el-table-column prop="channel" label="注册平台"/>
            <el-table-column label="注册时间" v-if="selected!==4||inner_selected!==1">
              <template slot-scope="scope">
                <span>{{+scope.row.regDate | date('YYYY-MM-DD HH:mm:ss')}}</span>
              </template>
            </el-table-column>
            <el-table-column label="成交时间" v-else-if="selected===4&&inner_selected===1">
              <template slot-scope="scope">
                <span>{{+scope.row.regDate | date('YYYY-MM-DD HH:mm:ss')}}</span>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination class="text-left" v-if="pageCount>0" layout="sizes, prev, pager, next" :page-size="size"
                           :total="pageCount" :page-sizes="[10, 20, 30, 50, 100, 200]"
                           :current-page.sync="currentPage" @current-change="handleCurrentChange"
                           @size-change="handleSizeChange">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <el-dialog width="420px" :visible.sync="shareDialogVisible">
      <div class="share-container">
        <img v-if="QrCodeImgUrl" :src="QrCodeImgUrl" alt="">
        <p>打开微信扫一扫</p>
        <p>将页面分享给好友即可</p>
        <a :href="QrCodeImgUrl" download="download">保存邀请二维码至本地</a>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import QRCode from 'qrcode';
  import UserAPI from '../../services/user-api';
  import errorHandler from '../../services/error-handler';
  import AppConfig from '../../config';

  export default {
    breadcrumb() {
      return {
        label: '我的邀请',
        parentsList: [
          {
            path: '/i',
            label: '个人中心'
          }
        ]
      };
    },
    data() {
      return {
        data: {
          code: '4SISEANJ',
          inviteNumber: 40,
          ranking: 15,
          codeGrade: ''
        },
        balanceInfo: {
          totalCashBack: 0,
          ranking: '1w+',
          alreadyCashBack: '',
          cashBackFreezeMoney: ''
        },
        suanliData: {
          goodsCount: 0,
          totalRewardCount: 0,
          freezenRewardCount: 0,
          computingUnit: 'T'
        },
        size: 10,
        currentPage: 1,
        pageCount: 0,
        userData: [],
        minerInfoVo: {
          consumptionMoney: 0,
          poorMoney: 0,
          minerGrade: '矿工小白',
          nextMinerGrade: '矿工领袖'
        },
        selected: 0,
        inner_selected: 0,
        shareDialogVisible: false,
        shareLink: '',
        QrCodeImgUrl: '',
        cashInfo: {
          num: 0,
          cash: 0
        }
      };
    },
    methods: {
      initPage() {
        // 我的邀请码
        UserAPI.inviteCodeInfo()
          .then(res => {
            if (res) {
              this.data = res;
              this.shareLink = AppConfig.shareLink + res.code;
              // this.shareLink =  'http://cubetest.walian.cn/static/h5/register.html?inviteCode=' + res.code;
            } else {
              return Promise.reject({msg: '无效的邀请信息'});
            }
          })
          .catch(errorHandler);
        // 用户消费额
        UserAPI.minerInfo()
          .then(res => {
            this.minerInfoVo = res;
            this.suanliData = res.computingInfoList.find(item => item.computingUnit === 'T') || {};
          })
          .catch(errorHandler);
        // 返回现金
        UserAPI.balanceInfo()
          .then(res => res || {})
          .then(res => {
            this.balanceInfo = res;
          })
          .catch(errorHandler);
      },
      loadData(page) {
        if (this.selected === 0) {
          return UserAPI.allInviteeInfo(0, page, this.size);
        }
        const status = this.inner_selected;
        if (this.selected === 4) {
          return UserAPI.awardList(status, page, this.size)
            .then(res => res || {})
            .then(res => {
              (res.list || []).forEach(item => {
                item.regDate = item.createTime;
                item.moblie = item.account;
              });
              return res;
            });
        }
        const type = this.selected;
        return UserAPI.rewardInviteeInfo(type, status, page, this.size);
      },
      loadInviteeInfo(page) {
        this.userData = [];
        this.loadData(page)
          .then(res => {
            this.pageCount = res.count || 0;
            return res.list || [];
          })
          .then(res => {
            this.userData = res;
          })
          .catch(errorHandler);
      },
      handleSizeChange(size) {
        this.size = size;
        this.loadInviteeInfo(this.currentPage);
      },
      handleCurrentChange(page) {
        this.currentPage = page;
        this.loadInviteeInfo(this.currentPage);
      },
      onCopy() {
        this.$notify({
          title: '成功',
          message: '复制成功，去分享',
          type: 'success'
        });
      },
      share() {
        QRCode.toDataURL(this.shareLink)
          .then(url => {
            this.QrCodeImgUrl = url;
            this.shareDialogVisible = true;
          })
          .catch(err => {
          });
      },
      getCodeName(str) {
        switch (str) {
          case 'gold_code':
            return '黄金码';
          case 'black_gold_code':
            return '黑金码';
          case 'diamond_code':
            return '钻石码';
          default:
            return '';
        }
      }
    },
    watch: {
      selected: {
        handler() {
          // 一级菜单变化引起二级菜单变化直接交给二级菜单的handler去处理
          if (this.inner_selected !== 0) {
            this.inner_selected = 0;
            return;
          }
          this.loadInviteeInfo(1);
        },
        immediate: true
      },
      inner_selected: {
        handler() {
          this.loadInviteeInfo(1);
        }
      }
    },
    mounted() {
      this.initPage();
    }
  };
</script>

<style scoped lang="scss">
  .main-header {
    font-size: 24px;
    line-height: 24px;
    color: #303137;
    padding: 20px 30px;
    /*background: red;*/
  }

  .main-container {
    padding: 31px 30px 30px 31px;
    /*background: blue;*/
  }

  .top-container {
    padding-bottom: 30px;
    /*background: yellow;*/
  }

  .card {

  }

  .card-content__header {
    font-size: 18px;
    line-height: 24px;
    margin-bottom: 10px;
    color: #303137;

    .status {
      font-size: 14px;
      color: #606166;
      font-style: normal;
      font-weight: normal;
      line-height: 22px;
      em {
        font-size: 18px;
        color: #303137;
        font-style: normal;
        font-weight: bold;
        margin-left: .5em;
      }

      .label {
        display: inline-block;
        min-width: 3em;
      }

    }

    .unit {
      color: #303137;
    }

    .icon-help {
      display: inline-block;
      width: 15px;
      height: 15px;
      font-size: 15px;
      margin-left: 2px;
      vertical-align: -1px;
    }
  }

  .card-content {
    margin-top: 10px;
    background-color: #fafafa;
    padding: 30px;
    overflow: hidden;
    .left-content {
      float: left;

      .img {
        cursor: pointer;
        width: 56px;
        height: 56px;
      }

      img {
        width: 100%;
      }

      p {
        padding-top: 31px;
        font-size: 14px;
        color: #735B3A;
      }
    }

    .middle-content {
      float: left;
      /*background: green;*/
      padding-top: 15px;
      padding-left: 40px;
      .description {
        font-size: 14px;
        line-height: 19px;
        color: #969699;
        padding-top: 14px;
        strong {
          font-weight: bold;
          margin-left: 2px;
          margin-right: 2px;
          color: #303137;
        }
      }
    }
    .footer {
      /*background: yellow;*/
      padding-top: 24px;
      float: right;
    }
  }

  .card-content__top {
    font-size: 14px;
    color: #606166;
    line-height: 22px;
    margin-bottom: 56px;

    em {
      font-size: 18px;
      font-style: normal;
      font-weight: bold;
      margin-left: .5em;
    }
  }

  /*.card-content-small {*/
  /*padding: 33px 30px 30px 30px;*/
  /*!*background: red;*!*/
  /*.card-content__header {*/
  /*overflow: hidden;*/
  /*}*/
  /*}*/

  .code {
    position: relative;
    display: inline-block;
    top: -4px;
    margin-left: 5px;
    padding: 3px;
    font-size: 12px;
    font-weight: bold;
    line-height: 1;
    color: #fff;

    &:before {
      content: '';
      display: inline-block;
      position: absolute;
      border: 3px solid transparent;
      border-right: 4px solid;
      left: -7px;
      top: 50%;
      margin-top: -3px;
    }

    &.lv-gold_code {
      background-color: #ffcd2a;
      &:before {
        border-right-color: #ffcd2a;
      }
    }

    &.lv-black_gold_code {
      background-color: #735B3A;
      &:before {
        border-right-color: #735B3A;
      }
    }

    &.lv-diamond_code {
      background-color: #65D6FF;
      &:before {
        border-right-color: #65D6FF;
      }
    }
  }

  .btn {
    border-radius: 0;
  }

  .btn-getcash {
    width: 96px;
    border: 1px solid #303137;
    background-color: #303137;
    color: #fff;
  }

  .bottom-container {
  }

  .types {
    padding-top: 10px;
  }

  .type__list {
    margin-bottom: 31px;
    border-bottom: 1px solid #F5F5F7;
  }

  .type__item {
    margin-right: 61px;
    margin-bottom: -1px;
    display: inline-block;
    cursor: pointer;
    color: #969699;
    font-size: 16px;
    line-height: 19px;
    padding: 7px 0;

    &.active {
      color: #303137;
      font-weight: bold;
      border-bottom: 3px solid #303137;
    }
    /*&:first-of-type::after,*/
    /*&:nth-of-type(2)::after {*/
    /*content: '.';*/
    /*color: white;*/
    /*display: inline-block;*/
    /*margin-left: 12px;*/
    /*margin-right: 12px;*/
    /*width: 1px;*/
    /*background: #edeef0;*/
    /*}*/
  }

  .type__desc {
    font-size: 14px;
    line-height: 19px;
    color: #606166;
  }

  .type
  .table-wrapper {
    padding-top: 10px;
  }

  .sub-title {
    font-size: 16px;
    color: #303137;
    font-weight: bold;
    line-height: 21px;
  }

  .tb {
    width: 100%;
  }

  .share-container {
    text-align: center;
    margin-top: -10px;
    font-size: 14px;
    line-height: 24px;

    p {
      color: #303137;
    }

    a {
      display: inline-block;
      margin-top: 30px;
      color: #4D87EA;
    }
  }

  .type__slist {
    padding-bottom: 20px;
    .type__sitem {
      cursor: pointer;
      display: inline-block;
      font-size: 14px;
      color: #969699;
      line-height: 19px;
      margin-right: 42px;
      &.inner_active {
        color: #303137;
        font-weight: bold;
      }
    }
  }

  .message {
    padding-bottom: 12px;
  }

  .pagination {
    padding-left: 210px;
  }

  .text-orange {
    color: #fd7200;
  }
</style>
