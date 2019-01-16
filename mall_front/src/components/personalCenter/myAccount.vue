<template>
  <div class="my_account">
    <plugin_title :message='parentMsg'></plugin_title>
    <div class="content">
      <div class="first_line">
        <div class="fl">
          <span class="lab">公司</span>
          <span class="name">{{companyName}}</span>
        </div>
        <div class="fr">
          <span v-if="!authFlag" @click="authAccount">认证账号</span>
        </div>
      </div>
      <div style="clear: both"></div>
      <div class="first_line second_line">
        <div class="fl">
          <span class="lab">姓名</span>
          <span class="name">{{my_name}}</span>
        </div>
        <div class="fr">

        </div>
      </div>
      <div style="clear: both"></div>
      <div class="first_line third_line">
        <div class="fl">
          <span class="lab">密码</span>
          <span class="name" style="letter-spacing: 3px;font-weight: bold;font-size: 30px;margin-top: -15px;">{{code}}</span>
        </div>
        <div class="fr" @click="modifyCode">
          <span>修改密码</span>
        </div>
      </div>
      <div style="clear: both"></div>
      <div class="first_line fourth_line">
        <div class="fl">
          <span class="lab">绑定手机</span>
          <span class="name">{{phone_num}}</span>
        </div>
        <div class="fr" @click="modifyPhoneNumber">
          <span>修改手机号</span>
        </div>
      </div>
      <div style="clear: both"></div>
    </div>
    <!--pop-->
    <transition name="fade">
      <div class="wh" v-if="modify_code">
        <div class="wh_box">
          <div class="pop">
            <div class="charge">
              <div class="fl">修改密码</div>
              <div class="fr" @click="cancelModifyCode">
                <img src="../../assets/images/icon_close.png" alt="">
              </div>
            </div>
            <div style="clear: both"></div>
            <div class="box">
              <div class="ipt">
                <div class="name mcd">
                  <span>当前登录密码</span>
                </div>
                <div class="inpt">
                  <input type="password" placeholder="请输入当前的登录密码" class="ipt_one iptT1" v-model="current_login_code" @input="currentLoginCode" @focus="iptFous(1)">
                  <div class="error_tip">
                    {{current_login_code_tip}}
                  </div>
                </div>
              </div>
              <div class="ipt">
                <div class="name mcd">
                  <span>新的登录密码</span>
                </div>
                <div class="inpt">
                  <input type="password" placeholder="6-18位字母及数字" class="ipt_two iptT2" v-model="new_login_code" @input="newLoginCode" @focus="iptFous(2)">
                  <div class="error_tip">
                    {{new_login_code_tip}}
                  </div>
                </div>
              </div>
              <div class="ipt">
                <div class="name mcd">
                  <span>确认新的登录密码</span>
                </div>
                <div class="inpt">
                  <input type="password" placeholder="请再次输入密码" class="ipt_three iptT3" v-model="sure_new_login_code" @input="surNewLoginCode" @focus="iptFous(3)">
                  <div class="error_tip">
                    {{sure_new_login_code_tip}}
                  </div>
                </div>
              </div>
            </div>
            <div class="line"></div>
            <div class="subm">
              <span class="back_error_msg" style="margin-top: 30px;">{{current_code_error}}</span>
              <el-button type="primary" @click="sureModifyCode" :loading="loading" style="margin-top: 15px;margin-bottom: 15px;float: right;">确定</el-button>
              <!--<span class="btn_successT"  @click="sureModifyCode">确定</span>-->
            </div>
            <!--<el-button type="primary" :loading="true">加载中</el-button>-->
            <div style="clear: both"></div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div class="wh" v-if="modify_phone_number">
        <div class="wh_box">
          <div class="pop pop_two">
            <div class="charge">
              <div class="fl">修改手机号</div>
              <div class="fr" @click="cancelModifyPhone">
                <img src="../../assets/images/icon_close.png" alt="">
              </div>
            </div>
            <div style="clear: both"></div>
            <div class="steps">
              <div class="one_two">
                <span class="one">
                  <span class="num">①</span>&nbsp;
                  <span> 验证身份</span>
                </span>
                <span class="two">
                  <span class="num">②</span>&nbsp;
                  <span> 修改手机号</span>
                </span>
              </div>
            </div>
            <div class="msg">
              <span class="name">短信验证码</span>
              <span class="msg_ipt">
                <input type="text" placeholder="原手机6位数字验证码" v-model="old_phone_code" class="old_phone_code_ipt iptT4" @input="oldPhoneCode" @focus="iptFous(4)">
                <div class="msg_tip" style="left: 44px;top: 38px;">{{old_phone_tip}}</div>
              </span>
              <span class="get" @click="getOldPhoneCode" v-if="isGetCode">获取验证码</span>
              <span class="get" v-if="!isGetCode"><span>{{back_time}}</span> s</span>
            </div>
            <div class="line"></div>
            <div class="subm">
              <span class="back_error_msg" style="margin-top: 30px;">{{current_msg_code_error}}</span>
              <el-button type="primary" @click="nextStep" :loading="loading_next" style="margin-top: 15px;margin-bottom: 15px;float: right;">下一步</el-button>

              <!--<span class="btn_successT" @click="nextStep">下一步</span>-->
            </div>
            <div style="clear: both"></div>
          </div>
        </div>
      </div>
    </transition>


    <!--new phone-->
    <transition name="fade">

    <div class="wh" v-if="new_phone_number">
      <div class="wh_box">
        <div class="pop pop_two">
          <div class="charge">
            <div class="fl">修改手机号</div>
            <div class="fr" @click="cancelNewPhone">
              <img src="../../assets/images/icon_close.png" alt="">
            </div>
          </div>
          <div style="clear: both"></div>
          <div class="steps">
            <div class="one_two">
                <span class="one">
                  <span class="num" style="display:inline-block; width: 19px;height: 19px;">
                    <img src="../../assets/images/icon_success.png" style="width: 100%;height: 100%;vertical-align: middle" alt="">
                  </span>&nbsp;
                  <span style="color: #32C232;"> 验证身份</span>
                </span>
              <span class="two" style="color: #333333;">
                  <span class="num">②</span>&nbsp;
                  <span> 修改手机号</span>
                </span>
            </div>
          </div>
          <div class="msg">
            <span class="name">新的手机号码</span>
            <span class="msg_ipt">
                <input type="text" placeholder="11位手机号码" style="width: 328px;margin-left: 30px;" class="new_phone_code_ipt iptT5"v-model="new_phone" @input="newPhone" @focus="iptFous(5)">
                <div class="msg_tip">{{new_phone_tip}}</div>
              </span>
          </div>
          <div class="msg">
            <span class="name">短信验证码</span>
            <span class="msg_ipt">
                <input type="text" placeholder="6位数字验证码" v-model="new_phone_code" class="new_phone_six_code iptT6" @input="newPhoneCode" @focus="iptFous(6)" style="border-color: #EEEEEE;">
                <div class="msg_tip" style="left: 44px;">{{new_phone_code_ipt_two}}</div>
              </span>
            <span class="get" @click="getNewPhoneCode" v-if="isGetNewCode">获取验证码</span>
            <span class="get" v-if="!isGetNewCode"><span>{{new_back_time}}</span> s</span>
          </div>
          <div class="line"></div>
          <div class="subm">
            <span class="back_error_msg" style="margin-top: 30px;">{{current_msg_new_code_error}}</span>
            <el-button type="primary" @click="sureNewCode" :loading="loading_next_sure" style="margin-top: 15px;margin-bottom: 15px;float: right;">确定</el-button>

            <!--<span class="btn_successT" @click="sureNewCode">确定</span>-->
          </div>
          <div style="clear: both"></div>
        </div>
      </div>
    </div>
    </transition>
    <!--new phone success-->
    <transition name="fade">
    <div class="wh new_phone_success" v-if="modify_phone_success">
      <div class="wh_box">
        <div class="box">
          <div class="title">
            <div class="name">{{modify_what}}</div>
            <div class="cancel" @click="iKnow">
              <img src="../../assets/images/icon_close.png" alt="">
            </div>
          </div>
          <div style="clear: both"></div>

          <div class="frm frm_withdraw">
            <div class="icon">
              <span><img src="../../assets/images/icon_success.png" alt=""></span>
            </div>
            <div class="des">
              <div class="des_one">{{what_success}}修改成功</div>
              <div class="des_two">下次登录使用新{{what_login}}登录</div>
            </div>
            <div style="clear: both;"></div>
          </div>

          <div class="line">

          </div>
          <div class="sure">
            <div class="btn_successT" @click="iKnow">
              知道了
            </div>
          </div>
          <div style="clear: both;"></div>
        </div>
      </div>
    </div>
    </transition>
    <pop :obj="obj"></pop>
  </div>
