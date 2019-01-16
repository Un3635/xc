<template>
  <div class="question-wrap">
    <x-loading v-show="loading" class="question-loading" />
    <!-- <div class="question-content" v-show="!loading"> -->
    <div class="wrapper">
      <p class="nav-title">常见问题解答</p>
      <x-collapse class="collapse-content" :data="data"></x-collapse>
      <button class="btn btn-red btnCus" @click="feedback">意见反馈</button>

    </div>
    <!-- </div> -->
  </div>
</template>
<script>
import XCollapse from "../common/x-collapse";
import XLoading from "../common/x-loading";
import APIS from "../../services/api";

export default {
  name: "question",
  data() {
    return {
      data: [
        {questionName: '1', questionValue: "ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"}
        ,{questionName: '2', questionValue:"zhu"}
      ],
      loading: false
    };
  },
  components: {
    XCollapse,
    XLoading
  },
  methods: {
    getData() {
      let token = this.$route.query.token || "";
      this.loading = true;
      APIS.question(token)
        .then(res => {
          this.loading = false;
          this.data = res.data.result;
          // this.data = res.data.result.concat(res.data.result);
        })
        .catch(error => {
          console.log(error);
          this.loading = false;
          console.log("接口出错啦");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    feedback() {
      window.location.href = "/android/feedback";
      // console.log()
    }
  },
  created() {
    document.title = this.$route.meta.title;
    this.getData();
  }
};
</script>
<style lang="scss" scoped>
.question-loading {
  // position: absolute;
  top: 30% !important;
}
.nav-title {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #6d6668;
  letter-spacing: -0.34px;
  height: 35px;
  line-height: 35px;
  padding-left: 0.8rem;
  background: #f7f7f7;
}
.question-wrap {
  width: 100%;
  height: 100%;
  background: #ffffff;
  min-height: 100vh;
  // .question-content {
  //   height: 100vh;
  // }
  .wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .collapse-content {
    height: calc(100vh - 130px);
  }
  .btnCus {
    position: relative;
    display: -webkit-box;
    margin-top: 20px;
    clear: both;
    // padding: 0 6.4rem;
    width: 88%;
    padding: 0;
  }
}
</style>
