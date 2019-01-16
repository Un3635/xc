<template>
    <d2-container>
        <template slot="header"><span></span>新增<i class="el-icon-close detail-close" @click="$router.go(-1)"></i></template>
        <div class="detail">
            <el-form :model="paramsData" :rules="rules" ref="paramsForm" label-width="150px" class="rule-form">
                <el-form-item label="礼物名称" prop="giftName">
                    <el-input v-model="paramsData.giftName" placeholder="请填写礼物名称"></el-input>
                </el-form-item>
                <el-form-item label="礼物Icon" required>
                    <img class = "picture" :src="paramsData.iconUrl" @click="previewPic(paramsData.iconUrl)" v-if="hasFile"/>
                    <div class="upload-wrap" style="vertical-align: bottom;">
                        <p v-if="!hasFile">上传图片</p>
                        <p v-if="hasFile">重新上传</p>
                        <input id="img-selector" type="file"
                               accept = ".jpg,.jpeg,.png"
                               name="filename"
                               class="uploadBtn"
                               @change="triggerFile($event,'icon')"
                               ref="uploadBtn">
                    </div>
                    <span class="load-tip" style="color:#ccc; display:inline-block;margin-left:5px;vertical-align:bottom;">建议小于500KB</span>
                </el-form-item>
                <el-form-item label="类型" required>
                    <div class="item-radio">
                        <el-radio v-model="paramsData.giftType" :label="1">普通</el-radio>
                        <el-radio v-model="paramsData.giftType" :label="2">特效</el-radio>
                    </div>
                </el-form-item>
                <el-form-item :label="paramsData.giftType===2? '特效文件':'动画文件'" required>
                    <div class="upload-wrap">
                        <p v-if="!hasFile2 && paramsData.giftType ===1">上传GIF</p>
                        <p v-if="!hasFile2 && paramsData.giftType ===2">上传SVGA</p>
                        <p v-if="hasFile2">重新上传</p>
                        <input id="file-selector" type="file"
                               :accept = "fileType"
                               name="filename"
                               class="uploadBtn"
                               @change="triggerFile($event,'file')"
                               ref="uploadBtn">
                    </div>
                </el-form-item>
                <el-form-item label="钻石单价" prop="diamondPrice">
                    <el-input-number class="item-number" v-model="paramsData.diamondPrice" controls-position="right" :min="0"></el-input-number>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input-number class="item-number" v-model="paramsData.sort" controls-position="right" :min="0" :max="100"></el-input-number>
                </el-form-item>
                <el-form-item label="状态" required>
                    <div class="item-radio">
                        <el-radio v-model="paramsData.status" :label="true">正常</el-radio>
                        <el-radio v-model="paramsData.status" :label="false">禁用</el-radio>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" plain class="return-btn" @click="submitForm('paramsForm')">提交</el-button>
                    <el-button type="info" plain class="return-btn" @click="$router.go(-1)" style="margin-left:15px;">返回</el-button>
                    <el-button type="primary" plain class="return-btn" @click="previewFile" :loading="ifLoading">预览</el-button>
                </el-form-item>
            </el-form>
        </div>
    </d2-container>
</template>

<script>
  import COS from 'cos-js-sdk-v5'
  import uuid from 'node-uuid'
  export default {
    name: "giftAdd",
    data() {
      return {
        ifLoading:false,
        hasFile:false, //是否上传文件
        hasFile2:false, //是否上传文件
        file:'', //上传的文件保存在这里
        fileType:'', //允许上传的文件类型
        paramsData:{
          'giftName':null,
          'giftType':1,
          'diamondPrice':null,
          'sort':null,
          'status':true,
          'id':null,
          'fileUrl':null,
          'iconUrl':null
        },
        rules: {
          giftName:[
            { required: true, message: '请填写礼物名称', trigger: 'change' },
          ],
          diamondPrice: [
            { required:true, message:'钻石价格不能为空', trigger: 'change' }
          ],
          sort: [
            { required:true, message:'排序不能为空', trigger: 'change' }
          ]
        }
      }
    },
    watch:{
      'paramsData.giftType':{
        handler:function(val){
          this.hasFile2 = false;
          this.paramsData.fileUrl = null;
          if(val === 2 ){
            this.fileType = '.svga,.SVGA'
          } else {
            this.fileType = '.gif,.GIF'
          }
        },
        deep:true
      }
    },
    methods:{
      //上传文件按钮
      triggerFile(event,type) {
        let file = this.file = event.target.files[0];
        if(type === 'icon' &&  file){
          this.hasFile = true;
        } else if(type !== 'icon' && file){
          this.hasFile2 = true;
        } else if(!file){
          return
        }
        let uid = uuid.v4().replace(/-/g, ""); //生成唯一文件名
        let index1 = file.name.lastIndexOf('.');
        let index2 = file.name.length;
        this.keys = uid + file.name.substring(index1, index2);
        this.upLoadFile(type);
      },
      upLoadFile(type) {
        let vm = this;
        let Bucket = 'meet-1257688644';
        let Region = 'ap-shanghai';
        // 初始化实例
        let cos = new COS({
          getAuthorization: function (options, callback) {
            vm.axiosGET(vm, vm.$API.API.tencentSig,
              'application/json;charset=UTF-8',
              {keys:vm.keys},
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
          if(type === 'icon'){
            vm.paramsData.iconUrl = 'http://meet-1257688644.cos.ap-shanghai.myqcloud.com/' + vm.keys;
          } else {
            vm.paramsData.fileUrl = 'http://meet-1257688644.cos.ap-shanghai.myqcloud.com/' + vm.keys;
          }
          if (err) {
            console.log(err);
          }
        });
      },
      //预览图片
      previewPic(){
        this.$store.commit('setShowPicPopOn',{type:'pic',content:this.paramsData.iconUrl})
      },
      //预览文件
      previewFile(){
        if(this.paramsData.giftType===2 && this.hasFile2){
          let vm = this;
          this.ifLoading=true;
          setTimeout(()=>{
            vm.ifLoading = false;
            vm.$store.commit('setShowPicPopOn',{type:'file',content:vm.paramsData.fileUrl})
          },1000)
        }  else if(this.paramsData.giftType===1 && this.hasFile2){
          this.$store.commit('setShowPicPopOn',{type:'pic',content:this.paramsData.fileUrl})
        } else {
          this.$message.error("请上传文件!")
        }
      },
      //提交数据
      submitForm(formName){
        let vm = this;
        if (this.hasFile && this.hasFile2) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              vm.axiosPOST(vm, vm.$API.API.giftEdit,
                'application/json',
                vm.paramsData,
                vm.getSuccessCB
              );
            } else {
              return false;
            }
          });
        } else {
          this.$message.error("请上传图片或文件!")
        }
      },
      //成功回调
      getSuccessCB(vm, res) {
        vm.$message({
          message: '提交成功！',
          type: 'success'
        });
        setTimeout(() => {
          vm.$router.go(-1);
        }, 300)
      }
    },
    mounted(){
      this.fileType = '.gif,.GIF';
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
