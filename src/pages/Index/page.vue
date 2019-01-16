<template>
  <d2-container>
    <d2-page-cover
      title="XToken"
      sub-title="去中心化多币种跨链钱包">
      <img src="./home-icon.png" style="width: 120px;"/>
      <!--<d2-icon-svg style="width: 120px;" name="d2admin"/>-->
    </d2-page-cover>
  </d2-container>
</template>

<style lang="scss" scoped>
@import '~@/assets/style/public.scss';
.index-btn-group {
  color: $color-text-placehoder;
  span {
    color: $color-text-sub;
    &:hover {
      color: $color-text-main;
    }
  }
}
</style>

<script>
  import util from '@/libs/util.js'
  import {mapState} from 'vuex'
  export default {
    computed:{
      ...mapState({
        userAuthority: state => state.d2admin.userAuthority
      })
    },
    mounted(){
      // console.log(this. userAuthority)
      // console.log(util.cookies.get('token'))
      // console.log('这是首页')
    }
  }
</script>