<template>
    <div class="page-wrap"
         v-loading="pageLoading"
         element-loading-text="加载中..."
         element-loading-background="rgba(255, 255, 255, 0.8)">
        <filter-list
                :filterItem="filterItem"
                :searchList="searchList"
                :selectList="selectList"
                :btnList="btnList"
                :btnState="authorityBtnState"
                @addOptionHandle="addOption"
                @filterDataHandle="filterData"
                @resetDataHandle="resetData"/>
        <el-table
                :data="tableData"
                class="my-table"
                highlight-current-row
                style="width: 100%;padding:16px 24px;">
            <el-table-column
                    prop="id"
                    label="ID"
                    show-overflow-tooltip
                    min-width="100">
            </el-table-column>
            <el-table-column
                    prop="illegalWord"
                    label="禁词"
                    show-overflow-tooltip
                    min-width="120">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="状态"
                    min-width="100">
            </el-table-column>
            <el-table-column
                    v-if="authorityBtnState"
                    label="操作"
                    min-width="60">
                <template slot-scope="scope">
                    <p style= "color:#003d96;cursor:pointer;" @click="handleDetail(scope.$index, scope.row)">编辑</p>
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
        pageLoading:true,//loading
        totalSize:null, //数据总数
        tableData:[], //列表数据
        paramsData:{
          'word': null,
          'status': null,
          'pageNum':1,
          'pageSize':10
        },
        filterItem:{
          searchFilter:true,
          selectFilter:true,
          addBtn:true
        },
        searchList:[
          {
            "title": "禁词",
            "placeholder":"禁词模糊查找"
          }
        ],
        selectList:[
          {
            "title": "状态",
            "placeholder":"禁词状态",
            "options":[{
              value: '',
              label: '全部'
            }, {
              value: 'true',
              label: '生效'
            }, {
              value: 'false',
              label: '无效'
            }]
          }
        ],
        btnList:{
          "text":"新增禁词"
        }
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
          if(val.path === '/operate/prohibition' || val.path === '/operate/prohibition/'){
            this.getTableData();
          }
        }
      },
    },
    methods: {
      // 获取子组件传来的查询数据
      getSearchValueHandle(params){
        if(!params.searchContent[0] || params.searchContent[0] === ''){
          this.paramsData.word = null;
        } else {
          this.paramsData.word = params.searchContent[0];
        }
        if(!params.searchState[0] || params.searchState[0] === ''){
          this.paramsData.status = null;
        } else{
          this.paramsData.status = params.searchState[0];
        }
      },
      //获取列表
      getTableData(){
        let vm = this;
        this.axiosGET(vm, vm.$API.API.wordList,
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
          obj.id = _data[i].id;
          obj.illegalWord = _data[i].illegalWord;
          switch(_data[i].status){ //状态
            case true:
              obj.status = '生效';
              break;
            case false:
              obj.status = '无效';
              break;
            default:
              obj.status = '-'
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
          'word': null,
          'status': null,
          'pageNum':1,
          'pageSize':10
        };
        this.getTableData();
      },
      //查看详情
      handleDetail(index, row) {
        this.$router.push({path: '/operate/prohibition/prohibitionEdit', query: {id: row.id}})
      },
      //新增
      addOption(){
        this.$router.push({path: '/operate/prohibition/prohibitionAdd'})
      }
    },
    mounted(){
      this.getTableData();
      this.$store.commit('getAuthorityBtnState',this.$route.path);
    }
  }
</script>
