<template>
  <div class="apply_quota">
    <plugin_title :message="parentMsg"></plugin_title>
    <div class="content">
      <div class="title">
        <span class="send_appendix">上传附件</span>
        <span class="grey">支持格式 zip、rar压缩包     文件大小 不超过100MB</span>
      </div>
      <div class="files">
        <div class="files_one">
          <el-row :gutter="20" style="margin: 0;">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <div class="file_box">
                  <div class="people">
                    人民银行征信报告
                  </div>
                  <div class="recent">
                    最近一周内的信息
                  </div>
                  <div class="el_button">
                    <el-upload
                      class="upload-demo"
                      :action="UploadUrl()"
                      :multiple=false
                      :on-preview="handlePreview"
                      :on-remove="handleRemoveOne"
                      :before-remove="beforeRemove"
                      :on-exceed="handleExceed"
                      :before-upload="beforeAvatarUploadOne"
                      :on-error="uploadErrorOne"
                      :on-success="uploadSuccessOne"
                      :on-progress="uploadingOneT"
                      :file-list="fileList">
                      <span class="file_up_tip">{{tip1}}</span>
                      <span class="btn_text" v-if="!tip1a">上传</span>
                    </el-upload>
                  </div>
                </div>

              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <div class="file_box">
                  <div class="people">
                    经营场所证明
                  </div>
                  <div class="recent">
                    房本、租赁合同、水电煤账单
                  </div>

                  <div class="el_button">
                    <el-upload
                      class="upload-demo"
                      :action="UploadUrl()"
                      :on-preview="handlePreview"
                      :on-remove="handleRemoveTwo"
                      :before-remove="beforeRemove"
                      :on-exceed="handleExceed"
                      :before-upload="beforeAvatarUploadTwo"
                      :on-error="uploadErrorTwo"
                      :on-success="uploadSuccessTwo"
                      :on-progress="uploadingTwoT"
                      :file-list="fileList">
                      <span class="file_up_tip">{{tip2}}</span>
                      <span class="btn_text" v-if="!tip2a">上传</span>
                    </el-upload>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <div class="file_box">
                  <div class="people">
                    企业近半年社保/公积金缴纳记录
                  </div>
                  <div class="recent">

                  </div>
                  <div class="el_button">
                    <el-upload
                      class="upload-demo"
                      :action="UploadUrl()"
                      :on-preview="handlePreview"
                      :on-remove="handleRemoveThree"
                      :before-remove="beforeRemove"
                      :on-exceed="handleExceed"
                      :before-upload="beforeAvatarUploadThree"
                      :on-error="uploadErrorThree"
                      :on-success="uploadSuccessThree"
                      :on-progress="uploadingThreeT"
                      :file-list="fileList">
                      <span class="file_up_tip">{{tip3}}</span>
                      <span class="btn_text" v-if="!tip3a">上传</span>
                    </el-upload>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <div class="file_box">
                  <div class="people">
                    公司对公流水
                  </div>
                  <div class="recent">
                    过往三个月
                  </div>

                  <div class="el_button">
                    <el-upload
                      class="upload-demo"
                      :action="UploadUrl()"
                      :on-preview="handlePreview"
                      :on-remove="handleRemoveFour"
                      :before-remove="beforeRemove"
                      :on-exceed="handleExceed"
                      :before-upload="beforeAvatarUploadFour"
                      :on-error="uploadErrorFour"
                      :on-success="uploadSuccessFour"
                      :on-progress="uploadingFourT"
                      :file-list="fileList">
                      <span class="file_up_tip">{{tip4}}</span>
                      <span class="btn_text" v-if="!tip4a">上传</span>
                    </el-upload>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="files_two">
          <el-row :gutter="20" style="margin: 0;">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <div class="file_box">
                  <div class="people">
                    近一年的资产负债表
                  </div>
                  <div class="recent">

                  </div>

                  <div class="el_button">
                    <el-upload
                      class="upload-demo"
                      :action="UploadUrl()"
                      :on-preview="handlePreview"
                      :on-remove="handleRemoveFive"
                      :before-remove="beforeRemove"
                      :on-exceed="handleExceed"
                      :before-upload="beforeAvatarUploadFive"
                      :on-error="uploadErrorFive"
                      :on-success="uploadSuccessFive"
                      :on-progress="uploadingFiveT"
                      :file-list="fileList">
                      <span class="file_up_tip">{{tip5}}</span>
                      <span class="btn_text" v-if="!tip5a">上传</span>
                    </el-upload>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <div class="file_box">
                  <div class="people">
                    近一年的利润表
                  </div>
                  <div class="recent">

                  </div>

                  <div class="el_button">
                    <el-upload
                      class="upload-demo"
                      :action="UploadUrl()"
                      :on-preview="handlePreview"
                      :on-remove="handleRemoveSix"
                      :before-remove="beforeRemove"
                      :on-exceed="handleExceed"
                      :before-upload="beforeAvatarUploadSix"
                      :on-error="uploadErrorSix"
                      :on-success="uploadSuccessSix"
                      :on-progress="uploadingSixT"
                      :file-list="fileList">
                      <span class="file_up_tip">{{tip6}}</span>
                      <span class="btn_text" v-if="!tip6a">上传</span>
                    </el-upload>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <div class="file_box">
                  <div class="people">
                    近一年资金流量表
                  </div>
                  <div class="recent">

                  </div>

                  <div class="el_button">
                    <el-upload
                      class="upload-demo"
                      :action="UploadUrl()"
                      :on-preview="handlePreview"
                      :on-remove="handleRemoveSeven"
                      :before-remove="beforeRemove"
                      :on-exceed="handleExceed"
                      :before-upload="beforeAvatarUploadSeven"
                      :on-error="uploadErrorSeven"
                      :on-success="uploadSuccessSeven"
                      :on-progress="uploadingSevenT"
                      :file-list="fileList">
                      <span class="file_up_tip">{{tip7}}</span>
                      <span class="btn_text" v-if="!tip7a">上传</span>
                    </el-upload>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>


      <div class="apply_button">
        <div class="please" v-if="please_tip">请上传资料</div>
        <el-button type="primary" :loading="loading" @click="applyPromoteFreeDepositQuota">
            申请提升免押金额度
          </el-button>
      </div>
    </div>

    <pop :obj="obj"></pop>

  </div>

