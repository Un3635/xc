<template>
  <div id="page-xueyuan">
    <home-banner :bannerList="bannerList" />
    <home-activity :moduleList="moduleList" :moduleactive="moduleactive" :activityList="activityList" @loadmore='loadmore' @change='change' />
    <home-lecturer :guestList="guestList" />
  </div>
</template>
<script>
  import homeActivity from "../../components/xueyuan/home-activity";
  import homeBanner from "../../components/xueyuan/home-banner";
  import homeLecturer from "../../components/xueyuan/home-lecturer";
  import {
    xy_guestList,
    xy_bannerList,
    xy_moduleList,
    xy_activityList
  } from "../../service/main-api";
  export default {
    components: { homeLecturer, homeBanner, homeActivity },
    methods: {
      loadmore() {
        xy_activityList({
          moduleId: this.moduleactive,
          rows: 6,
          page: ++this.activityList.page.pageNum
        }).then(res => {
          this.activityList.list = this.activityList.list.concat(res.list);
          this.activityList.page = res.page;
        });
      },
      change(id) {
        this.moduleactive = id;
        xy_activityList({
          moduleId: id,
          rows: 6,
          page: 1
        }).then(res => {
          this.activityList = res;
        });
      }
    },
    async asyncData(ctx) {
      var [guestList, bannerList, moduleList, activityList] = await Promise.all([
        xy_guestList(),
        xy_bannerList(),
        xy_moduleList(),
        xy_activityList({ moduleId: 0, rows: 6, page: 1 })
      ]);
      var moduleactive = 0;

      moduleList.unshift({ id: 0, name: "全部", type: 2 });

      return {
        guestList,
        bannerList,
        moduleList,
        activityList,
        moduleactive
      };
    },

    head() {
      return {
        title: "挖链学院-专注区块链技术与行业分享",
        meta: [
          {
            hid: "description",
            name: "description",
            content:
              "挖链学院是挖链网旗下专注于区块链行业技术分享，行业分析的学习平台"
          },
          {
            hid: "keywords",
            name: "keywords",
            content:
              "挖链学院,区块链培训,区块链课程,区块链技术,比特币技术,以太坊技术,区块链应用"
          }
        ]
      };
    }
  };
</script>
<style lang="scss">
  #page-xueyuan {
    .container {
    }
  }
</style>
