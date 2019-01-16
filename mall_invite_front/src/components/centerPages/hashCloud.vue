<template>
    <div class="hashCloud">
        <div class="page-title">
            <p class="txt">我的云算力</p>
            <p class="tip" @click="$router.push('/center/hash/repertory')">算力明细</p>
        </div>
        <div class="total">
            <div class="item-left">
                <div class="left-wrap">
                    <ul class="carousel carousel-cloud">
                        <li class="carousel-item" v-if="incomeCoinList&&incomeCoinList.length>0"
                            v-for="(item,index) in incomeCoinList" :key="index">
                            <p class="p1">{{item.coinName}}</p>
                            <h3>{{item.holdingAmount}}</h3>
                        </li>
                        <li v-if="incomeCoinList&&incomeCoinList.length==0" class="nodatas">暂无收益</li>
                    </ul>
                </div>
                <div class="arrow-left" v-if=" incomeCoinList.length > 5"
                     @click="moveLeft('.carousel-cloud',incomeCoinList.length)"></div>
                <div class="arrow-right" v-if="incomeCoinList.length > 5"
                     @click="moveRight('.carousel-cloud',incomeCoinList.length)"></div>
            </div>
            <!--<div class="item-right">
                <p class="p1">云算力总收益（元）</p>
                <p class="p2">
                    <span v-if="totalIncome">{{totalIncome}}</span>
                    <span v-else>-</span>
                </p>
            </div>-->
        </div>
        <div class="cloud-list">
            <div class="table-content">
                <router-view :resData="resData" :pageData = "pageData" @currentChangePage="currentChangePageHandle"></router-view>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      token: '',
      moveOnOff: true,
      pageData: {
        page: 1,
        size: 6,
        total: 0
      },
      incomeCoinList: [],
      totalIncome: '', //云算力总收益
      resData:{}, //hashTable要用到的数据
    };
  },
  methods: {
    moveLeft(name, len) {
      if ($(name).position().left > (5 - len) * 170 && this.moveOnOff) {
        this.moveOnOff = false;
        let that = this;
        $(name).stop().animate({left: $(name).position().left - 170}, 600, function () {
          that.moveOnOff = true;
        })
      }
    },
    moveRight(name, len) {
      if ($(name).position().left < 0 && this.moveOnOff) {
        this.moveOnOff = false;
        let that = this;
        $(name).stop().animate({left: $(name).position().left + 170}, 600, function () {
          that.moveOnOff = true;
        })
      }
    },
    getComputingGainDatas() {
      let arr = {
        page_num: this.pageData.page,
        page_size: this.pageData.size
      };
      let vm = this;
      getajaxdata(API.getComputingGain, 'POST', arr, 'JSON', function (res) {
        if (res.code == '1000') {
          vm.incomeCoinList = res.data.incomeCoinList;
          vm.resData=res.data; //hashTable要用到的数据
          // console.log(res)
          vm.pageData.total = res.count;
        }
      }, this)
    },
    currentChangePageHandle(page){
        this.pageData.page=page;
        this.getComputingGainDatas();
    }
  },
  mounted() {
    this.getComputingGainDatas();
  }

}
</script>

<style scoped lang="scss">
    @import "../../../static/css/public.scss";

    .hashCloud {
        @include center-page-title;
        .total {
            border-radius: 4px;
            margin: 30px;
            height: 124px;
            border: 1px solid #F0F0F0;
            @include clearfix;
        }
        .item-left {
            float: left;
            position: relative;
            width: 853px;
            margin: 24px 58px;
            height: 76px;
            .left-wrap {
                position: relative;
                width: 100%;
                height: 76px;
                overflow: hidden;
                .carousel {
                    position: absolute;
                    top: 0;
                    left: 0;
                    display: inline;
                    height: 76px;
                    white-space: nowrap;
                }
            }
            .carousel-item {
                display: inline-block;
                width: 126px;
                height: 44px;
                padding: 16px 18px;
                margin-right: 8px;
                text-align: left;
                background-image: linear-gradient(-180deg, #F5F6FA 0%, rgba(251, 251, 253, 0.60) 100%);
                .p1 {
                    font-size: 14px;
                    color: #2F2F2F;
                    text-align: left;
                    line-height: 16px;
                }
                h3 {
                    padding-top: 9px;
                    font-size: 18px;
                    color: #2F2F2F;
                    text-align: left;
                    line-height: 20px;
                    font-weight: 800;
                }
            }
            .nodatas {
                width: 853px;
                height: 76px;
                line-height: 76px;
                text-align: center;
                color: #909399;
                font-size: 14px;
            }
            .arrow-left, .arrow-right {
                width: 28px;
                height: 28px;
                cursor: pointer;
            }
            .arrow-left {
                position: absolute;
                top: 26px;
                left: -40px;
                background: url('../../assets/centerImage/left-Button_normal.png') 50% 50% no-repeat;
                background-size: 28px 28px;
                &:hover {
                    background: url('../../assets/centerImage/left-Button_pressed.png') 50% 50% no-repeat;
                    background-size: 28px 28px;
                }
            }
            .arrow-right {
                position: absolute;
                top: 26px;
                right: -40px;
                background: url('../../assets/centerImage/right-Button_normal.png') 50% 50% no-repeat;
                background-size: 28px 28px;
                &:hover {
                    background: url('../../assets/centerImage/right-Button_pressed.png') 50% 50% no-repeat;
                    background-size: 28px 28px;
                }
            }
        }
        .item-right {
            float: right;
            width: 184px;
            padding-left: 32px;
            height: 76px;
            margin-top: 36px;
            border-left: 1px solid #EDEDED;
            text-align: center;
            .p1 {
                font-size: 14px;
                padding-top: 8px;
                color: #666;
                text-align: left;
            }
            .p2 {
                font-size: 24px;
                padding-top: 14px;
                color: #E94C4C;
                text-align: left;
                line-height: 30px;
                font-weight: 800;
            }
        }
        .cloud-list {
            margin: 0 30px;
            .tit {
                @include center-item-tit;
            }
            .table-content {
                width: 100%;
            }
        }
    }
</style>