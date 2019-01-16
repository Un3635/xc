<template>
    <d2-container>
        <template slot="header"><span>角色管理 — 查看</span> <i class="el-icon-close detail-close" @click="$router.go(-1)"></i></template>
        <div class="role-detail"
             v-loading="pageLoading"
             element-loading-text="加载中..."
             element-loading-background="rgba(255, 255, 255, 0.8)">
            <el-card class="box-card account-box-card" shadow="hover">
                <div class="detail-item">
                     <span class="tit">角色名称标志:</span>
                     <span class="txt">{{roleInfo.name}}</span>
                </div>
                <div class="detail-item">
                    <span class="tit">角色名称:</span>
                    <span class="txt">{{roleInfo.displayName}}</span>
                </div>
                <div class="detail-item">
                    <span class="tit">备注:</span>
                    <span class="txt">{{roleInfo.description}}</span>
                </div>
                <div class="detail-item">
                    <span class="tit">状态:</span>
                    <span>
                        <el-radio disabled v-model="roleInfo.status" label="启用">启用</el-radio>
                        <el-radio disabled v-model="roleInfo.status" label="停用">停用</el-radio>
                    </span>
                </div>
            </el-card>
        </div>
    </d2-container>
</template>

<script>
  import util from '@/libs/util.js'
  export default {
    name: "roleDetail",
    data(){
      return {
        uid:'',
        roleInfo:[],
        pageLoading: true
      }
    },
    methods:{
      getRoleDetail(){
        let vm = this;
        let uid = vm.uid;
        this.axiosGET(vm, vm.$API.API.roleDetail + uid,
          'application/x-www-form-urlencoded',
          {},
          vm.getSuccessCB,
          vm.getErrorCB
        )
      },
      //成功回调
      getSuccessCB(vm,res){
        let _data = [];
        if(!res.data.displayName || res.data.displayName === '') {
          _data.displayName = '-';
        } else {
          _data.displayName = res.data.displayName;
        }
        if(!res.data.name || res.data.name === '') {
          _data.name = '-';
        } else {
          _data.name = res.data.name;
        }
        if(!res.data.description || res.data.description === '') {
          _data.description = '没有备注';
        } else {
          _data.description = res.data.description;
        }
        res.data.status === 1 ? _data.status = '启用' : _data.status = '停用';
        vm.roleInfo = _data;
      },
      //失败回调
      getErrorCB(err){
        console.log(err)
      },
    },
    mounted(){
      this.uid = this.$route.query.id || '';
      this.getRoleDetail();
    }
  }
</script>

<style scoped lang="scss">
.role-detail{
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