<template>
  <div class="writerauthors">
    <div class="writerauthors-search">
      <div class="writerauthors-search-margin">
        <div class="writerauthors-search-left">
          <img src="../../assets/images/143/zuojia@2x.png" alt="">
          <span>当前入驻作家共{{authorCount}}位</span>
        </div>
        <div class="writerauthors-search-right">
          <el-input v-model="authorname" placeholder="请搜索作者昵称" class="searchtext" @keyup.enter.native="authorsearch(authorname)"></el-input>
          <el-button type="primary" class="searchbtn" @click="authorsearch(authorname)">搜索</el-button>
        </div>
      </div>
    </div>
    <div class="writerauthors-author">
      <div class="writerauthors-author-list clearfix">
        <div class="writerauthors-author-item" v-for="(i,idx) in authorList" :key="idx" @click="goauthorurl(i)" @mouseleave="mouseoutding()">
          <img :src="i.head" alt="" class="writerauthors-author-head">
          <img src="../../assets/images/qymt.png" title="媒体认证" class="writerauthors-author-headIdentity" v-if="i.identity==3">
          <img src="../../assets/images/tyzz.png" title="特约作者" class="writerauthors-author-headIdentity" v-if="i.identity==2">
          <div class="writerauthors-author-content">
            <div class="writerauthors-author-content-name">{{i.nickName}}</div>
            <div class="writerauthors-author-content-des">{{i.introduce?i.introduce:"火星来的孩子还没有个人简介..."}}</div>
            <div class="writerauthors-author-content-info">
              <img src="../../assets/images/AK-MN.png" alt=""> {{i.totalFollow}}人订阅
            </div>
            <div class="writerauthors-author-content-btns" :class="{notfollow:i.isFollow==-1,follow:i.isFollow==0}">
              <div class="btn0" v-if="i.isFollow==-1" @click.stop="follow(i)">
                <img src="../../assets/images/jiajia.png" alt=""> 订阅
              </div>
              <div :class="mouseding?'btn1':'but'" v-if="i.isFollow==0" @click.stop>
                <img src="../../assets/images/gougou.png" alt=""> 已订阅
              </div>
              <div :class="mouseding?'btn-1':''" v-if="i.isFollow==0" @click.stop="follow(i)">取消订阅</div>
            </div>
          </div>
        </div>
      </div>
      <div class="load-more" :class="{'more':pageInfo.pageNum<pageInfo.pages,'no-more':pageInfo.pageNum>=pageInfo.pages}">
        <el-button type="text" v-if="pageInfo.pageNum<pageInfo.pages" @click="loadMore(authorname,++pageNum)">加载更多</el-button>
        <span v-if="pageInfo.pageNum>=pageInfo.pages">没有更多了</span>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  .writerauthors {
    &-search {
      height: 56px;
      background: rgba(0, 4, 42, 0.9);
      &-margin {
        width: 1180px;
        margin: 0 auto;
      }
      &-left {
        float: left;
        line-height: 56px;
        img {
          width: 23px;
          height: 23px;
          margin-right: 9px;
          margin-bottom: 3px;
        }
        span {
          color: #FFFFFF;
          font-size: 14px;
        }
      }
      &-right {
        float: right;
        color: #4c86e8;
        padding: 13px;
        .searchtext {
          width: 280px;
          height: 30px;
          margin-right: 30px;
          float: left;
          .el-input__inner {
            font-size: 16px;
            color: #999999;
            line-height: 30px;
            padding: 0;
            height: 30px;
            padding-left: 10px;
          }
        }
        .searchbtn {
          float: left;
          background: #4F89EB;
          width: 91px;
          height: 30px;
          padding: 0;
          border: none;
        }
      }
    }
    &-author {
      width: 1180px;
      margin: 0 auto;
      &-list{
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        justify-content: flex-start;
      }
      &-item {
        position: relative;
        cursor: pointer;
        width: 280px;
        height: 290px;
        // float: left;
        margin-right: 20px;
        margin-top: 60px;
        &:nth-of-type(4n) {
          margin-right: 0;
        }
        &:hover {
          .writerauthors-author-content {
            background: #ffffff;
            border: 1px solid #eaeaea;
            box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.17);
            border-radius: 4px;
          }
        }
      }
      &-content {
        height: 256px;
        border: 1px solid #eaeaea;
        border-radius: 4px;
        margin-top: 40px;
        padding: 66px 18px 0 18px;
        &-name {
          text-align: center;
          font-size: 20px;
          color: #222222;
          font-weight: bolder;
          line-height: 30px;
          margin-bottom: 18px;
          -webkit-transition: color 0.5s;
          transition: color 0.5s;
          cursor: pointer;
          &:hover {
            color: #4d87ea;
          }
        }
        &-des {
          font-size: 14px;
          color: #888888;
          letter-spacing: 0;
          text-align: center;
          line-height: 22px;
          max-height: 44px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        &-info {
          position: absolute;
          bottom: 18px;
          left: 18px;
          right: 18px;
          font-size: 12px;
          color: #888888;
          img {
            width: 16px;
            margin-right: 5px;
          }
        }
        &-btns {
          position: absolute;
          right: 18px;
          bottom: 16px;
          cursor: pointer;
          width: 108px;
          opacity: 0;
          -webkit-transition: opacity 0.5s;
          transition: opacity 0.5s;
          &>div {
            display: none;
            line-height: 36px;
            text-align: center;
            font-size: 16px;
            border-radius: 44px;
            margin-left: auto;
          }
          .btn0 {
            background: rgba(77, 135, 234, 0.99);
            color: white;
            width: 92px;
            &:hover {
              background: #366df0;
            }
            img {
              width: 14px;
              vertical-align: -1px;
            }
          }
          .btn1,
          .but {
            background: #f5f5f5;
            color: #4d87ea;
            width: 108px;
            display: block;
            img {
              width: 13px;
              vertical-align: -1px;
            }
          }
          .btn-1 {
            background: #f5f5f5;
            color: #dd524d;
            width: 108px;
          }
          &.notfollow {
            opacity: 1;
            .btn0 {
              display: block;
            }
          }
          &.follow {
            opacity: 1;
            .btn1 {
              display: block;
            }
            &:hover {
              .btn-1 {
                display: block;
              }
              .btn1 {
                display: none;
              }
            }
          }
        }
        button {
          position: absolute;
          right: 18px;
          bottom: 16px;
          width: 92px;
          line-height: 30px;
          text-align: center;
          background: rgba(77, 135, 234, 0.99);
          border-radius: 18px;
          font-size: 16px;
          color: #ffffff;
          border: none;
          cursor: pointer;
          background-repeat: no-repeat;
          background-image: url("../../assets/images/jiajia.png");
          background-size: 14px auto;
          background-position: 14px center;
          padding-left: 18px;
          &.cancel {
            color: #f95453;
            background: #f5f5f5;
            width: 99px;
            padding: 0;
          }
          &.has {
            width: 99px;
            background: #f5f5f5;
            background-image: url("../../assets/images/gougou.png");
            color: #4d87ea;
            background-repeat: no-repeat;
            background-size: 14px auto;
            background-position: 15px 13px;
            padding-left: 22px;
          }
        }
      }
      &-head {
        position: absolute;
        width: 94px;
        height: 94px;
        border-radius: 50%;
        left: 50%;
        top: 0;
        margin-left: -47px;
      }
      &-headIdentity {
        width: 22px;
        height: 22px;
        position: absolute;
        left: 163px;
        top: 66px;
      }
      .load-more {
        text-align: center;
        font-size: 14px;
        padding: 40px 0;
      }
      .no-more {
        color: #9e9e9e;
      }
      .more .el-button--text {
        color: #0063ee;
      }
      .more .el-button--text:hover,
      .more .el-button--text:focus {
        font-weight: bold;
      }
    }
  }
