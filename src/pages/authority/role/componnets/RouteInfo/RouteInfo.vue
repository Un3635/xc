<template>
  <div class="user">
    <div class="user-search">
      <div class="input-box">
        <el-input placeholder="角色名称" v-model="searchContent" class="input-with-select" id="userNameFilter" clearable></el-input>
      </div>
      <el-select v-model="optionValue" placeholder="状态" class="account-select" id="account-select">
        <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" class="btn" @click="dataFilter">查询</el-button>
      <el-button type="primary" class="btn" @click="resetFilter" plain>重置</el-button>
      <el-button type="primary" class="new-btn" @click="goRoleAdd" v-if="btnDisabled">新增角色</el-button>
    </div>
    <el-table
            highlight-current-row
            :data="roleTable"
            class="user-table1"
            style="width: 100%;padding:16px 24px;">
      <el-table-column
              prop="id"
              label="ID"
              min-width="85">
      </el-table-column>
      <el-table-column
              prop="name"
              label="角色标志"
              min-width="40">
      </el-table-column>
      <el-table-column
              prop="displayName"
              label="角色名称"
              min-width="55">
      </el-table-column>
      <el-table-column
              prop="status"
              label="状态"
              min-width="30">
      </el-table-column>
      <el-table-column
              prop="createdAt"
              label="创建时间"
              min-width="60">
      </el-table-column>
      <el-table-column
              label="操作"
              width="320">
        <template slot-scope="scope">
              <el-button size="small" type="primary" plain style="width:60px;height:30px;" @click="handleClick(scope.row)">查看</el-button>
              <el-button size="small" type="primary"  style="width:60px;height:30px;" @click="goRoleEdit(scope.row)" v-if="btnDisabled">编辑</el-button>
              <el-button size="small" type="primary"  style="width:90px;height:30px;" @click="goRoleSetting(scope.row)" v-if="btnDisabled">权限设置</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-box">
      <el-pagination
              background
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-size="pageSize"
              :total="totalSize"
              layout="prev, pager, next, jumper"
              v-if="totalSize > pageSize">
      </el-pagination>
      <div class="pagination-tail" v-if="totalSize > pageSize">，共{{Math.ceil(totalSize/pageSize)}}页</div>
    </div>
  </div>
</template>

