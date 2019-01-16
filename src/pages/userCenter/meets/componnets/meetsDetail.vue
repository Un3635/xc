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
                        <span class="detail-info">{{formData.mid}}</span>
                    </el-form-item>
                    <el-form-item label="Ms类型">
                        <span class="detail-info">{{formData.msType}}</span>
                    </el-form-item>
                    <el-form-item label="累计获得（宝石）">
                        <span class="detail-info">{{formData.cumulativeGem}}</span>
                    </el-form-item>
                    <el-form-item label="所属机构">
                        <span class="detail-info">{{formData.belongAgency}}</span>
                    </el-form-item>
                    <el-form-item label="平台收益">
                        <span class="detail-info">{{formData.platformReward}}</span>
                    </el-form-item>
                </el-form>
                <el-form label-width="130px" class="form-list">
                    <el-form-item label="昵称">
                        <span class="detail-info">{{formData.nickName}}</span>
                    </el-form-item>
                    <el-form-item label="Ms评分">
                        <span class="detail-info">{{formData.mScore}}</span>
                    </el-form-item>
                    <el-form-item label="持有宝石">
                        <span class="detail-info">{{formData.currentlyHoldingGem}}</span>
                    </el-form-item>
                    <el-form-item label="签约日期">
                        <span class="detail-info">{{formData.regTime}}</span>
                    </el-form-item>
                    <el-form-item label="机构收益">
                        <span class="detail-info">{{formData.agencyReward}}</span>
                    </el-form-item>
                </el-form>
                <el-form label-width="130px" class="form-list">
                    <el-form-item label="性别">
                        <span class="detail-info">{{formData.sex}}</span>
                    </el-form-item>
                    <el-form-item label="粉丝数">
                        <span class="detail-info">{{formData.fansNo}}</span>
                    </el-form-item>
                    <el-form-item label="Ms状态">
                        <span class="detail-info">{{formData.status}}</span>
                    </el-form-item>
                    <el-form-item label="到期日期">
                        <span class="detail-info">{{formData.deadLine}}</span>
                    </el-form-item>
                    <el-form-item label="Ms收益">
                        <span class="detail-info">{{formData.userReward}}</span>
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
        this.axiosGET(vm, vm.$API.API.meetDetail+vm.mid,
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
        obj.belongAgency = _data.belongAgency ? _data.belongAgency : '-';
        obj.cumulativeGem = _data.cumulativeGem ? _data.cumulativeGem : '0';
        obj.currentlyHoldingGem = _data.currentlyHoldingGem ? _data.currentlyHoldingGem : '0';
        obj.fansNo = _data.fansNo ? _data.fansNo : '0';
        obj.mScore = _data.mScore;
        obj.mid = _data.mid;
        obj.msType = _data.msType ? _data.msType : '-';
        obj.nickName = _data.nickName;
        obj.regTime = _data.regTime ? _data.regTime : '-';
        obj.deadLine = _data.deadLine ? _data.deadLine : '-';
        obj.sex = _data.sex ? '男' : '女';
        obj.agencyReward = _data.agencyReward;
        obj.userReward = _data.userReward;
        obj.platformReward = _data.platformReward;
        if(!_data.agencyFlag ){
          obj.agencyReward = '-';
          obj.belongAgency = '-'
        }
        switch(_data.status){
          case 1:
            obj.status = '在线';
            break;
          case 2:
            obj.status = '离线';
            break;
          case 3:
            obj.status = '封停';
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
