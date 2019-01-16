<template>
    <div class="page-wrap"
         v-loading="pageLoading"
         element-loading-text="加载中..."
         element-loading-background="rgba(255, 255, 255, 0.8)">
        <filter-list
                :filterItem="filterItem"
                :selectList="selectList"
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
                    min-width="100">
            </el-table-column>
            <el-table-column
                    prop="scenes"
                    label="红包场景"
                    min-width="120">
            </el-table-column>
            <el-table-column
                    prop="sort"
                    label="排序"
                    min-width="100">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="状态"
                    min-width="100">
            </el-table-column>
            <el-table-column
                    label="操作"
                    min-width="100">
                <template slot-scope="scope">
                    <span style= "color:#003d96;cursor:pointer;" @click="handleEdit(scope.$index, scope.row)" v-if="authorityBtnState">编辑</span>
                    <span style="padding:0 5px;"  v-if="authorityBtnState">|</span>
                    <span style= "color:#003d96;cursor:pointer;" @click="handlePresuppose(scope.$index, scope.row)">预设红包</span>
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
          'status': null,
          'pageNum':1,
          'pageSize':10
        },
        filterItem:{
          selectFilter:true,
        },
        selectList:[
          {
            "title": "状态",
            "placeholder":"红包状态",
            "options":[{
              value: '',
              label: '全部'
            }, {
              value: 'true',
              label: '正常'
            }, {
              value: 'false',
              label: '禁用'
            }]
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
          if(val.path === '/operate/redpacket' || val.path === '/operate/redpacket/'){
            this.getTableData();
          }
        }
      },
    },
    methods: {
      // 获取子组件传来的查询数据
      getSearchValueHandle(params){
        if(params.searchState[0] === ''){
          this.paramsData.status = null;
        } else{
          this.paramsData.status = params.searchState[0];
        }
      },
      //获取列表
      getTableData(){
        let vm = this;
        this.axiosGET(vm, vm.$API.API. redPacketSceneList,
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
          obj.scenes = _data[i].scenes;
          obj.sort = _data[i].sort;
          switch(_data[i].status){ //状态
            case true:
              obj.status = '正常';
              break;
            case false:
              obj.status = '禁用';
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
          'status': null,
          'pageNum':1,
          'pageSize':10
        };
        this.getTableData();
      },
      //查看详情
      handleEdit(index, row) {
        this.$router.push({path: '/operate/redpacket/redpacketEdit', query: {id: row.id}})
      },
      handlePresuppose(index, row){
        this.$router.push({path: '/operate/redpacket/packetPresuppose', query: {id: row.id}})
      }

    },
    mounted(){
      this.getTableData();
      this.$store.commit('getAuthorityBtnState',this.$route.path);
    }
  }
</script>
