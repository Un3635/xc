<template>
  <div class="calc-detail-wrap">
    <div class="title-top"><div>云算力&gt;{{data.goodsName}}</div></div>
    <div class="content-wrap _content">
      <div class="main-wrap">
        <div class="calc-detail">
          <div class="calc-img">
            <img :src="data.goodsImgUrl" :alt="data.goodsName" class="calc-img_">
          </div>
          <div class="calc-content">
            <span class="title">
             {{data.goodsName}}
            </span>
            <div class="item">
              <span class="label">类型</span>
              <span class="info">{{data.powerTypeName}}</span>
            </div>
            <div class="item item_price">
              <span class="label">价格</span>
              <span class="info kefu">咨询客服</span>
            </div>
            <div class="btn" @click="buy">立即购买</div>
          </div>
          
        </div>
        <div class="calc-detail_introduce">
          <ul>
            <li @click.stop=" d_title_Idx = 1" :class="{active: d_title_Idx === 1}">商品详情</li>
            <li @click.stop=" d_title_Idx = 2" :class="{active: d_title_Idx === 2}">矿机参数</li>
          </ul>
          <div class="calc-detail_content">
            <div class="con_innner">
              <div class="d_title_Idx0" v-show="d_title_Idx === 1" v-html ="data.goodsDetails"></div>
              <div class="d_title_Idx1" v-show="d_title_Idx === 2">
                <h1 class="title">蚂蚁S9 13.5T</h1>
                <ul>
                  <li v-for="(item, index) in data.attrs" :key="index" class="list" v-if="params[index]">
                    <!-- <el-row>
                      <el-col :span="8"><div class="grid-content label_title">{{params[index]}}:</div></el-col>
                      <el-col :span="16"><div class="grid-content label_content">{{item}}</div></el-col>
                    </el-row> -->
                    <label for="" class="label_title">{{params[index]}}:</label>
                    <span class="label_content">{{item}}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: '',
      d_title_Idx: 1,
      buyTag: false,
      params: {
        'videoCard': '显卡',
        'ratedPower': '额定算力',
        'powerConsumption': '计算功耗',
        'cpu': 'CPU',
        'ram': '内存',
        'hardDisk': '硬盘',
        'usb': 'USB',
        'networkPort': '网口',
        'ratedVoltage': '额定电压',
        'workingTemperature': '工作温度',
        'workingHumidity': '工作湿度',
        'os': 'OS',
        'cartonSize': '外箱尺寸',
        'netWeight': '净重',
        'warranty': '质保'
      }
    }
  },
  created() {
    getajaxdata(API.goodsDetail, 'POST', {'goods_id': this.$route.query.goodsId}, 'json', (res) => {
      this.data = res.data;
    })
  },
  methods: {
    buy() {
      this.buyTag = true;
      this.$alert('本产品暂时仅支持线下购买，购买请添加<br/>客服微信：17195439140', '联系方式', {
        iconClass: '',
        confirmButtonText: '确定',
        dangerouslyUseHTMLString: true,
        callback: action => {
          // this.$message({
          //   type: 'info',
          //   message: `action: ${ action }`
          // });
          return false;
        }
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.calc-detail-wrap {
  background: #fff;
  padding-bottom: 50px;
  .title-top {
    font-family: MicrosoftYaHei;
    padding: 12px 0px;
    font-size: 12px;
    color: #9B9B9B;
    letter-spacing: 0;
    background: #F5F6FA;
    & > div {
      width: 1200px;
      margin: 0 auto;
    }
  }
  .content-wrap{
    .main-wrap {
      .calc-detail{
        position: relative;
        margin: 50px 0px 80px 0px;
        overflow: hidden;
        .calc-img{
          width: 343px;
          height: 343px;
          float: left;
          background: #F6F6F6;
          border: 1px solid #F5F5F7;
          .calc-img_ {
            width: 236px;
            height: 241px;
            margin: 51px 53px 51px 54px;
          }
        }
        .calc-content{
          margin-left: 40px;
          float: left;
          letter-spacing: 0;
          .title {
            // position:relative;
            font-family: MicrosoftYaHei-Bold;
            display: block;
            width: 720px;
            padding: 23px 0px;
            font-size: 24px;
            color: #2F2F2F;
            border-bottom: 1px solid #F5F5F7;
          }
          .item {
            margin-top: 35px;
            height: 24px;
            line-height: 24px;
            &.item_price {
              margin-top: 42px;
            }
            .label {
              font-family: MicrosoftYaHei;
              margin-right: 54px;
              font-size: 14px;
              color: #9B9B9B;
              vertical-align: bottom;
            }
            .info {
              font-family: MicrosoftYaHei-Bold;
              font-size: 18px;
              color: #2F2F2F;
              &.kefu {
                color: #E94C4C;
              }
            }
          }
          .btn {
            font-family: MicrosoftYaHei-Bold;
            font-size: 18px;
            color: #FFFFFF;
            margin-top: 60px;
            width: 272px;
            height: 54px;
            line-height: 54px;
            background-image: linear-gradient(-153deg, #8557FF 0%, #4D2EEA 95%);
            box-shadow: 0 4px 10px 0 rgba(77,46,234,0.30);
          }
        }
      }
      .calc-detail_introduce{
        & > ul {
          background: #F5F6FA;
          & > li {
            font-family: MicrosoftYaHei;
            display: inline-block;
            width: 130px;
            height: 60px;
            font-size: 18px;
            color: #2F2F2F;
            text-align: center;
            line-height: 60px;
            // transition: all .3s ease-in-out;
            &.active {
              color: #FFFFFF;
              background: #1C1153;
            }
          }
        }
        .calc-detail_content {
          margin-top: 40px;
          background: #F5F6FA;
          .con_innner{
            width: 750px;
            margin: 0 auto;
            &.blur {
              font-family: MicrosoftYaHei;
              font-size: 18px;
              color: #9B9B9B;
              text-align: center;
              line-height: 80px;
            }
            .d_title_Idx0 {
              font-family: MicrosoftYaHei;
              font-size: 14px;
              padding: 15px 0px;
              border-bottom: 1px solid #EDEDED;
              color: #2F2F2F;
            }
            .d_title_Idx1{
              .title {
                font-family: MicrosoftYaHei-Bold;
                padding-top: 45px;
                font-size: 28px;
                color: #2F2F2F;
                text-align: center;
                line-height: 28px;
              }
              & > ul {
                margin-top: 25px;
                .list {
                  font-family: MicrosoftYaHei;
                  font-size: 14px;
                  padding: 15px 0px;
                  border-bottom: 1px solid #EDEDED;
                  .label_title {
                    display: inline-block;
                    width: 20%;
                    color: #9B9B9B;
                    text-align: right;
                    padding-left: 80px;
                    text-align: right;                   
                  }
                  .label_content {
                    color: #2F2F2F;
                    margin-left: 30px;
                  }
                }
              }
            }
          }
        }
      }
    }
   
  }
}
</style>
