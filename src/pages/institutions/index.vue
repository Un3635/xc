<template>
  <d2-container>
      <template slot="header" style="font-size:18px;font-weight:800;">{{title}}</template>
      <filterList 
      :filterItem="filterItem" 
      :searchList="searchList" 
      :selectList="selectList" 
      @filterDataHandle="filterDataHandle" 
      @resetDataHandle="resetDataHandle" 
      ></filterList>
      <x-table
        :tHeader="tHeader" 
        :dataList="data" 
        :tatalCount="totalCount"
        @pagination="pagination"
      >
         <el-table-column
          label="操作"
          min-width="134"
          >
          <template slot-scope="scope">
            <p style= "color:#003d96;cursor:pointer;" @click="handleSign(scope.$index, scope.row)" v-if="scope.row.status === '待签约' && authorityBtnState">签约</p>
            <span style= "color:#003d96;cursor:pointer;" @click="handleEdit(scope.$index, scope.row)" v-if="scope.row.status === '正常' && authorityBtnState">编辑</span>
            <span style= "color:#003d96;padding:0 3px;" v-if="scope.row.status === '正常'&& authorityBtnState">|</span>
            <span style= "color:#003d96;cursor:pointer;" @click="handleCancelSign(scope.$index, scope.row)" v-if="scope.row.status === '正常'&& authorityBtnState">取消签约</span>
            <p style= "color:#dcdcdc;cursor:not-allowed;" v-if="scope.row.status === '已失效'|| scope.row.status === '拒绝' || !authorityBtnState">编辑</p>
          </template>
        </el-table-column>
      </x-table> 
  </d2-container>
</template>
<script>
import XTable from '@/components/common/x-table';
import filterList from "@/components/filter/filterList";
import config from './config'
import {mapState} from 'vuex'
export default {
  name: 'signing',
  components: {
    filterList,
    XTable
  },
  data() {
    return {
      title: '',
      searchList: '',
      selectList: '',
      tHeader: '',
      filterItem: {},
      filterData: {},
      data: [],
      totalCount: 0,
      alarm: {
        opStr: '' // 可以获取子组件的数据
      },
      page: 1,
      pagesize: 10,
      routerName:''
    }
  },
  computed:{
    ...mapState({
      authorityBtnState: state => state.d2admin.authorityBtnState
    })
  },
  watch: {
    '$route'(to, from) {
      this.setData(to.name);
      this.getData(to.name);
    }
  },
  methods: {
    setData() {
      this.title = config[this.routerName].title;
      this.searchList = config[this.routerName].searchList || null;
      this.selectList = config[this.routerName].selectList || null;
      if( this.searchList ) this.filterItem.searchFilter = true;
      if( this.selectList ) this.filterItem.selectFilter = true;
      this.tHeader = config[this.routerName].tHeader;
    },
    getData() {
      let vm =this;
      vm.axiosGET(vm, vm.$API.API[config[this.routerName].list],
        'application/x-www-form-urlencoded',
        Object.assign({
          pageNum: this.page,
          pageSize: this.pagesize
        }, this.filterData),
        (o, res) => {
          vm.data = res.data;
          vm.totalCount = res.count;
          vm.data.forEach((item) => {
            Object.assign(item, {
              onlineName: item.userOnlineStatus === 0 ? '离线' : '在线',
            });
            if(item.status !== 0 && !item.status ){
              item.status = '-'
            } else {
              item.status = vm.selectList[0].options[item.status + 1].label
            }
            if(item.msSignTime){
              item.msSignTime = /\d{4}-\d{1,2}-\d{1,2}/g.exec(item.msSignTime)
            }
            if(item.msExpireTime) {
              item.msExpireTime = /\d{4}-\d{1,2}-\d{1,2}/g.exec(item.msExpireTime)
            }
          })
        });
    },
    //筛选
    filterDataHandle(filterData) {
      this.filterData = {
        meetId: filterData.searchContent[0],
        remark: filterData.searchContent[1],
        status: filterData.searchState[0]
      };
      this.getData();
    },
    //重置
    resetDataHandle() {
      this.filterData=[];
      this.page = 1;
      this.pagesize = 10;
      this.getData();
    },
    // 分页
    pagination(page) {
      this.page = page;
      this.getData();
    },
    //签约按钮
    handleSign(index,row){
      this.$router.push({
        path: '/institutions/signing/sign',
        query: {
          id: row.id
        }
      });
    },
    //编辑按钮
    handleEdit(index,row){
      this.$router.push({
        path: '/institutions/signing/edit',
        query: {
          id: row.id
        }
      });
    },
    //取消签约
    handleCancelSign(index,row){
      let vm =this;
      vm.$confirm('请谨慎执行该操作，确定要取消签约吗？', '', {
        confirmButtonText: '确定',
        cancelButtonText: '放弃',
        type: 'warning'
      })
        .then(() => {
          vm.axiosPOST(vm, vm.$API.API.signCancel,
            'application/x-www-form-urlencoded',
            {id:row.id},
            (vm,res)=>{
              vm.$message({
                message: '已取消签约！',
                type: 'success'
              });
              vm.getData(vm.$route.name);
            }
          )
        })
        .catch(() => {
          vm.$message('放弃取消签约')
        })
    }
  },
  created() {
    this.routerName = this.$route.name;
    this.setData(this.$route.name);
    this.getData(this.$route.name);
    this.$store.commit('getAuthorityBtnState',this.$route.path);
  }
}
</script>
<style lang="scss" scoped>

</style>
