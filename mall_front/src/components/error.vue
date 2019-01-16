<template>
    <div class="error">
      <div class="icon"></div>
      <div class="text">您访问的页面找不到了</div>
    </div>
</template>

<script>
  export default {
    name: 'error',
    data () {
      return {
        msg: ''
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .error{
    width:1200px;
    height:650px;
    margin:0 auto;
    overflow: hidden;

  }

  .icon{
    background: url(../assets/images/kuaizu_web_404.png);
    background-position: center center;
    background-repeat: no-repeat;
    width:100%;
    height:386px;
    margin-top: 138px;
  }
  .text{
    width:100%;
    text-align: center;
    color: #dddddd;
    margin-top: 20px;
    font-size: 14px;
  }

</style>
