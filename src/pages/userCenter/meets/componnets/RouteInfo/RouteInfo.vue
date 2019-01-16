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
              fixed
              label="MID"
              min-width="110">
      </el-table-column>
      <el-table-column
              prop="msType"
              label="Ms类型"
              min-width="90">
      </el-table-column>
      <el-table-column
              prop="belongAgency"
              label="所属机构"
              show-overflow-tooltip
              min-width="140">
      </el-table-column>
      <el-table-column
              prop="agencyReward"
              label="机构分成"
              min-width="110">
      </el-table-column>
      <el-table-column
              prop="userReward"
              label="Ms分成"
              min-width="100">
      </el-table-column>
      <el-table-column
              prop="mScore"
              label="M评分"
              min-width="100">
      </el-table-column>
      <el-table-column
              prop="fansNo"
              label="粉丝"
              min-width="70">
      </el-table-column>
      <el-table-column
              prop="status"
              label="状态"
              min-width="70">
      </el-table-column>
      <el-table-column
              prop="greenFlag"
              label="绿名单"
              min-width="100">
      </el-table-column>
      <el-table-column
              prop="deadLine"
              label="到期日期"
              min-width="180">
      </el-table-column>
      <el-table-column
              label="操作"
              min-width="160">
              <template slot-scope="scope">
                <div>
                  <span style= "color:#003d96;cursor:pointer;" @click="handleDetail(scope.$index, scope.row)">查看</span>
                  <span v-if="authorityBtnState">      |       </span>
                  <span style= "color:#003d96;cursor:pointer;" @click="handleEdit(scope.$index, scope.row)" v-if="authorityBtnState">编辑</span>
                </div>
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
  import {mapState} from 'vuex'
  export default {
    components:{
      Pagination,
      FilterList
    },
    data(){
      return {
        allMsType:[],
        pageLoading:true,//loading
        totalSize:null, //数据总数
        tableData:[], //列表数据
        paramsData:{
            'mid': null,
            'sex':null,
            'msType':null,
            'status':null,
            'pageNum':1,
            'pageSize':10,
        },
        filterItem:{
          searchFilter:true,
          selectFilter:true,
          timeFilter:false
        },
        selectList:[  //传到filter的下拉数据
          {
            "title": "性别",
            "placeholder":"Ms性别",
            "options":[{
              value: '',
              label: '全部'
            }, {
              value: '0',
              label: '女'
            }, {
              value: '1',
              label: '男'
            }]
          },
          {
            "title": "Ms类型",
            "placeholder":"Ms类型",
            "options":[{
              value: '',
              label: '全部'
            }]
          },
          /*{
            "title": "状态",
            "placeholder":"Ms当前状态",
            "options":[{
              value: '',
              label: '全部'
            }, {
              value: '0',
              label: '在线'
            }, {
              value: '1',
              label: '离线'
            }, {
              value: '2',
              label: '繁忙'
            }]
          }*/
        ],
        searchList:[
          {
            "title": "MID",
            "placeholder":"输入MID模糊查找"
          }
        ]
      }
    },
    computed:{
      ...mapState({
        authorityBtnState: state => state.d2admin.authorityBtnState
      })
    },
    watch: {
      '$route': {
        handler(val) {
          if(val.path === '/userCenter/meets' || val.path === '/userCenter/meets/'){
            this.getTableData();
          }
        }
      },
    },
    methods: {
      //获取所有Ms类型
      getAllMsType(){
        let vm = this;
        this.axiosGET(vm, vm.$API.API.mstypeList,
          'application/x-www-form-urlencoded',
          {},
          (vm,res) => {
             vm.allMsType = res.data;
             for(let i =0 ; i<res.data.length; i++){
               let obj={};
               obj.value = obj.table = res.data[i].type;
               vm.selectList[1].options.push(obj)
             }

          }
        )
      },
       // 获取子组件传来的查询数据
       getSearchValueHandle(params){
         if(!params.searchContent[0] || params.searchContent[0] === ''){
           this.paramsData.mid = null;
         } else {
           this.paramsData.mid = params.searchContent[0];
         }
         if(!params.searchState[0] || params.searchState[0] === ''){
           this.paramsData.sex = null;
         } else{
           this.paramsData.sex = Number(params.searchState[0]);
         }
         if(!params.searchState[1] || params.searchState[1] === ''){
           this.paramsData.msType = null;
         } else{
           this.paramsData.msType = params.searchState[1];
         }
         if(!params.searchState[2] || params.searchState[2] === ''){
           this.paramsData.status = null;
         } else{
           this.paramsData.status = Number(params.searchState[2]);
         }
        },
       //获取列表
       getTableData(){
          let vm = this;
          this.axiosGET(vm, vm.$API.API.meetList,
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
            obj.msType = _data[i].msType ? _data[i].msType : '-';
            obj.belongAgency = _data[i].belongAgency ? _data[i].belongAgency : '-';
            obj.agencyReward = _data[i].agencyReward ? _data[i].agencyReward : '-';
            obj.userReward = _data[i].userReward ? _data[i].userReward : '-';
            obj.mScore = _data[i].mScore ? _data[i].mScore : '0';
            obj.fansNo = _data[i].fansNo ? _data[i].fansNo : '0';
            obj.deadLine = _data[i].deadLine ? _data[i].deadLine : '-';
            switch(_data[i].status){ //状态
              case 0:
                obj.status = '在线';
                break;
              case 1:
                obj.status = '离线';
                break;
              case 2:
                obj.status = '繁忙';
                break;
              default:
                obj.status = '-'
            }
            switch(_data[i].greenFlag){ //绿名单
              case true:
                obj.greenFlag = '是';
                break;
              case false:
                obj.greenFlag = '否';
                break;
              default:
                obj.greenFlag = '-'
            }
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
          'sex':null,
          'msType':null,
          'status':null,
          'pageNum':1,
          'pageSize':10,
        };
        this.getTableData();
      },
       //查看详情
       handleDetail(index, row) {
        this.$router.push({path: '/userCenter/meets/meetsDetail', query: {mid: row.mid}})
       },
      handleEdit(index, row) {
        this.$router.push({path: '/userCenter/meets/meetsEdit', query: {mid: row.mid}})
      }
    },
    mounted(){
      this.getTableData();
      this.getAllMsType();
      this.$store.commit('getAuthorityBtnState',this.$route.path);
    }
}
</script>
