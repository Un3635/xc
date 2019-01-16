<template>
  <div class="approval-table">
    <el-table :data="tableData" border stripe style="width: 100%;margin-bottom: 18px;" header-row-class-name="table-header" class="remove-scroll-bar">
      <el-table-column
        align="center"
        prop="applyCompanyName"
        label="申请公司">
        <!--<template slot-scope='scope'>-->
          <!--<p class="ellipsis">{{scope.row.applyCompanyName}}</p>-->
        <!--</template>-->
      </el-table-column>
      <el-table-column
        align="center"
        prop="applyReason"
        label="申请原因"
        width="266">
        <!--<template slot-scope='scope'>-->
          <!--<p class="ellipsis">{{scope.row.applyReason}}</p>-->
        <!--</template>-->
      </el-table-column>
      <el-table-column
        align="center"
        prop="applyTime"
        label="申请时间"
        width="135">
        <template slot-scope="scope">
          <span>{{scope.row.applyTime | date('YYYY-MM-DD HH:mm')}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="approvalStatus"
        width="104"
        label="审批状态">
        <template slot-scope="scope">
          <span class="wait" :class="{'wait':scope.row.approvalStatus == 0,'success': scope.row.approvalStatus == 1,'fail':scope.row.approvalStatus == 2}">{{getStatusText(scope.row.approvalStatus)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="approvalTime"
        width="135"
        label="审批时间">
        <template slot-scope="scope">
          <span>{{scope.row.approvalTime | date('YYYY-MM-DD HH:mm')}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="87">
        <template slot-scope="scope">
          <el-button style="color: #29A3FF;" type="text" @click="$router.push({path:'/approval',query:{id:scope.row.id}})">{{scope.row.approvalStatus == 0 ? '审批' : '查看'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="tableData.length != 0"
      style="text-align: right"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      background
      :current-page="page.currentPage"
      :page-sizes="[10,100, 200, 300, 400]"
      :page-size="page.pageSize"
      layout=" prev, pager, next,sizes, jumper"
      :total="page.total">
    </el-pagination>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        tableData:[],
        page:{
          pageSize:10,
          currentPage: 1,
          total: 0
        },
        token: ''
      };
    },
    props:{
      state: Number
    },
    mounted(){
      this.token = localStorage.getItem('xckz_mall');
      this.getDataList();
    },
    methods: {
      handleSizeChange(size){
        this.page.pageSize = size;
        this.getDataList();
      },
      handleCurrentChange(page){
        this.page.currentPage = page;
        this.getDataList();
      },
      getStatusText(state){
        switch (state){
          case 0:
            return '待审核';
          case 1:
            return '审批通过';
          case 2:
            return '未通过';
          default:
            return '未知';
        }
      },
      getDataList(){
        let params = {
          token: this.token,
          approvalStatus: this.state,
          currentPage: this.page.currentPage,
          pageSize: this.page.pageSize,
          t: new Date().getTime()
        }
        if(this.state == -1){
          delete params.approvalStatus;
        }
        this.$http.get('/approval/approvalList',{params: params}).then(res=>{
          if(res.data.code == 1000 && res.data.data){
            this.page.total = res.data.data.totalCount;
            this.tableData = res.data.data.rows || [];
          }else{
            this.$message({
              type: 'warning',
              message: res.data.msg
            });
          }
        })
      }
    },
  }
</script>
<style lang="scss" scoped>
  .approval-table{
    .wait{
      color: #5B8AFF;
    }
    .success{
      color: #70CC52;
    }
    .fail{
      color: #fb242a;
    }
  }
  .ellipsis{
    font-size: 12px;
    white-space: nowrap;
    max-width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>
<style lang="scss">
  .approval-table{
    .el-pagination__jump{
      margin-left: 0px;
    }
    .cell span{
      font-size: 12px;
    }
  }
</style>
<style lang="scss">
  .approval-table{
    .el-table__row td{
      font-size: 12px;
      padding: 4px 0;
    }
  }
</style>
