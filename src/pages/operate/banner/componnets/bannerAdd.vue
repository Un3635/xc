<template>
    <d2-container>
        <template slot="header"><span></span>新增<i class="el-icon-close detail-close" @click="$router.go(-1)"></i></template>
        <div class="detail">
            <el-form :model="paramsData" :rules="rules" ref="paramsForm" label-width="150px" class="rule-form">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="paramsData.title" placeholder="请填写Banner标题"></el-input>
                </el-form-item>
                <el-form-item label="Banner" required>
                    <div class="upload-wrap">
                        <p v-if="!hasFile">上传图片</p>
                        <p v-if="hasFile">重新上传</p>
                        <input id="file-selector" type="file"
                               accept = ".png,.jpg,.gif,.jpeg"
                               name="filename"
                               class="uploadBtn"
                               @change="triggerFile($event)"
                               ref="uploadBtn">
                    </div>
                    <div class="upload-wrap" v-if="hasFile" @click="previewFile">
                        <p>查看图片</p>
                    </div>
                    <span class="load-tip">建议小于500KB</span>
                </el-form-item>
                <el-form-item label="所属Tab" prop="ownTabId">
                    <el-select v-model="paramsData.ownTabId" placeholder="请选择所对应的Tab">
                        <el-option v-for="(tab,index) in allTab" :label="tab.name" :value="tab.name" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="上线日期" prop="startTime">
                    <el-date-picker
                            class="item-date-picker banner-add-date-picker"
                            v-model="paramsData.startTime"
                            type="date"
                            :clearable="true"
                            value-format="timestamp"
                            :picker-options="startDateOpt"
                            placeholder="请选择上线日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="下线日期" prop="endTime">
                    <el-date-picker
                            class="item-date-picker banner-add-date-picker"
                            v-model="paramsData.endTime"
                            type="date"
                            :clearable= "true"
                            value-format="timestamp"
                            :picker-options="endDateOpt"
                            placeholder="请选择下线日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="排序" required>
                    <el-input-number class="item-number" v-model="paramsData.sort" controls-position="right" :min="0" :max="100"></el-input-number>
                </el-form-item>
                <el-form-item label="跳转链接" required>
                    <div class="item-radio">
                        <el-radio v-model="paramsData.linkType" :label="0">URL</el-radio>
                        <el-radio v-model="paramsData.linkType" :label="1">无</el-radio>
                    </div>
                </el-form-item>
                <el-form-item label="链接地址" prop="jumpLinkUrl" v-if="paramsData.linkType===0">
                    <el-input class="item-input" v-model="paramsData.jumpLinkUrl" placeholder="请填写URL地址"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" plain class="return-btn" @click="submitForm('paramsForm')">提交</el-button>
                    <el-button type="info" plain class="return-btn" @click="$router.go(-1)" style="margin-left:15px;">返回</el-button>
                </el-form-item>
            </el-form>
        </div>
    </d2-container>
</template>

<script>
  import COS from 'cos-js-sdk-v5'
  import uuid from 'node-uuid'
  export default {
    name: "bannerAdd",
    data() {
      return {
        hasFile:false, //是否上传文件
        file:'', //上传的文件保存在这里
        imgDataUrl:'', //上传的图片地址
        paramsData:{
          'endTime':null,
          'imgUrl':'',
          'linkType':0,
          'jumpLinkUrl':null,
          'ownTabId':null,
          'sort': 0,
          'startTime':null,
          'title':null
        },
        rules: {
          title: [
            { required: true, message: '请填写Banner标题', trigger: 'blur' },
          ],
          ownTabId: [
            { required:true, message:'请选择所对应的Tab', trigger: 'change' }
          ],
          jumpLinkUrl: [
            { required: true,message:'请填写URL地址',trigger: 'blur'}
          ],
          startTime:[
            { required: true,message:'请选择上线日期',trigger: 'blur'}
          ],
          endTime:[
            { required: true,message:'请选择下线日期',trigger: 'blur'}
          ]
        },
        allTab:[],
        startDateOpt: {  //控制开始日期的选择范围（不能在结束日期之后）
          disabledDate: (time) => {
            if(this.paramsData.endTime && this.paramsData.endTime !== '') {
              return time.getTime() > this.paramsData.endTime;
            }
          }
        },
        endDateOpt: {  //控制结束日期的选择范围（不能在开始日期之前）
          disabledDate: (time) => {
            if(this.paramsData.startTime && this.paramsData.startTime !== ''){
              return time.getTime() < this.paramsData.startTime;
            }
          }
        }
      }
    },
    methods:{
      //获取所有tab
      getAllTab(){
        let vm = this;
        this.axiosGET(vm, vm.$API.API.interestList,
          'application/x-www-form-urlencoded',
          {},
          (vm,res) =>{
            vm.allTab = res.data;
          })
      },
      //上传文件按钮
      triggerFile(event) {
        this.hasFile = true;
        let file = this.file = event.target.files[0];
        if (!file) return;
        this.imgDataUrl =this.getObjectURL(file); //获取图片地址
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
          vm.paramsData.imgUrl = 'http://meet-1257688644.cos.ap-shanghai.myqcloud.com/' + vm.keys;
          if (err) {
            console.log(err);
          }
        });
      },
      //获取文件路径--本地查看图片
      getObjectURL (file) {
        let url = null ;
        if (window.createObjectURL!=undefined) { // basic
          url = window.createObjectURL(file) ;
        }else if (window.URL!=undefined) {
          url = window.URL.createObjectURL(file) ;
        }
        return url ;
      },
      //预览文件
      previewFile(){
        this.$store.commit('setShowPicPopOn',{type:'pic',content:this.imgDataUrl})
      },
      //提交数据
      submitForm(formName){
        if(this.paramsData.linkType === 1){
          this.paramsData.jumpLinkUrl = '';
        }
        let vm = this;
        if (this.hasFile) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              if(vm.paramsData.endTime && vm.paramsData.endTime !== ''){
                vm.paramsData.endTime = vm.paramsData.endTime + 24*60*60*1000 -999;
              }
              vm.axiosPOST(vm, vm.$API.API.bannerUpOrAdd,
                'application/json',
                vm.paramsData,
                vm.getSuccessCB
              );
            } else {
              return false;
            }
          });
        } else {
          this.$message.error("请上传Banner图片!")
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
      this.getAllTab();
    }
  }
</script>

<style scoped lang="scss">
    @import '~@/assets/style/public-class.scss';
</style>