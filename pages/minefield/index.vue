<template>
  <div class="minefield">
    <div class="minefield-head">
      <div class="minefieldWt">
        <div class="minefieldWt_left">
          <div class="minefieldWt_left-color"></div>
          <div class="minefieldWt_left-img" v-if="$store.state.userinfo">
            <img :src="$store.state.userinfo.head" alt="">
          </div>
          <div class="minefieldWt_left-imgn" v-if="!$store.state.userinfo">
            <img src="../../assets/images/142/denglu@2x.png" alt="">
          </div>
          
          <div class="minefieldWt_left-name">
            <p v-if="$store.state.userinfo">{{$store.state.userinfo.nickName}}</p>
            <p v-if="!$store.state.userinfo" class="minefieldWt_left-name-nologin">WT换豪礼等你来迎</p>
          </div>
          <div class="minefieldWt_left-ranking" v-if="$store.state.userinfo">
            <div class="minefieldWt_left-ranking-yesdata">
              <p>昨日WT</p>
              <span>{{data.ydWt}}</span>
            </div>
            <div class="minefieldWt_left-ranking-current">
              <p>当前WT</p>
              <span>{{data.wt}}</span>
            </div>
            <div class="minefieldWt_left-ranking-total">
              <p>总排名</p>
              <span>{{data.totalRanking}}</span>
            </div>
          </div>
          <el-button class="minefieldWt_left-longing" type="primary" @click="gologin" v-if="!$store.state.userinfo">登录</el-button>

        </div>
        <div class="minefieldWt_right">
          <div class="minefieldWt_right_list" v-for="(i,idx) in grade.list" :key="idx">
            <div class="minefieldWttop">{{i.wlStart}}</div>
            <div class="minefieldWtround" v-if="!$store.state.userinfo"></div>
            <div class="minefieldWtround" v-if="$store.state.userinfo" :class="circular()==i.id?'minefieldWtcircular':''"></div>
            <div class="minefieldWtbottom">{{i.name}}</div>
          </div>
        </div>
      </div>

    </div>
    <div class="minefieldRule">
      <div class="minefieldRule-line"></div>
      <div class="minefieldRule-h1">规则介绍</div>
      <div class="minefieldRule-content">
        <div class="minefieldRule-content-item">
          <img src="../../assets/images/142/Polygon Copy 2@3x.png" alt="">
          <h3>什么是WT？</h3>
          <p>WT是挖链网全新推出的基于区块链技术的奖励体系，总量恒定、逐年减半。</p>
          <p>WT总量恒定，用户越早参与，获得的收益越大！</p>
          <p>WT可以在挖链商城中兑换虚拟货币以及百款实物。首年投放一亿WT，次年减半。1亿WT平均投放到每天（约27w），参与零门槛，注册后即可开始获取。</p>
        </div>
        


        <div class="minefieldRule-content-item">
          <img src="../../assets/images/142/Fill 1@3x.png" alt="">
          <h3>什么是挖力？</h3>
          <p>挖力是获取WT的唯一方式，用户app里的各种行为（签到 浏览新闻 分享等）都会获得挖力。</p>
          <p>每天所有活跃用户的可获得挖力都会计算入当日挖力池，系统次日0:00通过个人贡献度发放WT。</p>
          <p>挖力还可以提升你的个人等级，获得你的专属勋章。</p>
        </div>
        <div class="minefieldRule-content-item">
          <img src="../../assets/images/142/Group 18@3x.png" alt="">
          <h3>如何提升挖力？</h3>
          <p>目前用户可以通过浏览新闻、闪讯投票、分享、签到发布文章等日常任务获得挖力。</p>
          <p>邀请好友及日常答题更会获得大量挖力，快来参与吧！<br />
            后续会推出更多与挖力相关的任务，敬请期待！</p>
        </div>
      </div>
    </div>
    <div class="minefieldTask">
      
      <div class="minefieldTask-marg">
        <div class="minefieldTask-marg-line"></div>
        <h1>活动任务</h1>
        <div class="minefieldTask-marg-content">
          <div class="minefieldTask-marg-content-top">
            <div class="minefieldTask-marg-content-top-title">任务</div>
            <div class="minefieldTask-marg-content-top-title">挖力值</div>
            <div class="minefieldTask-marg-content-top-title">每日限次</div>
            <div class="minefieldTask-marg-content-top-title">手机端</div>
            <div class="minefieldTask-marg-content-top-title">电脑端</div>
            <div class="minefieldTask-marg-content-top-title">今日完成情况</div>
          </div>
          <div class="minefieldTask-marg-content-buttom" v-for="(i,idx) in list" :key="idx">
            <div class="minefieldTask-marg-content-buttom_left con">
              <div>
                <img :src="i.icon" alt=""> {{i.name}}
              </div>
            </div>
            <div class="minefieldTask-marg-content-buttom_right con">
              <div>{{i.desc}}</div>
            </div>
            <div class="minefieldTask-marg-content-buttom_right te">{{i.max_times}}次</div>
            <div class="minefieldTask-marg-content-buttom_right te" v-if="i.ruleId!=28"><img src="../../assets/images/142/Fill@2x.png" alt="" style="width:24px"></div>
            <div class="minefieldTask-marg-content-buttom_right te" v-if="i.ruleId==28"><img src="../../assets/images/142/Path 15 Copy 8@2x.png" alt="" style="width:24px"></div>
            <div class="minefieldTask-marg-content-buttom_right te" v-if="i.ruleId!=28"><img src="../../assets/images/142/Path 15 Copy 8@2x.png" alt="" style="width:24px"></div>
            <div class="minefieldTask-marg-content-buttom_right te" v-if="i.ruleId==28"><img src="../../assets/images/142/Fill@2x.png" alt="" style="width:24px"></div>
            <div class="minefieldTask-marg-content-buttom_right con" v-if="i.taskFinish">
              <div>已完成</div>
            </div>
            <div class="minefieldTask-marg-content-buttom_right con" v-if="!i.taskFinish && i.ruleId!=28">
              <div>{{i.complete_num}}/{{i.max_times}}</div>
            </div>
            <a class="minefieldTask-marg-content-buttom_right con" href="/mine/publish" target="_blank" v-if="!i.taskFinish && i.ruleId==28">
              <div class="alink">去完成</div>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="minefieldActivity">
      <img src="../../assets/images/142/shengji@3x.png" alt="">
      <p>更多WT的应用场景即将上线，敬请期待！</p>
    </div>
    <home-parten></home-parten>
    <LanguageChange></LanguageChange>
  </div>
