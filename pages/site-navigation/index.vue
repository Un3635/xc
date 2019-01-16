<template>
  <div class="page">
    <section v-for="(siteItem,i) in siteData" :key="i">
      <el-tabs>
        <el-tab-pane v-for="(tab,idx) in siteItem.tabItems" :key="idx">
          <span slot="label">
              <span class="tab-icon" v-if="idx===0">
                  <img :src="siteItem.tabIcon" alt="">
              </span>
              {{tab.title}}
          </span>
          <el-row class="pane-content" :gutter="30">
            <el-col :span="6" v-for="(item,itemIdx) in tab.items" :key="itemIdx">
              <a class="site-item clearfix" :href="item.siteLink" target="_blank">
                <div class="site-logo">
                  <img :src="item.siteLogo"/>
                </div>
                <div class="site-content">
                  <h5>{{item.siteName}}</h5>
                  <p>{{item.siteIntro}}</p>
                </div>
              </a>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </section>
  </div>
</template>
<style scoped>
  .page {
    max-width: 1180px;
    margin: 0 auto;
    padding: 1.5rem 0;
  }

  section {
    padding: 15px;
  }

  .pane-content {
    margin-top: 20px;
  }

  .tab-icon {
    display: inline-block;
    width: 18px;
    vertical-align: 1px;
    text-align: center;
  }

  .site-item {
    display: block;
    margin-bottom: 30px;
    border: 1px solid #eee;
    padding: 15px 15px 15px 90px;
    position: relative;
    height: 90px;
  }

  .site-logo {
    position: absolute;
    left: 15px;
    top: 15px;
    width: 60px;
    height: 60px;
    border: 1px solid #eee;
    border-radius: 5px;
    overflow: hidden;
  }

  .site-logo img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .site-content {
    font-size: 14px;
    line-height: 20px;
  }

  .site-content h5 {
    padding-top: 3px;
    font-size: 14px;
    line-height: 20px;
    font-style: normal;
    font-weight: normal;
    color: #333;
  }

  .site-content p {
    margin-top: 6px;
    line-height: 17px;
    color: #999;
    word-break: break-all;
  }
</style>
<script>
  import siteData from "~/service/nav";

  export default {
    asyncData() {
      return {
        siteData: siteData
      };
    }
  };
</script>
