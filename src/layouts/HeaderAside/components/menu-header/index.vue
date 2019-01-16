<template>
  <el-menu mode="horizontal" @select="handleMenuSelect">
    <!--<template v-for="(menu, menuIndex) in menuHeader">-->
      <!--<d2-layout-header-aside-menu-item v-if="menu.children === undefined" :menu="menu" :key="menuIndex"/>-->
      <!--<d2-layout-header-aside-menu-sub v-else :menu="menu" :key="menuIndex"/>-->
    <!--</template>-->
    <div class="home-icon">
      <i class="fa fa-home" @click="goToHome"></i>
    </div>
  </el-menu>
</template>

<script>
import { mapState } from 'vuex'
import menuMixin from '../mixin/menu'
import d2LayoutMainMenuItem from '../components/menu-item/index.vue'
import d2LayoutMainMenuSub from '../components/menu-sub/index.vue'

export default {
  name: 'd2-layout-header-aside-menu-header',
  mixins: [
    menuMixin
  ],
  components: {
    'd2-layout-header-aside-menu-item': d2LayoutMainMenuItem,
    'd2-layout-header-aside-menu-sub': d2LayoutMainMenuSub
  },
  computed: {
    ...mapState({
      menuHeader: state => state.d2admin.menuHeader
    })
  },
  methods:{
    goToHome(){
      this.$router.push({path: '/'})
    }
  }
}
</script>

<style scoped lang="scss">
  .el-menu--horizontal.el-menu{
    outline: none;
  }
  .home-icon{
    padding-top:20px;
    outline: none !important;
    .fa-home{
      font-size:22px;
      cursor:pointer;
      &:before{
        color:#fff;
      }

    }
  }
</style>