<template>
    <d2-container>
        <template slot="header"><span>权限设置</span><i class="el-icon-close detail-close" @click="$router.go(-1)"></i></template>
        <div class="role-setting">
            <el-card>
                <table class="setting-table" v-for="list in allData">
                    <tr>
                        <th>{{list.showName}}</th>
                        <th><el-checkbox v-model="list.read" @change="changeHeadRead(list)">只读</el-checkbox></th>
                        <th><el-checkbox v-model="list.write" @change="changeHeadWrite(list)">操作</el-checkbox></th>
                    </tr>
                    <tr v-for="item in list.modulePermissionBoList">
                        <td>{{item.showName}}</td>
                        <td><el-checkbox v-model="item.read" @change="changeBodyRead(list)">只读</el-checkbox></td>
                        <td><el-checkbox v-model="item.write" @change="changeBodyWrite(list)">操作</el-checkbox></td>
                    </tr>
                </table>
                <el-button type="primary" class="submit-permission" @click="setRolePermission" :loading="submitLoading">立即提交</el-button>
            </el-card>
        </div>
    </d2-container>
</template>

<script>
  import util from '@/libs/util.js'
  export default {
    name: "roleSetting",
    data() {
      return {
        roleId:'',
        allData:[], //所有角色权限
        currentData:[], //当前角色的权限
        permissionName:[], //设置当前角色权限
        params:{
          'informationRights': '0',
          'permissionList': [
            {
              'isMenu': 1,
              'moduleKey': 'orderCenter',
              'permissionName': 'manager.order.withdraw.read'
            }
          ],
          'roleId': ''
        },
        submitLoading:false
      }
    },
    watch:{
     "allData":{  //监测this.params中permissionList的值
       handler:function(){
         this.params.permissionList = [];
         for(let list in this.allData){ //外层
           if(this.allData[list].write){ //外层 - 写
             let tmpObj = {
               'isMenu': 1,
               'moduleKey': '',
               'permissionName': ''
             };
             tmpObj.moduleKey = this.allData[list].moduleKey;
             tmpObj.permissionName = this.allData[list].permissionName;
             this.params.permissionList.push(tmpObj);
           }
           if(this.allData[list].read){ //外层 - 读
             let tmpObj = {
               'isMenu': 1,
               'moduleKey': '',
               'permissionName': ''
             };
             tmpObj.moduleKey = this.allData[list].moduleKey;
             tmpObj.permissionName = this.allData[list].permissionName + '.read';
             this.params.permissionList.push(tmpObj);
           }
           for(let i=0;i<this.allData[list].modulePermissionBoList.length;i++){ //内层
             if(this.allData[list].modulePermissionBoList[i].write){ //内层 - 写
               let tmpObj = {
                 'isMenu': 1,
                 'moduleKey': '',
                 'permissionName': ''
               };
               tmpObj.moduleKey = this.allData[list].modulePermissionBoList[i].moduleKey;
               tmpObj.permissionName = this.allData[list].modulePermissionBoList[i].permissionName;
               this.params.permissionList.push(tmpObj);
             }
             if(this.allData[list].modulePermissionBoList[i].read){ //内层 - 读
               let tmpObj = {
                 'isMenu': 1,
                 'moduleKey': '',
                 'permissionName': ''
               };
               tmpObj.moduleKey = this.allData[list].modulePermissionBoList[i].moduleKey;
               tmpObj.permissionName = this.allData[list].modulePermissionBoList[i].permissionName + '.read';
               this.params.permissionList.push(tmpObj);
             }
           }
         };
         // console.log(this.params.permissionList)
       },
       deep:true
     }
    },
    methods: {
      //获得所有角色权限 API
      getRolePermission(roleId){
        let vm = this;
        this.axiosPOST(vm, vm.$API.API.rolePermission,
          'application/x-www-form-urlencoded',
          {roleId},
          vm.getSuccessCB,
          vm.getErrorCB
        )
      },
      //成功回调
      getSuccessCB(vm,res){
        vm.allData = res.data.permissions;
        vm.currentData = res.data.rolePermissionNames;
        vm.setRwAttr(); //设置读写属性
      },
      //设置读写属性
      setRwAttr(){
       for(let list in this.allData){
         this.$set(this.allData[list],'read', false);
         this.$set(this.allData[list],'write', false);
         if(this.allData[list].modulePermissionBoList && this.allData[list].modulePermissionBoList.length>0){
           for(let i=0; i<this.allData[list].modulePermissionBoList.length; i++){
             this.$set(this.allData[list].modulePermissionBoList[i],'read', false);
             this.$set(this.allData[list].modulePermissionBoList[i],'write', false);
           }
         }
       }
       if(this.currentData && this.currentData.length>0){
         this.initPermission(); //设置初始权限
       }
      },
      //获取复选框 初始值
      initPermission(){
        for(let i=0;i<this.currentData.length;i++){
          for(let list in this.allData){
            //外层默认
            if(this.currentData[i] === this.allData[list].permissionName){
              this.allData[list].write = true;
            };
            if(this.currentData[i] === this.allData[list].permissionName + '.read'){
              this.allData[list].read = true;
            };
            //内层默认
           for(let k=0; k<this.allData[list].modulePermissionBoList.length; k++){
             if(this.currentData[i] === this.allData[list].modulePermissionBoList[k].permissionName){
               this.allData[list].modulePermissionBoList[k].write = true;
             }
             if (this.currentData[i] === this.allData[list].modulePermissionBoList[k].permissionName + '.read'){
               this.allData[list].modulePermissionBoList[k].read = true;
             }
           }
         }
        };
      },
      //标题栏复选框 - 读
      changeHeadRead(params){
        if(params.read){
            for (let i = 0; i < params.modulePermissionBoList.length; i++) {
              params.modulePermissionBoList[i].read = true;
            }
        } else {
          params.write = false;
          for (let i = 0; i < params.modulePermissionBoList.length; i++) {
            params.modulePermissionBoList[i].read = false;
            params.modulePermissionBoList[i].write = false;
          }
        }
      },
      //标题栏复选框 - 写
      changeHeadWrite(params){
        if(params.write){
          params.read = true;
          for (let i = 0; i < params.modulePermissionBoList.length; i++) {
            params.modulePermissionBoList[i].write = true;
            params.modulePermissionBoList[i].read = true;
          }
        } else {
          for (let i = 0; i < params.modulePermissionBoList.length; i++) {
            params.modulePermissionBoList[i].write = false;
          }
        }
      },
      //body复选框 - 读
      changeBodyRead(params){
          let allCheck = 0;
          for (let i = 0; i < params.modulePermissionBoList.length; i++) {
            if(params.modulePermissionBoList[i].read){
              allCheck ++;
            }else{
              params.modulePermissionBoList[i].write = false;
              params.write = false;
            }
          }
          if(allCheck === params.modulePermissionBoList.length){
            params.read = true;
          } else {
            params.read = false;
          }
      },
      //body复选框 - 写
      changeBodyWrite(params){
        let allCheck = 0;
        let allCheckRead = 0;
        for (let i = 0; i < params.modulePermissionBoList.length; i++) {
          if(params.modulePermissionBoList[i].write){
            allCheck ++;
            params.modulePermissionBoList[i].read = true;
          }
          if(params.modulePermissionBoList[i].read){ //判断标题栏读是否勾选
            allCheckRead ++;
          }
        }
        if(allCheck === params.modulePermissionBoList.length){
          params.write = true;
          params.read = true;
        } else {
          params.write = false;
        }
        if(allCheckRead === params.modulePermissionBoList.length){ //判断标题栏读是否勾选
          params.read = true;
        }
      },

      //设置角色权限 API
      setRolePermission(){
        let vm = this;
        this.axiosPOST(vm, vm.$API.API.setRolePermission,
          'application/json',
          vm.params,
          vm.getPermissionSuccessCB,
          vm.getErrorCB
        )
      },
      //成功回调
      getPermissionSuccessCB(vm,res){
        vm.submitLoading = true;
        vm.$message({
          message: '提交成功！',
          type: 'success'
        });
        setTimeout(()=>{
          vm.$router.replace('/authority/role');
        },300)
      },
      //失败回调
      getErrorCB(err){
        console.log(err)
      },
    },
    mounted(){
      this.params.roleId = this.roleId = this.$route.query.id;
      this.getRolePermission(this.roleId);
    }
  }
