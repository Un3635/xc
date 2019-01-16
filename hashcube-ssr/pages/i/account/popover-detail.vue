<template>
  <div id="popoverBox" class="popover-box" :style="'top:' + top" @click.stop="cancelBubble">
    <div v-show="!hasData" class="nodata">暂无信息</div>
    <el-row v-show="hasData">
      <el-col :span="18">
        <div class="popover-left">
          <p>申请时间<strong v-if="detail">{{detail.createTime|date('YYYY-MM-DD HH:mm:ss')}}</strong></p>
          <p>成交时间
            <strong v-if="detail && detail.typeOfOperation == 2">交易中</strong>
            <strong v-if="detail && detail.typeOfOperation != 2">
              {{detail.updateTime|date('YYYY-MM-DD HH:mm:ss')}}
            </strong>
          </p>
          <p>提现数量<strong v-if="detail">{{detail.currencyNumber}}{{detail.currencyName}}</strong></p>
          <p>钱包地址<strong v-if="detail">{{detail.accountAddress}}</strong>
            <span class="address-copy"
                  v-if="detail"
                  v-clipboard:copy="detail.accountAddress"
                  v-clipboard:success="onCopy">复制</span>
          </p>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="popover-right">
          <canvas id="canvas" class="img-code"></canvas>
          <div>二维码</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import QRCode from 'qrcode';
  import AccountApi from "../../../services/account-api";
  import errorHandler from '../../../services/error-handler';

  export default {
    props: ['top', 'dataId'],
    data: () => ({
      detail: {},
      hasData: false
    }),
    mounted() {
      this.getAccountDetail(this.dataId);
    },
    watch: {
      dataId: {
        handler(newValue, oldValue) {
          this.getAccountDetail(newValue);
        },
        deep: true
      }
    },
    methods: {
      getAccountDetail(id) {
        AccountApi.accountDetail(id)
          .then((res) => {
            res === {} ? this.hasData = false : this.hasData = true;
            this.detail = res;
            this.createCode(res.accountAddress);
          })
          .catch(errorHandler);
      },
      createCode(address) {
        let canvas = document.getElementById('canvas');
        QRCode.toCanvas(canvas, address, (error) => {
          if (error) {
            // this.createCode("http://www.baidu.com");
          }
        });
      },
      cancelBubble() {

      },
      onCopy(e) {
        this.$notify({
          title: "复制成功",
          type: "success",
          duration: "1000",
          showClose: false
        });
      }
    }

  };
</script>

<style scoped lang="scss">
  .popover-box {
    width: 610px;
    height: 192px;
    background: #FFFFFF;
    border: 1px solid #EDEEF0;
    box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.08);
    font-size: 14px;
    color: #969699;
    position: absolute;
    right: 0;
    z-index: 10000;
    padding: 38px 20px 20px 20px;

    &:after {
      content: '';
      display: inline-block;
      position: absolute;
      border: 6px solid transparent;
      border-bottom: 6px solid;
      right: 85px;
      top: -5px;
      margin-top: -6px;
      border-bottom-color: #fff;
    }
  }

  .nodata {
    text-align: center;
    line-height: 120px;
  }

  p {
    margin-bottom: 16px;
  }

  strong {
    font-weight: bold;
    color: #303137;
    margin-left: 20px;
  }

  .address-copy {
    color: #4d87ea;
    margin-left: 20px;
    cursor: pointer;
  }

  .popover-right {
    text-align: center;
  }

  .img-code {
    width: 110px !important;
    height: 110px !important;
    position: relative;
    margin-top: -15px;
  }
</style>