<script>
    import util from '@/libs/util.js'
    import {mapState} from 'vuex'
    export default {
        data(){
            return {
              searchContent:'',
              optionValue: '',
              currentPage:1,
              pageSize:10,
              totalSize:0,
              status:'',
              displayName:'',
              roleId:'', //查看详情的id
              roleTable:[],
              options: [{
                value: '全部',
                label: '全部'
              }, {
                value: '启用',
                label: '启用'
              }, {
                value: '停用',
                label: '停用'
              }],
              btnDisabled:true,
              //权限
              userAuthorityAll:[],
              isSuper:''
            }
        },
        computed:{
          ...mapState({
            userAuthority: state => state.d2admin.userAuthority
          })
        },
        watch:{
          '$route': {
            handler(val){
              if(val.path === '/authority/role' || val.path === '/authority/role/'){
                this.getRoleList(this.currentPage,this.pageSize,this.displayName,this.status);
              }
            },
            deep:true
          }
        },
        methods: {
          //设置按钮禁用
          setDisabledBtn(){
            if(util.cookies.get('userAuthorityAll')){
              this.userAuthorityAll = JSON.parse(util.cookies.get('userAuthorityAll'));
            }
            this.isSuper = util.cookies.get('isSuper');
            if (Number(this.isSuper) === 1 || (util.cookies.get('userAuthorityAll') && this.userAuthorityAll.indexOf('manager.permissionManage.roleManage') !== -1)) {
              this.btnDisabled = true;
            } else {
              this.btnDisabled = false;
            }
          },
          getCellClass({row, column, columnIndex}) { //改变表格中某个单元格字体颜色
              if (columnIndex == 5 && row[column.property].indexOf('撤出黑名单') > -1) {
                  return 'active-gray'
              } else if(columnIndex == 5 && row[column.property].indexOf('拉黑') > -1){
                  return 'active-blue'
              } else {
                  return ''
              }
          },
          //获取角色列表
          getRoleList(currentPage, pageSize, displayName, status){
            let vm = this;
            this.axiosPOST(vm, vm.$API.API.roleList,
              'application/x-www-form-urlencoded;charset=UTF-8',
              {currentPage, pageSize,displayName,status},
              vm.getSuccessCB,
              vm.getErrorCB
            )
          },
          //成功回调
          getSuccessCB(vm,res){
            vm.totalSize = res.count;
            if(!res.data || res.data === ''){
              vm.roleTable = [];
            } else {
              vm.roleId = res.data;
              vm.setRoleTableData(res.data);
            }
          },
          //失败回调
          getErrorCB(err){
            console.log(err)
          },
          //设置表格数据
          setRoleTableData(_data) {
            let myData = [];
            for (let i = 0; i <_data.length; i++) {
              let obj = {};
              obj.id = _data[i].id;
              obj.createdAt = _data[i].createdAt;
              if(!_data[i].name || _data[i].name === ''){
                obj.name= '-'
              } else {
                obj.name = _data[i].name
              }
              if(!_data[i].displayName || _data[i].displayName === ''){
                obj.displayName = '-'
              } else {
                obj.displayName = _data[i].displayName
              }
              if(_data[i].status === 1){
                obj.status = '启用'
              } else {
                obj.status = '停用'
              }
              if(!_data[i].description || _data[i].description === ''){
                obj.description = '-';
              } else {
                obj.description = _data[i].description
              }
              myData[i] = obj;
            }
            this.roleTable = myData;
          },
          //分页器选择页数
          handleCurrentChange(page) {
            this.currentPage = page;
            this. getRoleList(this.currentPage,this.pageSize,this.displayName,this.status);
          },
          //筛选数据
          dataFilter(){
            this.currentPage = 1;
            // this.displayName = encodeURI(this.searchContent.toString())
            this.displayName = this.trimStr(this.searchContent.toString());
            if(this.optionValue === '启用'){
              this.status = 1
            } else if(this.optionValue === '停用') {
              this.status = 2
            } else {
              this.status = ''
            }
            this.getRoleList(this.currentPage,this.pageSize,this.displayName,this.status);
          },
          //重置按钮
          resetFilter(){
            this.status = '';
            this.displayName = '';
            this.currentPage = 1;

            this.searchContent = '';
            this.optionValue = '';
            this.getRoleList(this.currentPage,this.pageSize,this.displayName,this.status);
          },
          //新增角色按钮
          goRoleAdd(){
            this.$router.push('/authority/role/roleAdd');
          },
          //查看按钮
          handleClick(row){
            this.$router.push({path: '/authority/role/roleDetail', query: {id: row.id}})
          },
          //编辑按钮
          goRoleEdit(row){
            this.$router.push({
              name:'roleEdit',
              params:{
                id: row.id,
                name:row.name,
                displayName:row.displayName,
                description:row.description,
                status:row.status
              }
            })
          },
          //权限设置按钮
          goRoleSetting(row){
            this.$router.push({path: '/authority/role/roleSetting', query: {id: row.id}})
          },
          //去除首位空格
          trimStr(str){
            return str.replace(/(^\s*)|(\s*$)/g,"");
          }
        },
        mounted(){
          this.getRoleList(this.currentPage,this.pageSize,this.displayName,this.status);
          this.setDisabledBtn();
        }
    }
</script>

<style scoped lang= "scss">
  @import '~@/assets/style/public-class.scss';
  .user {
    width:100%;
    margin:30px auto;

    .user-search{
      width:100%;
      margin:0 auto 30px;
      @include clearfix;
      .txt{
        float:left;
        display:inline-block;
        font-size:14px;
        line-height:40px;
      }
      .input-box {
        float:left;
        width: 220px;
        height: 40px;
        margin-right:20px;
      }
      .account-select {
        float:left;
        margin-right:20px;
      }
      .btn{
        float:left;
        width:100px;
        height:40px;
      }
      .new-btn{
        float:right;
      }
    }
    .recharge-pagination{
      margin:30px auto;
      text-align:center;
    }

  }
</style>