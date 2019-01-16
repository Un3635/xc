<template>
  <div class="user"
       v-loading="pageLoading"
       element-loading-text="加载中..."
       element-loading-background="rgba(255, 255, 255, 0.8)">
    <div class="user-search">
      <div class="input-box">
        <el-input placeholder="用户名" v-model="searchContent" class="input-with-select" clearable></el-input>
      </div>
      <el-select v-model="optionValue" placeholder="状态" class="account-select">
        <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" class="btn" @click="dataFilter">查询</el-button>
      <el-button type="primary" class="btn" @click=" resetFilter" plain>重置</el-button>
      <el-button type="primary" class="new-btn" @click="goAccountAdd" v-if="btnDisabled">新增用户</el-button>
    </div>
    <el-table
            highlight-current-row
            :data="accountTable"
            class="user-table1"
            style="width: 100%;padding:16px 24px;">
      <el-table-column
              prop="id"
              label="ID"
              min-width="100">
      </el-table-column>
      <el-table-column
              prop="userName"
              label="用户名"
              min-width="70">
      </el-table-column>
      <el-table-column
              prop="nickname"
              label="昵称"
              min-width="60">
      </el-table-column>
      <el-table-column
              prop="roleName"
              label="角色"
              min-width="65">
      </el-table-column>
      <el-table-column
              prop="status"
              label="状态"
              min-width="55">
      </el-table-column>
      <el-table-column
              prop="createdAt"
              label="创建时间"
              min-width="110">
      </el-table-column>
      <el-table-column
              label="操作"
              min-width="110">
        <template slot-scope="scope">
              <el-button size="small" type="primary" plain style="width:60px;height:30px;" @click='goAccountDetail(scope.row)'>查看</el-button>
              <el-button size="small" type="primary"  style="width:60px;height:30px;" @click="goAccountEdit(scope.row)" v-if="btnDisabled">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-box">
      <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[100, 200, 300, 400]"
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
    import {mapState} from 'vuex'
    import util from '@/libs/util.js'
    import { mapActions } from 'vuex'
    export default {
      data() {
        return {
          searchContent: '',
          optionValue: '',
          currentPage: 1,
          pageSize:10,
          totalSize:'',
          status:'',
          userName:'',
          accountTable:[],
          options: [{
            value: '全部',
            label: '全部'
          }, {
            value: '启用',
            label: '启用'
          }, {
            value: '停用',
            label: '停用'
          }, {
            value: '待修改密码',
            label: '待修改密码'
          }],
          allRoles: [],
          btnDisabled:true,
          //权限
          userAuthorityAll:[],
          isSuper:'',
          pageLoading: true
        }
      },
      computed:{
        ...mapState({
          userAuthority: state => state.d2admin.userAuthority,
        })
      },
      watch:{
       '$route': {
         handler(val){
           if(val.path === '/authority/account' || val.path === '/authority/account/'){
             this.getAccountList(this.currentPage,this.pageSize,this.userName,this.status);
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
          if (Number(this.isSuper) === 1 || (util.cookies.get('userAuthorityAll') && this.userAuthorityAll.indexOf('manager.permissionManage.adminUser') !== -1)) {
            this.btnDisabled = true;
          } else {
            this.btnDisabled = false;
          }
        },
        //获取所有角色
        getAllRoles(){
          let vm = this;
          this.axiosPOST(vm, vm.$API.API.allRoles,
            'application/x-www-form-urlencoded',
            {},
            vm.getSuccessCB,
            vm.getErrorCB
          )
        },
        //成功回调
        getSuccessCB(vm,res){
          if(res.data){
            vm.allRoles = res.data;
          }
        },
        //失败回调
        getErrorCB(err){
          console.log(err)
        },
        //获取账号列表
        getAccountList(currentPage,pageSize,userName,status){
          let vm = this;
          this.axiosPOST(vm, vm.$API.API.accountList,
            'application/x-www-form-urlencoded',
            {currentPage,pageSize,userName,status},
            vm.getAccountSuccessCB,
            vm.getErrorCB
          )
        },
        //获取账号列表成功回调
        getAccountSuccessCB(vm,res){
          vm.totalSize = res.count;
          if(!res.data || res.data === ''){
            vm.accountTable = [];
          } else {
            vm.setAccountTableData(res.data)
          }
        },
        //设置表格数据
        setAccountTableData(_data) {
          let myData = [];
          for (let i = 0; i <_data.length; i++) {
            let obj = {};
            obj.id = _data[i].id;
            obj.userName = _data[i].userName;
            obj.createdAt = _data[i].createdAt;
            if(!_data[i].nickname || _data[i].nickname === ''){
              obj.nickname = '-'
            } else {
              obj.nickname = _data[i].nickname
            }
            if(!_data[i].roleName || _data[i].roleName === ''){
              obj.roleName = '-'
            } else {
              obj.roleName = _data[i].roleName
            }
            if( _data[i].status === 1) {
              obj.status = '启用';
            } else if (_data[i].status === 2) {
              obj.status = '停用'
            } else {
              obj.status = '待修改密码'
            }
            myData[i] = obj;
          }
          this.accountTable = myData;
        },
        //点击查看按钮
        goAccountDetail(row){
          this.$router.push({
            name:'accountDetail',
            query:{
              id: row.id,
              roleName: row.roleName
            }
          })
        },
        //点击编辑按钮
        goAccountEdit(row){
          let tmpStatus = '';
          row.status === '启用'? tmpStatus = 1 : tmpStatus = 2;
          this.$router.push({
            name:'accountEdit',
            query:{
              id: row.id,
              roleName: row.roleName
            }
          })
        },
        //新增账户按钮
        goAccountAdd(){
          this.$router.push('/authority/account/accountAdd');
        },
        //分页器
        handleCurrentChange(page) {
          this.currentPage = page;
          this.getAccountList(this.currentPage,this.pageSize,this.userName,this.status);
        },
        //账户数据改变
        handleSizeChange(val) {
          this.currentPage = 1;
          this.userName = '';
          this.status = '';
          this.getAccountList(this.currentPage,this.pageSize,this.userName,this.status);
        },
        //筛选数据
        dataFilter(){
          this.currentPage = 1;
          this.userName = this.trimStr(this.searchContent.toString());
          if(this.optionValue === '启用'){
            this.status = 1
          } else if(this.optionValue === '停用') {
            this.status = 2
          } else if(this.optionValue === '待修改密码') {
            this.status = 3
          } else {
            this.status = ''
          }
          this.getAccountList(this.currentPage,this.pageSize,this.userName,this.status);
        },
        //重置按钮
        resetFilter(){
          this.status = '';
          this.userName = '';
          this.currentPage = 1;
          this.searchContent = '';
          this.optionValue = '';
          this.getAccountList(this.currentPage,this.pageSize,this.userName,this.status);
        },
        //去除首位空格
        trimStr(str){
          return str.replace(/(^\s*)|(\s*$)/g,"");
        }
      },
      mounted(){
        this.getAccountList(this.currentPage,this.pageSize,this.userName,this.status);
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