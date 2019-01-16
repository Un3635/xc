<template>
    <d2-container>
        <template slot="header"><span></span>预设红包<i class="el-icon-close detail-close" @click="$router.go(-1)"></i></template>
        <div class="presuppose"
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
                        prop="copyWrite"
                        label="预设文案"
                        min-width="180">
                </el-table-column>
                <el-table-column
                        prop="price"
                        label="价值（钻石）"
                        min-width="100">
                </el-table-column>
                <el-table-column
                        prop="status"
                        label="状态"
                        min-width="100">
                </el-table-column>
                <el-table-column
                        v-if="authorityBtnState"
                        label="操作"
                        min-width="100">
                    <template slot-scope="scope">
                        <span style= "color:#003d96;cursor:pointer;" @click="handleEdit(scope.$index, scope.row)">编辑</span>
                    </template>
                </el-table-column>
            </el-table>
            <pagination
                    :page-num="paramsData.pageNum"
                    :page-size="paramsData.pageSize"
                    :total-size="totalSize"
                    @pageChangeHandle="handleCurrentChange"/>
        </div>
    </d2-container>

</template>

<script>
  import FilterList from "../../../../components/filter/filterList";
  import Pagination from "../../../../components/pagination/pagination";
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
          'scenesId':null,
          'pageNum':1,
          'pageSize':10
        },
        filterItem:{
          selectFilter:true,
        },
        selectList:[
          {
            "title": "状态",
            "placeholder":"预设红包状态",
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
          if(val.path === '/operate/redpacket/packetPresuppose' || val.path === '/operate/redpacket/packetPresuppose/'){
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
        this.axiosGET(vm, vm.$API.API. redPacketList,
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
          obj.copyWrite = _data[i].copyWrite;
          obj.price = _data[i].price;
          obj.scenesId = _data[i].scenesId;
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
          'scenesId':this.$route.query.id,
          'pageNum':1,
          'pageSize':10
        };
        this.getTableData();
      },
      //查看详情
      handleEdit(index, row) {
        this.$router.push({path: '/operate/redpacket/packetPresuppose/presupposeEdit', query: {id: row.id}})
      }

    },
    mounted(){
      this.paramsData.scenesId = this.$route.query.id;
      this.getTableData();
      this.$store.commit('getAuthorityBtnState',this.$route.path);
    }
  }
</script>
