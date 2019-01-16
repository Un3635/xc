<template>
    <d2-container>
        <template slot="header"><span></span>签约<i class="el-icon-close detail-close" @click="$router.go(-1)"></i></template>
        <div class="detail"
             v-loading="pageLoading"
             element-loading-text="加载中..."
             element-loading-background="rgba(255, 255, 255, 0.8)">
            <el-form :model="paramsData" :rules="rules" ref="paramsForm" label-width="150px" class="rule-form">
                <el-form-item label="MID：">
                    <span class="text">{{tableData.userMid}}</span>
                </el-form-item>
                <el-form-item label="Ms类型：">
                    <span class="text">{{tableData.msTypeName}}</span>
                </el-form-item>
                <el-form-item label="Ms评分：">
                    <span class="text">{{tableData.mScore}}</span>
                </el-form-item>
                <el-form-item label="Ms持有宝石：">
                    <span class="text">{{tableData.currentlyHoldingGemstones}}</span>
                </el-form-item>
                <el-form-item label="粉丝数：">
                    <span class="text">{{tableData.fansCount}}</span>
                </el-form-item>
                <el-form-item label="签约：" required>
                    <div class="item-radio">
                        <el-radio v-model="paramsData.status" :label="0">同意</el-radio>
                        <el-radio v-model="paramsData.status" :label="1">拒绝</el-radio>
                    </div>
                </el-form-item>
                <el-form-item label="机构与Ms收益：" v-if="paramsData.status===0">
                    <span class="text">{{tableData.agencySumReward*100}}%</span>
                </el-form-item>
                <el-form-item label="机构收益：" prop="agencyReward" v-if="paramsData.status===0">
                    <el-input-number class="item-number"  v-model="paramsData.agencyReward" :precision="0" :controls="false" :min="0" :max="tableData.agencySumReward*100"></el-input-number>
                    <span class="unit">%</span>
                </el-form-item>
                <el-form-item label="Ms收益：" v-if="paramsData.status===0">
                    <span class="text">{{paramsData.agencyReward ? Math.round((tableData.agencySumReward*100-paramsData.agencyReward)*100)/100 :tableData.agencySumReward*100 }}%</span>
                </el-form-item>
                <el-form-item label="备注：">
                    <el-input v-model="paramsData.remark" placeholder="可填写备注，非必填"></el-input>
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
          'id':null,
          'status':0,
          'agencyReward':null,
          'remark':null
        },
        rules: {
          agencyReward: [
            { required: true, message: '请填写机构收益', trigger: 'blur' },
          ]
        }
      }
    },
    methods:{
      //获取列表
      getTableData(){
        let vm = this;
        this.axiosGET(vm, vm.$API.API.signDetail+vm.id,
          'application/x-www-form-urlencoded',
          {},
          (vm,res) => {
            vm.setTableData(res.data);
          }
        )
      },
      setTableData(_data){
          let obj = {};
          obj.userMid = _data.userMid ? _data.userMid : '-';
          obj.msTypeName = _data.msTypeName ? _data.msTypeName : '-';
          obj.mScore = _data.mScore;
          obj.currentlyHoldingGemstones = _data.currentlyHoldingGemstones;
          obj.fansCount = _data.fansCount ? _data.fansCount : '-';
          obj.agencySumReward = _data.agencySumReward ? _data.agencySumReward : '-';
          this.tableData = obj;
      },
      submitForm(formName){
        let vm = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axiosPOST(vm, vm.$API.API.signUpdate,
              'application/x-www-form-urlencoded',
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