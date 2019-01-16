<template>
    <d2-container>
        <template slot="header">用户列表 - 用户详情  <span v-if="mobile">({{mobile}})</span> <i class="el-icon-close detail-close" @click="$router.go(-1)"></i></template>
        <div class="user-detail">
            <div class="title">用户详情</div>
            <div class="info-box">
                <p class="info-tit">基本信息</p>
                <ul class="info">
                    <li v-for="item,index in userInfo" :key="index">
                        <span>{{item.tit}}</span>
                        <p>{{item.txt}}</p>
                    </li>
                </ul>
            </div>
            <div class="assets-info">
                <el-tabs v-model="activeName" type="border-card"> <!--@tab-click="handleClick"-->
                    <el-tab-pane label="资产信息" name="first">
                        <p class="name">托管账户余额</p>
                        <el-table
                                :data="infoTable"
                                highlight-current-row
                                class="assets-table"
                                style="width: 700px">
                            <el-table-column
                                    prop="symbol"
                                    label="币种"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="availableBalance"
                                    label="可用数量"
                                    width="240">
                            </el-table-column>
                            <el-table-column
                                    prop="blockedBalance"
                                    label="冻结数量">
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="资产流水" name="second">
                        <el-table
                                highlight-current-row
                                class="assets-table"
                                :data="logTable"
                                style="width:100%;padding:0 24px;">
                            <el-table-column prop="typeDetail" label="类型" min-width="140"></el-table-column>
                            <el-table-column prop="coinAbbreviation" label="币种" min-width="90"></el-table-column>
                            <el-table-column prop="operateAmount" label="可用变动" min-width="170"></el-table-column>
                            <el-table-column prop="availableBalanceBeforeOperate" label="可用变动前" min-width="170"></el-table-column>
                            <el-table-column prop="availableBalanceAfterOperate" label="可用变动后" min-width="170"></el-table-column>
                            <el-table-column prop="freezeAmount" label="冻结变动" min-width="170"></el-table-column>
                            <el-table-column prop="blockedBalanceBeforeOperate" label="冻结变动前" min-width="170"></el-table-column>
                            <el-table-column prop="blockedBalanceAfterOperate" label="冻结变动后" min-width="170"></el-table-column>
                            <el-table-column prop="createTime" label="生成时间" min-width="180"></el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <el-button type="info" plain class="return-btn" @click="$router.go(-1)">返回</el-button>
        </div>
    </d2-container>
</template>

<script>
  import util from '@/libs/util.js'
  export default {
    name: "userDetail",
    data(){
        return{
          id:'',
          mobile:'',
          activeName: 'first',
          userInfo:[
            {tit: '用户ID：', txt: ''},
            {tit: '用户账号：', txt: ''},
            {tit: '用户昵称：', txt: ''},
            {tit: '创建时间：', txt: ''},
          ],
          infoTable:[],
          logTable:[],
          AssetsLogTable:[],
          paramsData:{
            'coinIds': null,
            'endTime': null,
            'page': 1,
            'pagesize': 10,
            'startTime': null,
            'status': null,
            'type': null,
            'typeDetail': null,
            'userId': null,
            'userMobile': null
          }
        }
    },
    methods:{
      //获取用户资产信息
      getUserInfo(userId){
        let vm = this;
        this.axiosPOST(vm, vm.$API.API.userAssetsInfo,
          'application/x-www-form-urlencoded',
          { userId },
          vm.getSuccessCB,
          vm.getErrorCB
        )
      },
      //获取用户资产信息成功回调
      getSuccessCB(vm,res){
        if(!res.data || res.data === ''){
          vm.infoTable = [];
        } else {
          vm.setAssetsInfoTable(res.data)
        }
      },
      //获取用户资产信息失败回调
      getErrorCB(err){
        console.log(err)
      },
      //设置资产信息表格数据
      setAssetsInfoTable(_data) {
        let myData = [];
        for (let i = 0; i <_data.length; i++) {
          let obj = {};
          obj.availableBalance = _data[i].availableBalance;
          obj.blockedBalance = _data[i].blockedBalance;
          if(!_data[i].symbol || _data[i].symbol === ''){
            obj.symbol = '-';
          } else {
            obj.symbol = _data[i].symbol;
          }
          myData[i] = obj;
        }
        this.infoTable = myData;
      },
      //获取用户资产流水
      getUserLog(){
        let vm = this;
        this.axiosPOST(vm, vm.$API.API.userAssetsLog,
          'application/json',
          vm.paramsData,
          vm.getAssetsLogSuccessCB,
          vm.getErrorCB
        )
      },
      //获取用户资产流水成功回调
      getAssetsLogSuccessCB(vm,res){
        if(!res.data || res.data === ''){
          vm.logTable = [];
        } else {
          vm.setAssetsLogTable(res.data);
        }
      },
      //设置资产信息表格数据
      setAssetsLogTable(_data){
        let myData = [];
        for (let i = 0; i <_data.length; i++) {
          let obj = {};
          switch(_data[i].typeDetail){ //详细类型
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
              obj.typeDetail = '提币冻结';
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
              obj.typeDetail = '充值冻结';
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
          if( _data[i].blockedBalanceBeforeOperate === null || _data[i].blockedBalanceBeforeOperate === ''){  //冻结变动前
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
        this.logTable = myData;
      },
    },
    mounted(){
      this.paramsData.userId = this.id = this.userInfo[0].txt = this.$route.params.id;
      this.mobile = this.userInfo[1].txt = this.$route.params.mobile;
      this.userInfo[2].txt = this.$route.params.nickname;
      this.userInfo[3].txt = this.$route.params.createTime;
      this.getUserInfo(this.id);
      this.getUserLog();
    }
  }
</script>

<style scoped lang="scss">
    .user-detail{
        width:100%;
        text-align:center;
        margin:0 auto 50px;
        .title{
            width:100%;
            margin:30px auto 20px;
            font-size:18px;
            text-align:center;
            font-weight:600;
        }
        .info-box{
            padding:60px 100px 0;
            text-align:left;
            .info-tit{
                padding:0 30px 20px;
                text-align:left;
                font-size:14px;
                font-weight:700;
            }
            .info{
                width:400px;
                text-align:center;
                padding:0 30px;
                li{
                    list-style:none;
                    width:100%;
                    height:45px;
                    text-align:left;
                    span{
                        display:inline-block;
                        font-size:14px;
                        font-weight:700;
                        line-height:45px;
                        padding-right:10px;
                        color:#525252;
                    }
                    p{
                        display:inline-block;
                        font-size:14px;
                        line-height:45px;
                        color:#808080;
                    }
                }
            }
        }
        .assets-info{
            margin:0 auto;
            padding:30px 100px 0;
            text-align:left;
            .el-tabs{
                .el-tab-pane{
                    .name{
                        font-size:14px;
                        margin:20px 0 16px;
                    }
                    .el-table{
                        margin:0 0 30px;
                        &:hover{
                            box-shadow:none;
                        }
                    }
                }
            }
        }
        .return-btn{
            margin:50px auto 0;
        }
    }
</style>