</template>

<script type="text/ecmascript-6">
  import plugin_title from '../plugin_title'
  import {allMethods} from '../../assets/js/config'
  import {bus} from '../../assets/js/config'
  import pop from './x-pop'
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button";
  export default {
    components: {
      ElButton,
      plugin_title: plugin_title,
      pop: pop
    },
    name: 'applyQuota',
    data(){
      return {
          uploadingOne:true,
          uploadingTwo:true,
          uploadingThree:true,
          uploadingFour:true,
          uploadingFive:true,
          uploadingSix:true,
          uploadingSeven:true,
        loading:false,
        obj: {
          title: '申请额度',
          content: '',
          is_pop: false
        },
        token: '',
        creditName: '',
        creditUrl: '',
        siteName: '',
        siteUrl: '',
        sbGjjName: '',
        sbGjjUrl: '',
        publicRecordName: '',
        publicRecordUrl: '',
        liabilitiesName: '',
        liabilitiesUrl: '',
        profitName: '',
        profitUrl: '',
        flowsName: '',
        flowsUrl: '',
        please_tip: false,
        url: allMethods.API + '/common/uploadFile',
        tip1: '',
        tip2: '',
        tip3: '',
        tip4: '',
        tip5: '',
        tip6: '',
        tip7: '',
        tip1a: false,
        tip2a: false,
        tip3a: false,
        tip4a: false,
        tip5a: false,
        tip6a: false,
        tip7a: false,
        parentMsg: '申请额度',
        fileList: [],
        file_arr: [
          [
            {
              first: '人民银行征信报告',
              second: '最近一周内的信息',
              k: 1
            },
            {
              first: '经营场所证明',
              second: '房本、租赁合同、水电煤账单',
              k: 2
            },
            {
              first: '企业近半年社保/公积金缴纳记录',
              second: '',
              k: 3
            },
            {
              first: '公司对公流水',
              second: '过往三个月',
              k: 4
            }
          ], [
            {
              first: '近一年的资产负债表',
              second: '',
              k: 5,
            },
            {
              first: '近一年的利润表',
              second: '',
              k: 6
            },
            {
              first: '近一年资金流量表',
              second: '',
              k: 7
            }
          ]

        ],
      }
    },
    methods: {
      uploadingOneT(){
        this.uploadingOne=false;
      },uploadingTwoT(){
        this.uploadingTwo=false;
      },uploadingThreeT(){
        this.uploadingThree=false;
      },uploadingFourT(){
        this.uploadingFour=false;
      },uploadingFiveT(){
        this.uploadingFive=false;
      },uploadingSixT(){
        this.uploadingSix=false;
      },uploadingSevenT(){
        this.uploadingSeven=false;
      },
      UploadUrl(){
        return allMethods.API + '/common/uploadFile';
      },
      applyPromoteFreeDepositQuota(){
        var vm = this;
        var obj = {
          creditName: this.creditName,
          creditUrl: this.creditUrl,
          siteName: this.siteName,
          siteUrl: this.siteUrl,
          sbGjjName: this.sbGjjName,
          sbGjjUrl: this.sbGjjUrl,
          publicRecordName: this.publicRecordName,
          publicRecordUrl: this.publicRecordUrl,
          liabilitiesName: this.liabilitiesName,
          liabilitiesUrl: this.liabilitiesUrl,
          profitName: this.profitName,
          profitUrl: this.profitUrl,
          flowsName: this.flowsName,
          flowsUrl: this.flowsUrl,
          token: this.token,
          initTime: new Date().getTime()
        }
        if (this.creditName == "" && this.siteName == "" && this.sbGjjName == "" && this.publicRecordName == "" && this.liabilitiesName == "" && this.profitName == "" && this.flowsName == "") {
          this.please_tip = true;
        } else {

          if(vm.uploadingOne&&vm.uploadingTwo&&vm.uploadingThree&&vm.uploadingFour&&vm.uploadingFive&&vm.uploadingSix&&vm.uploadingSeven){
            vm.loading=true;
            this.please_tip = false;
            this.$http.post('/deposit/applyDeposit', obj).then(function (data) {
              vm.loading=false;
              if (Number(data.data.code) === 1000) {
                localStorage.setItem('xckz_mall_status', true);
                vm.$emit('applySuccess');
              } else {
                vm.obj.is_pop = true;
                vm.obj.content = data.data.msg;
              }
            })

          }else{
            vm.obj.is_pop = true;
            vm.obj.content = "文件上传尚未完成，请稍后再试!";
          }


        }
      },
      uploadErrorOne(){
        this.uploadingOne=true;
        var that = this;
        that.tip1 = "上传失败";
        that.tip1a = false;
      }, uploadErrorTwo(){
        this.uploadingTwo=true;
        var that = this;
        that.tip2 = "上传失败";
        that.tip2a = false;
      }, uploadErrorThree(){
        this.uploadingThree=true;
        var that = this;
        that.tip3 = "上传失败";
        that.tip3a = false;
      }, uploadErrorFour(){
        this.uploadingFour=true;
        var that = this;
        that.tip4 = "上传失败";
        that.tip4a = false;
      }, uploadErrorFive(){
        this.uploadingFive=true;
        var that = this;
        that.tip5 = "上传失败";
        that.tip5a = false;
      }, uploadErrorSix(){
        this.uploadingSix=true;
        var that = this;
        that.tip6 = "上传失败";
        that.tip6a = false;
      }, uploadErrorSeven(){
        this.uploadingSeven=true;
        var that = this;
        that.tip7 = "上传失败";
        that.tip7a = false;
      },
      uploadSuccessOne(response){
        var that = this;
        that.tip1a = true;
        that.tip1 = '';
        if (Number(response.code) === 1000) {
          that.uploadingOne=true;
          that.creditName = response.data.fileName;
          that.creditUrl = response.data.fileUrl;
        }

      }, uploadSuccessTwo(response){
        var that = this;
        that.tip2a = true;
        that.tip2 = '';
        if (Number(response.code) === 1000) {
          that.uploadingTwo=true;
          that.siteName = response.data.fileName;
          that.siteUrl = response.data.fileUrl;
        }
      }, uploadSuccessThree(response){
        var that = this;
        that.tip3a = true;
        that.tip3 = '';
        if (Number(response.code) === 1000) {
          that.uploadingThree=true;
          that.sbGjjName = response.data.fileName;
          that.sbGjjUrl = response.data.fileUrl;
        }
      }, uploadSuccessFour(response){
        var that = this;
        that.tip4a = true;
        that.tip4 = '';
        if (Number(response.code) === 1000) {
          that.uploadingFour=true;
          that.publicRecordName = response.data.fileName;
          that.publicRecordUrl = response.data.fileUrl;
        }
      }, uploadSuccessFive(response){
        var that = this;
        that.tip5a = true;
        that.tip5 = '';
        if (Number(response.code) === 1000) {
          that.uploadingFive=true;
          that.liabilitiesName = response.data.fileName;
          that.liabilitiesUrl = response.data.fileUrl;
        }
      }, uploadSuccessSix(response){
        var that = this;
        that.tip6a = true;
        that.tip6 = '';
        if (Number(response.code) === 1000) {
          that.uploadingSix=true;
          that.profitName = response.data.fileName;
          that.profitUrl = response.data.fileUrl;
        }
      }, uploadSuccessSeven(response){
        var that = this;
        that.tip7a = true;
        that.tip7 = '';
        if (Number(response.code) === 1000) {
          that.uploadingSeven=true;
          that.flowsName = response.data.fileName;
          that.flowsUrl = response.data.fileUrl;
        }
      },
      beforeAvatarUploadOne(file) {
        var that = this;

        var idx = file.name.lastIndexOf(".");
        var file_name = file.name.substr(idx + 1).toUpperCase();

        const isJPG = (file_name === 'RAR' || file_name === 'ZIP');
        const isLt2M = file.size / 1024 / 1024 < 100;
        if (!isJPG) {
          that.tip1 = '请将文件打包为zip或rar后上传';
        }
        if (!isLt2M) {
          that.tip1 = '文件过大，请将文件压缩后再上传';
        }
        that.tip1a = true;
        return isJPG && isLt2M;

      }, beforeAvatarUploadTwo(file) {
        var that = this;

        var idx = file.name.lastIndexOf(".");
        var file_name = file.name.substr(idx + 1).toUpperCase();

        const isJPG = (file_name === 'RAR' || file_name === 'ZIP');
        const isLt2M = file.size / 1024 / 1024 < 100;
        if (!isJPG) {
          that.tip2 = '请将文件打包为zip或rar后上传';
        }
        if (!isLt2M) {
          that.tip2 = '文件过大，请将文件压缩后再上传';
        }
        that.tip2a = true;
        return isJPG && isLt2M;
      }, beforeAvatarUploadThree(file) {
        var that = this;

        var idx = file.name.lastIndexOf(".");
        var file_name = file.name.substr(idx + 1).toUpperCase();

        const isJPG = (file_name === 'RAR' || file_name === 'ZIP');
        const isLt2M = file.size / 1024 / 1024 < 100;
        if (!isJPG) {
          that.tip3 = '请将文件打包为zip或rar后上传';
        }
        if (!isLt2M) {
          that.tip3 = '文件过大，请将文件压缩后再上传';
        }
        that.tip3a = true;
        return isJPG && isLt2M;
      }, beforeAvatarUploadFour(file) {
        var that = this;

        var idx = file.name.lastIndexOf(".");
        var file_name = file.name.substr(idx + 1).toUpperCase();

        const isJPG = (file_name === 'RAR' || file_name === 'ZIP');
        const isLt2M = file.size / 1024 / 1024 < 100;
        if (!isJPG) {
          that.tip4 = '请将文件打包为zip或rar后上传';
        }
        if (!isLt2M) {
          that.tip4 = '文件过大，请将文件压缩后再上传';
        }
        that.tip4a = true;
        return isJPG && isLt2M;
      }, beforeAvatarUploadFive(file) {
        var that = this;

        var idx = file.name.lastIndexOf(".");
        var file_name = file.name.substr(idx + 1).toUpperCase();

        const isJPG = (file_name === 'RAR' || file_name === 'ZIP');
        const isLt2M = file.size / 1024 / 1024 < 100;
        if (!isJPG) {
          that.tip5 = '请将文件打包为zip或rar后上传';
        }
        if (!isLt2M) {
          that.tip5 = '文件过大，请将文件压缩后再上传';
        }
        that.tip5a = true;
        return isJPG && isLt2M;
      }, beforeAvatarUploadSix(file) {
        var that = this;

        var idx = file.name.lastIndexOf(".");
        var file_name = file.name.substr(idx + 1).toUpperCase();
        const isJPG = (file_name === 'RAR' || file_name === 'ZIP');
        const isLt2M = file.size / 1024 / 1024 < 100;
        if (!isJPG) {
          that.tip6 = '请将文件打包为zip或rar后上传';
        }
        if (!isLt2M) {
          that.tip6 = '文件过大，请将文件压缩后再上传';
        }
        that.tip6a = true;
        return isJPG && isLt2M;
      }, beforeAvatarUploadSeven(file) {
        var that = this;

        var idx = file.name.lastIndexOf(".");
        var file_name = file.name.substr(idx + 1).toUpperCase();

        const isJPG = (file_name === 'RAR' || file_name === 'ZIP');
        const isLt2M = file.size / 1024 / 1024 < 100;
        if (!isJPG) {
          that.tip7 = '请将文件打包为zip或rar后上传';
        }
        if (!isLt2M) {
          that.tip7 = '文件过大，请将文件压缩后再上传';
        }
        that.tip7a = true;
        return isJPG && isLt2M;
      },
      handleRemoveOne(file, fileList) {
        this.tip1a = false;
        this.creditName = "";
        this.creditUrl = "";
      }, handleRemoveTwo(file, fileList) {
        this.tip2a = false;
        this.siteName = "";
        this.siteUrl = "";
      }, handleRemoveThree(file, fileList) {
        this.tip3a = false;
        this.sbGjjName = ""
        this.sbGjjUrl = ""
      }, handleRemoveFour(file, fileList) {
        this.tip4a = false;
        this.publicRecordName = "";
        this.publicRecordUrl = "";
      }, handleRemoveFive(file, fileList) {
        this.tip5a = false;
        this.liabilitiesName = "";
        this.liabilitiesUrl = "";
      }, handleRemoveSix(file, fileList) {
        this.tip6a = false;
        this.profitName = "";
        this.profitUrl = "";
      }, handleRemoveSeven(file, fileList) {
        this.tip7a = false;
        this.flowsName = "";
        this.flowsUrl = "";
      },
      handlePreview(file) {

      },
      handleExceed(files, fileList) {

      },
      beforeRemove(file, fileList) {

      }
    },
    created(){
      this.token = localStorage.getItem('xckz_mall');
      var vm = this;
      bus.$on('error',function () {
        vm.obj.is_pop = false;
      })
    }
  }
</script>

<style scoped lang="scss">
  .el-upload-list__item-status-label {
    /*top: 6px !important;*/
  }

  .btn_text {
    height: 36px;
    line-height: 36px;
  }

  .btn_success {
    width: auto;
    height: 36px;
    line-height: 36px;
    padding-left: 20px;
    padding-right: 20px;
  }

  /*.bg-purple-dark {*/
  /*background: #99a9bf;*/
  /*}*/
  /*.bg-purple {*/
  /*background: #d3dce6;*/
  /*}*/
  /*.bg-purple-light {*/
  /*background: #e5e9f2;*/
  /*}*/
</style>
