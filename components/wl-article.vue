<template>
  <div class="article">
    <a class="module" v-if="item.isAdvert == 1" :href="item.mediaUrl">
      <div class="img fl">
        <img :src=item.intro alt="">
      </div>
      <div class="text fr">
        <div class="impo">
          {{item.title}}
        </div>
        <div class="bot">
          <div class="fl adv">广告</div>
          <div class="fr">查看详情</div>
        </div>
      </div>
    </a>

    <a class="module" v-else :href="detail(item.id)">
      <div class="img fl">
        <img :src=item.logo alt="">
      </div>
      <div class="text fr">
        <div class="impo">
          {{item.title}}
        </div>
        <div class="bot">
          <div class="fl">{{item.pubTime|fromNow}}</div>
          <div class="fr" v-if="!fromseo">{{item.totalHotNum | currency('',0)}}人阅读</div>
        </div>
      </div>
    </a>

  </div>
</template>
<script>
  export default {
    props: ["item", "fromseo"],
    methods: {
      detail(_id) {
        if (this.fromseo) {
          return "/zixun/news/" + _id + ".html";
        } else {
          var channelname = this.$route.params.channelname
          if (channelname == "shiting") {
            return "/video/" + _id + ".html";
          } else {
            return "/news/" + _id + ".html";
          }
        }
      }
    }
  };
</script>
<style lang="scss">
  @import "../pages/index.scss";
</style>
