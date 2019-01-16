<template>
    <d2-container>
        <template slot="header"><span>账号管理 — 查看</span> <i class="el-icon-close detail-close" @click="$router.go(-1)"></i></template>
        <div class="account-detail"
             v-loading="pageLoading"
             element-loading-text="加载中..."
             element-loading-background="rgba(255, 255, 255, 0.8)">
            <el-card class="box-card account-box-card" shadow="hover">
                <div class="detail-item">
                     <span class="tit">用户名:</span>
                     <span class="txt">{{accountInfo.userName}}</span>
                </div>
                <div class="detail-item">
                    <span class="tit">手机号:</span>
                    <span class="txt">{{accountInfo.phone}}</span>
                </div>
                <div class="detail-item">
                    <span class="tit">昵称:</span>
                    <span class="txt">{{accountInfo.nickname}}</span>
                </div>
                <div class="detail-item">
                    <span class="tit">角色:</span>
                    <span class="txt">{{accountInfo.roleName}}</span>
                </div>
                <div class="detail-item">
                    <span class="tit">提示:</span>
                    <span class="txt">{{accountInfo.hint}}</span>
                </div>
                <div class="detail-item">
                    <span class="tit">负责的机构id:</span>
                    <span class="txt">{{accountInfo.agencyId}}</span>
                </div>
                <div class="detail-item">
                    <span class="tit">状态:</span>
                    <span>
                        <el-radio disabled v-model="accountInfo.status" label="启用">启用</el-radio>
                        <el-radio disabled v-model="accountInfo.status" label="停用">停用</el-radio>
                        <el-radio disabled v-model="accountInfo.status" label="待修改密码">待修改密码</el-radio>
                    </span>
                </div>
            </el-card>
        </div>
    </d2-container>
</template>

<script>
  import util from '@/libs/util.js'
  export default {
    name: "accountDetail",
    data(){
      return {
        id:'',
        accountInfo:{
          'userName':'',
          'phone':'',
          'nickname':'',
          'roleName':'',
          'hint':'',
          'status': ''
        },
        pageLoading: true
      }
    },
    methods:{
      getAccountDetail(){
        // 获取用户账户信息
        let vm = this;
        let id = vm.id;
        this.axiosGET(vm,  vm.$API.API.accountInfo + id,
          'application/x-www-form-urlencoded',
          {id},
          vm.getSuccessCB,
          vm.getErrorCB
        )
      },
      //成功回调
      getSuccessCB(vm,res){
        let _data = [];
        if(!res.data.userName || res.data.userName === '') {
          _data.userName = '-';
        } else {
          _data.userName = res.data.userName;
        }
        if(!res.data.phone || res.data.phone === '') {
          _data.phone = '-';
        } else {
          _data.phone = res.data.phone;
        }
        if(!res.data.nickname || res.data.nickname === '') {
          _data.nickname = '-';
        } else {
          _data.nickname = res.data.nickname;
        }
        if(!res.data.hint || res.data.hint === '') {
          _data.hint = '没有提示';
        } else {
          _data.hint = res.data.hint;
        }
        if(!res.data.agencyId || res.data.agencyId === '') {
          _data.agencyId = '-';
        } else {
          _data.agencyId = res.data.agencyId;
        }
        _data.roleName = vm.$route.query.roleName;
        if( res.data.status === 1){
          _data.status = '启用'
        } else if (res.data.status === 2) {
          _data.status = '停用'
        } else {
          _data.status = '待修改密码'
        }
        vm.accountInfo = _data;
      },
      //失败回调
      getErrorCB(err){
        console.log(err)
      },
    },
    mounted(){
      this.id = this.$route.query.id || '';
      this.getAccountDetail();
    }
  }
</script>

<style scoped lang="scss">
.account-detail{
    margin:30px auto;
    .account-box-card{
        .detail-item{
            width:100%;
            height:40px;
            margin:20px auto;
            text-align:left;
        }
    }
    .detail-item{
        .tit{
            display:inline-block;
            width:150px;
            text-align:left;
            font-size:15px;
            line-height:40px;
            color:#606266;
            font-weight:600;
        }
        .txt{
            display:inline-block;
            text-align:left;
            font-size:15px;
            line-height:40px;
            color:#606266;
        }
    }
}
</style>