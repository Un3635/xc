<template>
    <div class="profile">
        <el-tabs v-model="activeName">
            <el-tab-pane label="资料中心" name="infoCenter">
                <div class="profile-info">
                    <el-form ref="form1" :model="formInfo" label-width="110px">
                        <el-form-item label="用户名">
                            <el-input v-model="formInfo.name" placeholder="请输入用户名"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号">
                            <span class="phone">{{userInfo.phone | phone}}</span>
                        </el-form-item>
                    </el-form>
                    <div class="btn" @click="changeInfo">更新资料</div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="安全中心" name="safeCenter">
                <div class="profile-info safe-center">
                    <el-form ref="form2" :model="formInfo" label-width="110px">
                        <el-form-item label="登录密码">
                            <div class="safe-center-inpt">
                                <el-input ref="pwdrefs" type="password" v-model="formInfo.pwd"
                                          :disabled=ispwd></el-input>
                                <span class="text" @click="changeInptPwd">修改密码</span>
                            </div>
                        </el-form-item>
                        <el-form-item label="谷歌验证器">
                            <span class="phone" v-if="bindGoole == 1">已绑定</span>
                            <span class="phone bind" v-if="bindGoole == 0" @click="gotoVerify">未绑定</span>
                        </el-form-item>
                    </el-form>
                </div>
            </el-tab-pane>
            <el-tab-pane label="提币地址" name="getMoney">
                <div class="profile-info safe-center">
                    <el-form ref="form2" :model="formInfo" label-width="110px">
                        <el-form-item v-for="(item,index) in coinAdressAll" :key="index" :label="item.abbreviation+'地址'">
                            <div class="safe-center-inpt">
                                <el-input type="text" v-if="item.status" v-model="item.adress"
                                          disabled></el-input>
                                <el-input type="text" v-else v-model="item.address" 
                                          disabled
                                          placeholder="请设置钱包地址"></el-input>
                                <span class="text" v-if="item.address" @click="changeCoinAdress(index)">修改地址</span>
                                <span class="text" v-else @click="changeCoinAdress(index)">未设置</span>
                            </div>
                        </el-form-item>
                    </el-form>
                    <!-- <div class="btn" @click="changeInfo">更新资料</div> -->
                </div>
            </el-tab-pane>
        </el-tabs>

        <transition name="slide-fade">
            <div class="profile-modal" v-if="isModal">
                <div class="profile-modal-box">
                    <div class="profile-modal-box-text">
                        <i class="el-notification__icon el-icon-success"></i>
                    </div>
                    <h1>资料修改成功</h1>
                </div>
            </div>
        </transition>
        <wallet :cid="cid" @changeWalletAddr="changeWalletAddr"/>
    </div>
</template>

<script>
import Wallet from '../pop/wallet';

export default {
  name: 'profile',
  components: {Wallet},
  data() {
    return {
      activeName: 'infoCenter',
      userInfo: '',
      bindGoole: '0', //0: 未绑定 1: 已绑定
      formInfo: {
        name: '',
        pwd: '675657687yu8huu'
      },
      isModal: false,
      ispwd: true,
      coinAdressAll: [],
      cid: '',
    };
  },
  created() {
    // 获取钱包地址
    this.getWalletAddressList();
    if (localStorage.getItem('userInfo') !== null ) {
        if( localStorage.getItem('userInfo') !== 'undefined' ) {
          this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
          this.formInfo.name = this.userInfo.userName || this.userInfo.phone;
          this.bindGoole = Boolean(this.userInfo.isGaSecret) ? '1' : '0';
        }
     
    }
  },
  methods: {
    gotoVerify() {
      this.$router.push({path: '/center/verify',query: {page: 'profile'}})
    },
    changeWalletAddr(walletAddr) {
      this.coinAdressAll[this.cid].address = walletAddr;
    },
    getWalletAddressList() {
      // 获取提币地址
      getajaxdata(API.extractWalletAddressList, 'POST', {}, 'json', (res) => {
        this.coinAdressAll = res.data;
      }, this)
    },
    changeInfo() {
      this.isModal = true;
      var vm = this;
      // 资料修改 - 资料中心
      getajaxdata(API.setData, 'POST', {
        'user_name': this.formInfo.name,
        phone_No: this.userInfo.phone
      }, 'json', (res) => {
        if (res.data) {
          this.userInfo.userName = this.formInfo.name;
          setDataToLocal('userInfo', JSON.stringify(this.userInfo));
          this.$store.commit('userNameStore', this.formInfo.name);
        }
        setTimeout(function () {
          vm.isModal = false;
        }, 3000);
      }, this)

    },
    changeInptPwd() {
      // 资料修改 - 安全中心
      this.$store.commit('SHOW_LOGIN_PAGE', true);
      this.$store.commit('safeCenterTologin', true);
    },
    changeCoinAdress(cid) {
      // 资料修改 - 提币地址
      this.$store.commit('walletDialogVisible', true)
      this.cid = cid;
    }
  },
    mounted(){
      if(this.$route.query.section){
          this.activeName = this.$route.query.section;
      }
    }
};
</script>

<style scoped>
    .bind {
        cursor: pointer;
    }
</style>