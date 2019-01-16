<template>
    <div class="finance">
        <div class="page-title">
            <p class="txt">财务记录</p>
        </div>
        <div class="finance-list">
            <el-tabs v-model="activeName" class="cloud-list-tab" @tab-click="tabClick(activeName)">
                <el-tab-pane label="全部记录" name="first">
                    <el-table :data="formData" style="width: 100%" class="common-table">
                        <el-table-column label="日期">
                            <template slot-scope="scope">
                                {{scope.row.createdAt | date('YYYY-MM-DD')}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="coinName" label="币种"></el-table-column>
                        <el-table-column prop="ioType" label="类型"></el-table-column>
                        <el-table-column prop="operateAmount" label="数量"></el-table-column>
                        <el-table-column prop="status" label="状态"></el-table-column>
                    </el-table>
                    <el-pagination class="finance-pagination" background
                                   layout="prev, pager, next"
                                   @current-change="handleCurrentChange"
                                   :current-page="page_size"
                                   :page-size="page_num"
                                   :total="allFinanceCount"
                                   v-if="allFinanceCount">
                    </el-pagination>
                    <div class="finance-select">
                        <el-select v-model="value">
                            <el-option key="1" label="全部" value="全部"
                                       @click.native="chooseCurrency('','',1)"></el-option>
                            <el-option v-for="item,index in ownerAllCoins"
                                       :label="item.coinAbbreviation | uppercase"
                                       :value="item.coinAbbreviation"
                                       :key="index+2"
                                       @click.native="chooseCurrency('',item.id,1)">
                            </el-option>
                        </el-select>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="充币记录" name="second">
                    <el-table :data="formData" style="width: 100%" class="common-table">
                        <el-table-column label="日期">
                            <template slot-scope="scope">
                                {{scope.row.createdAt | date('YYYY-MM-DD')}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="coinName" label="币种"></el-table-column>
                        <el-table-column prop="ioType" label="类型"></el-table-column>
                        finance
                        <el-table-column prop="operateAmount" label="数量"></el-table-column>
                        <el-table-column prop="status" label="状态"></el-table-column>
                    </el-table>
                    <el-pagination class="finance-pagination" background
                                   layout="prev, pager, next"
                                   @current-change="handleCurrentChange2"
                                   :current-page="page_size"
                                   :page-size="page_num"
                                   :total="allFinanceCount"
                                   v-if="allFinanceCount">
                    </el-pagination>
                    <div class="finance-select">
                        <el-select v-model="value">
                            <el-option key="1" label="全部" value="全部" @click.native="chooseCurrency(1,'',1)"></el-option>
                            <el-option v-for="item,index in ownerAllCoins"
                                       :label="item.coinAbbreviation | uppercase"
                                       :value="item.coinAbbreviation"
                                       :key="index+2"
                                       @click.native="chooseCurrency(1,item.id,1)">
                            </el-option>
                        </el-select>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="提币记录" name="third">
                    <el-table :data="formData" style="width: 100%" class="common-table">
                        <el-table-column label="日期">
                            <template slot-scope="scope">
                                {{scope.row.createdAt | date('YYYY-MM-DD')}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="coinName" label="币种"></el-table-column>
                        <el-table-column prop="ioType" label="类型"></el-table-column>
                        finance
                        <el-table-column prop="operateAmount" label="数量"></el-table-column>
                        <el-table-column prop="status" label="状态"></el-table-column>
                    </el-table>
                    <el-pagination class="finance-pagination" background
                                   layout="prev, pager, next"
                                   @current-change="handleCurrentChange3"
                                   :current-page="page_size"
                                   :page-size="page_num"
                                   :total="allFinanceCount"
                                   v-if="allFinanceCount">
                    </el-pagination>
                    <div class="finance-select">
                        <el-select v-model="value">
                            <el-option key="1" label="全部" value="全部" @click.native="chooseCurrency(2,'',1)"></el-option>
                            <el-option v-for="item,index in ownerAllCoins"
                                       :label="item.coinAbbreviation | uppercase"
                                       :value="item.coinAbbreviation"
                                       :key="index+2"
                                       @click.native="chooseCurrency(2,item.id,1)">
                            </el-option>
                        </el-select>
                    </div>
                </el-tab-pane>
            </el-tabs>

        </div>
    </div>
</template>

<script>

export default {
  name: 'finance',
  data() {
    return {
      activeName: 'first',
      value: '全部',
      formData: [{
        createdAt: '', //日期
        coinName: '',
        ioType: '', //1 转入 2 转出
        operateAmount: '', //数量
        status: '' //1 冻结中  2 已完成
      }], //表格数据
      allFinanceCount: '', //获取全部财务记录
      allFinanceData: [], //获取全部财务记录数据
      ownerAllCoins: [],//获取全部币种信息
      page_num: 7, //每页显示的数据
      page_size: 1, //当前页数
      type: this.getType,
      currentCoinId: ''
    };
  },
  methods: {
    //切换tab重新获取数据
    tabClick(type) {
      this.value = '全部';
      this.page_size = 1;
      this.currentCoinId = '';
      if (type === 'first') {
        this.getAccountBalanceDetail('', '', 1);
      } else if (type === 'second') {
        this.getAccountBalanceDetail(1, '', 1);
      } else {
        this.getAccountBalanceDetail(2, '', 1);
      }
    },
    //获取所有币种数据
    getOwnerAllCoin() {
      let vm = this;
      getajaxdata(API.getOwnerAllCoins, 'GET', '', 'JSON', function (res) {
        if (res.code == '1000') {
          vm.ownerAllCoins = res.data;
          // console.log(res.data);
          vm.getAccountBalanceDetail('', '', 1);
        }
      }, this)
    },
    //获取财务记录数据
    getAccountBalanceDetail(type, id, num) {
      let _params = {
        type: type || '',
        coinId: id || '',
        page_num: num,
        page_size: 7
      };
      let vm = this;
      getajaxdata(API.getAllAccountCoinBalancesDetail, 'GET', _params, 'JSON', function (res) {
        if (res.code == '1000') {
          vm.allFinanceData = res.data;
          vm.allFinanceCount = res.count;
          // console.log(res)
          vm.setFormDate()
        }
      }, this)
    },
    //获取表格数据
    setFormDate() {
      let myData = [];
      let _data = this.allFinanceData;
      let _coinData = this.ownerAllCoins;
      for (let i = 0; i < _data.length; i++) {
        let obj = {};
        obj.createdAt = _data[i].createdAt;
        obj.ioType = _data[i].ioType;
        obj.operateAmount = _data[i].operateAmount;
        //判断状态
        if (_data[i].status === 1) {
          obj.status = '冻结中'
        } else {
          obj.status = '已完成'
        }
        //判断转入或转出
        if (_data[i].ioType === 1) {
          obj.ioType = '转入'
        } else {
          obj.ioType = '转出'
        }
        //判断货币名称
        for (let j = 0; j < _coinData.length; j++) {
          if (_data[i].coinId === _coinData[j].id) {
            obj.coinName = _coinData[j].coinAbbreviation.toUpperCase();
          }
        }
        ;
        myData[i] = obj;
      }
      this.formData = myData;
    },
    //分页器选择页数
    handleCurrentChange(currentPage) {
      this.page_size = currentPage;
      this.getAccountBalanceDetail('', this.currentCoinId, currentPage);
    },
    handleCurrentChange2(currentPage) {
      this.page_size = currentPage;
      this.getAccountBalanceDetail(1, this.currentCoinId, currentPage);
    },
    handleCurrentChange3(currentPage) {
      this.page_size = currentPage;
      this.getAccountBalanceDetail(2, this.currentCoinId, currentPage);
    },
    //表格筛选
    chooseCurrency(type, id, num) {
      this.page_size = 1;
      this.currentCoinId = id;
      this.getAccountBalanceDetail(type, id, num);
    }
  },
  mounted() {
    this.getOwnerAllCoin();
  },
  filters: {
    uppercase: function (text) {
      return text.toUpperCase()
    }
  }
}
</script>

<style scoped lang="scss">
    @import "../../../static/css/public.scss";

    .finance {
        @include center-page-title;
        .page-title {
            border: none;
        }
        .finance-list {
            position: relative;
            margin: 3px 30px 0;
            .finance-pagination {
                margin: 40px auto 10px;
            }
        }
        .finance-select {
            position: absolute;
            top: -70px;
            right: 0;
        }
    }

</style>