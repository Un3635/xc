<template>
  <div id="seo_header">
    <nav>
      <a href="/zixun" :class="{active:isNavActive({namePinyin:''})}">首页</a>
      <a :href="geturl(i)" v-for="(i,idx) in channelList" :key="idx" :class="{active:isNavActive(i)}" v-bind:title="i.name">{{i.name}}</a>
    </nav>
  </div>
</template>
<style lang="scss">
  #seo_header {
    width: 1180px;
    margin: 30px auto 4px auto;
    > nav {
      a {
        font-size: 16px;
        color: #222222;
        margin-right: 44px;
        margin-bottom: 20px;
        display: inline-block;
        &.active {
          color: #0063ee;
        }
      }
    }
  }
</style>

<script>
  export default {
    props: ["channelList"],
    methods: {
      geturl(channel) {
        return "/zixun/" + channel.namePinyin;
      },
      isNavActive(channel) {
        if (channel.namePinyin == "") {
          if (this.$route.path == "/zixun") {
            return true;
          } else {
            return false;
          }
        } else {
          return this.$route.path == "/zixun/" + channel.namePinyin;
        }
      }
    }
  };
</script>
