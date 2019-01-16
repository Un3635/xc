<template>
  <div id="mine_mynews" v-if="$store.state.userinfo">
    <div class="page clearfix">
      <mineLeft></mineLeft>
      <div class="right">
        <el-tabs v-model="activeName" class="collection_list">
          <el-tab-pane :label="num.message" name="message">

            <div class="collection_list" v-if="messageList">
              <div class="collection_list_item" v-if="messageList.list" v-for="(i,idx) in messageList.list" :key="idx">
                <div class="head"><img :src="i.head" alt=""></div>
                <div class="content">
                  <div class="name">
                    {{i.nickName}}：
                    <span>{{i.subTitle}}</span>
                    <div class="time">{{i.createdAt|fromNow}}</div>
                  </div>
                  <div class="cont">{{i.content}}</div>
                  <a :href="'/news/'+i.sourceId+'.html'" class="title" v-if="i.sourceType==2 && i.title" target="_blank" >{{i.title}}</a>
                  <a :href="'/video/'+i.sourceId+'.html'" class="title" v-if="i.sourceType==3 && i.title" target="_blank" >{{i.title}}</a>
                  <a :href="'/news/'+i.sourceId+'.html'" class="title" target="_blank" v-if="!i.title">“很抱歉，该文章暂时无法查看”</a>
                </div>
              </div>
              <el-button type="text" class="btnjia" v-if="messageList.pages>messagepage" @click="loadmessage()">加载更多</el-button>

            </div>
            <div v-if="!messageList" class="nonecon">
              <img src="../../assets/images/142/weishouchang@2x.png" alt="">
              <p>您暂时还没有消息记录</p>
            </div>
          </el-tab-pane>
          <el-tab-pane :label="num.sysmessage" name="sysmessage">
            <div class="collection_list" v-if="sysmessageList">
              <div class="collection_list_xit" v-for="(i,idx) in sysmessageList.list" :key="idx">
                <div class="content">
                  <div class="top">
                    <div class="title">{{i.title}}</div>
                    <div class="time">{{i.createdAt|fromNow}}</div>
                  </div>
                  <div class="cont">{{i.content}}</div>
                </div>
              </div>
              <el-button type="text" class="btnjia" v-if="sysmessageList.pages>sysmessagepage" @click="loadsysmessage()">加载更多</el-button>
            </div>
            <div v-if="!sysmessageList" class="nonecon">
              <img src="../../assets/images/142/weishouchang@2x.png" alt="">
              <p>您暂时还没有系统消息</p>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
 
  </div>
</template>
<style lang="scss">
@import "mynews.scss";
</style>

<script>
import { personalNews } from "./js/mineapi";
import mineLeft from "../../components/mine/mine-left.vue";
import getuserevent from "../../service/getuserevent.js";
import loginmodalevent from "../../service/loginmodalevent.js";
export default {
  components: { mineLeft },
  data() {
    return {
      messageList: [],
      messagepage: 1,
      sysmessageList: [],
      sysmessagepage: 1,
      num: { message: "消息中心", sysmessage: "系统消息" },
      activeName: "message"
    };
  },
  methods: {
    get_messageList() {
      personalNews({
        pageNum: this.messagepage,
        messageType: 0
      }).then(res => {
        this.messageList = res.data;
        this.num.message =
          res.msgNum == 0 ? "消息中心" : "消息中心(" + res.msgNum + ")";
      });
    },
    get_sysmessageList() {
      personalNews({
        pageNum: this.sysmessagepage,
        messageType: 1
      }).then(res => {
        this.sysmessageList = res.data;
        this.num.sysmessage =
          res.sysMsgNum == 0 ? "系统消息" : "系统消息(" + res.sysMsgNum + ")";
      });
    },
    load_messageList() {
      personalNews({
        pageNum: this.messagepage,
        messageType: 0
      }).then(res => {
        this.messageList.list = this.messageList.list.concat(res.data.list);
      });
    },
    load_sysmessageList() {
      personalNews({
        pageNum: this.sysmessagepage,
        messageType: 1
      }).then(res => {
        this.sysmessageList.list = this.sysmessageList.list.concat(
          res.data.list
        );
      });
    },
    loadmessage() {
      this.messagepage++;
      this.load_messageList();
    },
    loadsysmessage() {
      this.sysmessagepage++;
      this.load_sysmessageList();
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
        this.get_messageList();
        this.get_sysmessageList();
      }
    } else {
      getuserevent.$once("getuser", data => {
        if (data == 0) {
          this.$router.replace({ path: "/" });
          setTimeout(() => {
            loginmodalevent.$emit("login");
          }, 2000);
        } else {
          this.get_messageList();
          this.get_sysmessageList();
        }
      });
    }
  },
  asyncData({ isClient }) {
    return { isClient };
  }
};
</script>

