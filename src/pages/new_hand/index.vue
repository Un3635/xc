<template>
  <div id="new_hand" v-title="'新手上路'">
    <div class="bg">
      <div class="up">
        <div class="t1">新手上路</div>
        <div class="t2">快速了解挖链基础知识</div>
      </div>
      <appback/>
    </div>
    <div class="list">
      <div class="item" v-for="(i,index) in data" :key="index" @click="godetail(i)">
        <div class="up">{{i.title}}</div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  @import "index.scss";
</style>
<script>
  import list from "./detaildata";
  import appback from "../../components/appback";
  export default {
    components: {
      appback
    },
    data() {
      return {
        data: list.sort((a, b) => {
          return a.index - b.index;
        })
      };
    },
    methods: {
      godetail(i) {
        this.$router.push({ path: "new_hand_detail", query: { index: i.index } });
      }
    }
  };
</script>

