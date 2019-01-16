<template>
  <div class="fade_pop">
    <transition name="fade" v-if="obj.is_pop">
      <div class="wh">
        <div class="wh_box" style="width: 420px;">
          <div class="pop">
            <div class="charge">
              <div class="fl">{{obj.title}}</div>
              <div class="fr" @click="cancelChargeWithdraw">
                <img src="../../../assets/images/icon_close.png" alt="">
              </div>
            </div>
            <div style="clear: both"></div>
            <div class="frm frm_withdraw">
              <div class="icon">
                <span><i class="el-icon-warning" style="color: #F7BA2A;font-size: 40px"></i></span>
              </div>
              <div class="des">
                <div class="des_one" v-html="obj.content"></div>
              </div>
              <div style="clear: both;"></div>
            </div>
            <div class="line fade_line"></div>
            <div class="subm">
              <span class="btn_successT" @click="iKnow">知道了</span>
            </div>
            <div style="clear: both"></div>
          </div>

        </div>
      </div>

    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'fade_pop',
    props: {
      obj: Object //定义传值的类型<br>  }
    },
    data(){
      return {}
    },
    methods: {
      cancelChargeWithdraw(){
        this.obj.is_pop = false;
      },
      iKnow(){
        this.obj.is_pop = false;
      },
    }
  }
</script>

<style scoped lang="scss">

  .wh {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    background: rgba(0, 0, 0, .4);
    .wh_box {
      position: absolute;
      top: 40%;
      left: 50%;
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);

      .pop {
        padding: 20px 0px 0px;
        background-color: #fff;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        .charge {
          font-size: 16px;
          color: #333333;
          font-weight: bold;
          padding-left: 20px;
          padding-right: 20px;
          .fl {
            float: left;
          }
          .fr {
            float: right;
            width: 15px;
            height: 15px;
            cursor: pointer;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
        .frm {
          padding-left: 20px;
          padding-right: 20px;
          margin-top: 30px;
          position: relative;
          span {
            font-size: 14px;
            color: #333333;
          }
          .ipt {
            background: #FFFFFF;
            border: 1px solid #EEEEEE;
            border-radius: 4px;
            margin-left: 18px;
            width: 306px;
            height: 35px;
            padding-left: 15px;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            &::-webkit-input-placeholder {
              font-size: 14px;
              color: #CCCCCC;
            }
          }
          .tip {
            position: absolute;
            top: 45px;
            left: 100px;
            font-size: 12px;
            color: #FF4949;

          }
        }
        .frm_withdraw {
          .icon {
            float: left;
          }
          .des {
            float: left;
            margin-left: 15px;
            margin-top: 12px;
            .des_one {
              font-size: 16px;
              color: #333333;
            }
            .des_two {
              font-size: 14px;
              color: #999999;
              margin-top: 10px;
            }
          }
        }
        .line {
          margin-top: 46px;
        }
        .fade_line {
          margin-top: 46px !important;
        }
        .subm {
          padding-left: 20px;
          padding-right: 20px;
          /*height: 66px;*/
          /*display: block;*/
          span {
            float: right;
            margin-top: 15px;
            margin-bottom: 15px;
          }
        }
      }
      .pop_withdraw {

      }
    }
  }
</style>
