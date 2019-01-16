<template>
  <div id="mine_collection" v-if="$store.state.userinfo">
    <div class="page clearfix">
      <mineLeft></mineLeft>
      <div class="right">
        <div class="collection_list" v-if="list.length>0">
          <div class="collection_list_item" v-for="(i,idx) in list" :key="idx" @mouseleave="mouseoutding()">
            <img :src="i.mediaLogo" alt="" class="head">
            <div class="pwarpper">
              <a :href="'/news/'+i.mediaId+'.html'" v-if="i.collectType==1" target="_blank">
                <p class="title">{{i.mediaName}}</p>
              </a>
              <a :href="'/video/'+i.mediaId+'.html'" v-if="i.collectType==2" target="_blank">
                <p class="title">{{i.mediaName}}</p>
              </a>
              <p class="time">{{i.pubTime|fromNow}}</p>
            </div>
            <div class="collection_list_item_btns" :class="{notfollow:i.status==0,follow:i.status==1}">
              <div class="btn0" v-if="i.status==0" @click.stop="follow(i)">
                <img src="../../assets/images/jiajia.png" alt=""> 收藏
              </div>
              <div :class="mouseding?'btn1':'but'" v-if="i.status==1">
                <img src="../../assets/images/gougou.png" alt=""> 已收藏
              </div>
              <div :class="mouseding?'btn-1':''" @click.stop="follow(i)">取消收藏</div>
            </div>
          </div>
          <div class="getjia" @click="load_getCollectList" v-if="page.pageNum<page.pageSize">加载更多</div>
        </div>
        <div class="nonecon" v-else>
          <img src="../../assets/images/142/weishouchang@2x.png" alt="">
          <p>您暂时还没有收藏的内容</p>
        </div>
      </div>
    </div>

  </div>
</template>
<style lang="scss">
  @import "collection.scss";
</style>

<script>
  import { getCollectList, oprType } from "./js/mineapi";
  import mineLeft from "../../components/mine/mine-left.vue";
  import getuserevent from "../../service/getuserevent.js";
  import loginmodalevent from "../../service/loginmodalevent.js";
  export default {
    components: { mineLeft },
    data() {
      return {
        list: [],
        page:{
          pageNum:0,
          pageSize:0
        },
        mouseding: true
      };
    },
    methods: {
      mouseoutding() {
        this.mouseding = true;
      },

      follow(i) {
        oprType({ collectType: i.collectType, uniteId: i.mediaId }).then(res => {
          if (res.status == 2) {
            i.status = 0;
            this.$message({
              message: '取消收藏成功',
              customClass: "successful-prompt-message",
              iconClass: "successful-prompt-message-img",
              duration: 1000,
              showClose: true
            });
          } else if (res.status == 1) {
            i.status = 1;
            this.mouseding = false;
            this.$message({
              message: '收藏成功',
              customClass: "successful-prompt-message",
              iconClass: "successful-prompt-message-img",
              duration: 1000,
              showClose: true
            });
          }
        });
      },
      async load_getCollectList() {
        var { list,page } = await getCollectList({
          pageNum: ++this.page.pageNum
        });
        // list = list.filter(i => {
        //   return this.list.every(item => item.mediaId != i.mediaId && item.collectType != i.collectType);
        // });
        this.page=page;
        this.list = this.list.concat(list);
      }
    },

    mounted() {
      if (this.isClient) {
        let data = this.$store.state.userinfo ? 1 : 0;

        if (data == 0) {
          this.$router.replace({ path: "/" });
          setTimeout(() => {
            loginmodalevent.$emit("login");
          }, 2000);
        } else {
          getCollectList({ pageNum: 1 }).then(res => {
            this.page = res.page;
            this.list = res.list;
          });
        }
      } else {
        getuserevent.$once("getuser", data => {
          if (data == 0) {
            this.$router.replace({ path: "/" });
            setTimeout(() => {
              loginmodalevent.$emit("login");
            }, 2000);
          } else {
            getCollectList({ pageNum: 1}).then(res => {
             this.page = res.page;
            this.list = res.list;
            });
          }
        });
      }
    },
    asyncData({ isClient }) {
      return { isClient };
    }
  };



</script>

