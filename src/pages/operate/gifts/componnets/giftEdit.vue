<template>
    <d2-container>
        <template slot="header"><span></span>{{pageType ? '编辑' : '更新'}}<i class="el-icon-close detail-close" @click="$router.go(-1)"></i></template>
        <div class="detail"
             v-loading="pageLoading"
             element-loading-text="加载中..."
             element-loading-background="rgba(255, 255, 255, 0.8)">
            <el-form :model="paramsData" :rules="rules" ref="paramsForm" label-width="150px" class="rule-form">
                <el-form-item label="礼物名称：" prop="giftName" v-if="pageType">
                    <el-input v-model="paramsData.giftName" placeholder="请填写礼物名称"></el-input>
                </el-form-item>
                <el-form-item label="礼物名称：" v-else>
                    <span class="text">{{tableData.giftName}}</span>
                </el-form-item>
                <el-form-item label="礼物Icon：">
                    <img class = "picture" :src="paramsData.iconUrl" @click="previewPic(paramsData.iconUrl)"/>
                    <div class="upload-wrap" style="vertical-align:bottom;" v-if="pageType">
                        <p >重新上传</p>
                        <input id="file-selector" type="file"
                               accept = ".png,.jpg,.jpeg"
                               name="filename"
                               class="uploadBtn"
                               @change="triggerFile($event)"
                               ref="uploadBtn">
                    </div>
                    <span class="text" style="color:#ccc; display:inline-block;margin-left:10px;vertical-align:bottom;" v-if="pageType">建议小于500KB</span>
                </el-form-item>
                <el-form-item label="类型：">
                    <span class="text">{{tableData.giftType}}</span>
                </el-form-item>
                <el-form-item :label="paramsData.giftType===2 ? '特效文件：': '动画文件：'">
                    <span class="text">{{fileName}}</span>
                    <div class="upload-wrap" style="vertical-align:bottom; margin-left:15px;" v-if="!pageType">
                        <p>{{paramsData.giftType===2 ? '上传SVGA': '上传GIF'}}</p>
                        <input id="anm-selector" type="file"
                               :accept="fileType"
                               name="filename"
                               class="uploadBtn"
                               @change="triggerFile($event)"
                               ref="uploadBtn">
                    </div>
                </el-form-item>
                <el-form-item label="钻石售价：">
                    <span class="text">{{tableData.diamondPrice}}</span>
                </el-form-item>
                <el-form-item label="状态：" v-if="pageType">
                    <div class="item-radio">
                        <el-radio v-model="paramsData.status" :label="true">正常</el-radio>
                        <el-radio v-model="paramsData.status" :label="false">禁用</el-radio>
                    </div>
                </el-form-item>
                <el-form-item label="状态：" v-else>
                    <span class="text">{{tableData.status ? '正常': '禁用'}}</span>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" plain class="return-btn" @click="submitForm('paramsForm')">提交</el-button>
                    <el-button type="info" plain class="return-btn" @click="$router.go(-1)" style="margin-left:15px;">取消</el-button>
                    <el-button type="primary" plain class="return-btn"  style="margin-left:15px;" @click="previewFile" :loading="ifLoading">预览</el-button>
                </el-form-item>
            </el-form>
        </div>
    </d2-container>
</template>

