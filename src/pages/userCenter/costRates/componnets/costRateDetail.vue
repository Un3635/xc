<template>
    <d2-container>
        <template slot="header"><span></span>查看<i class="el-icon-close detail-close" @click="$router.go(-1)"></i></template>
        <div class="detail"
             v-loading="pageLoading"
             element-loading-text="加载中..."
             element-loading-background="rgba(255, 255, 255, 0.8)">
            <div class="title-box">
                <div class="title-txt">基础信息</div>
                <el-form label-width="150px" class="rule-form">
                    <el-form-item label="MID：">
                        <span class="detail-info">{{mid}}</span>
                    </el-form-item>
                    <el-form-item label="昵称：">
                        <span class="detail-info">{{formData.nickName}}</span>
                    </el-form-item>
                    <el-form-item label="消费等级：">
                        <span class="detail-info">{{formData.consumeLevel}}</span>
                    </el-form-item>
                    <el-form-item label="累计消费钻石：">
                        <span class="detail-info">{{formData.consumerDiamonds}}</span>
                    </el-form-item>
                    <el-form-item label="当前持有钻石：">
                        <span class="detail-info">{{formData.holdDiamonds}}</span>
                    </el-form-item>
                    <el-form-item style="height:0;margin:0;"></el-form-item>
                </el-form>
            </div>
            <div class="title-box" style="margin-top:50px;">
                <div class="title-txt">消费记录</div>
                <el-table
                        :data="tableData"
                        class="record-table"
                        highlight-current-row
                        style="width: 100%;padding:16px 24px;">
                    <el-table-column
                            prop="streamNo"
                            label="消费流水号"
                            min-width="120">
                    </el-table-column>
                    <el-table-column
                            prop="count"
                            label="消费钻石"
                            min-width="100">
                    </el-table-column>
                    <el-table-column
                            prop="behavior"
                            label="行为明细"
                            min-width="160">
                    </el-table-column>
                    <el-table-column
                            prop="time"
                            label="消费时间"
                            min-width="120">
                    </el-table-column>
                </el-table>
                <pagination
                        :page-num="paramsData.pageNum"
                        :page-size="paramsData.pageSize"
                        :total-size="totalSize"
                        @pageChangeHandle="handleCurrentChange"/>
            </div>
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
        this.axiosGET(vm, vm.$API.API.costRateDetail+vm.mid,
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
          obj.nickName = _data.nickName ? _data.nickName : '-';
          obj.consumeLevel = _data.consumeLevel ? _data.consumeLevel : '-';
          obj.consumerDiamonds = _data.consumerDiamonds ? _data.consumerDiamonds : '-';
          obj.holdDiamonds = _data.holdDiamonds ? _data.holdDiamonds : '-';
          this.formData = obj;
      },
      getTableData(){
        let vm = this;
        this.axiosGET(vm, vm.$API.API.costRateRecord+vm.mid,
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
          obj.behavior = _data[i].behavior ?  _data[i].behavior : '-';
          obj.count = _data[i].count ? _data[i].count : '0';
          obj.streamNo = _data[i].streamNo ? _data[i].streamNo : '-';
          obj.time = _data[i].time ? _data[i].time : '-';
          myData[i] = obj;
        }
        this.tableData = myData;
      },
      //分页器
      handleCurrentChange(val) {
        this.paramsData.pageNum = val;
        this.getTableData();
      }
    },
    created(){
      this.mid = this.$route.query.mid;
      this.getFormData();
      this.getTableData();
    }
  }
</script>

<style scoped lang="scss">
    @import '~@/assets/style/public-class.scss';
</style>