<template>
  <div class="approval">
    <section class="approval-info">
      <header>
        <div class="approval-company-info">
          <h3>审批</h3>
          <el-row :gutter="10">
            <el-col :span="10">
              <p><span>企业：</span>{{approvalOrderInfo.applyCompanyName}}</p>
            </el-col>
            <el-col :span="7">
              <p><span>联系人：</span>{{approvalOrderInfo.applicant}}</p>
            </el-col>
            <el-col :span="7">
              <p><span>联系方式：</span>{{approvalOrderInfo.applicantPhone}}</p>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="10">
              <p><span>订单号：</span>{{approvalOrderInfo.orderNo}}</p>
            </el-col>
            <el-col :span="7">
              <p><span>下单时间：</span>{{approvalOrderInfo.orderTime | date('YYYY-MM-DD')}}</p>
            </el-col>
            <el-col :span="7">
              <p><span>审批状态：</span>{{approvalOrderInfo.approvalStatus | approvalStatus}}</p>
            </el-col>
          </el-row>
          <div class="status-seal" v-if="[0,1,2].indexOf(approvalOrderInfo.approvalStatus) != -1"
               :class="{'wait': approvalOrderInfo.approvalStatus == 0 ,'success': approvalOrderInfo.approvalStatus == 1,'fail': approvalOrderInfo.approvalStatus == 2}">
            <span v-html="approvalStatusHtml"></span>
          </div>
        </div>
        <div class="approver" v-if="approvalOrderInfo.recordProcessList">
          <h3>审批人</h3>
          <ul class="clearfix">
            <li class="fl" v-for="item in approvalOrderInfo.recordProcessList" :key="item.no">
              <div class="result"
                   :class="{'wait':item.approvalResult == 0,'success':item.approvalResult == 1,'fail':item.approvalResult == 2}">
                {{item.approvalResult | approvalStatus}}
              </div>
              <p>{{item.userName}}</p>
              <time v-if="item.approvalTime">{{item.approvalTime | date('YYYY-MM-DD HH:mm')}}</time>
            </li>
          </ul>
        </div>
      </header>
      <div class="product">
        <div class="product-header">
          <el-row :gutter="20">
            <el-col :span="8">
              机器详情
            </el-col>
            <el-col :span="4">
              租凭方式
            </el-col>
            <el-col :span="2">
              数量
            </el-col>
            <el-col :span="2">
              租期
            </el-col>
            <el-col :span="4">
              押金／台
            </el-col>
            <el-col :span="4">
              租金／月
            </el-col>
          </el-row>
        </div>
        <div class="product-list">
          <el-row :gutter="20" v-for="product,index in approvalOrderInfo.approvalGoodsList" :key="index">
            <el-col :span="8">
              <div class="clearfix pruduct-name">
                <img :src="product.goodsImgUrl" :alt="product.goodsName" class="fl">
                <p class="fl">{{product.goodsName + ' ' + product.skuName}}</p>
              </div>
            </el-col>
            <el-col :span="4">
              <p>
                <span class="texts">{{product.rentTypeName}}</span>
                <el-tooltip placement="bottom" v-if="hintTextFlag" v-cloak>
                  <div slot="content">{{product.rentTypeRemark}}</div>
                  <span class="img right_img"><img src="../../assets/images/m_why.png" alt=""></span>
                </el-tooltip>
              </p>
            </el-col>
            <el-col :span="2">
              <p>{{product.goodsCount}}</p>
            </el-col>
            <el-col :span="2">
              <p>{{product.orderLease}}</p>
            </el-col>
            <el-col :span="4">
              <p>{{product.orderDeposit + '元'}}</p>
            </el-col>
            <el-col :span="4">
              <p style="color: #FD7220">{{product.orderMonthPrice + '元'}}</p>
            </el-col>
          </el-row>
        </div>
        <div class="order-info">
          <div class="clearfix">
            <strong class="fr">￥{{approvalOrderInfo.orderTotalPrice}}</strong>
            <span class="fr">应付款总金额</span>
          </div>
          <div class="clearfix">
            <strong class="fr">￥{{approvalOrderInfo.rentAmount}}</strong>
            <span class="fr">首付租金</span>
          </div>
          <div class="clearfix">
            <strong class="fr">￥{{approvalOrderInfo.orderTotalDeposit}}</strong>
            <span class="fr">机器押金</span>
          </div>
          <div class="clearfix">
            <strong class="fr">￥{{approvalOrderInfo.freeDeposit ? ('-' + approvalOrderInfo.freeDeposit) : '0'}}</strong>
            <span class="fr">企业免押额度</span>
          </div>
          <div class="clearfix">
            <strong class="total-price fr">￥{{approvalOrderInfo.actualTotalPrice}}</strong>
            <span class="fr">还需支付金额</span>
          </div>
        </div>
        <div class="address-info">
          <div class="clearfix"><span class="fl">收货地址</span>
            <p class="fl">{{approvalOrderInfo.orderAddress}}<span
              class="name">{{approvalOrderInfo.applicant}}</span>{{approvalOrderInfo.applicantPhone}}</p></div>
        </div>
        <div class="address-info">
          <div class="clearfix">
            <span class="fl">备注</span>
            <p class="fl">{{approvalOrderInfo.remark || '无'}}</p>
          </div>
        </div>
        <div class="enclosure" id="orderAudit">
          <h4 v-if="approvalOrderInfo.fileList && approvalOrderInfo.fileList.length != 0">附件</h4>
          <el-row :gutter="80" v-if="approvalOrderInfo.fileList && approvalOrderInfo.fileList.length != 0">
            <el-col :span="8" v-for="file in approvalOrderInfo.fileList" :key="file.id">
              <div v-if="file.type == 1">
                <div class="img">
                  <img class="cursons" :src="file.fileUrl" :alt="file.fileName" @click="openThisImg">
                </div>
                <p>{{file.fileName}}</p>
                <time>上传时间 {{file.fileTime}}</time>
              </div>
              <div v-else-if="file.type == 2" class="par-no-click">
                <a :href="file.fileUrl" :download="file.fileName">
                  <div class="pdf">
                    <img src="../../assets/images/pdf.png" alt="">
                    <p>pdf文件请点击下载</p>
                  </div>
                  <p>{{file.fileName}}</p>
                  <time>上传时间 {{file.fileTime}}</time>
                </a>
              </div>
              <div v-else-if="file.type == 3" class="par-no-click">
                <a :href="file.fileUrl" :download="file.fileName">
                  <div class="zip">
                    <img src="../../assets/images/zip.png" alt="">
                    <p>压缩文件请点击下载</p>
                  </div>
                  <p>{{file.fileName}}</p>
                  <time>上传时间 {{file.fileTime}}</time>
                </a>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        exaId: '',
        colorArr: ['#58b0e8', '#e87658', '#77c434', '#be54dc'],
        approvalOrderInfo: {
          //企业
          applyCompanyName: '',
          //联系人
          applicant: '',
          //联系方式
          applicantPhone: '',
          orderNo: '',
          orderTime: '',
          //订单状态:1.待审核2.待出库3.待收货4.租赁中5.已取消6.待退回7.已退回8.待确认9.租赁完成10.已关闭
          orderStatus: 1,
          //审批状态:0:待审核;1:通过;2:拒绝
          approvalStatus: 0,
          //审核流程列表
          recordProcessList: [],
          //子订单商品列表
          approvalGoodsList: [],
          //还需支付金额
          actualTotalPrice: 0,
          //应付款总金额
          orderTotalPrice: 0,
          //首付租金
          rentAmount: 0,
          //机器押金
          orderTotalDeposit: 0,
          //企业免押额度
          freeDeposit: 0,
          //订单收货地址
          orderAddress: '',
          remark: '',
          //申请人
          applicant: '',
          applicantPhone: '',
          //订单附件列表
          fileList: [],
          //审批记录
          recordList: [],

        },
        //1:通过 2:不通过
        isPass: 1,
        approvalDialog: false,
        approvalText: '通过',
        token: '',
        approvalStatusHtml: '等待<br>审批',
        hintTextFlag: true,
        leaseholdTypeName: '',
        remark: '',
        errorInfo: '',
        showErrorInfo: false,
        isLoading: false
      };
    },
    mounted() {
      this.token = localStorage.getItem('xckz_mall');
      if (this.$route.query.id && !this.$route.query.orderNo) {
        this.exaId = this.$route.query.id;
        this.getDetail(this.exaId, '/approval/approvalDetail', 'id');
      } else if (!this.$route.query.id && this.$route.query.orderNo) {
        this.exaId = this.$route.query.orderNo;
        this.getDetail(this.exaId, '/approval/checkApproval', 'orderNo');
      }
    },
    filters: {
      orderStatus(status) {
        //1.待审核2.待出库3.待收货4.租赁中5.已取消6.待退回7.已退回8.待确认9.租赁完成10.已关闭 ,
        switch (Number(status)) {
          case 1:
            return '待审核';
          case 2:
            return '待出库';
          case 3:
            return '待收货';
          case 4:
            return '租赁中';
          case 5:
            return '已取消';
          case 6:
            return '待退回';
          case 7:
            return '已退回';
          case 8:
            return '待确认';
          case 9:
            return '租赁完成';
          case 10:
            return '已关闭';
          default:
            return '未知';
        }
      },
      approvalStatus(status) {
        //0.待审 1.同意 2.拒绝 ,
        switch (Number(status)) {
          case 0:
            return '待审批';
          case 1:
            return '已同意';
          case 2:
            return '已拒绝';
          default:
            return '未知';
        }
      }
    },
    methods: {
      openThisImg() {
        var viewer = new Viewer(document.getElementById('orderAudit'), {
          scalable: false,
          navbar: false
        });
      },
      approval() {
        this.isLoading = true;
        let params = {
          token: this.token,
          id: this.exaId,
          approvalStatus: this.isPass,
          remark: this.remark,
          t: new Date()
        };
        this.$http.post('/approval/approval', params).then(res => {
          this.$router.push('/approvalManage');
          this.isLoading = false;
          if (res.data.code == 1000) {
            this.approvalDialog = false;
            this.$message({
              type: 'success',
              message: '审批成功!'
            });
          } else {
            this.$message({
              type: 'warning',
              message: res.data.msg
            });
          }
        })
      },
      getDetail(id, url, par) {
        let params = {};
        if (par === 'id') {
          params['token'] = this.token;
          params['id'] = id
        } else if (par === 'orderNo') {
          params['token'] = this.token;
          params['orderNo'] = id
        }
        params['t'] = new Date().getTime();
        this.$http(url, {params: params}).then(res => {
          if (res.data.code == 1000) {
            if (res.data.data && res.data.data.fileList && res.data.data.fileList.length != 0) {
              res.data.data.fileList.forEach(item => {
                let index = item.fileName.lastIndexOf('.');
                let type = item.fileName.substring(index + 1);
                if (/^png|jpg|jpeg$/i.test(type)) {
                  item.type = 1;
                } else if (/^pdf$/i.test(type)) {
                  item.type = 2;
                } else if (/^zip|rar$/i.test(type)) {
                  item.type = 3;
                }
              })
            }
            this.approvalOrderInfo = res.data.data;
            if (this.approvalOrderInfo.approvalStatus == 0) {
              this.approvalStatusHtml = '等待<br>审批';
            } else if (this.approvalOrderInfo.approvalStatus == 1) {
              this.approvalStatusHtml = '申请<br>成功';
            } else if (this.approvalOrderInfo.approvalStatus == 2) {
              this.approvalStatusHtml = '申请<br>拒绝';
            }
          } else {
            this.$message({
              type: 'warning',
              message: res.data.msg
            });
          }
        })
      },
    }
  }
