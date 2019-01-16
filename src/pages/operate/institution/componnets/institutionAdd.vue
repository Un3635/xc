<template>
    <d2-container>
        <template slot="header"><span></span>新增机构<i class="el-icon-close detail-close" @click="$router.go(-1)"></i></template>
        <div class="detail">
            <el-form :model="paramsData" :rules="rules" ref="paramsForm" label-width="150px" class="rule-form">
                <el-form-item label="机构名称：" prop="name">
                    <el-input v-model="paramsData.name" placeholder="请填写机构名称"></el-input>
                </el-form-item>
                <el-form-item label="机构评分：" prop="score">
                    <el-input-number class="item-number"  v-model="paramsData.score" :precision="0" :controls="false" :min="0"></el-input-number>
                    <span class="unit">分&nbsp;&nbsp;(机构对应的分值)</span>
                </el-form-item>
                <el-form-item label="签约有效期：" prop="term">
                    <el-input-number class="item-number"  v-model="paramsData.term" :precision="0" :controls="false" :min="0"></el-input-number>
                    <span class="unit">天&nbsp;&nbsp;(机构签约Ms单次有效天数)</span>
                </el-form-item>
                <el-form-item label="平台收益：" prop="platformInto">
                    <el-input-number class="item-number" v-model="platformInto" :controls="false" :min="0" :max="100"></el-input-number>
                    <span class="unit">% &nbsp;&nbsp;(平台收益百分比，剩余即为机构及对应Ms的占比和)</span>
                </el-form-item>
                <el-form-item label="机构与Ms收益：">
                    <span class="text">{{paramsData.platformInto ? Math.round((1-paramsData.platformInto)*100) : 100}}%</span>
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
        platformInto:'',
        paramsData:{
          'name':null,
          'platformInto': null,
          'score':null,
          'status':true,
          'term':null
        },
        rules: {
          name: [
            { required: true, message: '请填写机构名称', trigger: 'blur' },
          ],
          score: [
            { required: true, message: '请填写机构评分', trigger: 'blur' },
          ],
          term: [
            { required: true, message: '请填写签约有效期', trigger: 'blur' },
          ],
          platformInto: [
            { required: true, message: '请填写平台收益', trigger: 'change' },
          ]
        }
      }
    },
    watch:{
      'platformInto':{
        handler:function(val){
            if(val=== '' || val=== undefined){
              this.paramsData.platformInto = null;
            } else {
              this.paramsData.platformInto = Math.round(val)/100;
            }
        },
        deep:true
      }
    },
    methods:{
      //获取列表
      getTableData(){
        let vm = this;
        this.axiosPOST(vm, vm.$API.API.agencyEdit,
          'application/json',
          vm.paramsData,
          vm.getSuccessCB
        )
      },
      //成功回调
      getSuccessCB(vm,res){
        vm.$message({
          message: '提交成功！',
          type: 'success'
        });
        setTimeout(()=>{
          vm.$router.go(-1);
        },300)
      },
      submitForm(formName){
        let vm = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            vm.getTableData();
          } else {
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped lang="scss">
    @import '~@/assets/style/public-class.scss';
</style>