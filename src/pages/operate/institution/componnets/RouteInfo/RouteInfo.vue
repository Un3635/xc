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
                style="width:100%;padding:16px 24px;">
            <el-table-column
                    fixed
                    prop="id"
                    label="ID"
                    show-overflow-tooltip
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="机构名称"
                    show-overflow-tooltip
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="agencyInviteUrl"
                    label="机构邀请地址"
                    show-overflow-tooltip
                    width="360">
            </el-table-column>
            <el-table-column
                    prop="score"
                    label="机构评分"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="linkMsNum"
                    label="关联Ms人数"
                    width="130">
            </el-table-column>
            <el-table-column
                    prop="dividedInto"
                    label="Ms&机构分成"
                    width="130">
            </el-table-column>
            <el-table-column
                    prop="term"
                    label="Ms签约有效期(天)"
                    width="170">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="状态"
                    width="100">
            </el-table-column>
            <el-table-column
                    label="操作"
                    prop="btnStatus"
                    width="80">
                <template slot-scope="scope">
                    <p style= "color:#003d96;cursor:pointer;" @click="handleDetail(scope.$index, scope.row)">{{scope.row.btnStatus}}</p>
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
          'name': null,
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
            "placeholder":"机构名称模糊查找"
          }
        ],
        selectList:[
          {
            "title": "状态",
            "placeholder":"机构状态",
            "options":[{
              value: '',
              label: '全部'
            }, {
              value: '1',
              label: '正常'
            }, {
              value: '0',
              label: '禁用'
            }]
          }
        ],
        btnList:{
          "text":"新增机构"
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
          if(val.path === '/operate/institution' || val.path === '/operate/institution/'){
            this.getTableData();
          }
        }
      },
    },
    methods: {
      // 获取子组件传来的查询数据
      getSearchValueHandle(params) {
        if (!params.searchContent[0] || params.searchContent[0] === '') {
          this.paramsData.name = null;
        } else {
          this.paramsData.name = params.searchContent[0];
        }
        if (!params.searchState[0] || params.searchState[0] === '') {
          this.paramsData.status = null;
        } else {
          this.paramsData.status = Number(params.searchState[0]);
        }
      },
      //获取列表
      getTableData() {
        let vm = this;
        this.axiosGET(vm, vm.$API.API.agencyList,
          'application/x-www-form-urlencoded',
          vm.paramsData,
          vm.getSuccessCB
        )
      },
      //成功回调
      getSuccessCB(vm, res) {
        vm.totalSize = res.count;
        if (!res.data || res.data === '') {
          this.tableData = [];
        } else {
          vm.setTableData(res.data)
        }
      },
      //设置表格数据
      setTableData(_data) {
        let myData = [];
        for (let i = 0; i < _data.length; i++) {
          let obj = {};
          obj.id = _data[i].id;
          obj.name = _data[i].name;
          obj.agencyInviteUrl = _data[i].agencyInviteUrl;
          obj.score = _data[i].score;
          obj.linkMsNum = _data[i].linkMsNum;
          obj.dividedInto = _data[i].dividedInto;
          obj.term = _data[i].term;
          switch (_data[i].status) { //状态
            case 1:
              obj.status = '正常';
              obj.btnStatus = '编辑';
              break;
            case 0:
              obj.status = '禁用';
              obj.btnStatus = '查看';
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
      filterData(params) {
        this.getSearchValueHandle(params);
        this.paramsData.pageNum = 1;
        this.getTableData();
      },
      //重置按钮
      resetData() {
        this.paramsData = {
          'name': null,
          'status': null,
          'pageNum': 1,
          'pageSize': 10
        };
        this.getTableData();
      },
      //查看详情
      handleDetail(index, row) {
        if(row.btnStatus === '查看'){
          this.$router.push({path: '/operate/institution/institutionDetail', query: {id: row.id}})
        } else if(row.btnStatus === '编辑' && this.authorityBtnState) {
          this.$router.push({path: '/operate/institution/institutionEdit', query: {id: row.id}})
        }else if(row.btnStatus === '编辑' && !this.authorityBtnState) {
         this.$message.error('权限不足，无法编辑！')
        }
      },
      //新增
      addOption() {
        this.$router.push({path: '/operate/institution/institutionAdd'})
      },
    },
    mounted(){
      this.getTableData();
      this.$store.commit('getAuthorityBtnState',this.$route.path);
    }
  }
</script>

<style scoped lang="scss">

</style>