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
                    min-width="160">
            </el-table-column>
            <el-table-column
                    prop="content"
                    show-overflow-tooltip
                    label="通知文案"
                    min-width="220">
            </el-table-column>
            <el-table-column
                    prop="numberOfNotice"
                    label="通知人数"
                    min-width="80">
            </el-table-column>
            <el-table-column
                    prop="pushFlag"
                    label="推送push"
                    min-width="80">
            </el-table-column>
            <el-table-column
                    prop="timeOfNotice"
                    label="通知时间"
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
          'content': null,
          'needPush': null,
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
            "title": "文案",
            "placeholder":"通知文案模糊查找"
          }
        ],
        selectList:[
          {
            "title": "推送",
            "placeholder":"是否需要推送",
            "options":[{
              value: '',
              label: '全部'
            }, {
              value: 'true',
              label: '需要'
            }, {
              value: 'false',
              label: '不需要'
            }]
          }
        ],
        btnList:{
          "text":"新增通知"
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
          if(val.path === '/operate/notify' || val.path === '/operate/notify/'){
            this.getTableData();
          }
        }
      },
    },
    methods: {
      // 获取子组件传来的查询数据
      getSearchValueHandle(params){
        if(!params.searchContent[0] || params.searchContent[0] === ''){
          this.paramsData.content = null;
        } else {
          this.paramsData.content = params.searchContent[0];
        }
        if(!params.searchState[0] || params.searchState[0] === ''){
          this.paramsData.needPush = null;
        } else{
          this.paramsData.needPush = params.searchState[0];
        }
      },
      //获取列表
      getTableData(){
        let vm = this;
        this.axiosGET(vm, vm.$API.API.noticeList,
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
          obj.content = _data[i].content;
          obj.numberOfNotice = _data[i].numberOfNotice;
          obj.timeOfNotice = _data[i].timeOfNotice ? _data[i].timeOfNotice : '-';
          switch(_data[i].pushFlag){ //词性
            case true:
              obj.pushFlag = '需要';
              break;
            case false:
              obj.pushFlag = '不需要';
              break;
            default:
              obj.pushFlag = '-'
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
          'content': null,
          'needPush': null,
          'pageNum':1,
          'pageSize':10
        };
        this.getTableData();
      },
      //查看详情
      handleDetail(index, row) {
        this.$router.push({path: '/operate/notify/notifyDetail', query: {id: row.id}})
      },
      //新增
      addOption(){
        this.$router.push({path: '/operate/notify/notifyAdd'})
      }
    },
    mounted(){
      this.getTableData();
      this.$store.commit('getAuthorityBtnState',this.$route.path);
    }
  }
</script>
