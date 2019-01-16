<template>
  <div class="toWithDrawal-wrap">
    <x-header title="奖励提现"  @back="$router.go(-1)"/>
    <div class="hint">目前仅支持支付宝提现</div>
    <div class="toWithDrawal-box">
      <div class="balance-wrap">
        <p class="balance-title">提现金额</p>
        <div class="list-block">
          <div class="item-inner">
            <div class="item-media unit">¥</div>
            <div class="item-input">
              <input type="text" v-validate="{ required: true, min_value: 10, max_value: totalBalance}" :class="{withDrawalBalance: withDrawalBalance !== ''}" placeholder="提前金额不能少于10元" v-model="withDrawalBalance" name="withDrawalBalance">
            </div>
            <div class="item-title label" @click="withDrawalBalance = totalBalance">全部</div>
          </div>
          <p class="total-balance" v-show="!errors.has('withDrawalBalance')">可提现金额 ¥{{totalBalance}}</p>
          <p class="total-balance-hint" v-show="errors.has('withDrawalBalance')">提现金额不能少于10元,且不也能大于{{totalBalance}}</p>
        </div>
      </div>
      <div class="black"></div>
      <div class="to-balance-wrap">
        <div class="list-block">
          <div class="item-inner">
            <div class="item-title label">支付宝账号</div>
            <!-- <div class="item-title label">{{errors.has('withDrawalBalance')}}</div> -->
            <div class="item-input">
              <input type="text" placeholder="邮箱或手机号" v-model="account" v-validate="{required: true}" name="account">
            </div>
          </div>
          <div class="item-inner">
            <div class="item-title label">真实姓名</div>
            <div class="item-input">
              <input type="text" placeholder="账号对应的真实姓名" v-model="userName" v-validate="{required: true}" name="userName">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="record-btn-wrap">
      <a class="invite-btn" href="javascript:;" @click="toWithdrawal" :class="{active: withDrawalBalance !== '' && account!=='' && userName!=='' && !errors.has('withDrawalBalance') && !errors.has('account') && !errors.has('userName')}">确认提现</a>
    </div>
    <x-prompt :prompt="prompt" v-if="showPrompt" @hide="hide"></x-prompt>
  </div>
</template>
<script>
import APIS from "@/services/api";
import XHeader from "@/components/common/x-header.vue";
import XPrompt from "@/components/common/x-prompt.vue";

export default {
  name: "inviteWithdrawal",
  data() {
    return {
      data: [],
      withDrawalBalance: 10,
      totalBalance: 14.8,
      account: "",
      userName: "",
      showPrompt: false,
      prompt: {
        str: ""
      }
    };
  },
  methods: {
    hide() {
      this.showPrompt = false;
    },
    getTotalBalance() {
      APIS.myRecordList(this.$route.query.token, 1, 1).then(res => {
        this.totalBalance = res.data.result.canPutMoney;
        this.withDrawalBalance = this.totalBalance;
      })
    },
    toWithdrawal() {
      APIS.insertGemsPutForward(
        this.$route.query.token,
        this.withDrawalBalance,
        this.account,
        this.userName
      ).then(res => {
        this.showPrompt = true;
        this.getTotalBalance();
        this.prompt.str = "提现成功";
        // this.
      }).catch(() => {
        this.showPrompt = true
        this.prompt.str = "提现失败";
      });
    }
  },
  created() {
    document.title = this.$route.meta.title;
    this.getTotalBalance();
  },
  components: {
    XHeader,
    XPrompt
  }
};
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/mixin.scss";
.toWithDrawal-wrap {
  position: fixed;
  width: 100%;
  left: 0px;
  top: 0px;
  font-family: PingFangSC-Regular;
  letter-spacing: 0;
  .hint {
    margin-top: 40px;
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding-left: 1.2rem;
    font-size: 0.7rem;
    color: #ff9e02;
    background: #fff8ec;
  }
  .toWithDrawal-box {
    position: relative;
    background: #fff;
    padding: 1.6rem 0 0 1.2rem;
  }
  .list-block {
    margin: 0px;
  }
  .balance-wrap {
    .balance-title {
      font-size: 0.8rem;
      color: #3f3739;
    }
    .list-block {
      .unit {
        font-size: 2rem;
        color: #3f3739;
        font-weight: 700;
      }
    }
    .total-balance {
      padding: 0.6rem 0;
      font-size: 0.6rem;
      color: #3f3739;
    }
    .total-balance-hint {
      padding: 0.6rem 0;
      font-size: 0.6rem;
      color: #fa6e6e;
    }
    .withDrawalBalance {
      font-size: 2rem;
    }
  }
  .black {
    position: absolute;
    left: 0px;
    width: 100%;
    height: 0.5rem;
    background: #f7f7f7;
  }
  .to-balance-wrap {
    padding-top: 0.5rem;

    .label {
      font-size: 0.7rem;
      color: #3f3739;
    }
    input {
      text-align: right;
    }
  }
  .record-btn-wrap {
    margin-top: 2.2rem;
    text-align: center;
    .invite-btn {
      opacity: 0.5;
      padding: 0.5rem 6.8rem;
      @include public-btn;
      &.active {
        opacity: 1;
      }
    }
  }
}
</style>