<script>
  import COS from 'cos-js-sdk-v5'
  import uuid from 'node-uuid'
  export default {
    data() {
      return {
        ifLoading:false,
        id:'',
        pageType:'',
        fileType:'',
        tableData:{},
        pageLoading: false,//loading
        paramsData:{
          'diamondPrice': null,
          'fileUrl':null,
          'giftName':null,
          'giftType': null,
          'iconUrl':null,
          'id': null,
          'sort': null,
          'status': false
        },
        rules: {
          giftName: [
            { required: true, message: '请填写礼物名称', trigger: 'blur' },
          ]
        }
      }
    },
    watch:{
      'paramsData.giftType':{
        handler:function(val){
          if(val === 2){
            this.fileType = '.svga,.SVGA'
          } else {
            this.fileType = '.gif,.GIF'
          }
        },
        deep:true
      }
    },
    computed:{
      fileName(){
        if(this.paramsData.fileUrl){
          return this.paramsData.fileUrl.substring(this.paramsData.fileUrl.length -11);
        }
      }
    },
    methods:{
      //上传文件
      triggerFile(event) {
        let file = this.file = event.target.files[0];
        if (!file) return;
        let uid = uuid.v4().replace(/-/g, ""); //生成唯一文件名
        let index1 = file.name.lastIndexOf('.');
        let index2 = file.name.length;
        this.keys = uid + file.name.substring(index1, index2);
        this.upLoadFile();
      },
      upLoadFile() {
        let vm = this;
        let Bucket = 'meet-1257688644';
        let Region = 'ap-shanghai';
        // 初始化实例
        let cos = new COS({
          getAuthorization: function (options, callback) {
            vm.axiosGET(vm, vm.$API.API.tencentSig,
              'application/json;charset=UTF-8',
              {
                keys: vm.keys
              },
              function (vm, res) {
                callback({
                  TmpSecretId: res.data.credentials.tmpSecretId,
                  TmpSecretKey: res.data.credentials.tmpSecretKey,
                  XCosSecurityToken: res.data.credentials.sessionToken,
                  ExpiredTime: res.data.expiredTime
                });
              }
            )
          }
        });
        cos.putObject({
          Bucket: Bucket,
          Region: Region,
          Key: vm.keys,
          Body: vm.file
        }, function (err, data) {
          if(vm.pageType){ //编辑
            vm.paramsData.iconUrl = 'http://meet-1257688644.cos.ap-shanghai.myqcloud.com/' + vm.keys;
          } else { //更新
            vm.paramsData.fileUrl = 'http://meet-1257688644.cos.ap-shanghai.myqcloud.com/' + vm.keys;
          }
          if (err) {
            console.log(err);
          }
        });
      },
      //获取页面数据
      getTableData(){
        let vm = this;
        this.axiosGET(vm, vm.$API.API.giftDetail+vm.id,
          'application/x-www-form-urlencoded',
          {},
          (vm,res) => {
              if(!res.data || res.data === ''){
                this.tableData ={};
              } else {
                vm.setTableData(res.data)
              }
          }
        )
      },
      //设置表格数据
      setTableData(_data){
          let obj = {};
          this.paramsData.giftName = obj.giftName = _data.giftName;
          this.paramsData.iconUrl = obj.iconUrl= _data.iconUrl;
          obj.giftType = _data.giftType===2 ? '特效' : '普通';
          this.paramsData.giftType = _data.giftType;
          this.paramsData.fileUrl  =  _data.fileUrl;
          this.paramsData.diamondPrice = obj.diamondPrice = _data.diamondPrice;
          this.paramsData.status = obj.status = _data.status;
          this.tableData = obj;
      },
      submitForm(formName){
        let vm = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axiosPOST(vm, vm.$API.API.giftEdit,
              'application/json',
              vm.paramsData,
              vm.getSuccessCB
            )
          } else {
            return false;
          }
        });
      },
      getSuccessCB(vm){
        vm.$message({
          message: '提交成功！',
          type: 'success'
        });
        setTimeout(()=>{
          vm.$router.go(-1);
        },300)
      },
      //预览礼物Icon
      previewPic(url){
        this.$store.commit('setShowPicPopOn',{type:'pic',content:url})
      },
      //预览动态效果
      previewFile(){
        if(this.paramsData.giftType === 2 ){
          let vm = this;
          this.ifLoading=true;
          setTimeout(()=>{
            vm.ifLoading = false;
            vm.$store.commit('setShowPicPopOn',{type:'file',content:vm.paramsData.fileUrl})
          },1000)
        } else {
          this.$store.commit('setShowPicPopOn',{type:'pic',content:this.paramsData.fileUrl})
        }
      }
    },
    created(){
      this.paramsData.id = this.id = this.$route.query.id;
      if(this.$route.query.type === 'edit'){
        this.pageType = true
      } else {
        this.pageType = false
      }
      this.getTableData();
    }
  }
</script>

<style scoped lang="scss">
    @import '~@/assets/style/public-class.scss';
    .picture{
        display:inline-block;
        vertical-align:middle;
        margin-right:15px;
        width:auto;
        max-width:300px;
        max-height:100px;
        border:3px solid #eee;
    }
</style>