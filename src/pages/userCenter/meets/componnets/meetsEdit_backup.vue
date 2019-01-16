<template>
    <d2-container>
        <template slot="header"><span></span>编辑<i class="el-icon-close detail-close" @click="$router.go(-1)"></i></template>
        <div class="detail"
             v-loading="pageLoading"
             element-loading-text="加载中..."
             element-loading-background="rgba(255, 255, 255, 0.8)">
            <el-form :model="paramsData" ref="paramsForm" label-width="150px" class="rule-form">
                <el-form-item label="MID：">
                    <span class="text">{{mid}}</span>
                </el-form-item>
                <el-form-item label="昵称：">
                    <span class="text">{{tableData.nickName}}</span>
                </el-form-item>
                <el-form-item label="Ms持有宝石：">
                    <span class="text">{{tableData.currentlyHoldingGem}}</span>
                </el-form-item>
                <el-form-item label="是否有机构：" required>
                    <div class="item-radio" v-if="changeAgency">
                        <el-radio v-model="paramsData.agencyFlag" :label="true">有</el-radio>
                        <el-radio v-model="paramsData.agencyFlag" :label="false">无</el-radio>
                    </div>
                    <div class="item-radio" v-else>
                        <el-radio disabled v-model="paramsData.agencyFlag" :label="true">有</el-radio>
                        <el-radio disabled v-model="paramsData.agencyFlag" :label="false">无</el-radio>
                    </div>
                </el-form-item>
                <el-form-item label="所属机构：" v-if="paramsData.agencyFlag" required>
                    <el-select placeholder="请选择所属机构" v-model="paramsData.agencyId" v-if="changeAgency" @change="watchOnOff = true">
                        <el-option v-for="item,index in agencyList" :label="item.agencyName" :value="item.agencyId"></el-option>
                    </el-select>
                    <el-select placeholder="请选择所属机构" v-model="paramsData.agencyId" disabled v-else>
                        <el-option v-for="item,index in agencyList" :label="item.agencyName" :value="item.agencyId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="机构收益：" v-if="paramsData.agencyFlag">
                    <span class="text">{{paramsData.agencyReward*100}}%</span>
                </el-form-item>
                <el-form-item label="Ms收益：">
                    <el-input-number class="item-number"
                                     v-model="userReward"
                                     :controls="false"
                                     :min="0" :max="100"
                                     :precision="2"
                                     v-if="tableData.currentlyHoldingGem === 0 &&  !paramsData.agencyFlag"></el-input-number>
                    <span class="text" v-else>{{paramsData.userReward*100}}%</span>
                    <span v-if="tableData.currentlyHoldingGem === 0 &&  !paramsData.agencyFlag" style="margin-left:10px;">%</span>
                </el-form-item>
                <el-form-item label="平台收益：">
                    <span class="text">{{paramsData.platformReward*100}}%</span>
                </el-form-item>
                <el-form-item label="绿名单：" required>
                    <div class="item-radio">
                        <el-radio v-model="paramsData.greenFlag" :label="true">是</el-radio>
                        <el-radio v-model="paramsData.greenFlag" :label="false">否</el-radio>
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
        mid:'',
        changeAgency:false,
        userReward:0,
        watchOnOff:false,
        agencyList:[],
        tableData:{},
        pageLoading: false,//loading
        paramsData:{
          'mid': null,
          'agencyId': null,
          'agencyFlag': true,
          'userReward': 0,
          'agencyReward': 0,
          'platformReward': 0,
          'greenFlag': false
        }
      }
    },
    watch:{
      'paramsData.agencyFlag':{
        handler:function(val){
          if(this.watchOnOff){
            this.userReward = 0;
            if(val){
              if(this.tableData.agencyFlag){
                this.paramsData.agencyId = null;
                this.paramsData.agencyId = this.tableData.agencyId;
                // console.log(this.paramsData.agencyId);
              } else {
                this.paramsData.agencyReward = 0;
                this.paramsData.userReward = 0;
                this.paramsData.platformReward = 0;
              }
            } else {
              this.paramsData.agencyReward = null;
              if(this.tableData.agencyFlag){
                this.paramsData.userReward = 0;
                this.paramsData.platformReward = 0;
              } else {
                this.paramsData.userReward = this.tableData.userReward;
                this.paramsData.platformReward = this.tableData.platformReward;
              }
            }
          }
        },
        deep:true
      },
      'paramsData.agencyId':{
        handler:function(val){
          if(this.watchOnOff){
            console.log("111")
            for(let i=0;i<this.agencyList.length;i++){
              if(val === this.agencyList[i].agencyId){
                this.paramsData.agencyReward = this.agencyList[i].agencyReward;
                this.paramsData.userReward = this.agencyList[i].userReward;
                this.paramsData.platformReward = this.agencyList[i].platformReward;
              }
            }
          }
        },
        deep:true
      },
      'userReward':{
        handler:function(val){
          if(!this.paramsData.agencyFlag){
            this.paramsData.userReward = Math.round(val * 100) / 10000;
          }
        },
        deep:true
      },
      'paramsData.userReward':{
        handler:function(val){
          if(!this.paramsData.agencyFlag){
            this.userReward = Math.round(val * 100);
            this.paramsData.platformReward = Math.round((1-this.paramsData.userReward) * 100)/100;
          }
        },
        deep:true
      }
    },
    methods:{
      //获取所有机构
      getAgencyReward() {
        let vm = this;
        this.axiosPOST(vm, vm.$API.API.meetReward,
          'application/x-www-form-urlencoded',
          {},
          (vm,res) => {
            vm.agencyList = res.data;
          }
        )
      },
      //获取列表
      getTableData(){
        let vm = this;
        this.axiosGET(vm, vm.$API.API.meetDetail+vm.mid,
          'application/x-www-form-urlencoded',
          {},
          (vm,res) => {
             vm.setTableData(res.data)
          }
        )
      },
      //设置表格数据
      setTableData(_data){
        let obj = {};
        obj.nickName = _data.nickName;
        obj.currentlyHoldingGem = _data.currentlyHoldingGem;
        obj.agencyFlag = this.paramsData.agencyFlag = _data.agencyFlag;
        if(_data.agencyId && _data.agencyId !== ''){
         obj.agencyId = this.paramsData.agencyId = _data.agencyId;
        }
        this.paramsData.userReward = obj.userReward = _data.userReward;
        this.paramsData.platformReward = obj.platformReward = _data.platformReward;
        this.paramsData.agencyReward = obj.agencyReward = _data.agencyReward;

        if(_data.belongAgency && _data.belongAgency !== ''){
          obj.belongAgency = _data.belongAgency;
        }
        obj.greenFlag = this.paramsData.greenFlag = _data.greenFlag;

        if(!_data.belongAgency){
          this.userReward = _data.userReward*100;
        }

        this.tableData = obj;
        if(obj.currentlyHoldingGem > 0){
          this.changeAgency = false;
        } else {
          this.changeAgency = true;
        }
      },
      //提交
      submitForm(formName){
        let vm = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axiosPOST(vm, vm.$API.API.meetEdit,
              'application/json',
              vm.paramsData,
              (vm,res) => {
                vm.$message({
                  message: '提交成功！',
                  type: 'success'
                });
                setTimeout(()=>{
                  vm.$router.go(-1);
                },300)
              }
            )
          } else {
            return false;
          }
        });
      }
  },
    created(){
      this.paramsData.mid = this.mid = this.$route.query.mid;
      this.getTableData();
      this.getAgencyReward();
    }
  }
</script>

<style scoped lang="scss">
    @import '~@/assets/style/public-class.scss';
</style>