</style>
<script>
  import {
    selectedAuthorList,
    selectedAuthorList1,
    totalAuthorCount
  } from "../../service/main-api.js";
  import {
    oprFollow
  } from "../mine/js/mineapi.js";
  import loginmodalevent from "../../service/loginmodalevent.js";
  export default {
    data() {
      return {
        authorCount: null,
        authorList: '',
        authorname: '',
        mouseding: false,
        pageInfo: '',
        pageNum: 1
      };
    },
    methods: {
      authorsearch(nickName) {
        this.pageNum = 1
        if (this.$store.state.userinfo) {
          selectedAuthorList1({
            nickName
          }).then(res => {
            this.authorList = res.list[0];
            this.pageInfo = res.page
          });
        } else {
          selectedAuthorList({
            nickName
          }).then(res => {
            this.authorList = res.list[0];
            this.pageInfo = res.page
          });
        }
      },
      loadMore(nickName, pageNum) {
        if (this.$store.state.userinfo) {
          selectedAuthorList1({
            nickName,
            pageNum
          }).then(res => {
            this.authorList = this.authorList.concat(res.list[0]);
            this.pageInfo = res.page;
          });
        } else {
          selectedAuthorList({
            nickName,
            pageNum
          }).then(res => {
            this.authorList = this.authorList.concat(res.list[0]);
            this.pageInfo = res.page;
          });
        }
      },
      mouseoutding() {
        this.mouseding = true;
      },
      goauthorurl(i) {
        this.$router.push("/author/" + i.clientType + "/" + i.userId);
      },
      follow(i) {
        if (!this.$store.state.userinfo) {
          return loginmodalevent.$emit("login");
        }
        oprFollow({
            authorType: i.clientType,
            authorUserId: i.userId
          })
          .then(
            res => {
              if (i.isFollow == -1) {
                i.isFollow = 0;
                i.totalFollow++;
                this.mouseding = false;
                this.$message({ 
                  message: '订阅成功',
                  customClass: "successful-prompt-message",
                  iconClass: "successful-prompt-message-img",
                  duration: 1000,
                  showClose: true
                });
              } else if (i.isFollow == 0) {
                i.isFollow = -1;
                i.totalFollow--;
                this.$message({
                  message: '取消订阅成功',
                  customClass: "successful-prompt-message",
                  iconClass: "successful-prompt-message-img",
                  duration: 1000,
                  showClose: true
                });
              }
            }
          ).catch(err => {
            this.message({
              title: err.msg,
              type: 'warning'
            })
          })
      }
    },
    created() {
      totalAuthorCount().then(res => {
        this.authorCount = res;
      });
      if (this.$store.state.userinfo) {
        selectedAuthorList1({}).then(res => {
          this.authorList = res.list[0];
          this.pageInfo = res.page;
        });
      } else {
        selectedAuthorList({}).then(res => {
          this.authorList = res.list[0];
          this.pageInfo = res.page;
        });
      }
    },
    head() {
      return {
        title: "挖链号作者_挖链网",
        meta: [{
            hid: "description",
            name: "description",
            content: "挖链号聚合了区块链和币圈最新、最快、最优质的内容与人群，捕获了行业领先人物的精彩观点，热点文章"
          },
          {
            hid: "keywords",
            name: "keywords",
            content: "挖链专栏,区块链专栏,比特币专栏,以太坊专栏,挖链号"
          }
        ]
      };
    }
  };
</script>
