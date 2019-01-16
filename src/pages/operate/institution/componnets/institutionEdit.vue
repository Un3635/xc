<template>
    <d2-container>
        <template slot="header"><span></span>机构编辑<i class="el-icon-close detail-close" @click="$router.go(-1)"></i></template>
        <div class="detail"
             v-loading="pageLoading"
             element-loading-text="加载中..."
             element-loading-background="rgba(255, 255, 255, 0.8)">
            <el-form :model="paramsData" :rules="rules" ref="paramsForm" label-width="150px" class="rule-form">
                <el-form-item label="机构名称：">
                    <span class="text">{{tableData.name}}</span>
                </el-form-item>
                <el-form-item label="机构评分：" prop="score">
                    <!--<el-input v-model="paramsData.score" placeholder="请填写机构对应的分值"></el-input>-->
                    <el-input-number class="item-number"  v-model="paramsData.score" :precision="0" :controls="false" :min="0"></el-input-number>
                    <span class="unit">分</span>
                </el-form-item>
                <el-form-item label="签约有效期：">
                    <span class="text">{{tableData.term}}天</span>
                </el-form-item>
                <el-form-item label="平台收益：">
                    <span class="text">{{Math.round((1-tableData.dividedInto)*100)}}%</span>
                </el-form-item>
                <el-form-item label="机构与Ms收益：">
                    <span class="text">{{tableData.dividedInto*100}}%</span>
                </el-form-item>
                <el-form-item label="状态：" required>
                    <div class="item-radio">
                        <el-radio v-model="paramsData.status" :label="1">正常</el-radio>
                        <el-radio v-model="paramsData.status" :label="0">禁用</el-radio>
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
        id:'',
        tableData:{},
        pageLoading: false,//loading
        paramsData:{
          'name':null,
          'platformInto': null,
          'score':null,
          'status':true,
          'term':null
        },
        rules: {
          score: [
            { required: true, message: '请填写机构评分', trigger: 'blur' },
          ]
        }
      }
    },
    methods:{
      //获取列表
      getTableData(){
        let vm = this;
        this.axiosGET(vm, vm.$API.API.agencyDetail+vm.id,
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
          this.paramsData.score = obj.score = _data.score;
          obj.name = _data.name;
          obj.term = _data.term;
          obj.dividedInto = _data.dividedInto;
          this.paramsData.status = obj.status = _data.status;
          this.tableData = obj;
      },
      submitForm(formName){
        let vm = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axiosPOST(vm, vm.$API.API.agencyEdit,
              'application/json',
              vm.paramsData,
              vm.getSubmitSuccessCB
            )
          } else {
            return false;
          }
        });

      },
      getSubmitSuccessCB(vm){
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
      this.paramsData.id = this.id = this.$route.query.id;
      this.getTableData();
    }
  }
</script>

<style scoped lang="scss">
    @import '~@/assets/style/public-class.scss';
</style>