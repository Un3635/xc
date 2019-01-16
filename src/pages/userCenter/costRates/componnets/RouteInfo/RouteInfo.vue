<template>
  <div class="page-wrap"
       v-loading="pageLoading"
       element-loading-text="加载中..."
       element-loading-background="rgba(255, 255, 255, 0.8)">
    <filter-list
            :filterItem="filterItem"
            :searchList="searchList"
            @filterDataHandle="filterData"
            @resetDataHandle="resetData"/>
    <el-table
            :data="tableData"
            class="my-table"
            highlight-current-row
            style="width: 100%;padding:16px 24px;">
      <el-table-column
              prop="mid"
              label="MID"
              min-width="100">
      </el-table-column>
      <el-table-column
              prop="consumeLevel"
              label="消费等级"
              min-width="100">
      </el-table-column>
      <el-table-column
              prop="consumerDiamonds"
              label="累计消费钻石"
              min-width="120">
      </el-table-column>
      <el-table-column
              prop="holdDiamonds"
              label="当前持有钻石"
              min-width="120">
      </el-table-column>
      <el-table-column
              label="操作"
              min-width="80">
              <template slot-scope="scope">
                <p style= "color:#003d96;cursor:pointer;" @click="handleDetail(scope.$index, scope.row)">查看</p>
              </template>
      </el-table-column>
    </el-table>
    <pagination
            :page-num="paramsData.pageNum"
            :page-size="paramsData.pageSize"
            :total-size="totalSize"
            @pageChangeHandle="handleCurrentChange"/>
  </div>
</template>

<script>
  import FilterList from "../../../../../components/filter/filterList";
  import Pagination from "../../../../../components/pagination/pagination";
  export default {
    components:{
      Pagination,
      FilterList
    },
    data(){
      return {
        pageLoading:true,//loading
        totalSize:null, //数据总数
        tableData:[], //列表数据
        paramsData:{
          'mid': null,
          'minLevel':null,
          'maxLevel':null,
          'pageNum':1,
          'pageSize':10
        },
        filterItem:{
            searchFilter:true,
            rateFilter:true
        },
        searchList:[
          {
            "title": "MID",
            "placeholder":"输入MID模糊查找"
          }
        ]
      }
    },
    methods: {
       // 获取子组件传来的查询数据
       getSearchValueHandle(params){
         if(!params.searchContent[0] || params.searchContent[0] === ''){
           this.paramsData.mid = null;
         } else {
           this.paramsData.mid = params.searchContent[0];
         }
         if(!params.rates[0] || params.rates[0] === ''){
           this.paramsData.minLevel = null;
         } else {
           this.paramsData.minLevel = Number(params.rates[0]);
         }
         if(!params.rates[1] || params.rates[1] === ''){
           this.paramsData.maxLevel = null;
         } else {
           this.paramsData.maxLevel = Number(params.rates[1]);
         }
         console.log(this.paramsData);
        },
       //获取列表
       getTableData(){
          let vm = this;
          this.axiosGET(vm, vm.$API.API.costRate,
            'application/x-www-form-urlencoded',
            vm.paramsData,
            vm.getSuccessCB
          )
        },
       //成功回调
       getSuccessCB(vm,res){
            vm.totalSize = res.count;
            if(!res.data || res.data === ''){
               this.tableData =[];
             } else {
               vm.setTableData(res.data)
            }
        },
       //设置表格数据
       setTableData(_data){
          let myData = [];
          for (let i = 0; i <_data.length; i++) {
            let obj = {};
            obj.mid = _data[i].mid;
            obj.consumeLevel = _data[i].consumeLevel;
            obj.consumerDiamonds = _data[i].consumerDiamonds ? _data[i].consumerDiamonds : '-';
            obj.holdDiamonds = _data[i].holdDiamonds ? _data[i].holdDiamonds : '-';
            myData[i] = obj;
          }
          this.tableData = myData;
        },
       //分页器
       handleCurrentChange(val) {
            this.paramsData.pageNum = val;
            this.getTableData();
         },
       //筛选数据
       filterData(params){
          this.getSearchValueHandle(params);
          this.paramsData.pageNum = 1;
          this.getTableData();
       },
       //重置按钮
       resetData(){
        this.paramsData = {
          'mid': null,
          'minLevel':null,
          'maxLevel':null,
          'pageNum':1,
          'pageSize':10
        };
         this.getTableData();
      },
       //查看详情
       handleDetail(index, row) {
        this.$router.push({path: '/userCenter/costRates/costRateDetail', query: {mid: row.mid}})
       },
    },
    mounted(){
      this.getTableData();
    }
}
</script>
