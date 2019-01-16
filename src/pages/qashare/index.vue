<template>
  <div class="page-qashare" v-title="'测测你的区块链知识'">
    <a @click="goitem" class="pressbtn">开始答题</a>
    <img src="../../assets/qa/qa_smdt@3x.png" alt="">
  </div>
</template>
<style lang="scss">
  @import "index.scss";
</style>
<script>
  export default {
    mounted() {
      localStorage.removeItem("token");
    },
    methods: {
      goitem() {
        this.$router.push({
          path: "qashareitem",
          query: { id: this.$route.query.id }
        });
      }
    }
  };
</script>

