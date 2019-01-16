<template>
  <div class="recharge">
    <div class="recharge-search">
      <span class="txt">订单编号</span>
      <div class="input-box">
        <el-input placeholder="请输入订单编号" v-model="searchContent2" class="input-with-select"  clearable>
        </el-input>
      </div>
      <div class="time">
        <p class="tit">时间筛选</p>
        <el-date-picker
                class="date-picker"
                v-model="datevalue"
                type="daterange"
                align="right"
                unlink-panels
                range-separator=" - "
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00.000', '23:59:59.000']"
                value-format="yyyy-MM-dd HH:mm:ss"
                :picker-options="pickerOptions">
        </el-date-picker>
      </div>
      <div class="currency">
        <p class="tit">币种筛选</p>
        <div class="currency-filter">
          <currency @filterCurrency="getCurrencyData" ref="currencyComp"></currency>
        </div>
      </div>
      <div class="export-btn" @click="downloadFile">
        <img src="./excel-icon.png"/>
        <p>导出excel</p>
      </div>
    </div>
    <div class="filter">
      <div class="status">
        <div class="tit">状态筛选</div>
        <el-button-group>
          <el-button type="info" plain
                     v-for="item,index in statusBtn"
                     :key="index"
                     :class="{'btnActive':statusBtnActive === index}"
                     @click.native="changeStatusBtnActive(index)">
            {{item}}
          </el-button>
        </el-button-group>
      </div>
      <span class="txt">用户账号</span>
      <div class="input-box">
        <el-input placeholder="请输入用户账号" v-model="searchContent" class="input-with-select"  clearable>
        </el-input>
      </div>
      <el-button type="primary" class="btn" @click="filterData">确定</el-button>
      <el-button type="primary" class="btn" style="margin-left:6px;" plain @click="resetData">重置</el-button>
    </div>
    <el-table
            highlight-current-row
            :data="withdrawTable"
            class="recharge-table1"
            :cell-class-name="getCellClass"
            style="width: 100%;padding:16px 24px;">
      <el-table-column
              prop="id"
              label="订单编号"
              min-width="115">
      </el-table-column>
      <el-table-column
              prop="userMobile"
              label="用户账号"
              min-width="80">
      </el-table-column>
      <el-table-column
              prop="operateAmount"
              label="金额"
              min-width="60">
      </el-table-column>
      <el-table-column
              prop="coinAbbreviation"
              label="币种"
              min-width="50">
      </el-table-column>
      <el-table-column
              prop="realityGasCharge"
              label="实际手续费"
              min-width="70">
      </el-table-column>
      <el-table-column
              prop="gasCharge"
              label="扣除手续费"
              min-width="70">
      </el-table-column>
      <el-table-column
              prop="status"
              label="状态"
              min-width="60">
      </el-table-column>
      <el-table-column
              prop="createTime"
              label="订单生成时间"
              min-width="105">
      </el-table-column>
      <el-table-column
              label="操作">
              <template slot-scope="scope">
                <p style= "color:#003d96;cursor:pointer;" @click="handleDetail(scope.$index, scope.row)">查看详情</p>
              </template>
      </el-table-column>
    </el-table>
    <div class="pagination-box">
      <el-pagination
              class="recharge-pagination"
              background
              @current-change="handleCurrentChange"
              :current-page="paramsData.page"
              :page-size="paramsData.pagesize"
              :total="totalSize"
              layout="prev, pager, next, jumper"
              v-if="totalSize>paramsData.pagesize">
      </el-pagination>
      <div class="pagination-tail" v-if="totalSize>paramsData.pagesize">，共{{Math.ceil(totalSize/paramsData.pagesize)}}页</div>
    </div>
  </div>
</template>

<script>
  import util from '@/libs/util.js'
