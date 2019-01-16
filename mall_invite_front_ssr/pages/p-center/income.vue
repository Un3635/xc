<template>
  <div class="hashIncome">
    <div class="page-title">
      <p class="txt">量化收益</p>
    </div>
    <div class="total">
      <div class="item-left">
        <div v-if="incomeCoinList&&incomeCoinList.length>0" v-cloak>
          <div class="left-wrap">
            <ul class="carousel carousel-total">
              <li class="carousel-item" v-for="(item,index) in incomeCoinList" :key="index">
                <p class="p1">{{item.coinName | uppercase}}</p>
                <h3 :title="item.holdingAmount">{{item.holdingAmount}}</h3>
              </li>
            </ul>
          </div>
          <div class="arrow-left" v-if="incomeCoinList.length>5"
               @click="moveRight('.carousel-total',incomeCoinList.length)"></div>
          <div class="arrow-right" v-if="incomeCoinList.length>5"
               @click="moveLeft('.carousel-total',incomeCoinList.length)"></div>
        </div>
        <div class="nodatas" v-else>暂无收益</div>
      </div>
    </div>
    <div class="income-list">
      <el-tabs v-model="activeName" @tab-click="handleClick(activeName)" class="income-list-tab">
        <el-tab-pane v-for="(item,index) in ownerAllCoins" :label="item.coinAbbreviation | uppercase" :name="item.id"
                     :key="index">
          <el-table :data="quantizationTable" style="width: 100%" class="income-table common-table">
            <el-table-column label="日期">
              <template slot-scope="scope">
                {{scope.row.createTime | date('YYYY-MM-DD')}}
              </template>
            </el-table-column>
            <el-table-column prop="quantitativeAmount" label="量化数量"></el-table-column>
            <el-table-column prop="earnings" label="收益数量"></el-table-column>
            <el-table-column prop="quantifiedRatio" label="量化比例"></el-table-column>
            <el-table-column prop="status" label="状态" width="160"></el-table-column>
          </el-table>
          <el-pagination class="income-pagination" background
                         layout="prev, pager, next"
                         @current-change="handleCurrentChange"
                         :current-page="pageNow"
                         :page-size="pageNum"
                         :total="allQuantizationDetailCount"
                         v-if="allQuantizationDetailCount">
          </el-pagination>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>

  export default {
    breadcrumb() {
      return {
        label: '量化收益',
        pList: [
          {
            path: '/p-center',
            label: '个人中心'
          }
        ]
      };
    },
    data() {
      return {
        activeName: '',
        moveOnOff: true,
        allQuantizationDetailCount: '',//总数
        incomeCoinList: [], //数据1
        quantizationDetailVos: [], //数据2
        quantizationTable: [],
        ownerAllCoins: [],
        pageNow: 1,
        pageNum: 7
      };
    },
    methods: {
      //卡片滑动
      moveLeft(name, len) {
        if ($(name).position().left > (5 - len) * 168 && this.moveOnOff) {
          this.moveOnOff = false;
          let that = this;
          $(name).stop().animate({left: $(name).position().left - 168}, 600, function () {
            that.moveOnOff = true;
          });
        }
      },
      moveRight(name, len) {
        if ($(name).position().left < 0 && this.moveOnOff) {
          this.moveOnOff = false;
          let that = this;
          $(name).stop().animate({left: $(name).position().left + 168}, 600, function () {
            that.moveOnOff = true;
          });
        }
      },
      //切换tab重新获取数据
      handleClick(active) {
        this.pageNow = 1;
        this.getQuantizationData(active, this.pageNow);
      },
      //获取所有币种数据
      getOwnerAllCoins() {
        let vm = this;
        getajaxdata(API.getOwnerAllCoins, 'GET', {initTimes: new Date().getTime()}, 'JSON', function (res) {
          if (res.code == '1000') {
            vm.ownerAllCoins = res.data;
            if (vm.ownerAllCoins && vm.ownerAllCoins.length > 0) {
              vm.activeName = vm.ownerAllCoins[0].id;
            }else{
              vm.activeName = '';
            }
            vm.getQuantizationData(vm.activeName, 1)
          }
        }, this);
      },
      //获取量化收益数据
      getQuantizationData(id, num) {
        let _params = {
          coinId: id || '',
          page_num: num || '',
          page_size: 7,
          initTimes: new Date().getTime()
        };
        let vm = this;
        getajaxdata(API.getQuantizationDetail, 'GET', _params, 'JSON', function (res) {
          if (res.code == '1000') {
            vm.allQuantizationDetailCount = res.count;
            vm.incomeCoinList = res.data.incomeCoinList;
            vm.quantizationDetailVos = res.data.quantizationDetailVos || [];
            vm.setQuantizationFormData();
          }
        }, this);
      },
      //获取表格数据
      setQuantizationFormData() {
        let myData = [];
        let _data = this.quantizationDetailVos;
        for (let i = 0; i < _data.length; i++) {
          let obj = {};
          obj.createTime = _data[i].createTime;
          obj.quantitativeAmount = _data[i].quantitativeAmount;
          obj.earnings = _data[i].earnings;
          obj.quantifiedRatio = _data[i].quantifiedRatio;
          obj.status = _data[i].status;
          //判断状态
          if (_data[i].status === 0) {
            obj.status = '启用';
          } else {
            obj.status = '禁用';
          }
          myData[i] = obj;
        }
        this.quantizationTable = myData;
      },
      //分页器选择页数
      handleCurrentChange(currentPage) {
        this.pageNow = currentPage;
        this.getQuantizationData(this.activeName, currentPage);
      }
    },
    filters: {
      uppercase: function (text) {
        return text.toUpperCase();
      }
    },
    mounted() {
      this.getOwnerAllCoins();
    }
  };
</script>

<style scoped lang="scss">
  @import "../../assets/css/public.scss";

  .nodatas {
    font-size: 14px;
    text-align: center;
    color: #5F5F5F;
  }

  .hashIncome {
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
    width: 848px;
    margin: 24px 0 24px 24px;
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
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
  }

  }
  .nodatas-quantity {
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
    right: -40px;
    background: url('../../assets/image/centerImage/left-Button_normal.png') 50% 50% no-repeat;
    background-size: 28px 28px;

  &:hover {
    background: url('../../assets/image/centerImage/left-Button_pressed.png') 50% 50% no-repeat;
    background-size: 28px 28px;
  }

  }
  .arrow-right {
    position: absolute;
    top: 26px;
    right: -77px;
    background: url('../../assets/image/centerImage/right-Button_normal.png') 50% 50% no-repeat;
    background-size: 28px 28px;

  &:hover {
    background: url('../../assets/image/centerImage/right-Button_pressed.png') 50% 50% no-repeat;
    background-size: 28px 28px;
  }

  }
  }
  .item-right {
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
  .income-list {
    margin: 0 30px;

  .income-pagination {
    margin: 41px auto 16px;
  }

  }
  }
</style>
