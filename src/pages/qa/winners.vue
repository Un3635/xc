<template>
  <div class="page-qa-winners" v-title="'上期获奖名单'">
    <div class="prize">
      <div class="prize-content">
        <div class="prize-content-top">
          <p class="prize-content-top-title">上期活动时间</p>
          <div class="prize-content-top-time">{{data.activityTime}}</div>
        </div>
        <div class="prize-content-bottom">
          <div class="prize-content-bottom-img">
            <img :src="data.activityIcon" alt="上期奖品">
          </div>
          <div class="prize-content-bottom-right">
            <p class="title">{{data.activityName}}</p>
            <p class="content">{{data.activityDesc}}</p>
          </div>
        </div>
      </div>
      <div class="bookmark">上期奖品</div>
    </div>

    <div class="prize">
      <div class="prize-content">
        <div class="prize-content-top">
          <p class="prize-content-top-title">参与抽奖人数</p>
          <div class="prize-content-top-time">{{data.totalUserCount}}</div>
        </div>
        <div class="prize-content-name">
          <dl v-if="data.data.length">
            <dt>
              <div class="prize-content-name-left">用户名</div>
              <div class="prize-content-name-right">手机号</div>
            </dt>
            <dd v-for="(item,index) in data.data" :key="index">
              <div class="prize-content-name-left" :class="item.nickName.length>8?'minfont':''">{{item.nickName}}</div>
              <div class="prize-content-name-right">{{item.account}}</div>
            </dd>
          </dl>
          <dl v-if="data.data.length==0" class="prize-content-name-qid">将于本周一晚八点开奖，敬请期待~</dl>
        </div>
        <div class="prize-content-follow"><p>查看往期名单，请关注公众号 <span>挖链网</span></p></div>
      </div>
      <div class="bookmark">
        获奖名单 
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  @import "winners.scss";
</style>
<script>
  export default {
    data() {
      return {
        data:'',
      };
    },
    mounted(){
          this.$http.post("/questionReward/getLastWeekData.wl", {}, true).then(res => {
            this.data = res;
         
          });
          
    }
 
  };

</script>