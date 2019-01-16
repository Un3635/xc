<template>
  <d2-container 
       v-loading="pageLoading"
       element-loading-text="加载中..."
       element-loading-background="rgba(255, 255, 255, 0.8)"
    >
      <template slot="header" style="font-size:18px;font-weight:800;">{{title}}</template>
      <filterList 
        :filterItem="filterItem" 
        :searchList="searchList" 
        :selectList="selectList" 
        @filterDataHandle="filterDataHandle" 
        @resetDataHandle="resetDataHandle" 
      >
      </filterList>
      <x-table
        :tHeader="tHeader" 
        :dataList="data"
        :page="page"
        :tatalCount="totalCount"
        @pagination="pagination"
      >
         <el-table-column
          label="操作"
          width="140"
          >
          <template slot-scope="scope">
            <p style= "color:#003d96;cursor:pointer;" @click="handleDetail(scope.$index, scope.row)">{{opStr(scope.row)}}</p>
          </template>
        </el-table-column>
      </x-table>
  </d2-container>
</template>
<script>
import XTable from '@/components/common/x-table';
import filterList from "@/components/filter/filterList";
import config from './report.config.js'
import {mapState} from 'vuex'
export default {
  name: 'report',
  data() {
    return {
      pageLoading: false,
      title: '',
      searchList: '',
      selectList: '',
      tHeader: '',
      filterItem: {},
      data: [],
      totalCount: 0,
      page: 1,
      pagesize: 10,
      filterData: {},
      routerName: ''
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
        if(val.path === '/audit/report' || val.path === '/audit/report/'){
          this.getData();
        }
      }
    },
  },
  methods: {
    setData() {
     this.title = config[this.routerName].title;
     this.searchList = config[this.routerName].searchList || null;
     this.selectList = config[this.routerName].selectList || null;
     if( this.searchList ) this.filterItem.searchFilter = true;
     if( this.selectList ) this.filterItem.selectFilter = true;
     this.tHeader = config[this.routerName].tHeader;
     return this;
   },
    getData() {
      let vm =this;
      this.pageLoading = true;
      vm.axiosGET(vm, vm.$API.API[config[vm.routerName].list],
          'application/x-www-form-urlencoded', 
          Object.assign({
             pageNum: vm.page,
             pageSize: vm.pagesize
          }, vm.filterData),
      (o, res) => {
        vm.pageLoading = false;
        vm.data = res.data;
        vm.totalCount = res.count;

        vm.data.forEach((item) => {
           Object.assign(item, {
             statusName: vm.selectList[0].options[item.status + 1].label,
             resultName: item.result ? vm.selectList[1].options[item.result].label : '-'
           });
         })
      });
      return vm;
    },
    opStr(o) {
      if(o.status === 0 && this.authorityBtnState){
        return '处理'
      } else if (o.status === 0 && !this.authorityBtnState){
        return ''
      } else {
        return '查看'
      }
    },
    handleDetail(index, row){
      this.$router.push({
        path: '/audit/report/detail',
        query: {
          id: row.id,
          status: row.status
        }
      });
    },
    filterDataHandle(filterData) {
      // 查询
      this.filterData = {
        informerMid: filterData.searchContent[0] ? filterData.searchContent[0] : null,
        reportedMid: filterData.searchContent[1] ? filterData.searchContent[1] : null,
        status: filterData.searchState[0] ? filterData.searchState[0] : null,
        result: filterData.searchState[1]? filterData.searchState[1] : null
      };
      this.getData();
    },
    resetDataHandle() {
      // 重置
       this.filterData = [];
       this.page=1;
       this.getData();
    },
    pagination(page) {
      // 分页
      this.page = page;
      this.getData();
    }
  },
  created() {
    this.routerName = this.$route.name;
    this.setData().getData();
    this.$store.commit('getAuthorityBtnState',this.$route.path);
  },
  components: {
    filterList,
    XTable
  }
}
</script>
<style lang="scss" scoped>

</style>
