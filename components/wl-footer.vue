<template>
  <div class="wl_footer">
    <div class="wl_footer_up">
      <h1>关于我们</h1>
      <div> 上海挖链科技有限公司</div>
      <div>联系电话:021-39983371</div>
      <div>联系邮箱 :walian@xiaochong.com</div>
    </div>
    <div class="wl_footer_down">
      沪ICP备18000657号-1 Copyright © 挖链网 版权所有
    </div>
  </div>
</template>
<style lang="scss">
  @import "../other/util.scss";
  .wl_footer {
    clear: both;
    background: #292a32;
    height: p2r(180);
    text-align: center;
    position: relative;
    &::after {
      content: "";
      background-color: #292a32;
      height: 4px;
      position: absolute;
      left: 0;
      width: 100%;
      bottom: -2px;
    }
    &_up {
      height: p2r(130);
      overflow: auto;
      h1 {
        font-size: p2r(16);
        color: #ffffff;
        margin: p2r(16) 0;
      }
      div {
        font-size: p2r(14);
        color: #949599;
        line-height: p2r(20);
      }
    }
    &_down {
      border-top: 1px solid #505156;
      line-height: p2r(50);
      font-size: p2r(12);
      color: #949599;
    }
  }
</style>
