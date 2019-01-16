<template>
  <div>
    <el-dropdown class="d2-mr">
      <span class="btn-text">{{userInfo.name}}</span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="showPopHandle">
          <i class="fa fa-pencil" aria-hidden="true" style="padding-right:3px;"></i> 修改密码
        </el-dropdown-item>
        <el-dropdown-item @click.native="logOff">
          <d2-icon name="power-off" class="d2-mr-5" style="padding-right:3px;"/>注销
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <pop-up v-if="showPwdPop" @closePop="closePopHandle"/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import popUp from '@/components/popup/popup'
import util from '@/libs/util.js'
export default {
  components: {
    popUp
  },
  data(){
    return {
      pwdPopCloseBtnDisabled: false
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.d2admin.userInfo,
      showPwdPop: state => state.d2admin.showPwdPop
    }),
  },
  methods: {
    ...mapActions([
      'd2adminLogout'
    ]),
    /**
     * @description 登出
     */
    logOff () {
      this.d2adminLogout({
        vm: this,
        confirm: true
      })
    },
    //弹窗显示
    showPopHandle(){
      this.$store.commit('setShowPwdPop', true)
    },
    //关闭弹窗
    closePopHandle(){
      this.pwdPopCloseBtnDisabled = false;
    }
  },
  mounted(){
    this.pwdPopCloseBtnDisabled = JSON.parse(util.cookies.get('pwdPopCloseBtnDisabled'));
  }
}
</script>

