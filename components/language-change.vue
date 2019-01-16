<template>
  <div class="c-language-change">
    <div class="c-language-change-inner">
      <div class="c-language-change-title">语言切换</div>
      <a class="c-language-change-item" href="/">
        <img src="../assets/images/ch.png" alt="">简体中文
      </a>
      <a class="c-language-change-item" href="http://www.fintoken.com/">
        <img src="../assets/images/en.png" alt="">English
      </a>
    </div>
  </div>
</template>
<style lang="scss">
  .c-language-change {
    margin-bottom: 0;
    padding-bottom: 30px;
    background: #292a32;
    border-bottom: 1px solid #505156;
    margin-top: -21px;
    z-index: 2;
    position: relative;
    &-inner {
      width: 1180px;
      margin: 0 auto !important;
    }
    &-title {
      font-size: 16px;
      color: #ffffff;
      line-height: 22px;
      margin-bottom: 27px;
    }
    &-item {
      font-size: 15px;
      color: #949599;
      line-height: 38px;
      display: inline-block;
      margin-right: 74px;
      img {
        width: 58px;
        height: 38px;
        margin-right: 20px;
      }
    }
  }
</style>

