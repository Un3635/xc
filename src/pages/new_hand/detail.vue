<template>
  <div id="new_hand_detail" v-title="data.title">
    <div class="html" v-html="data.html"></div>
  </div>
</template>
<script>
  import list from "./detaildata";

  export default {
    data() {
      return {
        data: {
          title: ""
        }
      };
    },
    created() {
      this.$app.call("showBackBar", {}, function() {});
      this.data = list.filter(i => {
        return i.index == this.$route.query.index;
      })[0];
    }
  };
</script>
<style lang="scss">
  @import "../../common/util.scss";
  #new_hand_detail {
    .html {
      padding: p2r(10) p2r(16);
      h1 {
        font-size: p2r(16);
        line-height: p2r(22);
        color: #222222;
        margin: p2r(10) 0;
        margin-top: p2r(30);
      }
      h2 {
        font-size: p2r(14);
        line-height: p2r(20);
        color: #222222;
        margin: p2r(10) 0;
      }
      h3 {
        font-size: p2r(14);
        line-height: p2r(20);
        color: #222222;
        margin: p2r(10) 0;
      }
      p {
        font-size: p2r(14);
        line-height: p2r(21);
        color: #666666;
        margin: p2r(10) 0;
        &.center {
          text-align: center;
        }
      }
      img {
        width: 100%;
      }
      .declare {
        background-color: darkgrey;
        color: white;
        margin-top: 30px;
        padding: 5px;
      }
    }
  }
</style>

