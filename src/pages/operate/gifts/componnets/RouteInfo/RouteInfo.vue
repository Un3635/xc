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
                    min-width="140">
            </el-table-column>
            <el-table-column
                    prop="giftName"
                    label="礼物名称"
                    show-overflow-tooltip
                    min-width="100">
            </el-table-column>
            <el-table-column
                    prop="giftType"
                    label="礼物类型"
                    min-width="120">
            </el-table-column>
            <el-table-column
                    prop="diamondPrice"
                    label="钻石售价"
                    min-width="110">
            </el-table-column>
            <el-table-column
                    prop="sort"
                    label="排序"
                    min-width="80">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="状态"
                    min-width="80">
            </el-table-column>
            <el-table-column
                    v-if="authorityBtnState"
                    label="操作"
                    min-width="140">
                <template slot-scope="scope">
                    <span style= "color:#003d96;cursor:pointer;" @click="handleSort(scope.$index, scope.row)" v-if="scope.row.status === '正常'">排序</span>
                    <span style= "color:rgba(139,139,139,0.71); cursor:not-allowed;" v-if="scope.row.status === '禁用'">排序</span>
                    <span style= "color:rgba(139,139,139,0.71);padding:0 5px;">|</span>
                    <span style= "color:#003d96;cursor:pointer;" @click="handleEdit(scope.$index, scope.row)" v-if="scope.row.status === '正常'">编辑</span>
                    <span style= "color:rgba(139,139,139,0.71); cursor:not-allowed;" v-if="scope.row.status === '禁用'">编辑</span>
                    <span style= "color:rgba(139,139,139,0.71);padding:0 5px;">|</span>
                    <span style= "color:#003d96;cursor:pointer;" @click="handleUpdate(scope.$index, scope.row)" v-if="scope.row.status === '正常'">更新</span>
                    <span style= "color:rgba(139,139,139,0.71); cursor:not-allowed;" v-if="scope.row.status === '禁用'">更新</span>
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
          'giftName': null,
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
            "title": "名称",
            "placeholder":"礼物名称模糊查找"
          }
        ],
        selectList:[
          {
            "title": "状态",
            "placeholder":"礼物状态",
            "options":[{
              value: '',
              label: '全部'
            }, {
              value: true,
              label: '正常'
            }, {
              value: false,
              label: '禁用'
            }]
          }
        ],
        btnList:{
          "text":"新增礼物"
        }
      }
    },
    computed:{
      ...mapState({
        authorityBtnState: state => state.d2admin.authorityBtnState,
      })
    },
    watch: {
      '$route': {
        handler:function(val) {
          if(val.path === '/operate/gifts' || val.path === '/operate/gifts/'){
            this.getTableData();
          }
        },
        deep:true
      },
      '$store.state.d2admin.refresh':{
        handler:function(val){
          let vm = this;
          if(val){
            setTimeout(()=>{
              vm.getTableData();
              vm.$store.commit('changeRefreshState',false);
            },400)
          }
        },
        deep:true
      }
    },
    methods: {
      // 获取子组件传来的查询数据
      getSearchValueHandle(params){
        if(!params.searchContent[0] || params.searchContent[0] === ''){
          this.paramsData.giftName = null;
        } else {
          this.paramsData.giftName = params.searchContent[0];
        }
        if(params.searchState[0] === ''){
          this.paramsData.status = null;
        } else{
          this.paramsData.status = params.searchState[0];
        }
      },
      //获取列表
      getTableData(){
        let vm = this;
        this.axiosGET(vm, vm.$API.API.giftList,
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
          obj.giftName = _data[i].giftName;
          obj.id = _data[i].id;
          obj.sort = _data[i].sort;
          obj.giftType = _data[i].giftType;
          obj.diamondPrice = _data[i].diamondPrice;
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
          switch(_data[i].giftType){ //礼物类型
            case 1:
              obj.giftType = '普通';
              break;
            case 2:
              obj.giftType = '特效';
              break;
            default:
              obj.giftType = '-'
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
          'giftName': null,
          'status': null,
          'pageNum':1,
          'pageSize':10
        };
        this.getTableData();
      },
      //编辑按钮
      handleEdit(index, row) {
        this.$router.push({path: '/operate/gifts/giftEdit', query: {id: row.id,type:'edit'}})
      },
      //更新按钮
      handleUpdate(index, row) {
        this.$router.push({path: '/operate/gifts/giftEdit', query: {id: row.id,type:'update'}})
      },
      //新增
      addOption(){
        this.$router.push({path: '/operate/gifts/giftAdd'})
      },
      //排序按钮
      handleSort(index, row){
        this.$store.commit('setShowPicPopOn',{type:'info',content:{sort:row.sort,id:row.id}})
      }
    },
    mounted(){
      this.getTableData();
      this.$store.commit('getAuthorityBtnState',this.$route.path);
    }
  }
</script>

<style scoped lang= "scss">
@import '~@/assets/style/public-class.scss';
</style>