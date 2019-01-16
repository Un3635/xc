<template>
  <div class="company_certification">

    <plugin_title :message="parentMsg"></plugin_title>

    <div class="form_box">
      <div class="one_line">
        <span class="name">账号使用者姓名</span>
        <input type="text" placeholder="姓名" @keyup="account_name(account_user_name)" v-model.trim="account_user_name" class="ipt"
               @focus="iptFocus">
        <span class="account_tip">{{account_tip}}</span>
      </div>
      <div class="one_line">
        <span class="name">公司名称</span>
        <input type="text" placeholder="公司名称" @keyup="company_na(company_name)" v-model.trim="company_name" class="ipt_two"
               @focus="iptFocusT">
        <span class="company_tip">{{company_tip}}</span>
      </div>
      <div class="one_line">
        <span class="name">上传公司营业执照</span>


        <div class="up_load" style="height: 148px;">
          <el-upload
            :action="UploadUrl()"
            list-type="picture-card"
            :multiple=false
            :limit="1"
            :on-preview="handlePictureCardPreview"
            :on-exceed="handleExceed"
            :before-upload="beforeAvatarUpload"
            :on-error="uploadError"
            :on-success="uploadSuccess"
            :file-list="fileList"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>

          <el-dialog :visible.sync="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </div>
        <span class="support_pattern">支持格式 png、jpg、jpeg     文件大小 小于5MB</span>

        <span class="photo_tip">{{photo_tip}}</span>

      </div>
      <div class="one_line">
        <span></span>
        <!--<div class="btn_successT" @click="submitCompanyVerify" style="padding-left: 30px;padding-right: 30px;">提交企业认证</div>-->
        <el-button type="primary" :loading="loading" @click="submitCompanyVerify" style="padding-left: 30px;padding-right: 30px;">提交企业认证</el-button>
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

  export default {
    components: {
      plugin_title: plugin_title,
      pop: pop
    },
    name: 'companyCertification',
    data(){

      return {
          loading:false,
        obj: {
          title: '账号认证',
          content: '',
          is_pop: false
        },
        fileList: [],
        licenseImg: '',
        token: '',

        parentMsg: '企业认证', //在data中定义需要传入的值
        account_tip: '',
        company_tip: '',
        photo_tip: '',
        account_user_name: '',
        company_name: '',
        checkUserName: false,
        checkCompanyName: true,
        dialogImageUrl: '',
        deposit: '',
        dialogVisible: false,
        pic: []
      }
    },
    methods: {
      iptFocus(){
        $('.ipt').css('border-color', '#6ECC66');
      },
      iptFocusT(){
        $('.ipt_two').css('border-color', '#6ECC66');
      },
      UploadUrl(){
        return allMethods.API + '/common/uploadFile';
      },
      account_name(val){
        var vm = this;
        vm.checkUserName = false;
        if (vm.account_user_name == '') {
          $('.ipt').css('border-color', '#FF4949')
          this.account_tip = "请输入姓名"
        } else if (!/^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/.test(vm.account_user_name)) {
          $('.ipt').css('border-color', '#FF4949')
          this.account_tip = "请输入正确的姓名"
        } else {
          $('.ipt').css('border-color', '#6ECC66')
          this.account_tip = '';
          vm.checkUserName = true
        }
      },
      company_na(){
        var vm = this;
        vm.checkCompanyName = false;
        if (vm.company_name == '') {
          $('.ipt_two').css('border-color', '#FF4949')
          this.company_tip = "请输入公司名称"
        } else if (!allMethods.ChineseReg.test(vm.company_name)) {
          $('.ipt_two').css('border-color', '#FF4949')
          this.company_tip = "请输入正确的公司名称"
        } else {
          $('.ipt_two').css('border-color', '#6ECC66')
          this.company_tip = '';
          vm.checkCompanyName = true;
        }
      },
      submitCompanyVerify(){

        var vm = this;

        if (vm.account_user_name == '' || vm.company_name == "" || vm.pic.length == 0) {
          if (vm.account_user_name == '') {
            $('.ipt').css('border-color', '#FF4949')
            this.account_tip = "请输入姓名"
          }
          if (vm.company_name == '') {
            $('.ipt_two').css('border-color', '#FF4949')
            this.company_tip = "请输入公司名称"
          }
          if (!allMethods.ChineseReg.test(vm.company_name)) {
            $('.ipt_two').css('border-color', '#FF4949')
            this.company_tip = "请输入正确的公司名称"
          }
          if (vm.pic.length != 2) {
            vm.photo_tip = '请上传营业执照';
          }

        } else if (vm.checkCompanyName && vm.checkUserName) {
//              请求接口
          vm.loading=true;
          vm.photo_tip = '';
          var obj = {
            token: vm.token,
            userName: vm.account_user_name,
            company: vm.company_name,
            licenseImgName: vm.pic[0],
            licenseImgUrl: vm.pic[1],
            initTime: new Date().getTime()
          }

          this.$http.post('/account/submitAuthInfo', obj).then(function (data) {
            vm.loading=false;
            if (Number(data.data.code) === 1000) {
              if(vm.deposit && vm.deposit === 'deposit'){
                vm.$router.push('./freeDeposit')
              }
              vm.$emit('authSuccess');
            } else {

              vm.obj.is_pop = true;
              vm.obj.content = data.data.msg;
            }
          })
//        请求成功后  自动跳转到【中间态-额度申请】applyQuota
        }

      },
      uploadError(){
        this.photo_tip = '请上传营业执照';
      },
      uploadSuccess(response, file, fileLis){
        var that = this;
        that.photo_tip = '';
        $('.el-upload').css('display', 'none');
        if (Number(response.code) === 1000) {
          that.fileName = response.data.fileName;
          that.fileUrl = response.data.fileUrl;
          that.pic.push(this.fileName, this.fileUrl);
        }
//        console.log(5678);
      },
      beforeAvatarUpload(file) {
        const isJPG = (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg');
        const isLt2M = file.size / 1024 / 1024 < 5;

        if (!isJPG) {
          this.photo_tip = '上传图片只能是 png jpg jpeg 格式!';
        }
        if (!isLt2M) {
//          this.photo_tip='上传图片大小不能超过 5MB!';
          this.photo_tip = '营业执照照片过大，请压缩后再上传';
        }
        return isJPG && isLt2M;
        $('.el-upload').css('display', 'none');
      },
      handleRemove(file, fileList) {

        $('.el-upload').css('display', 'inline-block');
        this.pic.length = 0;
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleExceed(files, fileList) {
      },
      isFromCF(){
        if (this.$route.query.from == 'companyCertificationFailed') {
          var vm = this;
          vm.$http.get('/account/queryAuthInfo', {params: {token: vm.token,initTime: new Date().getTime()}}).then(function (data) {
            var res = data.data;
            if (Number(res.code) === 1000) {
              vm.company_name = res.data.companyName;
              vm.licenseImg = res.data.licenseImg;
              vm.account_user_name = res.data.userName;

              vm.fileList = [{name: '', url: ''}];
              vm.fileList[0].url = vm.licenseImg;

              vm.pic[0] = vm.licenseImgName;
              vm.pic[1] = vm.licenseImg;
              $('.el-upload').css('display', 'none');
              vm.checkCompanyName = true;
              vm.checkUserName = true;
            } else {

              vm.obj.is_pop = true;
              vm.obj.content = res.msg;
            }
          })
        }
      }
    },
    created(){
      this.token = localStorage.getItem('xckz_mall');
      this.deposit = this.$route.query.t;

      this.isFromCF();

      this.company_name = localStorage.getItem('xckz_mall_companyName');
      var vm = this;
      bus.$on('error',function () {
        vm.obj.is_pop = false;
      })
    }
  }
</script>

<style scoped lang="scss">
  .company_certification .el-icon-plus {
    line-height: inherit;
  }

  .btn_success {
    height: 36px;
    line-height: 36px;
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 50px;
  }

  .btn_successT {
    padding-left: 30px;
    padding-right: 30px;
  }
</style>
