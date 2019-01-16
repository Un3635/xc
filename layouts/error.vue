<template>
  <div class="container">
    <div id="l404">
      <img src="~/assets/images/404.png" alt="" id="e404">
      <template v-if="error.statusCode==444">
        <div id="ewarn">{很抱歉，该文章暂时无法查看}</div>
      </template>
      <template v-else>
        <div id="ewarn">{您访问的页面找不到了&gt;_&lt;}</div>
      </template>
      <nuxt-link to="/" id="ehome">返回首页</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error'],
}
</script>



<style lang="scss" scoped>
  .container {
    text-align: center;
    #l404 {
      padding-top: 120px;
    }
    #ewarn {
      font-size: 18px;
      color: #000000;
      letter-spacing: 0;
      margin-bottom: 40px;
    }

    #ehome {
      display: inline-block;
      background: #0063ee;
      border-radius: 3px;
      width: 116px;
      height: 42px;
      line-height: 42px;
      color: white;
      font-size: 18px;
      color: #ffffff;
      letter-spacing: 0;
    }
  }
</style>