import Currency from '../../../../../components/currency/currency'
export default {
    components:{
        Currency
    },
    data(){
        return {
          currencyData:[], //从currency组件获取的币种数据
          withdrawTable: [],
          statusBtnActive:0,
          totalSize:'',
          statusBtn:['全部','处理中','异常','成功','失败','审核中','审核未通过'],
          searchContent:'',
          searchContent2:'',
          datevalue:[], //日期选择值
          currencyvalue:'', //币种选择值
          pickerOptions: { //日期选择
            disabledDate(time) {
              return time.getTime() > Date.now() - 8.64e6
            },
            shortcuts: [
            {
                text: '今天',
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    picker.$emit('pick', [start, end]);
                }
            },
            {
                text: '最近7天',
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                }
            },
            {
                text: '最近30天',
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                }
            }]
          },
          paramsData:{
            'coinIds': null,
            'coins':null,
            'endTime': null,
            'page': 1,
            'pagesize': 10,
            'startTime': null,
            'status': null,
            'type': null,
            'typeDetail':null ,
            'userId': null,
            'userMobile': null,
            'id': null
          }
        }
    },
    watch:{
      '$route': {
        handler(val){
          if(val.path === '/order/withdraw' || val.path === '/order/withdraw/'){
            this.getWithdrawList();
          }
        },
        deep:true
      },
      'datevalue': {
        handler(val){
          if(val === '' || !val){
            this.paramsData.startTime = null;
            this.paramsData.endTime = null;
          }
        },
        deep:true
      },
    },
    methods: {
      //获取充值列表
      getWithdrawList(){
        let vm = this;
        this.axiosPOST(vm, vm.$API.API.withdrawLog,
          'application/json',
          vm.paramsData,
          vm.getSuccessCB,
          vm.getErrorCB
        )
      },
      //成功回调
      getSuccessCB(vm,res){
        vm.totalSize = res.count;
        if(!res.data || res.data === ''){
          this.withdrawTable =[];
        } else {
          vm.setWithdrawTable(res.data)
        }
      },
      //失败回调
      getErrorCB(err){
        console.log(err)
      },
      //设置表格数据
      setWithdrawTable(_data){
        let myData = [];
        for (let i = 0; i <_data.length; i++) {
          let obj = {};
          obj.id = _data[i].id; //订单编号
          obj.createTime = _data[i].createTime; //订单生成时间
          obj.operateAmount = _data[i].operateAmount ; //金额
          obj.coinAbbreviation =  _data[i].coinAbbreviation;  //币种
          if(!_data[i].userMobile || _data[i].userMobile === ''){
            obj.userMobile = '-'
          } else {
            obj.userMobile = _data[i].userMobile
          };
          if(_data[i].status === 1){
            obj.status = '处理中'
          } else if(_data[i].status === 2){
            obj.status = '异常'
          } else if(_data[i].status === 3){
            obj.status = '成功'
          } else if(_data[i].status === 4){
            obj.status = '失败'
          } else if(_data[i].status === 5){
            obj.status = '审核中'
          } else if(_data[i].status === 6){
            obj.status = '审核未通过'
          } else {
            obj.status = '其他'
          }
          if(!_data[i].realityGasCharge || _data[i].realityGasCharge === ''){  //实际手续费
            obj.realityGasCharge = 0;
          } else {
            obj.realityGasCharge = _data[i].realityGasCharge;
          }
          if(!_data[i].gasCharge || _data[i].gasCharge === ''){  //扣除手续费
            obj.gasCharge = 0;
          } else {
            obj.gasCharge = _data[i].gasCharge;
          }
          myData[i] = obj;
        }
        this.withdrawTable = myData;
      },
      //获取currency组件的币种数据
      getCurrencyData(params){
        let arr = [];
        for(let i=0;i<params.length;i++){
          arr[i] = params[i].name;
        }
        this.currencyData = arr;
      },
      //分页器
      handleCurrentChange(val) {
        this.paramsData.page = val;
        this.getWithdrawList();
      },
      //筛选数据
      filterData(){
        this.paramsData.page = 1;
        if(this.searchContent === '') {
          this.paramsData.userMobile = null;
        } else {
          this.paramsData.userMobile = this.searchContent;
        }
        if(this.searchContent2 === '') { //订单编号
          this.paramsData.id = null;
        } else {
          this.paramsData.id = this.searchContent2;
        }
        if(this.currencyData === []) {
          this.paramsData.coins = null;
        } else {
          this.paramsData.coins = this.currencyData;
        }
        if(this.statusBtnActive === 0) {
          this.paramsData.status = null
        } else {
          this.paramsData.status = this.statusBtnActive;
        }
        if(this.datevalue && this.datevalue.length > 0) {
          this.paramsData.startTime = this.datevalue[0];
          this.paramsData.endTime = this.datevalue[1];
        }
        this.getWithdrawList();
      },
      //重置按钮
      resetData(){
        this.datevalue = [];
        this.searchContent = '';
        this.searchContent2 = '';
        this.currencyData = [];
        this.statusBtnActive = 0;
        this.paramsData = {
          'coinIds': null,
          'coins':null,
          'endTime': null,
          'page': 1,
          'pagesize': 10,
          'startTime': null,
          'status': null,
          'type': null,
          'typeDetail':null ,
          'userId': null,
          'userMobile': null,
          'id': null
        };
        this.$refs.currencyComp.resetCurrencyData(); //清空currency组件里的数据
        this.getWithdrawList();
      },
      //设置表格数据颜色
      getCellClass({row, column, columnIndex}) { //改变表格中某个单元格字体颜色
            if (columnIndex == 6 && row[column.property].indexOf('审核中') > -1) {
                return 'active-blue'
            } else {
                return ''
            }
        },
      //选择筛选状态
      changeStatusBtnActive(index){
          for(var i=0; i<this.statusBtn.length; i++){
              this.statusBtnActive = index;
          }
        },
      //客服处理和查看详情
      handleDetail(index, row) {
        if(row.status === "审核中" ){
          this.$router.push({path: '/order/withdraw/service', query: {recordId: row.id}})
        }else{
          this.$router.push({path: '/order/withdraw/withdrawDetail', query: {recordId: row.id}})
        }
      },
      //表格下载
      downloadFile(){
        let vm = this;
        this.$nextTick(()=>{
          let token =  util.cookies.get('token');
          vm.$axios({
            method: 'get',
            headers: {
              'Content-Type': 'application/vnd.ms-excel',
              'x-auth-token': token
            },
            url: vm.$API.URL + vm.$API.API.withdrawDownLoad,
            params:{
              token,
              accountOperateRecordVoJson:JSON.stringify(vm.paramsData)
            }
          })
            .then((res)=>{
              if(res.code === '3001'){
                vm.$message.error('登录失效，请重新登录')
                util.cookies.remove('token');
                util.cookies.remove('uuid');
                util.cookies.remove('d2adminMenuAside');
                vm.$router.push({
                  name: 'login'
                })
              } else {
                let url = vm.$API.URL + vm.$API.API.withdrawDownLoad + '?token=' + token + '&accountOperateRecordVoJson='+ JSON.stringify(vm.paramsData);
                window.open(url);
              }
            })
            .catch((err)=>{
              console.log(err)
            })
        })
      }
    },
  mounted(){
    this.getWithdrawList();
  }
}
</script>

