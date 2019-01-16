<template>
  <div id="newhand_detail" v-if="data" v-title="vtitle">
    <div class="title">{{data.app_title}}</div>
    <div class="data">
      <!-- <img :src="data.head" alt="" class="headerimg"> -->
      <div class="name">{{data.nick_name}}</div>
      <div class="time">{{data.publish_time|fromNow}}</div>
      <div class="read">{{data.virtual_read_num}}人阅读</div>
    </div>
    <div class="edit" v-html="data.content"></div>
  </div>
</template>
<style lang="scss">
  @import "index.scss";
</style>
<script>
  function HTMLDecode(html) {
    return html
      .replace(html ? /&(?!#?\w+;)/g : /&/g, "&amp;")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace('"content-bottom"', 'class="f1"')
      .replace('"content-source-info"', 'class="f3"')
      .replace('"ad akp-adv"', 'class="f2"')
      .replace(/href/g, "");
  }
  export default {
    data() {
      return {
        data: null,
        vtitle: ""
      };
    },
    created() {
      this.init();
    },
    watch: {
      $route: function() {
        this.init();
      }
    },
    methods: {
      init() {
        this.$http
          .post(
            "/handbook/getHandBookSecond.open",
            {
              handBookSecondId: this.$route.query.id
            },
            false
          )
          .then(data => {
            data.content = HTMLDecode(data.content);
            this.vtitle = data.app_title;
            this.data = data;
            this.init_app_share();
          })
          .catch(err => {
            this.data = null;
          });
      },
      init_app_share() {
        this.$app.call("showBackBar", {}, function() {});
        var _div = document.createElement("div");
        _div.innerHTML = this.data.content;
        this.$app.call(
          "navTitles",
          {
            navTitles: [
              {
                type: 1, //collect
                articleid: this.$route.query.id,
                articletype: 6
              },
              {
                type: 2, //share
                articleid: this.$route.query.id,
                articletype: 6,
                sharedata: {
                  title: this.data.app_title,
                  des: _div.innerText,
                  img: this.data.head,
                  url: encodeURIComponent(window.location.href)
                }
              }
            ]
          },
          function(result) {}
        );
      }
    }
  };
</script>
