<template>
  <div class="personal-center">
    <div class="personal-content">
      <p-breadcrumb class="breadcrumbs"/>
      <div class="leftBar">
        <plug-sidebar :menu-list="leftBarList" prop-path="/p-center"></plug-sidebar>
      </div>
      <div class="rightContent">
        <nuxt-child/>
      </div>
    </div>
  </div>
</template>

<script>
  import PlugSidebar from '../components/plug-sidebar';
  import PBreadcrumb from '../components/p-breadcrumb';
  export default {
    components: {
      PlugSidebar, PBreadcrumb
    },
    data() {
      return {
        leftBarList: [
          {name: '账户概况', path: ['/p-center/general']},
          {name: '我的账户', path: ['/p-center/account', '/p-center/account/finance']},
          {name: '我的云算力', path: ['/p-center/hashCloud', '/p-center/hashCloud/hashDetail', '/p-center/hashRepertory']},
          {name: '量化收益', path: ['/p-center/income']},
          {name: '邀请列表', path: ['/p-center/invite', '/p-center/invite/detail']},
          {name: '资料修改', path: ['/p-center/profile']}
        ],
        activeBarIndex: 0,
        name: this.$route.name
      };
    },
    watch: {
      '$route'(to, from) {
        this.name = to.name;
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../assets/css/public.scss";

  .personal-center {
    width: 100%;
    min-width: 1200px;
    background: #F5F6FA;

  .header {
    width: 100%;
    height: 82px;
    background: #010424;
  }

  .footer {
    width: 100%;
    height: 176px;
    background: #010424;
  }

  .breadcrumbs {
    width: 1200px;
    text-align: left;
    margin: 12px auto;
    height: 16px;
    line-height: 16px;
    font-size: 12px;
    color: #9B9B9B;
  }

  .personal-content {
    width: 1200px;
    margin: 0 auto 50px;
    position: relative;
  @include clearfix;

  .leftBar {
    float: left;
    width: 160px;
    height: 460px;
    background: #fff;
    border-radius: 4px;
    overflow: hidden;
  }

  .rightContent {
    float: right;
    width: 1030px;
    min-height: 730px;
    height: auto;
    overflow: hidden;
    border-radius: 4px;
    background: #fff;
  }

  }
  }
</style>
