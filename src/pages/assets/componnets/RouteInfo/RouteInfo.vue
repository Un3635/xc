<template>
  <div class="assets">
    <div class="filter">
      <div class="assets-search">
        <div class="title">用户ID/币种</div>
        <div class="input-box">
          <el-input placeholder="请输入用户ID/币种" v-model="searchContent" class="assets-input"  clearable></el-input>
        </div>
        <div class="title">用户账号</div>
        <div class="input-box">
          <el-input placeholder="请输入用户账号" v-model="userMobile" class="assets-input"  clearable></el-input>
        </div>
      </div>
    </div>
    <div class="filter">
      <el-select v-model="typeValue" placeholder="" class="type-select">
        <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
        </el-option>
      </el-select>
      <div class="title">日期筛选</div>
      <div class="time">
        <el-date-picker
                class="date-picker"
                v-model="datevalue"
                type="daterange"
                align="right"
                unlink-panels
                range-separator=" - "
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00', '23:59:59']"
                value-format="yyyy-MM-dd HH:mm:ss"
                :picker-options="pickerOptions">
        </el-date-picker>
      </div>
      <el-button type="primary" style="margin-left:30px;width:80px;" @click="filterData">确定</el-button>
      <el-button type="primary" style="margin-left:10px;width:80px;" plain @click="resetData">重置</el-button>
    </div>
    <el-table
            highlight-current-row
            :cell-class-name="getCellClass"
            class="assets-table"
            :data="assetsTable"
            style="width:100%;padding:0 24px;">
      <el-table-column fixed prop="id" label="订单编号" min-width="200"></el-table-column>
      <el-table-column prop="userId" label="用户ID" min-width="140"></el-table-column>
      <el-table-column prop="userMobile" label="用户账号" min-width="150"></el-table-column>
      <el-table-column prop="typeDetail" label="类型" min-width="140"></el-table-column>
      <el-table-column prop="coinAbbreviation" label="币种" min-width="110"></el-table-column>
      <el-table-column prop="operateAmount" label="可用变动" min-width="180"></el-table-column>
      <el-table-column prop="availableBalanceBeforeOperate" label="可用变动前" min-width="180"></el-table-column>
      <el-table-column prop="availableBalanceAfterOperate" label="可用变动后" min-width="180"></el-table-column>
      <el-table-column prop="freezeAmount" label="冻结变动" min-width="180"></el-table-column>
      <el-table-column prop="blockedBalanceBeforeOperate" label="冻结变动前" min-width="180"></el-table-column>
      <el-table-column prop="blockedBalanceAfterOperate" label="冻结变动后" min-width="180"></el-table-column>
      <el-table-column prop="createTime" label="生成时间" min-width="180"></el-table-column>
    </el-table>
    <div class="pagination-box">
      <el-pagination
              class="recharge-pagination"
              background
              @current-change="handleCurrentChange"
              :current-page="paramsData.page"
              :page-size="paramsData.pagesize"
              layout="prev, pager, next, jumper"
              :total="totalSize"
              v-if="totalSize>paramsData.pagesize">
      </el-pagination>
      <div class="pagination-tail"  v-if="totalSize>paramsData.pagesize">，共{{Math.ceil(totalSize/paramsData.pagesize)}}页</div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        assetsTable:[],
        searchContent:'',
        userMobile: '',
        totalSize:'',
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
        typeOptions: [
          {value: 0, label: '全部类型'},
          {value: 1, label: '发红包'},
          {value: 2, label: '抢红包'},
          {value: 3, label: '退还红包'},
          {value: 4, label: '提币'},
          {value: 5, label: '提币解冻退还'},
          {value: 6, label: '提币解冻扣除'},
          {value: 7, label: '充值冻结提款到可用'},
          {value: 8, label: '充值'},
          {value: 9, label: '充值冻结扣除'},
          {value: 10, label: '向托管账户充值'},
          {value: 20, label: '测试充值'},
          {value: 21, label: '测试扣除'}
        ],
        typeValue: '全部类型',
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
          'userMobile': null
        }
      }
    },
    methods: {
      //改变单元格字体颜色
      getCellClass({row, column, columnIndex}) {
          if (columnIndex == 1 && row[column.property].indexOf('平台') <= -1) {
              return 'active-blue'
          } else {
              return ''
          }
      },
      //获取资产流水数据
      getAssetsList(){
        let vm = this;
        this.axiosPOST(vm, vm.$API.API.assetsLog,
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
          this.assetsTable =[];
        } else {
          vm.setAssetsTable(res.data)
        }
      },
      //失败回调
      getErrorCB(err){
        console.log(err)
      },
      //设置表格数据
      setAssetsTable(_data){
        let myData = [];
        for (let i = 0; i <_data.length; i++) {
          let obj = {};
          obj.id = _data[i].id; //id
          if(!_data[i].userId || _data[i].userId === ''){  //用户id
            obj.userId = '-'
          } else {
            obj.userId = _data[i].userId
          }
          if(!_data[i].userMobile || _data[i].userMobile === ''){  //用户账号
            obj.userMobile = '-'
          } else {
            obj.userMobile = _data[i].userMobile
          }
          switch(_data[i].typeDetail){
            case 1:
              obj.typeDetail = '发红包';
              break;
            case 2:
              obj.typeDetail = '抢红包';
              break;
            case 3:
              obj.typeDetail = '退还红包';
              break;
            case 4:
              obj.typeDetail = '提币';
              break;
            case 5:
              obj.typeDetail = '提币解冻退还';
              break;
            case 6:
              obj.typeDetail = '提币解冻扣除';
              break;
            case 7:
              obj.typeDetail = '充值冻结提款到可用';
              break;
            case 8:
              obj.typeDetail = '充值';
              break;
            case 9:
              obj.typeDetail = '充值冻结扣除';
              break;
            case 10:
              obj.typeDetail = '向托管账户充值';
              break;
            case 20:
              obj.typeDetail = '测试充值';
              break;
            case 21:
              obj.typeDetail = '测试扣除';
              break;
            default:
              obj.typeDetail = '-'
          }
          obj.coinAbbreviation = _data[i].coinAbbreviation; //币种
          if(_data[i].operateAmount === null || _data[i].operateAmount === ''){  //可用变动
            obj.operateAmount = '-'
          } else {
            obj.operateAmount = _data[i].operateAmount
          }
          if(_data[i].availableBalanceBeforeOperate === null || _data[i].availableBalanceBeforeOperate === ''){  //可用变动前
            obj.availableBalanceBeforeOperate = '-'
          } else {
            obj.availableBalanceBeforeOperate = _data[i].availableBalanceBeforeOperate
          }
          if(_data[i].availableBalanceAfterOperate === null || _data[i].availableBalanceAfterOperate === ''){  //可用变动后
            obj.availableBalanceAfterOperate = '-'
          } else {
            obj.availableBalanceAfterOperate = _data[i].availableBalanceAfterOperate
          }
          if(_data[i].blockedBalanceBeforeOperate && _data[i].blockedBalanceAfterOperate){  //冻结变动
            if(_data[i].blockedBalanceBeforeOperate === _data[i].blockedBalanceAfterOperate){
              obj.freezeAmount = '0';
            } else {
              obj.freezeAmount = Math.abs(_data[i].blockedBalanceBeforeOperate - _data[i].blockedBalanceAfterOperate).toFixed(8);
            }
          } else {
            obj.freezeAmount = '-'
          }
          if(_data[i].blockedBalanceBeforeOperate === null || _data[i].blockedBalanceBeforeOperate === ''){  //冻结变动前
            obj.blockedBalanceBeforeOperate = '-'
          } else {
            obj.blockedBalanceBeforeOperate = _data[i].blockedBalanceBeforeOperate
          }
          if(_data[i].blockedBalanceAfterOperate === null || _data[i].blockedBalanceAfterOperate === ''){  //冻结变动后
            obj.blockedBalanceAfterOperate = '-'
          } else {
            obj.blockedBalanceAfterOperate = _data[i].blockedBalanceAfterOperate
          }
          if(!_data[i].createTime || _data[i].createTime === ''){  //生成时间
            obj.createTime = '-'
          } else {
            obj.createTime = _data[i].createTime
          }
          myData[i] = obj;
        }
        this.assetsTable = myData;
      },
      //分页器
      handleCurrentChange(val) {
        this.paramsData.page = val;
        this.getAssetsList();
      },
      //筛选
      filterData(){
        let reg = /^[\d]+$/;
        this.paramsData.page = 1;
        if(this.searchContent === '') {
          this.paramsData.userId = null;
          this.paramsData.coins = null
        } else if(reg.test(this.searchContent)){  //全是数字则是用户id
          this.paramsData.userId = this.searchContent;
          this.paramsData.coins = null;
        } else { //否则是币种
          this.paramsData.coins = [];
          this.paramsData.coins.push(this.trimStr(this.searchContent));
          this.paramsData.userId = null;
        }
        if(this.typeValue === '' || this.typeValue === '全部类型' || this.typeValue === 0) {
          this.paramsData.typeDetail = null
        } else {
          this.paramsData.typeDetail = this.typeValue;
        }
        if(this.datevalue && this.datevalue.length > 0){
          this.paramsData.startTime = this.datevalue[0];
          this.paramsData.endTime = this.datevalue[1];
        } else {
          this.paramsData.startTime = this.paramsData.endTime = null;
        }
        if(this.userMobile !== ''){
          this.paramsData.userMobile = this.userMobile;
        } else {
          this.paramsData.userMobile = null;
        }
        this.getAssetsList();
      },
      //重置
      resetData(){
      this.datevalue = [];
      this.searchContent = '';
        this.userMobile = '';
      this.typeValue = '全部类型';
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
        'userMobile': null
      };
      this.getAssetsList();
    },
      //去除首位空格
      trimStr(str){
        return str.replace(/(^\s*)|(\s*$)/g,"");
      }
    },
    mounted(){
      this.getAssetsList();
    }
  }
</script>

<style scoped lang= "scss">
  @import '~@/assets/style/public-class.scss';
  .assets {
    width:100%;
    margin:30px auto;
    .filter{
      width:100%;
      height:40px;
      margin:0 auto 30px;
      @include clearfix;
      .title{
        float:left;
        margin-right: 10px;
        height: 40px;
        line-height:40px;
        font-size:14px;
      }
      &:first-of-type{
        margin-bottom:25px;
      }
      .type-select{
        float:left;
        margin-right:20px;
      }
      .time{
        position:relative;
        float:left;
        text-align:left;
        margin-right:20px;
      }
      .assets-search{
        float:left;
        @include clearfix;
        .title{
          float:left;
          margin-right: 10px;
          height: 40px;
          line-height:40px;
          font-size:14px;
        }
        .input-box {
          float:left;
          width: 200px;
          height: 40px;
          margin:0 30px 0 0;
        }
        .btn{
          float:left;
          width:100px;
          height:40px;
        }
      }
    }

  }
</style>
