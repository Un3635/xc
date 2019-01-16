<template>
  <div id="popoverBox" class="popover-box" :style="'top:' + top" @click.stop="cancelBubble">
    <div v-show="!hasData" class="nodata">データは暫時ありません</div>
    <el-row v-show="hasData">
      <el-col :span="18">
        <div class="popover-left">
          <p>
            <span class="titleInfo">引出し申請</span>
            <strong v-if="detail">{{detail.createTime|date('YYYY-MM-DD HH:mm:ss')}}</strong>
          </p>
          <p>
            <span class="titleInfo">送信時間</span>
            <strong v-if="detail && detail.withdrawStatus === 1">審査中</strong>
            <strong v-if="detail && detail.withdrawStatus === 3">出金失敗</strong>
            <strong v-if="detail && detail.withdrawStatus === 4">キャンセル</strong>
            <strong v-if="detail && detail.withdrawStatus === 5">拒否</strong>
            <strong v-if="detail && detail.withdrawStatus === 2">
              {{detail.updateTime|date('YYYY-MM-DD HH:mm:ss')}}
            </strong>
          </p>
          <p>
            <span class="titleInfo">コイン数量</span>
            <strong v-if="detail">{{detail.withdrawCount}}{{detail.currency}}</strong>
          </p>
          <p>
            <span class="titleInfo">引出し手数料</span>
            <strong v-if="detail">{{detail.fees}}{{detail.currency}}</strong>
          </p>
          <p>
            <span class="titleInfo">ウォレット</span>
            <strong v-if="detail">{{detail.address}}</strong>
            <span class="address-copy"
                  v-if="detail"
                  v-clipboard:copy="detail.address"
                  v-clipboard:success="onCopy">コピー</span>
          </p>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="popover-right">
          <canvas id="canvas" class="img-code"></canvas>
          <div>ウォレットQR</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import QRCode from 'qrcode';
  import AccountApi from "../services/account-api";
  import errorHandler from '../services/error-handler';

  export default {
    name: 'x-account-detail-dialog',
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
            this.createCode(res.address);
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
          title: 'コピーしました',
          type: 'success',
          duration: '1000',
          showClose: false
        });
      }
    }

  };
</script>

<style scoped lang="scss">
  .popover-box {
    width: 562px;
    height: 220px;
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

  .titleInfo {
    width: 100px;
    display: inline-block;
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
    display: inline-block;
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
    width: 120px !important;
    height: 120px !important;
    position: relative;
    margin-top: -15px;
  }
</style>