</script>

<style scoped lang="scss">
    .role-setting{
        width:100%;
        margin:30px auto;
        text-align:center;
        .setting-table{
            width:100%;
            padding:20px 30px;
            &:first-of-type{
                tr {
                  &:first-of-type{
                      border-top:1px solid #ebeef5;
                  }
                }
            }
            tr{
                th{
                    padding-left:30px;
                    font-size:15px;
                    color:#666;
                    height:40px;
                    line-height:40px;
                    font-weight:600;
                    border-bottom:1px solid #ebeef5;
                    background:#f5f7fa;
                    .el-checkbox{
                        .el-checkbox__label{
                            font-size:15px !important;
                        }
                    }
                    .input-style{
                        outline:0;
                        display: inline-block;
                        border-radius: 2px;
                        -webkit-box-sizing: border-box;
                        box-sizing: border-box;
                        width: 14px;
                        height: 14px;
                        background-color: #fff !important;
                        z-index: 1;
                        -webkit-transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46);
                        transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46);
                        position: absolute;
                        visibility: hidden;
                        &+label {
                            display: inline-block;
                            width: 14px;
                            height: 14px;
                            background: #fff;
                            border: 1px solid #dcdfe6 !important;
                        }
                        &:checked+label {
                            background-color: #409eff;
                            border-color: #409eff;
                            color:#fff;
                        }
                    }
                    &:first-of-type{
                        padding-left:50px;
                    }
                }
                td{
                    padding-left:30px;
                    color:#909399;
                    height:40px;
                    font-size:14px;
                    line-height:40px;
                    border-bottom:1px solid #ebeef5;
                    &:first-of-type{
                        padding-left:50px;
                        width:75%;
                    }
                    &:nth-of-type(2){
                        width:80px;
                    }
                }
            }
        }
        .submit-permission{
            margin:40px 0 40px 50px;
        }
    }

</style>