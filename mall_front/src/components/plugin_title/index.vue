<template>

      <div class="plugin_title">
        <div class="main_content">
          <div class="account_info_t">
            <span>{{message}}</span>
          </div>
        </div>
        <div v-if="hasLine" class="line"> </div>
      </div>

</template>

<script type="text/ecmascript-6">
    export default {
      name:'plugin_title',
      props: {
        hasLine: Boolean,
        message: String //定义传值的类型<br>  }
      }
    }
</script>

<style scoped lang="scss">
  .plugin_title{
    .main_content{
      /*height: 619px;*/
      max-width: 990px;
      background-color: #fff;
      margin: 0 auto;
      padding-left: 30px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      .account_info_t{
        /*max-width: 990px;*/

        margin: 0 auto;
        height: 64px;
        line-height: 64px;
        font-family: 'MicrosoftYaHei';
        font-weight: bold;
        font-size: 18px;
        color: #333333;
        text-align: left;
      }
    }
    .line{
      border-bottom: 1px solid #EEEEEE;
    }
  }

</style>
