<template>
  <div class="page-wrap"
       v-loading="pageLoading"
       element-loading-text="加载中..."
       element-loading-background="rgba(255, 255, 255, 0.8)">
    <filter-list
            :filterItem="filterItem"
            :selectList="selectList"
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
              show-overflow-tooltip
              min-width="100">
      </el-table-column>
      <el-table-column
              prop="nickName"
              label="昵称"
              show-overflow-tooltip
              min-width="100">
      </el-table-column>
      <el-table-column
              prop="sex"
              label="性别"
              min-width="60">
      </el-table-column>
      <el-table-column
              prop="userScore"
              label="用户评分"
              min-width="70">
      </el-table-column>
      <el-table-column
              prop="follow"
              label="关注"
              min-width="70">
      </el-table-column>
      <el-table-column
              prop="status"
              label="状态"
              min-width="70">
      </el-table-column>
      <el-table-column
              prop="regTime"
              label="注册时间"
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
          'nickName':null,
          'status':null,
          'pageNum':1,
          'pageSize':10,
          'startTime':null,
          'endTime':null
        },
        filterItem:{
            searchFilter:true,
            selectFilter:true,
            timeFilter:true
          },
        selectList:[  //传到filter的下拉数据
          {
            "title": "状态",
            "placeholder":"状态",
            "options":[{
              value: '',
              label: '全部'
            }, {
              value: '0',
              label: '正常'
            }, {
              value: '1',
              label: '封停中'
            }, {
              value: '2',
              label: '永久封停'
            }]
          }
        ],
        searchList:[
          {
            "title": "MID",
            "placeholder":"输入MID模糊查找"
          },
          {
            "title": "昵称",
            "placeholder":"输入昵称模糊查找"
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
         if(!params.searchContent[1] || params.searchContent[1] === ''){
           this.paramsData.nickName = null;
         } else {
           this.paramsData.nickName = params.searchContent[1];
         }
          if(!params.searchState[0] || params.searchState[0] === ''){
            this.paramsData.status = null;
          } else{
            this.paramsData.status = Number(params.searchState[0]);
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
          this.axiosGET(vm, vm.$API.API.userList,
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
            obj.nickName = _data[i].nickName ? _data[i].nickName : '-';
            obj.userScore = _data[i].userScore ? _data[i].userScore : '0';
            if(_data[i].sex === ''){
              obj.sex = '-';
            } else if (_data[i].sex === 0) {
              obj.sex = '女';
            } else if (_data[i].sex === 1) {
              obj.sex = '男';
            } ;
            obj.follow = _data[i].follow ? _data[i].follow : '0';
            switch(_data[i].status){ //详细类型
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
            obj.regTime = _data[i].regTime ? _data[i].regTime : '-';
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
          'nickName':null,
          'status':null,
          'pageNum':1,
          'pageSize':10,
          'startTime':null,
          'endTime':null
        };
         this.getTableData();
      },
       //查看详情
       handleDetail(index, row) {
        this.$router.push({path: '/userCenter/user/userDetail', query: {mid: row.mid}})
       },
    },
    mounted(){
      this.getTableData();
    }
}
</script>