</script>
<style lang="scss" scoped>
  .par-no-click {
    position: relative;
    a::before {
      display: inline-block;
      content: '';
      width: 150px;
      height: 136px;
      position: absolute;
      left: 50%;
      margin-left: -75px;
      z-index: 2;
      top: 0;
    }
  }

  .cursons {
    cursor: pointer;
  }

  .approval {
    background: #f5f5f5;
    min-height: 100%;
    overflow: hidden;
    section {
      border-radius: 8px;
      background: #fff;
      overflow: hidden;
    }
  }

  .approval-info {
    margin-bottom: 38px;
    > header {
      border-bottom: 1px solid #ececec;
      .approval-company-info {
        padding: 0 90px 0 20px;
        position: relative;
      }
      h3 {
        font-size: 18px;
        color: #000000;
        padding: 17px 0 29px;
      }
      .el-row {
        padding-bottom: 40px;
        font-size: 16px;
        span {
          color: #999999;
        }
        p {
          color: #151515;
          white-space: nowrap;
          max-width: 100%;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
      .approver {
        h3 {
          padding: 0 20px 27px;
        }
        ul {
          padding: 30px;
        }
        li {
          margin-bottom: 20px;
          text-align: center;
          width: 160px;
          margin-right: 20px;
          font-size: 18px;
          position: relative;
          .result {
            width: 60px;
            height: 60px;
            background: #6FCC66;
            border-radius: 50%;
            line-height: 60px;
            color: #FFF;
            font-size: 16px;
            margin: 0 auto 30px;
            &.wait {
              background: #76B4FF;
            }
            &.success {
              background: #6ECC66;
            }
            &.fail {
              background: #FF2A2A;
            }
          }
          p {
            margin-bottom: 10px;
          }
          time {
            color: #999;
            line-height: 25px;
            font-size: 16px;
          }
          &:after {
            content: '';
            position: absolute;
            width: 50px;
            height: 50px;
            right: -36px;
            top: 5px;
            background: url("../../assets/images/right-arrow.png") no-repeat center;
          }
          &:last-child {
            margin-right: 0;
            &:after {
              display: none;
            }
          }
        }
      }
    }
    .status-seal {
      position: absolute;
      right: 30px;
      bottom: 14px;
      width: 96px;
      text-align: center;
      height: 96px;
      transform: rotate(-20deg);
      z-index: 2;
      span {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        line-height: 24px;
      }
      &:after {
        content: '';
        width: 90px;
        height: 90px;
        position: absolute;
        left: 2px;
        top: 2px;
        border-radius: 50%;
      }
      &.success {
        border: 2px solid #6ECC66;
        border-radius: 50%;
        color: #6ECC66;
        &:after {
          border: 1px solid #6ECC66;
        }
      }
      &.fail {
        border: 2px solid #FF2A2A;
        border-radius: 50%;
        color: #FF2A2A;
        &:after {
          border: 1px solid #FF2A2A;
        }
      }
      &.wait {
        border: 2px solid #5abbff;
        border-radius: 50%;
        color: #5abbff;
        &:after {
          border: 1px solid #5abbff;
        }
      }
    }
    .product {
      .product-header {
        padding: 0 30px;
        border-bottom: 1px solid #ececec;
        text-align: center;
        height: 49px;
        line-height: 49px;
        font-size: 16px;
        color: #333333;
      }
      .product-list {
        padding: 0 30px;
        .icon-way {
          margin-left: 3px;
          margin-top: -3px;
          vertical-align: middle;
        }
        .el-row {
          padding: 10px 0 56px;
          &:last-child {
            padding-bottom: 12px;
          }
        }
        p {
          text-align: center;
          font-size: 14px;
          color: #333;
          line-height: 58px;
        }
        .pruduct-name {
          img {
            width: 78px;
            height: 58px;
            background: #ccc;
            margin-right: 10px;
          }
          p {
            padding-top: 9px;
            text-align: left;
            line-height: 20px;
            width: calc(100% - 88px);
          }
        }
      }
      .order-info {
        background: #F9F9F9;
        border: 1px solid #EEEEEE;
        padding: 25px 40px;
        > div {
          margin-bottom: 12px;
          font-size: 14px;
          strong {
            font-weight: normal;
            color: #151515;
            width: 130px;
          }
          span {
            width: 170px;
            color: #999;
          }
          &:last-child {
            margin-bottom: 0;
          }
          .total-price {
            font-size: 18px;
            color: #FD7220;
            line-height: 20px;
            & ~ span {
              color: #333;
            }
          }
        }
      }
      .address-info {
        border-bottom: 1px solid #eee;
        padding: 24px 74px;
        div {
          margin-bottom: 20px;
          font-size: 16px;
          color: #585858;
          line-height: 1.5em;
          p {
            max-width: calc(100% - 135px);
          }
          &:last-child {
            margin-bottom: 0px;
          }
          span:not(.name) {
            font-size: 18px;
            width: 135px;
          }
          span.name {
            margin: 0 15px 0 35px;
          }
        }
      }
      .remark {
        border-bottom: 1px solid #eee;
        span {
          width: 135px;
          line-height: 32px;
          font-size: 18px;
          color: #585858;
        }
        textarea {
          width: 588px;
          height: 104px;
          padding: 10px;
          line-height: 1.5em;
          font-size: 14px;
          border: 1px solid #ECECEC;
        }
      }
      .enclosure {
        h4 {
          font-size: 18px;
          color: #585858;
          font-weight: normal;
          padding-left: 75px;
          padding-top: 15px;
          line-height: 1em;
        }
        .el-row {
          padding: 0 20px 70px 0;
        }
        .el-col {
          padding-top: 24px;
          text-align: center;
          > div > .img {
            overflow: hidden;
            width: 160px;
            height: 160px;
            display: block;
            margin: 0 auto 27px;
            position: relative;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .pdf, .zip {
            width: 160px;
            height: 160px;
            margin: 0 auto 27px;
            cursor: pointer;
            img {
              width: 136px;
              height: 136px;
              display: block;
              margin: 0 auto;
            }
            p {
              font-size: 16px;
              color: #666666;
            }
          }

          p {
            font-size: 22px;
            color: #999999;
            line-height: 1.5em;
            max-width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          time {
            font-size: 14px;
            color: #999999;
            text-align: center;
            line-height: 30px;
          }
        }
        & > div.clearfix {
          padding: 45px 75px 40px 75px;
          position: relative;
          span {
            width: 135px;
            font-size: 18px;
            color: #585858;
            line-height: 27px;
          }
          div.fl {
            width: 588px;
          }
          .el-radio {
            margin-bottom: 27px;
            line-height: 25px;
            color: #333;
          }
          textarea {
            width: 588px;
            height: 104px;
            padding: 10px;
            line-height: 1.5em;
            font-size: 14px;
            border: 1px solid #ECECEC;
          }
          .err-info {
            position: absolute;
            color: #FF2A2A;
            font-size: 12px;
          }
          .el-button {
            display: block;
            margin: 80px auto 10px;
          }
        }
      }
    }
  }

  .approval-record {
    padding: 21px 75px 0;
    h4 {
      font-size: 18px;
      color: #585858;
      margin-bottom: 42px;
    }
    li {
      position: relative;
      padding-left: 126px;
      font-size: 18px;
      margin-bottom: 42px;
      line-height: 25px;
      .header {
        position: absolute;
        width: 80px;
        line-height: 80px;
        height: 80px;
        border-radius: 50%;
        background: #FFFFFF;
        color: #FFF;
        text-align: center;
        font-size: 30px;
        left: 0;
        top: 0;
      }
      .color-gray {
        color: #999;
      }
      .admin {
        line-height: 26px;
        color: #000;
        .color-gray {
          padding-left: 20px;
        }
      }
      .company-name {
        margin-bottom: 9px;
      }
      .success {
        color: #6FCC66;
      }
      .fail {
        color: #FF2A2A;
      }

    }
  }
</style>
