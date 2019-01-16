<template>
    <d2-container>
        <template slot="header"><span></span>编辑<i class="el-icon-close detail-close" @click="$router.go(-1)"></i></template>
        <div class="detail"
             v-loading="pageLoading"
             element-loading-text="加载中..."
             element-loading-background="rgba(255, 255, 255, 0.8)">
            <el-form :model="paramsData" ref="paramsForm" label-width="150px" class="rule-form">
                <el-form-item label="红包场景：">
                    <span class="text">{{tableData.scenes}}</span>
                </el-form-item>
                <el-form-item label="排序："  required>
                    <el-input-number class="item-number" v-model="paramsData.sort" controls-position="right" :min="0" :max="127"></el-input-number>
                </el-form-item>
                <el-form-item label="状态：" required>
                    <div class="item-radio">
                        <el-radio v-model="paramsData.status" :label="true">正常</el-radio>
                        <el-radio v-model="paramsData.status" :label="false">禁用</el-radio>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" plain class="return-btn" @click="submitForm('paramsForm')">提交</el-button>
                    <el-button type="info" plain class="return-btn" @click="$router.go(-1)" style="margin-left:15px;">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </d2-container>
</template>

<script>
  export default {
    data() {
      return {
        scenesId:'',
        tableData:{},
        pageLoading: false,//loading
        paramsData:{
          'scenesId':null,
          'sort':null,
          'status':null
        }
      }
    },
    methods:{
      //获取列表
      getTableData(){
        let vm = this;
        this.axiosGET(vm, vm.$API.API.redPacketSceneDetail+vm.scenesId,
          'application/x-www-form-urlencoded',
          {},
          vm.getSuccessCB
        )
      },
      //成功回调
      getSuccessCB(vm,res){
        if(!res.data || res.data === ''){
          this.tableData ={};
        } else {
          vm.setTableData(res.data)
        }
      },
      //设置表格数据
      setTableData(_data){
        let obj = {};
        obj.scenes = _data.scenes;
        this.paramsData.sort = obj.sort = _data.sort;
        this.paramsData.status = _data.status;
        obj.status = _data.status ? '正常' : '禁用';
        this.tableData = obj;
      },
      //设置表格数据
      submitForm(formName){
        let vm = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axiosPOST(vm, vm.$API.API.redPacketSceneEdit,
              'application/x-www-form-urlencoded',
              vm.paramsData,
              vm.getSubmitSuccessCB
            )
          } else {
            return false;
          }
        });
      },
      getSubmitSuccessCB(vm,res){
        vm.$message({
          message: '提交成功！',
          type: 'success'
        });
        setTimeout(()=>{
          vm.$router.go(-1);
        },300)
      }
    },
    created(){
      this.paramsData.scenesId = this.scenesId = this.$route.query.id;
      this.getTableData();
    }
  }
</script>

<style scoped lang="scss">
    @import '~@/assets/style/public-class.scss';
</style>