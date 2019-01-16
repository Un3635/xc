<template>
  <div class="page">
    <div class="page-top">
      <div class="page-component">
        <x-breadcrumb class="x-breadcrumb"/>
        <div class="page-container">
          <div class="page-container__inner">
            <div class="page-component__nav">
              <h2 class="nav-title">My Finto</h2>
              <nuxt-link class="nav-link" to="/i/account" active-class="active">アカウント</nuxt-link>
              <nuxt-link class="nav-link" to="/i/order" active-class="active">注文履歴</nuxt-link>
              <nuxt-link class="nav-link" to="/i/trust" active-class="active">委託情報</nuxt-link>
              <nuxt-link class="nav-link" to="/i/power" active-class="active">クラウドマイニング</nuxt-link>
              <nuxt-link class="nav-link" to="/i/address" active-class="active">お届け先</nuxt-link>
              <nuxt-link class="nav-link" to="/i/safety" active-class="active">設定</nuxt-link>
            </div>
            <div class="page-component__content">
              <nuxt-child/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <x-features/>
  </div>
</template>

<script>

  import XFeatures from '../components/x-features';
  import XBreadcrumb from '../components/x-breadcrumb';

  export default {
    breadcrumb() {
      return {
        label: 'アカウント',
        parentsList: [
          {
            path: '/i',
            label: 'My Finto'
          }
        ]
      };
    },
    components: {
      XBreadcrumb,
      XFeatures
    },
    data() {
      return {};
    }
  };
</script>

<style scoped lang="scss">
  $page-width: 1200px;
  $nav-width: 160px;
  $nav-min-height: 430px;
  $nav-content-gap: 10px;

  .page-top {
    min-height: 500px;
    padding-bottom: 20px;
    background-color: #f6f6f6;
  }

  .page-component {
    height: 100%;
    width: 1200px;
    margin: 0 auto;
    position: relative;
    padding-top: 36px;
  }

  .x-breadcrumb {
    position: absolute;
    top: 0;
    left: 0;
    line-height: 36px;
    z-index: 2;
  }

  .page-container {
    position: relative;
    height: 100%;
    margin-top: -36px;
    padding-top: 36px;
  }

  .page-container__inner {
    position: relative;
    padding-left: $nav-width + $nav-content-gap;
  }

  .page-component__nav {
    position: absolute;
    left: 0;
    width: $nav-width;
    height: 100%;
    min-height: $nav-min-height;
    background-color: #fff;
    padding: 20px;
    padding-right: 0;
  }

  .page-component__content {
    width: $page-width - $nav-width - $nav-content-gap;
    height: 100%;
    min-height: $nav-min-height;
    background-color: #fff;
  }

  .nav-title {
    font-size: 18px;
    line-height: 44px;
    color: #333;
  }

  .nav-link {
    display: block;
    font-size: 14px;
    color: #666;
    line-height: 36px;
    padding-left: 5px;
  }

  .nav-link.active {
    color: #303137;
    font-weight: bold;
    border-left: 2px solid #303137;
    line-height: 14px;
    margin: 7px 0;
    padding-left: 3px;
  }
</style>
