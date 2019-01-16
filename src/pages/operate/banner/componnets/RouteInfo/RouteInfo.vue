<template>
  <div class="page-wrap"
       v-loading="pageLoading"
       element-loading-text="加载中..."
       element-loading-background="rgba(255, 255, 255, 0.8)"><!--:render-header="labelHead"-->
    <filter-list
            :filterItem="filterItem"
            :selectList="selectList"
            :searchList="searchList"
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
              fixed
              min-width="190"
              prop="id"
              show-overflow-tooltip
              label="ID">
      </el-table-column>
      <el-table-column
              prop="title"
              min-width="160"
              show-overflow-tooltip
              label="标题">
      </el-table-column>
      <el-table-column
              prop="ownTabId"
              min-width="170"
              show-overflow-tooltip
              label="所属Tab">
      </el-table-column>
      <el-table-column
              prop="startTime"
              min-width="110"
              label="上线日期">
      </el-table-column>
      <el-table-column
              prop="endTime"
              min-width="110"
              label="下线日期">
      </el-table-column>
      <el-table-column
              prop="sort"
              min-width="80"
              label="排序">
      </el-table-column>
      <el-table-column
              prop="status"
              min-width="90"
              label="状态">
      </el-table-column>
      <el-table-column
              label="操作"
              min-width="160">
              <template slot-scope="scope">
                <p style= "color:#003d96;cursor:pointer;" @click="handleDetail(scope.$index, scope.row)" v-if="scope.row.btnStatus==='查看'">查看</p>
                <p style= "color:#003d96;cursor:pointer;" v-if="scope.row.btnStatus==='暂停'" @click="changeStatus(scope.$index, scope.row,2)">暂停</p>
                <span style= "color:#003d96;cursor:pointer;"  v-if="scope.row.btnStatus==='编辑'&& authorityBtnState" @click="handleDetail(scope.$index, scope.row)">编辑</span>
                <span style= "color:#aaa;display:inline-block;padding:0 3px;" v-if="scope.row.btnStatus==='编辑' && authorityBtnState">|</span>
                <span style= "color:#555;cursor:pointer;" v-if="scope.row.btnStatus==='编辑'" @click="changeStatus(scope.$index, scope.row)">恢复</span>
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
          'id':null,
          'pageNum':1,
          'pageSize':10
        },
        filterItem:{
            searchFilter:true,
            selectFilter:true,
            addBtn:true
          },
        selectList:[  //传到filter的下拉数据
          {
            "title": "状态",
            "placeholder":"Banner状态",
            "options":[{
              value: '',
              label: '全部'
            }, {
              value: '0',
              label: '未开始'
            }, {
              value: '1',
              label: '进行中'
            }, {
              value: '2',
              label: '暂停中'
            }, {
              value: '3',
              label: '已过期'
            }]
          }
        ],
        searchList:[
          {
            "title": "标题",
            "placeholder":"输入Banner标题"
          }
        ],
        btnList:{
          "text":"新增Banner"
        },
        btnStatus:{
          editBtn:false,
          suspendBtn:false,
          detailBtn:false
        }
      }
    },
    computed:{
      ...mapState({
        authorityBtnState: state => state.d2admin.authorityBtnState
      }),
    },
    watch: {
      '$route': {
        handler(val) {
          if(val.path === '/operate/banner' || val.path === '/operate/banner/'){
            this.getTableData();
          }
        }
      },
    },
    methods: {
       // 获取子组件传来的查询数据
       getSearchValueHandle(params){
         if(!params.searchContent[0] || params.searchContent[0] === ''){
           this.paramsData.title = null;
         } else {
           this.paramsData.title = params.searchContent[0];
         }
         if(!params.searchState[0] || params.searchState[0] === ''){
           this.paramsData.status = null;
         } else {
           this.paramsData.status = Number(params.searchState[0]);
         }
        },
       //获取列表
       getTableData(){
          let vm = this;
          this.axiosGET(vm, vm.$API.API.bannerList,
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
            obj.id = _data[i].id;
            obj.title = _data[i].title ? _data[i].title : '-';
            if(_data[i].startTime){
              obj.startTime=/\d{4}-\d{1,2}-\d{1,2}/g.exec(_data[i].startTime)
            } else {
              obj.startTime= '-'
            }
            if(_data[i].endTime){
              obj.endTime=/\d{4}-\d{1,2}-\d{1,2}/g.exec(_data[i].endTime)
            } else {
              obj.endTime= '-'
            }
            obj.sort = _data[i].sort;
            obj.ownTabId = _data[i].ownTabId ? _data[i].ownTabId : '-';
            switch(_data[i].status){ //详细类型
              case 0:
                obj.status = '未开始';
                obj.btnStatus = '暂停';
                break;
              case 1:
                obj.status = '进行中';
                obj.btnStatus = '暂停';
                break;
              case 2:
                obj.status = '暂停中';
                obj.btnStatus = '编辑';
                break;
              case 3:
                obj.status = '已过期';
                obj.btnStatus = '查看';
                break;
              default:
                obj.status = '-'
                obj.btnStatus = '查看';
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
          'title': null,
          'status':null,
          'pageNum':1,
          'pageSize':10
        };
         this.getTableData();
      },
       //查看详情
       handleDetail(index, row) {
         if(row.btnStatus === '查看'){
           this.$router.push({path: '/operate/banner/bannerDetail', query: {id: row.id}})
         } else if(row.btnStatus === '编辑'){
           this.$router.push({path: '/operate/banner/bannerEdit', query: {id: row.id}})
         }

       },
      //暂停
      changeStatus(index,row,num){
        let vm = this;
        let _params = {}
        if(num) {
          _params = {
            'bannerId': row.id,
            'status': num
          }
        } else {
          _params = {
            'bannerId': row.id,
            'status':8
          }
        }
        // console.log(_params.status)
        this.axiosPOST(vm, vm.$API.API.bannerStatus,
          'application/x-www-form-urlencoded',
          _params,
          (vm,res) => {
            vm.getTableData();
          }
        )
      },
      //新增
      addOption(){
        this.$router.push({path: '/operate/banner/bannerAdd'})
      }
    },
    mounted(){
      this.getTableData();
      this.$store.commit('getAuthorityBtnState',this.$route.path);
    }
}
</script>
