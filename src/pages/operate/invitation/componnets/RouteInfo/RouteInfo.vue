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
                    prop="inviterMid"
                    label="邀请者"
                    min-width="100">
            </el-table-column>
            <el-table-column
                    prop="inviteUrl"
                    label="邀请链接"
                    show-overflow-tooltip
                    min-width="180">
            </el-table-column>
            <el-table-column
                    prop="inviteeMid"
                    label="被邀请者"
                    min-width="100">
            </el-table-column>
            <el-table-column
                    prop="regTime"
                    label="被邀请者注册时间"
                    min-width="120">
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
          'inviterMid': null,
          'inviteeMid': null,
          'startTime': null,
          'endTime': null,
          'pageNum':1,
          'pageSize':10
        },
        filterItem:{
          searchFilter:true,
          timeFilter:true
        },
        searchList:[
          {
            "title": "邀请者",
            "placeholder":"邀请者模糊查找"
          },
          {
            "title": "被邀请者",
            "placeholder":"被邀请者模糊查找"
          }
        ]
      }
    },
    methods: {
      // 获取子组件传来的查询数据
      getSearchValueHandle(params){
        if(!params.searchContent[0] || params.searchContent[0] === ''){
          this.paramsData.inviterMid = null;
        } else {
          this.paramsData.inviterMid = params.searchContent[0];
        }
        if(!params.searchContent[1] || params.searchContent[1] === ''){
          this.paramsData.inviteeMid = null;
        } else {
          this.paramsData.inviteeMid = params.searchContent[1];
        }
        if(params.searchTime && params.searchTime.length > 0){
          this.paramsData.startTime = params.searchTime[0];
          this.paramsData.endTime = params.searchTime[1];
        } else {
          this.paramsData.startTime = null;
          this.paramsData.endTime = null;
        }
      },
      //获取列表
      getTableData(){
        let vm = this;
        this.axiosGET(vm, vm.$API.API.inviteList,
          'application/x-www-form-urlencoded',
          vm.paramsData,
          vm.getSuccessCB
        )
      },
      //成功回调
      getSuccessCB(vm,res){
        vm.totalSize = res.count;
        if(!res.data || res.data === ''){
          this.tableData = [];
        } else {
          vm.setTableData(res.data)
        }
      },
      //设置表格数据
      setTableData(_data){
        let myData = [];
        for (let i = 0; i <_data.length; i++) {
          let obj = {};
          obj.inviterMid = _data[i].inviterMid;
          obj.inviteeMid = _data[i].inviteeMid;
          obj.inviteUrl = _data[i].inviteUrl;
          obj.regTime = _data[i].regTime ? _data[i].regTime : '-';
          // if(_data[i].regTime){
          //   obj.regTime=/\d{4}-\d{1,2}-\d{1,2}/g.exec(_data[i].regTime)
          // } else {
          //   obj.regTime= '-'
          // }
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
          'inviterMid': null,
          'inviteeMid': null,
          'startTime': null,
          'endTime': null,
          'pageNum':1,
          'pageSize':10
        };
        this.getTableData();
      }
    },
    mounted(){
      this.getTableData();
    }
  }
</script>