</template>

<script type="text/ecmascript-6">
  import plugin_title from '../plugin_title'
  import {allMethods} from '../../assets/js/config'
  import {bus} from '../../assets/js/config'
  import pop from './x-pop'
  export default {
    components:{
      plugin_title:plugin_title,
      pop:pop
    },
    name:'myAccount',
    data(){
      return{
        loading_next:false,
        loading:false,
        loading_next_sure:false,
        obj:{
          title:'我的账号',
          content:'',
          is_pop:false
        },
        current_msg_new_code_error:'',
        current_msg_code_error:'',
        what_success:'',
        modify_what:'',
        what_login:'',
        current_code_error:'',
        authFlag:false,
        my_name:'',
        companyName:'',
        token:'',
        parentMsg:'我的账号',
        code:'.............',
        code_start:'',//变为点之前的明文密码
        phone_num:'',
        modify_code:false,
        current_login_code:'',
        current_login_code_tip:'',
        new_login_code:'',
        new_login_code_tip:'',
        sure_new_login_code:'',
        sure_new_login_code_tip:'',
        current_code:false,
        new_code:false,
        sure_code:false,
        modify_phone_number:false,
        old_phone_code:'',
        back_time:60,
        new_back_time:60,
        isGetCode:true,
        old_phone_tip:'',
        new_phone_number:false,
        new_phone:'',
        new_phone_tip:'',
        old_phone:'',
        isGetNewCode:true,
        new_phone_code:'',
        new_phone_code_ipt_two:'',
        is_new_phone:false,
        is_new_code:false,
        modify_phone_success:false,
      }
    },
    methods:{
      iptFous(num){

        $('.iptT'+num).css('border-color', '#6ECC66');
      },
      authAccount(){
        this.$router.push('./companyCertificationFailed');
      },
//          修改密码
      modifyCode(){
        this.modify_code=true;
        this.current_login_code='';
        this.new_login_code='';
        this.sure_new_login_code='';
        this.current_login_code_tip='';
        this.new_login_code_tip='';
        this.sure_new_login_code_tip='';
        this.current_msg_code_error='';
      },
      cancelModifyCode(){
        this.modify_code=false;
      },
      currentLoginCode(){
        this.current_code=false;
        if(this.current_login_code==""){
          this.current_login_code_tip='请输入当前登录密码';
          $('.ipt_one').css('border-color','#FF4949');
        }else if(!allMethods.passwordReg.test(this.current_login_code)){
          this.current_login_code_tip='当前登录密码有误';
          $('.ipt_one').css('border-color','#FF4949');
        } else{
          $('.ipt_one').css('border-color','#6ECC66');
          this.current_login_code_tip='';
          this.current_code=true;
        }
      },
      newLoginCode(){
        this.new_code=false;
        if(this.new_login_code==""){
          this.new_login_code_tip='请输入新的登录密码';
          $('.ipt_two').css('border-color','#FF4949');
        }else if(!allMethods.passwordReg.test(this.new_login_code)){
          this.new_login_code_tip='请按要求输入新密码';
          $('.ipt_two').css('border-color','#FF4949');
        } else{
          $('.ipt_two').css('border-color','#6ECC66');
          this.new_login_code_tip='';
          this.new_code=true;
        }
      },
      surNewLoginCode(){
        this.sure_code=false;
        if(this.sure_new_login_code==""){
          this.sure_new_login_code_tip='请输入新的登录密码';
          $('.ipt_three').css('border-color','#FF4949');
        }else if(!allMethods.passwordReg.test(this.sure_new_login_code)){
          this.sure_new_login_code_tip='请按要求输入新密码';
          $('.ipt_three').css('border-color','#FF4949');
        }else if(this.sure_new_login_code != this.new_login_code){
          this.sure_new_login_code_tip='两次输入的新密码不一致';
          $('.ipt_three').css('border-color','#FF4949');
        } else{
          $('.ipt_three').css('border-color','#6ECC66');
          this.sure_new_login_code_tip='';
          this.sure_code=true;
        }
      },
      sureModifyCode(){
        if(this.current_login_code==""||this.new_login_code==""||this.sure_new_login_code==""){
          if(this.current_login_code==""){
            this.current_login_code_tip='请输入当前登录密码';
            $('.ipt_one').css('border-color','#FF4949');
          }
          if(this.new_login_code==""){
            this.new_login_code_tip='请输入新的登录密码';
            $('.ipt_two').css('border-color','#FF4949');
          }
          if(this.sure_new_login_code==""){
            this.sure_new_login_code_tip='请输入新的登录密码';
            $('.ipt_three').css('border-color','#FF4949');
          }
          if(this.sure_new_login_code != this.new_login_code){
            this.sure_new_login_code_tip='两次输入的新密码不一致';
            $('.ipt_three').css('border-color','#FF4949');
          }
        }else if(this.sure_code&&this.current_code&&this.new_code){
//              请求
//
            this.loading=true;
          var obj = {
            oldPwd:this.current_login_code,
            newPwd:this.new_login_code,
            token: this.token,
            initTime: new Date().getTime()
          }
          var vm = this;
          this.$http.post('/account/changePwd', obj).then(function (data) {
            vm.loading=false;
            var res = data.data;
            if (Number(res.code) === 1000) {
              vm.current_code_error='';
              vm.modify_code=false;
//              此处要提示用户修改成功
              vm.modify_phone_success=true;
              vm.what_success='密码';
              vm.modify_what='修改密码';
              vm.what_login='密码';

            }else if(Number(res.code) === 2023){
                vm.current_code_error='密码错误，请重新输入';
            } else if (Number(res.code) !== 7024){
//              vm.$alert(res.msg, '我的账号', {
//                confirmButtonText: '我知道了',
//                type: 'warning'
//              })
              vm.obj.is_pop = true;
              vm.obj.content = res.msg;
            }
          })


        }
      },
//        修改手机号
      modifyPhoneNumber(){
        this.modify_phone_number=true;
//              重置老电话的输入框 倒计时 提示
        this.old_phone_tip='';
        this.old_phone_code='';
        this.isGetCode=true;
        this.back_time=0;
      },
      cancelModifyPhone(){
        this.modify_phone_number=false;
      },
      getOldPhoneCode(){
        this.isGetCode=false;
        this.back_time=61;
        this.time(61);
        var obj = {
          phone:'',
          token: this.token,
          initTime: new Date().getTime()
        }
        var vm = this;
        this.$http.post('/account/changePhoneSendSms', obj).then(function (data) {
          var res = data.data;
          if (Number(res.code) === 1000) {
            vm.current_msg_code_error='短信验证码已发送，请输入';
          }else{
              vm.current_msg_error=res.msg;
          }
        })


      },
      oldPhoneCode(){
        if(this.old_phone_code==""){
          this.old_phone_tip='请输入验证码';
          $('.old_phone_code_ipt').css('border-color','#FF4949')
        }else if(!/^\d{6}$/.test(this.old_phone_code)){
          this.old_phone_tip='请输入正确的验证码';
          $('.old_phone_code_ipt').css('border-color','#FF4949')
        }else{
            this.current_msg_code_error='';
          this.old_phone_tip='';
          $('.old_phone_code_ipt').css('border-color','#6ECC66');
        }

      },
      nextStep(){
        if(this.old_phone_code==""){
          this.old_phone_tip='请输入验证码';
        }else if(!/^\d{6}$/.test(this.old_phone_code)){
          this.old_phone_tip='请输入正确的验证码';
        }else{
          this.loading_next=true;
//                提交
          this.current_msg_new_code_error='';
          this.new_phone_tip='';
          this.new_phone_code_ipt_two='';
          this.new_phone_code='';
          this.new_phone='';
          this.isGetNewCode=true;
          this.new_back_time=0;

          var obj = {
            phone:'',
            token: this.token,
            captcha:this.old_phone_code,
            initTime: new Date().getTime()
          }
          var vm = this;
          this.$http.post('/account/changePhone', obj).then(function (data) {
            vm.loading_next=false;
            var res = data.data;
            if (Number(res.code) === 1000) {
              vm.new_phone_number=true;
              vm.modify_phone_number=false;
            }else{
                vm.current_msg_code_error=res.msg;
            }
          })


        }
      },
      cancelNewPhone(){
        this.new_phone_number=false;
      },
      getNewPhoneCode(){
        if(this.new_phone==""){
          this.new_phone_tip='请输入新的手机号';
          $('.new_phone_code_ipt').css('border-color','#FF4949')
        }else if(!allMethods.phoneReg.test(this.new_phone)){
          this.new_phone_tip='请输入正确的手机号';
          $('.new_phone_code_ipt').css('border-color','#FF4949')
        }else{



          this.new_phone_tip='';
          $('.new_phone_code_ipt').css('border-color','#6ECC66');
          this.is_new_phone=true;
          var obj = {
            phone:this.new_phone,
            token: this.token,
            initTime: new Date().getTime()
          }
          var vm = this;
          this.$http.post('/account/changePhoneSendSms', obj).then(function (data) {
            var res = data.data;
            if (Number(res.code) === 1000) {
              vm.isGetNewCode=false;
              vm.new_back_time=61;
              vm.newTime(61);
              vm.current_msg_new_code_error='短信验证码已发送，请输入';
            }else{
              vm.current_msg_new_code_error=res.msg;
            }
          })
        }


      },
      newPhone(){
        this.is_new_phone=false;
        if(this.new_phone==""){
          this.new_phone_tip='请输入新的手机号';
          $('.new_phone_code_ipt').css('border-color','#FF4949')
        }else if(!allMethods.phoneReg.test(this.new_phone)){
          this.new_phone_tip='请输入正确的手机号';
          $('.new_phone_code_ipt').css('border-color','#FF4949')
        }else{
          this.new_phone_tip='';
          $('.new_phone_code_ipt').css('border-color','#6ECC66');
          this.is_new_phone=true;
        }
      },
      newPhoneCode(){
        this.is_new_code=false;
        if(this.new_phone_code==""){
          this.new_phone_code_ipt_two='请输入验证码';
          $('.new_phone_six_code').css('border-color','#FF4949')
        }else if(!/^\d{6}$/.test(this.new_phone_code)){
          this.new_phone_code_ipt_two='请输入正确的验证码';
          $('.new_phone_six_code').css('border-color','#FF4949')
        }else{
          this.current_msg_new_code_error
          this.new_phone_code_ipt_two='';
          $('.new_phone_six_code').css('border-color','#6ECC66');
          this.is_new_code=true;
        }
      },
      sureNewCode(){
        if(this.new_phone==""||this.new_phone_code==""){
          if(this.new_phone==""){
            this.new_phone_tip='请输入新的手机号';
            $('.new_phone_code_ipt').css('border-color','#FF4949')
          }
          if(this.new_phone_code==""){
            this.new_phone_code_ipt_two='请输入验证码';
            $('.new_phone_six_code').css('border-color','#FF4949')
          }
        }else if(this.is_new_phone&&this.is_new_code){
//              提交
          this.loading_next_sure=true;
          var obj = {
            phone:this.new_phone,
            token: this.token,
            captcha:this.new_phone_code,
            initTime: new Date().getTime()
          }
          var vm = this;
          this.$http.post('/account/changePhone', obj).then(function (data) {
            vm.loading_next_sure=false;
            var res = data.data;
            if (Number(res.code) === 1000) {
              vm.what_success='手机号';
              vm.modify_what='修改手机号';
              vm.what_login='手机号';
              vm.modify_phone_success=true;
              vm.new_phone_number=false;
              vm.getCompanyVerifyInfo();
            }else{
              vm.current_msg_new_code_error=res.msg;
            }
          })



        }
      },
      iKnow(){
        this.modify_phone_success=false;
      },

      time(tt) {
        var vm=this;
        if (vm.back_time == 0) {
          vm.isGetCode=true;
          vm.back_time = tt;
        } else {
          vm.isGetCode=false;
          vm.back_time--;
          setTimeout(function () {
            vm.time(tt);
          }, 1000)
        }
      },
      newTime(tt) {
        var vm=this;
        if (vm.new_back_time == 0) {
          vm.isGetNewCode=true;
          vm.new_back_time = tt;
        } else {
          vm.isGetNewCode=false;
          vm.new_back_time--;
          setTimeout(function () {
            vm.newTime(tt);
          }, 1000)
        }
      },
      getCompanyVerifyInfo(){
        var obj = {
          token: this.token,
          initTime: new Date().getTime()
        }
        var vm = this;
        this.$http.get('/account/myAccount', {params: obj}).then(function (data) {
          var res = data.data;
          if (Number(res.code) === 1000) {
            vm.companyName=res.data.company;
            vm.my_name=res.data.name;
            vm.phone_num=res.data.phone;
            vm.authFlag=res.data.authFlag;
          } else if (Number(res.code) !== 7024){
            vm.obj.is_pop = true;
            vm.obj.content = res.msg;
          }
        })
      }
    },
    created(){
      this.token = localStorage.getItem('xckz_mall');
      this.getCompanyVerifyInfo();
      var vm = this;
      bus.$on('error',function () {
        vm.obj.is_pop = false;
        vm.modify_code = false;
        vm.modify_phone_success = false;
        vm.modify_phone_number = false;
        vm.new_phone_number = false;
      })
    },
    mounted(){



//        此处是处理账号密码的代码
//      var aa='a31@21s';
//      this.code_start=aa;
//      var aal = aa.split('')
//      for(var i=0;i<aal.length;i++){
//        aal[i]='.'
//      }
//      this.code=aal.join('');
//
//      var phone='15950587880';
//      this.old_phone=phone;
//      var phone_rule=phone.substr(0, 3) + '****' +phone.substr(7);
//      this.phone_num=phone_rule;
    }
  }
</script>

<style>

</style>
