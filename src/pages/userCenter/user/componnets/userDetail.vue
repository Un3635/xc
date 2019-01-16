<template>
    <d2-container>
        <template slot="header"><span></span>查看<i class="el-icon-close detail-close" @click="$router.go(-1)"></i></template>
        <div class="detail"
             v-loading="pageLoading"
             element-loading-text="加载中..."
             element-loading-background="rgba(255, 255, 255, 0.8)">
            <div class="title-box title-box-form" style="padding-bottom:30px;">
                <div class="title-txt">基础信息</div>
                <el-form label-width="130px" class="form-list">
                    <el-form-item label="MID">
                        <span class="detail-info">{{mid}}</span>
                    </el-form-item>
                    <el-form-item label="注册时间">
                        <span class="detail-info">{{formData.regTime}}</span>
                    </el-form-item>
                    <el-form-item label="登录渠道">
                        <span class="detail-info">{{formData.account}}</span>
                    </el-form-item>
                    <el-form-item label="累计消费（钻石）">
                        <span class="detail-info">{{formData.cumulativeConsumptionDiamond}}</span>
                    </el-form-item>
                </el-form>
                <el-form label-width="130px" class="form-list">
                    <el-form-item label="昵称">
                        <span class="detail-info">{{formData.nickName}}</span>
                    </el-form-item>
                    <el-form-item label="用户评分">
                        <span class="detail-info">{{formData.userScore}}</span>
                    </el-form-item>
                    <el-form-item label="用户状态">
                        <span class="detail-info">{{formData.status}}</span>
                    </el-form-item>
                    <el-form-item label="消费等级">
                        <span class="detail-info">{{formData.consumptionLevel}}</span>
                    </el-form-item>
                </el-form>
                <el-form label-width="130px" class="form-list">
                    <el-form-item label="性别">
                        <span class="detail-info">{{formData.sex}}</span>
                    </el-form-item>
                    <el-form-item label="关注Ms数">
                        <span class="detail-info">{{formData.follow}}</span>
                    </el-form-item>
                    <el-form-item label="累计充值（RMB）">
                        <span class="detail-info">{{formData.sumRecharge}}</span>
                    </el-form-item>
                    <el-form-item label="持有钻石">
                        <span class="detail-info">{{formData.currentlyHoldingDiamond}}</span>
                    </el-form-item>
                </el-form>
            </div>
            <!--<div class="title-box" style="margin-top:50px;">
                <div class="title-txt">消费排行</div>
                <el-table
                        :data="tableData"
                        class="record-table"
                        highlight-current-row
                        style="width: 100%;padding:16px 24px;">
                    <el-table-column
                            prop="streamNo"
                            label="收益流水号"
                            min-width="120">
                    </el-table-column>
                    <el-table-column
                            prop="count"
                            label="收入宝石"
                            min-width="100">
                    </el-table-column>
                    <el-table-column
                            prop="behavior"
                            label="行为明细"
                            min-width="160">
                    </el-table-column>
                    <el-table-column
                            prop="time"
                            label="收益时间"
                            min-width="120">
                    </el-table-column>
                </el-table>
                <pagination
                        :page-num="paramsData.pageNum"
                        :page-size="paramsData.pageSize"
                        :total-size="totalSize"
                        @pageChangeHandle="handleCurrentChange"/>
            </div>-->
            <el-button type="info" plain class="return-btn" @click="$router.go(-1)" style="display:block;margin:0 auto;">返回</el-button>
        </div>
    </d2-container>
</template>

<script>
  import Pagination from "../../../../components/pagination/pagination";
  export default {
    components:{
      Pagination
    },
    data() {
      return {
        mid:'',
        formData:{},
        tableData:[],
        pageLoading: false,//loading
        paramsData:{
          pageNum:1,
          pageSize:10,
        },
        totalSize:0
      }
    },
    methods:{
      //获取列表
      getFormData(){
        let vm = this;
        this.axiosGET(vm, vm.$API.API.userDetail+vm.mid,
          'application/x-www-form-urlencoded',
          {},
          vm.getSuccessCB
        )
      },
      //成功回调
      getSuccessCB(vm,res){
        if(!res.data || res.data === ''){
          this.formData ={};
        } else {
          vm.setFormData(res.data)
        }
      },
      //设置表格数据
      setFormData(_data){
        let obj = {};
        obj.account = _data.account;
        obj.consumptionLevel = _data.consumptionLevel ?  _data.consumptionLevel : '0';
        obj.cumulativeConsumptionDiamond = _data.cumulativeConsumptionDiamond ? _data.cumulativeConsumptionDiamond : '0';
        obj.currentlyHoldingDiamond = _data.currentlyHoldingDiamond ? _data.currentlyHoldingDiamond : '0';
        obj.follow = _data.follow ? _data.follow : '0';
        obj.sumRecharge = _data.sumRecharge ? _data.sumRecharge : '0';
        obj.mid = _data.mid;
        obj.nickName = _data.nickName ? _data.nickName : '-';
        obj.regTime = _data.regTime;
        obj.sex = _data.sex ? '男' : '女';
        obj.userScore = _data.userScore ? _data.userScore : '0';
        switch(_data.status){
          case 0:
            obj.status = '正常';
            break;
          case 1:
            obj.status = '封停中';
            break;
          case 2:
            obj.status = '永久封停';
            break;
          default:
            obj.status = '-'
        }
        this.formData = obj;
      },
      /*getTableData(){
        let vm = this;
        this.axiosGET(vm, vm.$API.API.benefitRateRecord+vm.mid,
          'application/x-www-form-urlencoded',
          vm.paramsData,
          vm.getTableSuccessCB
        )
      },
      getTableSuccessCB(vm,res){
        vm.totalSize = res.count;
        if(!res.data || res.data === ''){
          this.tableData =[];
        } else {
          vm.setTableData(res.data)
        }
      },
      setTableData(_data){
        let myData = [];
        for (let i = 0; i <_data.length; i++) {
          let obj = {};
          obj.behavior = _data[i].behavior;
          obj.count = _data[i].count;
          obj.streamNo = _data[i].streamNo;
          obj.time = _data[i].time;
          myData[i] = obj;
        }
        this.tableData = myData;
      },*/
      //分页器
      handleCurrentChange(val) {
        this.paramsData.pageNum = val;
        this.getTableData();
      }
    },
    created(){
      this.mid = this.$route.query.mid;
      this.getFormData();
      // this.getTableData();
    }
  }
</script>