</template>
<style lang="scss">
  @import "index.scss";
</style>
<script>
  import HomeParten from "~/components/home-parten";
  import LanguageChange from "~/components/language-change";
  import {
    webUserTaskListByWeb,
    webUserWlCenter,
    webUserWlCenterlong,
    webwlLevel,
    webwlLevellong,
    webUserTaskListByWeblong
  } from "../../service/main-api.js";
  import getuserevent from "../../service/getuserevent.js";
  import loginmodalevent from "../../service/loginmodalevent.js";
  export default {
    components: {
      HomeParten,
      LanguageChange
    },
    data() {
      return {
        list: [],
        data: [],
        grade: []
      };
    },
    methods: {
      gologin() {
        loginmodalevent.$emit("login");
      },
      init(data) {
        if (data == 1) {
          webUserTaskListByWeb().then(res => {
            this.list = res;
          });
          webUserWlCenterlong().then(res => {
            this.data = res;
          });
          webwlLevel().then(res => {
            this.grade = res;
          });
        } else {
          webUserWlCenter().then(res => {
            this.data = res;
          });
          webUserTaskListByWeblong().then(res => {
            this.list = res;
          });
          webwlLevellong().then(res => {
            this.grade = res;
          });
        }
      },
      circular(){
       
         if (0 <= this.grade.currentLevel.wl && this.grade.currentLevel.wl < 600) {
           return 1;
         }
         if (600 <= this.grade.currentLevel.wl && this.grade.currentLevel.wl < 1500) {
           return 2;
         }
         if (1500 <= this.grade.currentLevel.wl && this.grade.currentLevel.wl < 5000) {
           return 3;
         }
         if (5000 <= this.grade.currentLevel.wl && this.grade.currentLevel.wl < 15000) {
           return 4;
         }
         if (this.grade.currentLevel.wl >= 15000) {
           return 5;
         }
      }
    },
    mounted() {
      if (this.isClient) {
       
        let data = this.$store.state.userinfo ? 1 : 0;
        this.init(data);
      } else {
      
        getuserevent.$once("getuser", data => {
          this.init(data);
        });
      }
    },

    asyncData({ isClient }) {
      return { isClient };
    }
  };
</script>
