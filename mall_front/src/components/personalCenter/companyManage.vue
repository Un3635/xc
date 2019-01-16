<template>
  <div class="company-manage">
    <div class="node-info">
      <el-row>
        <el-col :span="5">当前公司</el-col>
        <el-col :span="11">{{info.companyName}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">上层节点</el-col>
        <el-col :span="11">
          <span class="high-light" v-if="info.rootFlag">当前已是根节点公司</span>
          <span v-if="!info.rootFlag && info.parentCompanyName">{{info.parentCompanyName}}</span>
          <span v-if="!info.rootFlag && !info.parentCompanyName">无</span>
        </el-col>
        <el-col :span="8" :style="{'text-align': info.rootFlag ? 'center' : 'right'}">
          <router-link to="subCompanyManage">
            <el-button v-if="info.rootFlag" type="primary">根节点公司管理</el-button>
          </router-link>
          <el-button v-if="!info.parentCompanyName && !info.rootFlag" type="primary" @click="addLower">绑定上层节点
          </el-button>
          <el-button style="margin-left: 40px" v-if="!info.rootFlag && !info.parentCompanyName" type="primary"
                     @click="addRoot">设为根节点公司
          </el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">下层结点列表</el-col>
        <!--<el-col :span="12"></el-col>-->
        <el-col :span="8" :offset="11" v-if="info.rootFlag || info.parentCompanyName">
          <el-button type="primary" @click="bindSuperDom">添加下层节点</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="company-list">
      <table cellspacing="0">
        <thead>
        <tr>
          <th>公司名称</th>
          <th>账户使用者姓名</th>
          <th>手机号</th>
        </tr>
        </thead>
        <tbody>
        <tr v-if="tableData.length != 0" v-for="item,index in tableData" :key="index">
          <td>{{item.companyName}}</td>
          <td>{{item.accountUserName}}</td>
          <td>{{item.phoneNo}}</td>
        </tr>
        </tbody>
      </table>
      <div class="no-data" v-if="tableData.length == 0">
        <img src="../../assets/images/icon_jilu_kong.png" alt="">
        <p>暂无下层节点公司</p>
      </div>
    </div>


    <!--设置根节点弹框1-->
    <transition name="fade">
      <el-dialog title="确认设置为根节点" :closeOnClickModal="false" class="bing-modal height357 indep500"
                 :visible.sync="pop_charge" width="500px">
        <el-form ref="form" label-width="80px" class="form-list">
          <el-form-item label="注册手机">
            <span class="spplayPhone">{{getPhone}}</span>
          </el-form-item>
          <el-form-item label="验证码">
            <el-input placeholder="请输入验证码" auto-complete="off" class="ipt_thr" @focus="greenBorder('.ipt_thr')" @blur="delBorder('.ipt_thr')" @keyup.native="verifyCode" v-model.trim="verify_code"></el-input>
            <el-button type="success" class="cend-code" v-show="isSend" @click="initAptcha('resetCaptcha',0,getPhone)">
              {{codeText}}
            </el-button>
            <el-button class="cend-code gray-code" v-show="!isSend">{{counts}}s后重新发送</el-button>
            <div class="verModal" v-if="verModal">
              <div class="wy" id="resetCaptcha"></div>
            </div>
          </el-form-item>
          <div class="error">{{myerror}}</div>
        </el-form>

        <div class="subTags">
          <el-button type="success" :loading="subLoading" @click="setBasic(0,getPhone)">确定添加</el-button>
        </div>
      </el-dialog>
    </transition>

    <!--绑定上级节点弹框2-->
    <transition name="fade">
      <el-dialog title="绑定上层节点" class="bing-modal indep500" :closeOnClickModal="false" :visible.sync="pop_upper"
                 width="500px">
        <div class="pop_title">注意：上层节点绑定后不可修改</div>
        <el-form ref="form" label-width="80px" class="form-list">
          <el-form-item class="list1" label="企业名称">
            <el-input placeholder="请输入企业名称" auto-complete="off" class="ipt_one" @focus="greenBorder('.ipt_one')" @blur="delBorder('.ipt_one')" @keyup.native="company_na" v-model.trim="company_name"></el-input>
            <span class="prompt">*仅可绑定已完成企业认证的账号</span>
            <div class="errorInpt">{{company_tip}}</div>
          </el-form-item>
          <el-form-item label="注册手机">
            <el-input placeholder="请输入手机号" auto-complete="off" class="ipt_two" @focus="greenBorder('.ipt_two')" @blur="delBorder('.ipt_two')" @keyup.native="regist_ph" v-model.trim="regist_phone"></el-input>
            <div class="errorInpt">{{company_phone}}</div>
          </el-form-item>
          <el-form-item label="验证码">
            <el-input placeholder="请输入验证码" auto-complete="off" class="ipt_thr" @focus="greenBorder('.ipt_thr')" @blur="delBorder('.ipt_thr')" @keyup.native="verifyCode" v-model.trim="verify_code"></el-input>
            <el-button type="success" class="cend-code" v-show="isSend" @click="sendCode('captcha3',1)">{{codeText}}
            </el-button>
            <el-button class="cend-code gray-code" v-show="!isSend">{{counts}}s后重新发送</el-button>
            <div class="verModal" v-if="verModal">
              <div class="wy" id="captcha3"></div>
            </div>
          </el-form-item>
          <div class="error">{{myerror}}</div>
        </el-form>

        <div class="subTags">
          <el-button type="success" :loading="subLoading" @click="subBindSuper(1)">确定添加</el-button>
        </div>
      </el-dialog>
    </transition>

    <!--添加下层节点-->
    <transition name="fade">
      <el-dialog title="添加下层节点" :closeOnClickModal="false" class="bing-modal" :visible.sync="bindSuper" width="600px">
        <div class="isattest">
          <el-radio-group v-model.trim="isattest" @change="changeNodeLayer">
            <el-radio label="1">已认证企业绑定</el-radio>
            <el-radio label="2">未注册企业添加</el-radio>
          </el-radio-group>
        </div>
        <div v-if="isattest == 1">
          <el-form ref="form" label-width="80px" class="form-list">
            <el-form-item class="list1" label="企业名称">
              <el-input placeholder="请输入企业名称" auto-complete="off" class="ipt_one" @focus="greenBorder('.ipt_one')" @blur="delBorder('.ipt_one')" @keyup.native="company_na(company_name)"
                        v-model.trim="company_name"></el-input>
              <span class="prompt">*仅可绑定已完成企业认证的账号</span>
              <div class="errorInpt">{{company_tip}}</div>
            </el-form-item>
            <el-form-item label="注册手机">
              <el-input placeholder="请输入手机号" auto-complete="off" class="ipt_two" @focus="greenBorder('.ipt_two')" @blur="delBorder('.ipt_two')" @keyup.native="regist_ph"
                        v-model.trim="regist_phone"></el-input>
              <div class="errorInpt">{{company_phone}}</div>
            </el-form-item>
            <el-form-item label="验证码">
              <el-input placeholder="请输入验证码" auto-complete="off" class="ipt_thr" @focus="greenBorder('.ipt_thr')" @blur="delBorder('.ipt_thr')" @keyup.native="verifyCode"
                        v-model.trim="verify_code"></el-input>
              <el-button type="success" class="cend-code" v-show="isSend" @click="sendCode('captcha2',2)">{{codeText}}
              </el-button>
              <el-button class="cend-code gray-code" v-show="!isSend">{{counts}}s后重新发送</el-button>
              <div class="verModal" v-if="verModal">
                <div class="wy" id="captcha2"></div>
              </div>
            </el-form-item>
            <div class="error">{{myerror}}</div>
          </el-form>
          <div class="subTags">
            <el-button type="success" :loading="subLoading" @click="subBindSuper(2)">确定添加</el-button>
          </div>
        </div>

        <div class="pop" v-if="isattest == 2">
          <el-form ref="form" label-width="100px" class="form-list">
            <el-form-item label="企业名称">
              <el-input type="text" @focus="greenBorder('.ipt_one')" auto-complete="off" @blur="delBorder('.ipt_one')" v-model.trim="company_name" @keyup.native="company_na(company_name)"
                        class="ipt ipt_one"
                        placeholder="企业名称"></el-input>
              <!--<span class="prompt">*仅可绑定已完成企业认证的账号</span>-->
              <div class="errorInpt">{{company_tip}}</div>
            </el-form-item>
            <el-form-item label="账号使用者">
              <el-input type="text" @focus="greenBorder('.ipt_for')" auto-complete="off" class="ipt ipt_for" @blur="delBorder('.ipt_for')"  v-model.trim="account_names" @keyup.native="accountName"
                        placeholder="账号使用者"></el-input>
              <div class="errorInpt">{{company_acc}}</div>
            </el-form-item>
            <el-form-item label="注册手机号">
              <el-input type="text" auto-complete="off" class="ipt ipt_two" @focus="greenBorder('.ipt_two')" @blur="delBorder('.ipt_two')" v-model.trim="regist_phone" @keyup.native="regist_ph"
                        placeholder="注册手机号"></el-input>
              <div class="errorInpt">{{company_phone}}</div>
            </el-form-item>

            <el-form-item label="短信验证码">
              <el-input type="text" auto-complete="off" class="chargeFocustwo ipt_thr" @focus="greenBorder('.ipt_thr')" @blur="delBorder('.ipt_thr')" @keyup.native="verifyCode" v-model.trim="verify_code"
                        placeholder="短信验证码"></el-input>
              <el-button type="success" class="cend-code" v-show="isSend" @click="noBindCode('captcha4',3)">
                {{codeText}}
              </el-button>
              <el-button type="success" class="cend-code gray-code" v-show="!isSend">{{counts}}s秒后重新发送</el-button>
              <div class="errorInpt">{{myerror}}</div>
              <div class="verModal" v-if="verModal">
                <div class="wy" id="captcha4"></div>
              </div>
            </el-form-item>
          </el-form>
          <div class="logins">
            <span class="loginleft">登陆密码</span>
            <span class="loginright">默认密码稍后发送信息至您的手机</span>
          </div>
          <div class="one_line">
            <span class="name">上传公司营业执照</span>
            <el-upload
              class="up_load"
              :action="UploadUrl()"
              list-type="picture-card"
              :limit="1"
              :multiple="false"
              :on-preview="handlePictureCardPreview"
              :on-change="changeFile"
              :before-upload="beforeAvatarUpload"
              :on-remove="removeFile"
              :on-success="uploadSuccess"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>

            <span class="support_pattern">支持单张上传
                <br>格式 png、jpg、jpeg  文件大小 小于10MB</span>
          </div>
          <span class="errorInpt left160">{{photo_tip}}</span>
          <div class="subm">
            <el-button type="success" @click="nobindCompany(3)" :loading="subLoading">确定添加</el-button>
          </div>
        </div>
      </el-dialog>
    </transition>
  </div>
</template>
<script>
  import {allMethods} from '../../assets/js/config'
  export default {
    name: 'company-manage',
    data() {
      return {
        token: '',
        company_name: '',
        regist_phone: '',
        account_names: '',
        dialogImageUrl: '',
        photo_tip: '',
        info: [],
        tableData: [],
        dialogVisible: false,
        bindSuper: false,
        isSend: true,
        verModal: false,
        subLoading: false,
        codeText: '发送验证码',
        isattest: '1',
        myerror: '',
        company_tip: '',
        company_phone: '',
        account_name: '',
        verify_code: '',
        timer: '',
        company_acc: '',
        counts: 60,
        pop_charge: false,
        pop_upper: false,
        regsubmit: {
          phone: '',
          yzcode: ''
        },
        pic: [],
        getPhone: '',
      };
    },
    mounted() {
      this.token = localStorage.getItem('xckz_mall');
      this.getCompanyInfo();
      this.getCompanyChildList()
    },
    methods: {
      greenBorder(inpt){
        $(inpt).find('input').css('border-color', '#6ECC66');
      },
      delBorder(inpt){
        $(inpt).find('input').css('border-color', '#eeeeee');
      },
      changeNodeLayer(){
        this.initInpt();
      },
      uploadSuccess(response, file, fileLis){
        var vm = this;
        vm.photo_tip = '';
        if (Number(response.code) === 1000) {
          vm.fileName = response.data.fileName;
          vm.fileUrl = response.data.fileUrl;
          vm.pic.push({fileName: vm.fileName, fileUrl: vm.fileUrl});
        }
      },
      removeFile(file, fileList){
        $(".el-upload").show();
        this.pic.length = 0;
      },
      beforeAvatarUpload(file) {
        const isJPG = (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg');
        const isLt2M = file.size / 1024 / 1024 < 10;
        if (!isJPG) {
          this.photo_tip = '文件只能是 png、jpg、jpeg、pdf、zip、rar 格式!';
          return isJPG;
        }
        if (!isLt2M) {
          this.photo_tip = '文件大小超过限制，请压缩后再上传';
          return isLt2M
        }
      },
      changeFile(file, fileList){
        this.photo_tip = '';
        if (fileList.length >= 1) {
          $(".el-upload").hide();
        }
      },
      UploadUrl(){
        return allMethods.API + '/common/uploadFile';
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      initAptcha(id, types, phone){
        var vm = this;
        vm.verModal = true;
        initNECaptcha({
          captchaId: 'fd7d9c65701c4b33a0a73740591119b3',
          element: '#' + id,
          mode: 'embed',
          width: 320,
          onVerify: function (err, data) {
            if (!err) {
              vm.verModal = false;
              let arr = {
                phoneNo: phone,
                validate: data.validate,
                type: types,
                companyName: vm.company_name,
                token: vm.token,
                initTime: new Date().getTime()
              }
              vm.$http.post('/company/sendSms', arr)
                .then(function (reg) {
                  if (reg.data.code == 1000) {
                    vm.countDown()
                  } else {
                    vm.$message({
                      message: reg.data.msg,
                      type: 'warning'
                    });
                  }
                })
            }
          },
        })
      },
      noBindCode(id, types){
        if (!this.company_name || !allMethods.ChineseReg.test(this.company_name)) {
          $('.ipt_one input').css('border-color', '#FF4949');
          this.company_tip = "请输入正确的公司名称";
          return
        }
        if (!this.account_names) {
          $('.ipt_for input').css('border-color', '#FF4949');
          this.company_acc = "请输入账号使用者";
          return;
        }
        if (!this.regist_phone || !allMethods.phoneReg.test(this.regist_phone)) {
          $('.ipt_two input').css('border-color', '#FF4949');
          this.company_phone = "请输入正确的手机号";
          return
        }
        this.initAptcha(id, types, this.regist_phone);
      },
      sendCode(id, types){
        if (!this.company_name || !allMethods.ChineseReg.test(this.company_name)) {
          $('.ipt_one input').css('border-color', '#FF4949')
          this.company_tip = "请输入正确的公司名称"
          return
        }
        if (!this.regist_phone || !allMethods.phoneReg.test(this.regist_phone)) {
          $('.ipt_two input').css('border-color', '#FF4949')
          this.company_phone = "请输入正确的手机号"
          return
        }
        this.initAptcha(id, types, this.regist_phone);
      },
      bindPort(types, phone){
        this.subLoading = true;
        let licenseImgName = '',
          licenseImgUrl = '';
        if (this.pic && this.pic.length != 0) {
          licenseImgName = this.pic[0].fileName;
          licenseImgUrl = this.pic[0].fileUrl
        }
        let arr = {
          phoneNo: phone,
          companyName: this.company_name,
          type: types,
          smsCode: this.verify_code,
          userName: this.account_names,
          licenseImgName: licenseImgName,
          licenseImgUrl: licenseImgUrl,
          token: this.token,
          initTime: new Date().getTime(),
        };
        let vm = this;
        this.$http.post('/company/setNode', arr).then(function (res) {
          vm.subLoading = false;
          if (res.data.code == 1000) {
            vm.$message({
              message: '添加成功',
              type: 'success'
            });
            vm.bindSuper = false;
            vm.pop_upper = false;
            vm.pop_charge = false;
            vm.getCompanyInfo();
            vm.getCompanyChildList()
          } else {
            vm.$message({
              message: res.data.msg,
              type: 'warning'
            });
          }
        })
      },
      subBindSuper(types){
        if (!this.company_name || !this.regist_phone || !this.verify_code) {
          this.$message({
            message: '请输入完整信息',
            type: 'warning'
          });
          return;
        }
        this.bindPort(types, this.regist_phone)
      },
      setBasic(types, phone){
        if (!this.verify_code) {
          $('.ipt_thr input').css('border-color', '#FF4949');
          this.myerror = '请输入验证码';
          return;
        }
        this.bindPort(types, phone)
      },
      nobindCompany(types){
        if (!this.company_name || !allMethods.ChineseReg.test(this.company_name)) {
          $('.ipt_one input').css('border-color', '#FF4949');
          this.company_tip = "请输入正确的公司名称";
          return
        }
        if (!this.account_names) {
          $('.ipt_for input').css('border-color', '#FF4949');
          this.company_acc = "请输入账号使用者";
          return;
        }
        if (!this.regist_phone || !allMethods.phoneReg.test(this.regist_phone)) {
          $('.ipt_two input').css('border-color', '#FF4949');
          this.company_phone = "请输入正确的手机号";
          return
        }
        if (!this.verify_code) {
          $('.ipt_thr input').css('border-color', '#FF4949')
          this.myerror = "请输入验证码"
          return

        }
        if (this.pic == '' || this.pic.length == 0) {
          this.photo_tip = '请上传营业执照';
          return
        }
        this.bindPort(types, this.regist_phone)
      },
      countDown(){
        this.isSend = false;
        var vm = this;
        this.timer = setInterval(function () {
          if (vm.counts === 1 || vm.counts < 1) {
            clearInterval(vm.timer);
            vm.isSend = true;
            vm.codeText = '重新发送';
            vm.counts = 60
          }
          vm.counts--
        }, 1000)
      },
      getCompanyInfo(){
        var vm = this;
        this.$http.get('/company/info', {
          params: {
            token: this.token,
            initTime: new Date().getTime()
          }
        }).then(function (datas) {
          if (datas.data.code == 1000) {
            vm.info = datas.data.data;
          }
        })
      },
      getCompanyChildList(){
        var vm = this;
        this.$http.get('/company/childList', {
          params: {
            token: this.token,
            initTime: new Date().getTime()
          }
        }).then(function (datas) {
          if (datas.data.code == 1000) {
            vm.tableData = datas.data.data
          }
        })
      },
      addRoot(){
        this.pop_charge = true;
        this.verModal = false;
        this.verify_code = '';
        this.myerror = '';
        $('.ipt_thr input').css('border-color', '#EEEEEE');
        var vm = this;
        this.$http.get('/account/myAccount', {
          params: {
            token: this.token,
            initTime: new Date().getTime()
          }
        }).then(function (res) {
          if (Number(res.data.code) === 1000) {
            vm.getPhone = res.data.data.actPhone;
          }
        })
      },
      addLower(){
        this.verModal = false;
        this.pop_upper = true;
        this.verify_code = '';
        this.regist_phone = '';
        this.company_name = '';
        this.myerror = '';
        this.company_phone = '';
        this.company_tip = '';
      },
      accountName(){
        if (!this.account_names) {
          $('.ipt_for input').css('border-color', '#FF4949')
          this.company_acc = "请输入使用者名称"
        } else {
          $('.ipt_for input').css('border-color', '#EEEEEE')
          this.company_acc = '';
        }
      },
      company_na(){
        if (!this.company_name) {
          $('.ipt_one input').css('border-color', '#FF4949')
          this.company_tip = "请输入公司名称"
        } else if (!allMethods.ChineseReg.test(this.company_name)) {
          $('.ipt_one input').css('border-color', '#FF4949')
          this.company_tip = "请输入正确的公司名称"
        } else {
          $('.ipt_one input').css('border-color', '#EEEEEE')
          this.company_tip = '';
        }
      },
      regist_ph(){
        if (!this.regist_phone) {
          $('.ipt_two input').css('border-color', '#FF4949')
          this.company_phone = "请输入手机号"
        } else if (!allMethods.phoneReg.test(this.regist_phone)) {
          $('.ipt_two input').css('border-color', '#FF4949')
          this.company_phone = "请输入正确的手机号"
        } else {
          $('.ipt_two input').css('border-color', '#EEEEEE')
          this.company_phone = '';
        }
      },
      regist_pho(){
        if (!this.regsubmit.phone) {
          $('.ipt_two input').css('border-color', '#FF4949')
          this.company_phone = "请输入手机号"
        } else if (!allMethods.phoneReg.test(this.regsubmit.phone)) {
          $('.ipt_two input').css('border-color', '#FF4949')
          this.company_phone = "请输入正确的手机号"
        } else {
          $('.ipt_two input').css('border-color', '#EEEEEE')
          this.company_tip = '';
        }
      },
      verifyCode(){
        if (!this.verify_code) {
          $('.ipt_thr input').css('border-color', '#FF4949')
          this.myerror = "请输入验证码"
        } else if (!allMethods.captchaReg.test(this.verify_code)) {
          $('.ipt_thr input').css('border-color', '#FF4949')
          this.myerror = "验证码输入有误"
        } else {
          $('.ipt_thr input').css('border-color', '#EEEEEE')
          this.myerror = '';
        }
      },
      initInpt(){
        this.company_name = '';
        this.verify_code = '';
        this.regist_phone = '';
        this.myerror = '';
        this.company_phone = '';
        this.company_acc = '';
        this.company_tip = '';
        this.photo_tip = '';
        this.account_names = '';
        this.pic = [];
//        $('.ipt_thr input').css('border-color', '#EEEEEE');
//        $('.ipt_two input').css('border-color', '#EEEEEE');
//        $('.ipt_one input').css('border-color', '#EEEEEE');
//        $('.ipt_for input').css('border-color', '#EEEEEE');
      },
      bindSuperDom(){
        this.isattest = '1';
        this.bindSuper = true;
        this.initInpt();
      },
      getCompanyInfo(){
        var vm = this;
        this.$http.get('/company/info', {
          params: {
            token: this.token,
            initTime: new Date().getTime()
          }
        }).then(function (datas) {
          if (datas.data.code == 1000) {
            vm.info = datas.data.data
          }
        })
      },
      getCompanyChildList(){
        var vm = this;
        this.$http.get('/company/childList', {
          params: {
            token: this.token,
            initTime: new Date().getTime()
          }
        }).then(function (datas) {
          if (datas.data.code == 1000) {
            vm.tableData = datas.data.data
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .el-input {

  input {
    height: 36px !important;
  }

  }
  .verModal {
    z-index: 9999;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
  }

  .f-verify-img {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
  }

  .wy {
    position: relative;
    margin: auto;
    left: 0;
    right: 0;
    top: 212px;
    bottom: 0;
    z-index: 9999;
    width: 320px;
    height: 215px;
  }

  .subTags {
    width: 100%;
    height: 66px;
    line-height: 66px;
    text-align: center;
    border-top: 1px solid #eeeeee;
  }

  .error {
    height: 13px;
    line-height: 13px;
    margin-left: 81px;
    margin-top: -20px;
    margin-bottom: 18px;
    color: #FF1919;
    font-size: 12px;
  }

  .errorInpt {
    height: 13px;
    line-height: 13px;
    color: #FF1919;
    font-size: 12px;
    margin-top: 6px;
    margin-bottom: -19px;
  }

  .left160 {
    margin-left: 160px;
  }

  .gray-code {
    background: #D4D4D4;
    border-radius: 4px;
    font-size: 14px;
    color: #FFFFFF;
    border-color: #D4D4D4;
    cursor: inherit;
  }

  .company-manage {
    padding: 50px 30px 30px;
  }

  .company-manage {
    padding: 50px 30px 30px;
  }

  .node-info {
    padding-right: 35px;

  .el-row {
    line-height: 40px;
    text-align: center;
    margin-bottom: 25px;

  .el-button {
    width: 120px;
    padding: 0;
    height: 40px;
    text-align: center;
  }

  }
  .high-light {
    color: #f7ba2a;
  }

  }

  .company-list {
    padding-top: 10px;

  table {
    width: 100%;
    border: 1px solid #eee;
    border-bottom: 0;
    color: #333;

  td, th {
    text-align: center;
    width: 33.333%;
    height: 50px;
    line-height: 50px;
  }

  thead {
    background: #fafafa;
    border-bottom: 1px solid #eee;

  tr:hover {
    background: #fafafa;
  }

  }
  tr:nth-child(even) {
    background: #fafafa;
  }

  tr {
    border-bottom: 1px solid #eee;
    transition: all 0.4s;

  &:hover {
    background-color: #f5f7fa;
  }

  }
  }
  }

  .no-data {
    text-align: center;
    padding-top: 50px;

  img {
    margin-bottom: 10px;
  }

  p {
    color: #999;
    font-size: 12px;
  }

  .verifyActive {
    /*background: #D4D4D4;*/
    background: #70CC52;
    border-radius: 4px;
    border: 0 none;
    color: #fff;
    cursor: pointer;
    outline: none;
  }

  .el-input__inner {
    height: 100%;
  }

  }

</style>
