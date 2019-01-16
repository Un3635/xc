<template>
  <div id="mine">
    <div class="page" v-if="$store.state.userinfo">
      <mineLeft></mineLeft>
      <div class="right">
        <div class="lines">
          <!-- <div class="line">
              <img src="../../assets/images/1.2/touxiang_normal.png" alt="" class="desimg">
              <span class="des">头像</span>
              <img :src="$store.state.userinfo.head" alt="" class="head">
              <div class="authortag">
                
              </div>
              <el-button class="cando" type="text" >更换头像</el-button>
            </div> -->
          <div class="line">
            <span class="des">用户名</span>
            <span class="str">{{$store.state.userinfo.nickName}}</span>
            <el-button class="cando" type="text" @click="show_editnickname=true">修改昵称</el-button>
          </div>
          <div class="line">
            <span class="des">身份</span>
            <div class="str">
              <!-- <img src="../../assets/images/1.2/yonghu_normal.png" alt="" v-if="$store.state.userinfo.identity==1">
                <img src="../../assets/images/1.2/zuojia_normal.png" alt="" v-if="$store.state.userinfo.identity==2">
                <img src="../../assets/images/1.2/meiti_normal.png" alt="" v-if="$store.state.userinfo.identity==3"> -->
              <div class="yonghu" v-if="$store.state.userinfo.identity==1"></div>
              <div class="zuojia biao" v-if="$store.state.userinfo.identity==2">V</div>
              <div class="meiti biao" v-if="$store.state.userinfo.identity==3">V</div>
              <span v-if="$store.state.userinfo.identity==1">普通用户</span>
              <span v-if="$store.state.userinfo.identity==2">特约作者</span>
              <span v-if="$store.state.userinfo.identity==3">媒体认证</span>
            </div>
          </div>
          <div class="line">
            <span class="des">邮箱</span>
            <span class="str">{{$store.state.userinfo.email}}</span>
            <el-button class="canotdo" v-if="$store.state.userinfo.email">已绑定</el-button>
            <el-button class="cando" type="text" @click="show_editmail=true" v-if="!$store.state.userinfo.email">绑定邮箱</el-button>
          </div>
          <div class="line">
            <span class="des">手机号</span>
            <span class="str">{{$store.state.userinfo.phone}}</span>
            <el-button class="canotdo" v-if="$store.state.userinfo.phone">已绑定</el-button>
            <el-button class="cando" type="text" @click="show_phone=true" v-if="!$store.state.userinfo.phone">绑定手机</el-button>
          </div>
          <div class="line" v-if="$store.state.userinfo.phone">
            <span class="des">密码</span>
            <el-button class="cando" type="text" @click="show_editpwd=true">修改密码</el-button>
          </div>
          <div class="line">
            <span class="des">实名认证</span>
            <span class="str">{{$store.state.userinfo.realName}}</span>
            <el-button class="canotdo" v-if="$store.state.userinfo.realName">已认证</el-button>
            <el-button class="cando" type="text" @click="show_editrealname=true" v-if="!$store.state.userinfo.realName">实名认证</el-button>
          </div>
          <div class="line">
            <span class="des">个人简介</span>
            <span class="str">{{$store.state.userinfo.introduce}}</span>
            <el-button class="cando" type="text" @click="show_editintroduce=true">修改简介</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="minedialog" v-if="$store.state.userinfo">
      <edit-nickname :show.sync="show_editnickname" v-on:childByValue="childByValue"></edit-nickname>
      <edit-introduce :show.sync="show_editintroduce" v-on:childByValue="childByValue"></edit-introduce>
      <edit-realname :show.sync="show_editrealname" :title="'实名认证'"></edit-realname>
      <edit-pwd :show.sync="show_editpwd" :phone="$store.state.userinfo.phone"></edit-pwd>
      <edit-email :show.sync="show_editmail" :phone="$store.state.userinfo.phone"></edit-email>
      <edit-phone :show.sync="show_phone" :email="$store.state.userinfo.email"></edit-phone>
      <edit-head :show.sync="show_edithead"></edit-head>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import "index.scss";
</style>

<script>
  import EditNickname from "../../components/dialog/edit-nickname.vue";
  import EditRealname from "../../components/dialog/edit-realName.vue";
  import EditPwd from "../../components/dialog/edit-pwd.vue";
  import EditEmail from "../../components/dialog/edit-email.vue";
  import EditPhone from "../../components/dialog/edit-phone.vue";
  import EditHead from "../../components/dialog/edit-head.vue";
  import EditIntroduce from "../../components/dialog/edit-introduce.vue";
  import mineLeft from "../../components/mine/mine-left.vue";
  import getuserevent from "../../service/getuserevent.js";
  import loginmodalevent from "../../service/loginmodalevent.js";
  export default {
    components: {
      EditNickname,
      EditRealname,
      EditPwd,
      EditEmail,
      EditPhone,
      EditHead,
      EditIntroduce,
      mineLeft
    },
    data() {
      return {
        show_editnickname: false,
        show_editrealname: false,
        show_editpwd: false,
        show_editmail: false,
        show_phone: false,
        show_edithead: false,
        show_editintroduce: false
      };
    },
    methods: {
      childByValue: function(childValue) {
        this.$message({
          message: childValue,
          customClass: "successful-prompt-message",
          iconClass: "successful-prompt-message-img",
          duration: 1000,
          showClose: true
        });
      }
    },
    mounted() {
      if (this.isClient) {
        let data = this.$store.state.userinfo ? 1 : 0;
        if (data == 0) {
          this.$router.replace({
            path: "/"
          });
          setTimeout(() => {
            loginmodalevent.$emit("login");
          }, 2000);
        }
      } else {
        getuserevent.$once("getuser", data => {
          if (data == 0) {
            this.$router.replace({
              path: "/"
            });
            setTimeout(() => {
              loginmodalevent.$emit("login");
            }, 2000);
          }
        });
      }
    },
    asyncData({
      isClient
    }) {
      return {
        isClient
      };
    }
  };
</script>
