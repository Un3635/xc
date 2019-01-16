<template>
  <div id="fast_news" v-title='"挖链闪讯"'>
    <div class="data" v-if="data">
      <div class="title">{{data.title}}</div>
      <div class="time">
        {{data.pubTime|date('YYYY-MM-DD dddd')}}
      </div>
      <div class="content" v-html="data.content"></div>
    </div>
    <div class="list">
      <div class="title">· 最新闪讯 ·</div>
      <div class="list_item" v-for="(i,idx) in list" :key="idx">
        <div class="left"><img :src="i.head" alt=""></div>
        <div class="right">
          <div class="r1">
            <span class="name">{{i.nickName}}</span>
            <span class="time"> {{i.pubTime|fromNow}}</span>
            <img src="../../assets/common_shoucang_clicked@3x.png" alt="" v-for="ii in i.star">
            <img src="../../assets/common_shoucang_unclicked@3x.png" alt="" v-for="ii in (5-i.star)">
          </div>
          <div class="box">
            <div class="r2">{{i.title}}</div>
            <div class="r3" v-html="i.content" v-if="i.showall"></div>
            <div class="r4" v-if="i.showall">
              <div class="r4left">
                <img src="../../assets/shanxun_good@3x.png" alt="">
                <div>利好</div>
              </div>
              <div class="r4center">
                <div class="r4centerup">
                  <div class="r4centerupleft">{{i.voteGood}}%</div>
                  <div class="r4centerupright">{{i.voteNegative}}%</div>
                </div>
                <div class="r4centerdown" :style="i.style"></div>
              </div>
              <div class="r4right">
                <img src="../../assets/shanxun_bad@3x.png" alt="">
                <div>利空</div>
              </div>
            </div>
            <div class="r5">
              <!-- <span style="float:left" @click="share()">分享</span> -->
              <span @click="i.showall=!i.showall">{{i.showall?'收起':'展开'}}
                <img src="../../assets/shanxun-message-unfold@3x.png" alt="" v-if="!i.showall">
                <img src="../../assets/shanxun-message-packup@3x.png" alt="" v-if="i.showall">
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
    <appdownload></appdownload>
  </div>
</template>
<style lang="scss" scoped>
  @import "index.scss";
</style>
<script>
  import appdownload from "../../components/appdownload";
  import wx_share_config from "../../common/wx_share";
  export default {
    components: { appdownload },
    data() {
      return {
        data: null,
        list: null
      };
    },
    created() {
      this.init();
    },
    methods: {
      share() {
        alert("测试看到这个去问产品为什么会有分享");
      },
      init() {
        this.$http
          .post(
            "/article/newsDetail.open",
            {
              newsId: this.$route.query.id
            },
            false
          )
          .then(data => {
            this.data = data.news;
            this.getlist();
            wx_share_config({
              imgUrl: this.data.head,
              title: this.data.title,
              desc: this.data.content,
              link: window.location.href
            });
          });
      },
      getlist() {
        this.$http
          .post(
            "/article/newsList.open",
            {
              pageSize: 5
            },
            false
          )
          .then(data => {
            this.list = data.list
              .sort((a, b) => a.pubTime < b.pubTime)
              .map((i, index) => {
                if (index == 0) {
                  i.showall = true;
                } else {
                  i.showall = false;
                }
                i.style = {
                  borderLeft: `${i.voteGood / 100 * 9.9}rem solid red`
                };
                return i;
              });
          });
      }
    }
  };
</script>

