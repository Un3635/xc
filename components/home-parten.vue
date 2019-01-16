<template>
  <div class="home_parten">
    <div class="home_parten_inner clearfix">
      <div class="home_parten_left">
        <div class="home_parten_title">内容合作</div>
        <div class="home_parten_list clearfix">
          <div class="home_parten_list_item" v-for="(i,idx) in partner_left" :key="idx" v-if="i.picture">
            <a>
              <img :src="i.picture" alt="">
            </a>
          </div>
        </div>
      </div>
      <div class="home_parten_right">
        <div class="home_parten_title">战略合作</div>
        <div class="home_parten_list">
          <div class="home_parten_list_item" v-for="(i,idx) in partner_right" :key="idx" v-if="i.picture">
            <a>
              <img :src="i.picture" alt="">
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .home_parten {
    background: #292a32;
    padding: 40px 0;
    &_inner {
      max-width: 1180px;
      margin: 0 auto !important;
    }
    &_title {
      font-size: 16px;
      color: #ffffff;
      line-height: 22px;
      margin-bottom: 28px;
    }
    &_left {
      float: left;
      width: 575px;
    }
    &_right {
      float: right;
      width: 385px;
      .home_parten_list_item {
        &:nth-of-type(3n) {
          margin-right: 0;
        }
        
      }
    }
    &_list {
      &_item {
        width: 110px;
        height: 40px;

        float: left;
        margin-bottom: 30px;
        margin-right: 26px;
        a {
          display: block;
        }
      }
    }
    .home_parten_list_item{
      a{
        cursor: auto;
      }
    }
  }
</style>
<script>
  import { index_listPartner } from "../service/main-api";
  export default {
    data() {
      return {
        partner_left: [],
        partner_right: []
      };
    },
    mounted() {
      index_listPartner().then(res => {
        this.partner_left = res.filter(i => i.type == 0);
        this.partner_right = res.filter(i => i.type == 1);
      });
    }
  };
</script>
