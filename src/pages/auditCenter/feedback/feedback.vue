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
        :page = "page"
        :tatalCount="tatalCount"
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
import config from './feedback.config.js'
import {mapState} from 'vuex'
export default {
  name: 'feedback',
  components: {
    filterList,
    XTable
  },
  data() {
    return {
      pageLoading: false,
      title: '',
      searchList: [],
      selectList: [],
      tHeader: '',
      filterItem: {},
      data: [],
      tatalCount: 0,
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
        if(val.path === '/audit/feedback' || val.path === '/audit/feedback/'){
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
      this.pageLoading = true;
      this.axiosGET(this, this.$API.API[config[this.routerName].list], 
          'application/x-www-form-urlencoded', 
          Object.assign({
             pageNum: this.page,
             pageSize: this.pagesize
          }, this.filterData),
      (o, res) => {
        this.pageLoading = false;
        this.data = res.data;
        this.tatalCount = res.count;
        this.data.forEach((item) => {
           Object.assign(item, {
             statusName: this.selectList[0].options[item.status+1].label
           });
         })
      });
      return this;
    },
    opStr(o) {
      if(o.status === 0 && this.authorityBtnState){
        return '回复'
      }else if (o.status === 0 && !this.authorityBtnState){
        return ''
      }else {
        return '查看'
      }
    },
    handleDetail(index, row){
      this.$router.push({
        path: '/audit/feedback/detail',
        query: {
          id: row.id,
          status: row.status
        }
      });
    },
    filterDataHandle(filterData) {
      // 查询
      this.filterData = {
        feedbackMid: filterData.searchContent[0] ? filterData.searchContent[0] : null,
        status: filterData.searchState[0] ? filterData.searchState[0] : null
      }
      this.getData();
    },
    resetDataHandle() {
      // 重置
       this.filterData = [];
      this.page =1;
      this.getData();
    },
    pagination(page) {
      // 分页
      this.page = page;
      // console.log(this.page);
      this.getData();
    }
  },
  created() {
    this.routerName = this.$route.name;
    this.setData().getData();
    this.$store.commit('getAuthorityBtnState',this.$route.path);
  }
}
</script>
<style lang="scss" scoped>

</style>
