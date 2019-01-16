<template>
  <el-dialog title="修改付款方式" width="420px" :visible.sync="dialogVisible"
             @open="openHandler" custom-class="custom">
    <div class="pay-method">
      <label>付费方式</label>
      <ul class="pay-method__list">
        <li class="pay-method__item" :class="{'is-active':method.type===selected.type}"
            v-for="method in methods" :key="method.type" @click="selected=method">
          {{method.label}}
        </li>
      </ul>
    </div>
    <div class="pay-method-desc">
      <p>{{selected.desc}}</p>
      <p>当上述扣款都无完成时，或连续10天每日产出的加密货币不足抵扣时，托管的矿机停止运行。</p>
    </div>
    <div slot="footer">
      <el-button type="primary" @click="clickHandler">确认修改</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {BalanceType} from '../services/config';

  export default {
    name: 'x-balance-change-dialog',
    props: {
      type: {
        type: Number,
        default: BalanceType.BALANCE
      },
      visible: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        dialogVisible: false,
        methods: [
          {
            type: BalanceType.BALANCE,
            label: '优先余额付款',
            desc: '优先余额付费，扣款优先级：1、账户余额；2、每日产出的加密货币；3、账户中的加密货币。'
          },
          {
            type: BalanceType.COIN,
            label: '优先以币抵费',
            desc: '优先以币抵费，抵扣优先级：1、每日产出的加密货币；2、账户中的加密货币。'
          }
        ],
        selected: {}
      };
    },
    mounted() {
      this.selected = this.methods.find(item => item.type === this.type);
    },
    watch: {
      visible: {
        immediate: true,
        handler(val) {
          this.dialogVisible = val;
        }
      },
      dialogVisible(val) {
        this.$emit('update:visible', val);
      }
    },
    methods: {
      clickHandler() {
        this.dialogVisible = false;
        const selectedType = this.selected.type;
        if (selectedType !== this.type) {
          this.$emit('change', selectedType);
        }
      },
      openHandler() {
        this.selected = this.methods.find(item => item.type === this.type);
      }
    }
  };
</script>

<style scoped lang="scss">
  .pay-method-desc {
    margin-top: 20px;
    padding: 10px 16px;
    font-size: 12px;
    line-height: 18px;
    background-color: #fafafa;
    color: #606166;
  }

  .pay-method {
    line-height: 38px;
  }

  .pay-method__list {
    margin-left: 30px;
    display: inline-block;
    font-size: 0;
    vertical-align: top;
  }

  .pay-method__item {
    position: relative;
    display: inline-block;
    vertical-align: top;
    font-size: 14px;
    line-height: 20px;
    padding: 8px 25px;
    border: 1px solid #eee;
    cursor: pointer;
    margin-left: 1em;

    &:first-child {
      margin-left: 0;
    }

    &.is-active {
      border-color: #4d87ea;

      &:after {
        content: "";
        position: absolute;
        right: -1px;
        bottom: -1px;
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url(../assets/images/selected.png) no-repeat;
        background-size: cover;
      }
    }
  }
</style>
