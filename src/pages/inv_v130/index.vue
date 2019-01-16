<template>
  <div id="inv_v130" class="inv_v130" v-title="'邀请好友'">
    <div class="inv_v130_act">
      <div class="inv_v130_act_title">一重福利</div>
      <div class="inv_v130_act_des">活动期间通过此页面，邀请好友注册累积获得30WT以上，即可获得 BTC/ETH/云算力任选奖励，上不封顶。</div>
      <div class="inv_v130_act_list">
        <div class="inv_v130_act_item">
          <div class="inv_v130_act_item_iwant">我要BTC</div>
          <div class="inv_v130_act_item_num">{{data.btc}}</div>
          <a class="inv_v130_act_item_btn" @click="share('btc',data.btcUrl)">立即邀请</a>
        </div>
        <div class="inv_v130_act_item">
          <div class="inv_v130_act_item_iwant">我要ETH</div>
          <div class="inv_v130_act_item_num">{{data.eth}}</div>
          <a class="inv_v130_act_item_btn" @click="share('eth',data.ethUrl)">立即邀请</a>
        </div>
        <div class="inv_v130_act_item">
          <div class="inv_v130_act_item_iwant">我要算力</div>
          <div class="inv_v130_act_item_num">{{data.hc}}</div>
          <a class="inv_v130_act_item_btn" @click="share('算力',data.hcUrl)">立即邀请</a>
        </div>
      </div>
      <div class="inv_v130_act_ft">好友受邀激活后将获得同样奖励</div>
    </div>
    <div class="inv_v130_act">
      <div class="inv_v130_act_title">二重福利</div>
      <div class="inv_v130_act_des mb0">活动期间通过此页面，邀请好友注册成功，即可获得50挖力，每日最高得150挖力！</div>
      <div class="inv_v130_act_hr"></div>
      <div class="inv_v130_act_steps">
        <div class="inv_v130_act_step">分享活动<br>给好友</div>
        <img src="../../assets/inv130/jt2.png" alt="">
        <div class="inv_v130_act_step">好友接受邀请<br>并注册成功</div>
        <img src="../../assets/inv130/jt2.png" alt="">
        <div class="inv_v130_act_step">挖力自动发放<br>至你的账号</div>
      </div>
    </div>
    <div class="inv_v130_ft">法律范围内活动解释权归挖链所有</div>
    <div class="inv_v130_myreward" @click="gomyreward">
      <img src="../../assets/inv130/wdjl.png" alt="">
    </div>
    <div class="inv_v130_rule" @click="showRule">活动<br>规则</div>
  </div>
</template>
<style lang="scss">
  @import "index.scss";
</style>
<script>
  import { MessageBox } from "mint-ui";
  export default {
    data() {
      return {
        data: {},
        mountedSuc: false
      };
    },
    methods: {
      share(invitetype, url) {
       
        if (!this.mountedSuc) {
          this.$app.call("getUserId", {}, () => {
            this.$http.post("/invite2/getUserInviteAndDesc.wl", {}, true).then(
              data => {
                this.data = data;
                this.mountedSuc = true;
                var temp = {
                  btc: data.btcUrl,
                  eth: data.ethUrl,
                  算力: data.hcUrl
                };

                this.$app.call("shareImage", {
                  type: "invite",
                  invitetype: invitetype,
                  qrcodelink: temp[`${invitetype}`]
                });
              },
              () => {
                this.mountedErr = true;
              }
            );
          });
        } else {
          this.$app.call("shareImage", {
            type: "invite",
            invitetype: invitetype,
            qrcodelink: url
          });
        }
      },
      gomyreward() {
        this.$app.call("getUserId", {}, () => {
          this.$router.push("myAward");
        });
      },
      showRule() {
        // this.$app.call("version", {}, function(version) {
        //   alert(version);
        // });

        // this.$app.call("passBy", {
        //   eventId: "邀请好友详情页",
        //   eventLabel: "活动规则",
        //   eventInfo: []
        // });

        var mint_msgbox_wrapper = document.getElementsByClassName(
          "mint-msgbox-wrapper"
        );

        if (mint_msgbox_wrapper.length > 0) {
          mint_msgbox_wrapper[0].remove();
        }
        var msg = `<p>
                          1）邀请好友注册挖链app，邀请人可决定奖励类型（BTC/ETH/云算力3种奖励选其一），有效邀请一个新人后，双方会获得同等奖励；<br/>
                          2）邀请人可邀请多个好友加入，因邀请而获得的奖励累积计算，上不封顶；<br/>
                          3）有效邀请指新人被邀请注册后，在挖链app中获得30及以上WT，未完成的情况下双方的奖励将被暂时性冻结；<br/>
                          4）邀请双方获得的奖励请在算立方-个人账户中查收，入口在挖链app-邀请好友中可见；<br/>
                          5）邀请好友注册挖链app，邀请人可获得50挖力奖励，每名注册用户每日最多可获得3次邀请奖励；<br/>
                          6）本活动最终解释权在法律允许的范围内归挖链网所有</p>`;
        MessageBox({
          title: "邀请好友奖励规则",
          message: msg,
          showCancelButton: false,
          confirmButtonText: "我知道了"
        });
        setTimeout(() => {
          document.getElementsByClassName("mint-msgbox-wrapper")[0].id =
            "inv-v130-messagebox";
          setTimeout(() => {
            document.getElementsByClassName(
              "mint-msgbox-wrapper"
            )[0].style.opacity =
              "1";
          }, 200);
        }, 100);
      }
    },
    mounted() {
      document.body.style.backgroundColor = "#100430";
      this.$http.post("/invite2/getUserInviteAndDesc.wl", {}, true).then(data => {
        this.data = data;
        this.mountedSuc = true;
      });
    },
    beforeRouteLeave(to, from, next) {
      document.body.style.backgroundColor = "#ffffff";
      next();
    }
  };
</script>
