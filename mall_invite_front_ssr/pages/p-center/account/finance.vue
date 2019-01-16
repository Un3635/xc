<template>
  <div class="finance">
    <div class="page-title">
      <p class="txt">财务记录</p>
    </div>
    <div class="finance-list">
      <el-tabs v-model="activeName" class="cloud-list-tab" @tab-click="tabClick(activeName)">
        <el-tab-pane label="充币记录" name="first">
          <el-table :data="formData" style="width: 100%" class="common-table">
            <el-table-column label="日期" width="220">
              <template slot-scope="scope">
                {{scope.row.createdAt}}
              </template>
            </el-table-column>
            <el-table-column prop="coinName" label="币种"></el-table-column>
            <el-table-column prop="ioType" label="类型"></el-table-column>
            <el-table-column prop="operateAmount" label="数量"></el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
          </el-table>
          <el-pagination class="finance-pagination" background
                         layout="prev, pager, next"
                         @current-change="handleCurrentChange1"
                         :current-page="page_size"
                         :page-size="page_num"
                         :total="allFinanceCount"
                         v-if="allFinanceCount">
          </el-pagination>
          <div class="finance-select">
            <el-select v-model="value">
              <el-option key="1" label="全部" value="全部" @click.native="chooseCurrency(1,'',1)"></el-option>
              <el-option v-for="(item,index) in ownerAllCoins"
                         :label="item.coinAbbreviation | uppercase"
                         :value="item.coinAbbreviation"
                         :key="index+2"
                         @click.native="chooseCurrency(1,item.id,1)">
              </el-option>
            </el-select>
          </div>
        </el-tab-pane>
        <el-tab-pane label="提币记录" name="second">
          <el-table :data="formData" style="width: 100%" class="common-table">
            <el-table-column label="日期" width="220">
              <template slot-scope="scope">
                {{scope.row.createdAt}}
              </template>
            </el-table-column>
            <el-table-column prop="coinName" label="币种"></el-table-column>
            <el-table-column prop="ioType" label="类型"></el-table-column>
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
              <el-option key="100" label="全部" value="全部" @click.native="chooseCurrency(2,'',1)"></el-option>
              <el-option v-for="(item,index) in ownerAllCoins"
                         :label="item.coinAbbreviation | uppercase"
                         :value="item.coinAbbreviation"
                         :key="index+101"
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
    breadcrumb() {
      return {
        label: '财务记录',
        pList: [
          {
            path: '/p-center',
            label: '个人中心'
          },
          {
            path: '/p-center/account',
            label: '我的账户'
          }
        ]
      };
    },
    name: 'finance',
    data() {
      return {
        activeName: 'first',
        value: '全部',
        formData: [], //表格数据
        allFinanceCount: '', //获取全部财务记录
        allFinanceData: [], //获取全部财务记录数据
        ownerAllCoins: [],//获取全部币种信息
        page_num: 7, //每页显示的数据
        page_size: 1, //当前页数
        type:1,
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
          this.type=1;
        } else {
          this.type=2;
        }
        this.getAccountBalanceDetail(this.type, '', 1);
      },
      //获取所有币种数据
      getOwnerAllCoin(type,id,num) {
        this.type = type;
        this.currentCoinId = id;
        this.page_size = num;
        let vm = this;
        getajaxdata(API.getOwnerAllCoins, 'GET', {initTimes: new Date().getTime()}, 'JSON', function (res) {
          if (res.code == '1000') {
            vm.ownerAllCoins = res.data;
            vm.getAccountBalanceDetail(vm.type, vm.currentCoinId, vm.page_size);
          }
        });
      },
      //获取财务记录数据
      getAccountBalanceDetail(type, id, num) {
        let _params = {
          type: type,
          coinId: id,
          page_num: num,
          page_size: 7,
          initTimes: new Date().getTime()
        };
        let vm = this;
        getajaxdata(API.getAllAccountCoinBalancesDetail, 'GET', _params, 'JSON', function (res) {
          if (res.code == '1000') {
            vm.allFinanceData = res.data;
            vm.allFinanceCount = res.count;
            // console.log( res.data);
            vm.setFormDate();
          }
        });
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
            obj.status = '冻结中';
          } else if(_data[i].status === 3){
            obj.status = '已拒绝';
          } else if(_data[i].status === 2){
            obj.status = '已完成';
          }
          //判断转入或转出
          if (_data[i].ioType === 1) {
            obj.ioType = '转入';
          } else {
            obj.ioType = '转出';
          }
          //判断货币名称
          for (let j = 0; j < _coinData.length; j++) {
            if (_data[i].coinId === _coinData[j].id) {
              obj.coinName = _coinData[j].coinAbbreviation.toUpperCase();
            }
          };
          myData[i] = obj;
        }
        this.formData = myData;
      },
      //分页器选择页数
      handleCurrentChange1(currentPage) {
        this.page_size = currentPage;
        this.getAccountBalanceDetail(1, this.currentCoinId, currentPage);
      },
      handleCurrentChange2(currentPage) {
        this.page_size = currentPage;
        this.getAccountBalanceDetail(2, this.currentCoinId, currentPage);
      },
      //表格筛选
      chooseCurrency(type, id, num) {
        this.page_size = num;
        this.currentCoinId = id;
        this.type=type;
        this.getAccountBalanceDetail(type, id, num);
      }
    },
    mounted() {
      this.getOwnerAllCoin(1,'',1);
    },
    filters: {
      uppercase: function (text) {
        return text.toUpperCase();
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../../assets/css/public.scss";
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
