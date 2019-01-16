<template>
    <d2-container>
        <template slot="header"><span></span>Ms类型编辑<i class="el-icon-close detail-close" @click="$router.go(-1)"></i></template>
        <div class="detail"
             v-loading="pageLoading"
             element-loading-text="加载中..."
             element-loading-background="rgba(255, 255, 255, 0.8)">
            <el-form :model="paramsData" :rules="rules" ref="paramsForm" label-width="150px" class="rule-form">
                <el-form-item label="Ms类型：">
                    <span class="text">{{paramsData.type}}</span>
                </el-form-item>
                <el-form-item label="Ms类型评分：">
                    <span class="text">{{paramsData.score}}</span>
                </el-form-item>
                <el-form-item label="状态：" required>
                    <div class="item-radio">
                        <el-radio v-model="paramsData.status" :label="true">正常</el-radio>
                        <el-radio v-model="paramsData.status" :label="false">禁用</el-radio>
                    </div>
                </el-form-item>
                <el-form-item  v-for="item,index in priceList" :label="item.name+'：'" required>
                    <div class="rage-item">
                        <el-input-number class="item-number"  v-model="paramsData.msTypePricingTypeList[index*3].val" :precision="0" :controls="false" :min="0"></el-input-number>
                        <span class="unit">{{item.unit}}</span>
                    </div>
                    <div class="rage-item">
                        <el-input-number class="item-number"  v-model="paramsData.msTypePricingTypeList[index*3+1].val" :precision="0" :controls="false" :min="0"></el-input-number>
                        <span class="unit">{{item.unit}}</span>
                    </div>
                    <div class="rage-item">
                        <el-input-number class="item-number" v-model="paramsData.msTypePricingTypeList[index*3+2].val" :precision="0" :controls="false" :min="0"></el-input-number>
                        <span class="unit">{{item.unit}}</span>
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
        priceList:[],
        pageLoading: false,//loading
        paramsData:{
          'id':null,
          'msTypePricingTypeList': [
            {
              'id': null,
              'name': null,
              'ruleId': null,
              'val': 0
            }
          ],
          'score':null,
          'status':true,
          'type':null
        },
        rules: {}
      }
    },
    methods:{
      //获取Ms类型价格类型
      getPricingList(){
        let vm = this;
        this.axiosGET(vm, vm.$API.API.mstypePricingList,
          'application/x-www-form-urlencoded',
          {},
          vm.getSuccessCB
        )
      },
      getSuccessCB(vm,res){
        vm.priceList = res.data;
        for(let j=0;j<vm.priceList.length;j++){
          switch(vm.priceList[j].name){
            case '视频通话价格':
            case '语音通话价格':
              vm.priceList[j].unit = '钻石/分钟';
              break;
            case '发送视频价格':
            case '发送语音价格':
            case '主页视频价格':
            case '主页语音价格':
              vm.priceList[j].unit = '钻石/条';
              break;
            case '发送照片价格':
            case '主页照片价格':
              vm.priceList[j].unit = '钻石/张';
              break;
            default:
              vm.priceList[j].unit = '钻石';
              break;
          }
        }
      },
      //获取列表
      getTableData(){
        let vm = this;
        this.axiosGET(vm, vm.$API.API.mstypeDetail+vm.id,
          'application/x-www-form-urlencoded',
          {},
          vm.getSuccessDetailCB
        )
      },
     //成功回调
      getSuccessDetailCB(vm,res){
        if(!res.data || res.data === ''){
          this.tableData ={};
        } else {
          vm.setTableData(res.data)
        }
      },
      //设置表格数据
      setTableData(_data){
          this.paramsData.type = _data.msType.type;
          this.paramsData.score = _data.msType.score;
          this.paramsData.status = _data.msType.status;
          this.paramsData.msTypePricingTypeList = _data.msTypePricingType;
          this.getPricingList();
      },
      submitForm(formName){
        let vm = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axiosPOST(vm, vm.$API.API.mstypeEdit,
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