<style scoped lang= "scss">
@import '~@/assets/style/public-class.scss';
.recharge {
  width:100%;
  margin:30px auto;
  .recharge-search{
    width:100%;
    margin:0 auto 25px;
    @include clearfix;
    .txt{
      float:left;
      margin-right:20px;
      font-size:14px;
      line-height:40px;
    }
    .input-box {
      float:left;
      width: 248px;
      height: 40px;
      margin:0 30px 0 0;
    }
    .time{
      position:relative;
      float:left;
      text-align:left;
      margin-right:35px;
      .tit{
        line-height:40px;
        font-size:14px;
        display:inline-block;
        margin-right:20px;
      }
    }
    .currency{
      float:left;
      text-align:left;
      margin-right:35px;
      .tit{
        line-height:40px;
        font-size:14px;
        display:inline-block;
        margin-right:20px;
      }
      .currency-filter{
        display:inline-block;
        vertical-align: top;
      }
    }
    .export-btn{
      float:right;
      height:40px;
      cursor:pointer;
      img {
        display:inline-block;
        vertical-align: top;
        width:auto;
        height:28px;
        padding-top:6px;
      }
      p {
        display:inline-block;
        vertical-align:top;
        font-size:14px;
        line-height:40px;
        color:#909399;
        margin:0 0 0 10px;
      }
    }
  }
  .filter{
    width:100%;
    height:40px;
    margin:0 auto 30px;
    @include clearfix;
    .txt{
      float:left;
      margin-right:20px;
      font-size:14px;
      line-height:40px;
    }
    .input-box {
      float:left;
      width: 200px;
      height: 40px;
      margin:0 30px 0 0;
    }
    .status{
      float:left;
      text-align:left;
      margin-right:30px;
      .tit{
        display:inline-block;
        vertical-align:top;
        margin-right:20px;
        line-height:40px;
        font-size:14px;
      }
    }
    .btn{
      float:left;
      width:100px;
      height:40px;
    }
  }
}
</style>