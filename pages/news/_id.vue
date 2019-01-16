<template>
  <div class="page-news">
    <div class="page-news-inner clearfix">
      <div class="page-news-nav">
        <a href="/">首页</a>
        <span>></span>
        <nuxt-link :to="{path:'/'+data.namePinyin}" :title="data.channelName">{{data.channelName}}</nuxt-link>
        <span>></span>
        <a>正文</a>
      </div>
      <div class="page-news-left">
        <div class="page-news-fix">
          <c-article-share :oncomment="oncomment" :oncollect="oncollect" :hasCollect="hasCollect"></c-article-share>
        </div>
        <div class="page-news-title">{{data.title}}</div>
        <div class="page-news-info">
          <span class="page-news-info-name">{{data.author}}</span>
          <span class="page-news-info-time"> {{data.pubTime|fromNow}}</span>
          <svg width="15px" height="10px" viewBox="0 0 15 10" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <title></title>
              <desc></desc>
              <defs></defs>
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <path d="M5.45251522,5.00002628 C5.45251522,5.28079731 5.50583559,5.5615466 5.60835706,5.82097755 C5.71085763,6.08047377 5.86262204,6.31841237 6.05219163,6.51708611 C6.24178213,6.71565107 6.46884326,6.87464662 6.71650069,6.98206487 C6.96399084,7.08954838 7.23197274,7.14536758 7.49997555,7.14536758 C7.76795745,7.14536758 8.03593935,7.08954838 8.28351314,6.98206487 C8.53117057,6.87464662 8.7582317,6.71565107 8.9478222,6.51708611 C9.13730815,6.31841237 9.28907256,6.08047377 9.39159404,5.82097755 C9.49426188,5.5615466 9.54751952,5.28079731 9.54751952,5.00002628 C9.54751952,4.71918998 9.49426188,4.4384407 9.39159404,4.17900975 C9.28907256,3.91949178 9.13730815,3.68157492 8.9478222,3.4829882 C8.7582317,3.28431447 8.53117057,3.12534068 8.28351314,3.01792243 C8.03593935,2.91043892 7.76795745,2.85459796 7.49997555,2.85459796 C7.23197274,2.85459796 6.96407448,2.91043892 6.71650069,3.01792243 C6.46884326,3.12534068 6.24178213,3.28431447 6.05219163,3.4829882 C5.86262204,3.68157492 5.71085763,3.91949178 5.60835706,4.17900975 C5.50583559,4.4384407 5.45251522,4.71918998 5.45251522,5.00002628 Z M14.8677841,4.48168645 C14.8677841,4.48168645 14.8592946,4.27733508 13.0542642,2.5095239 C10.4740812,0.171621564 8.17423775,-0.164011527 6.46369941,0.0577643082 C4.75316108,0.279540143 3.46590284,1.2446729 3.36298407,1.30466876 C2.55059075,1.77824011 0.25647667,4.13406724 0.119244678,4.42773803 C-0.206908698,5.12911091 0.239393242,5.83039677 0.239393242,5.83039677 C0.239393242,5.83039677 3.94078868,10 7.30467663,10 C10.6685646,10 12.2647464,8.48592039 12.9398241,7.93453715 C13.6149018,7.38304515 14.4443576,6.38188877 14.8677841,5.78849974 C15.1652699,5.12308522 14.8677841,4.48168645 14.8677841,4.48168645 Z M7.49997555,8.6020835 C5.60141496,8.6020835 4.06223366,6.98935225 4.06223366,5.00002628 C4.06223366,3.01061329 5.60141496,1.39788204 7.49997555,1.39788204 C9.39859887,1.39788204 10.9376965,3.01061329 10.9376965,5.00002628 C10.9376965,6.98935225 9.39859887,8.6020835 7.49997555,8.6020835 Z" id="Fill-1" fill="#CCCCCC"></path>
              </g>
            </svg>
          <span class="page-news-info-num">{{data.hot+data.vhot}}</span>
        </div>
        <div class="page-news-content article" v-html="data.content"> </div>
        <div class="page-news-tags" v-if="data.tags">
          <a class="page-news-tags-item" :href="`/tags/${data.channelId}/${tag.tagId}`" v-for="(tag,tIdx) in data.tags" :key="tIdx" target="blank">{{tag.tagName}}</a>
        </div>
        <div class="page-news-contentinfo">
          <div v-if="data.sourceAuthor" class="page-news-contentinfo-item clearfix">
            <div class="k">原作者</div>
            <div class="v">{{data.sourceAuthor}}</div>
          </div>
          <div v-if="data.sourceTitle" class="page-news-contentinfo-item clearfix">
            <div class="k">原标题</div>
            <div class="v">{{data.sourceTitle}}</div>
          </div>
          <div v-if="data.source" class="page-news-contentinfo-item clearfix">
            <div class="k">本文来源</div>
            <div class="v">{{data.source}}</div>
          </div>
          <div class="page-news-contentinfo-item clearfix">
            <div class="k">声明</div>
            <!-- <div class="v">{{ data.pubType}}</div> -->
            <div class="v">{{Number(data.pubType) === 0 ? adminIdContent : Number(data.pubType) === 1 ? userIdContent : data.declareContent.replace('声明：','')}}</div>
          </div>
        </div>
        <div style="margin-bottom:60px" v-if="advlist.bottomAdvert">
          <adv-full :list="advlist.bottomAdvert"></adv-full>
        </div>
        <div class="page-news-recArticles" v-if="otherlist&&otherlist.length>0">
          <div class="page-news-recArticles-title">相关推荐</div>
          <div class="page-news-recArticles-list">
            <c-article-list :articleList='otherlist' :more=false></c-article-list>
          </div>
        </div>
        <div id="oncommenttag"></div>
        <div class="page-news-comment" v-if='newComment'>
          <div class="page-news-comment-form">
            <h2 class="page-news-comment-form-title">参与讨论</h2>
            <div class="page-news-comment-form-input" v-if="$store.state.userinfo">
              <img :src="$store.state.userinfo.head" alt="">
              <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 6}" placeholder="说说你有什么想法吧" v-model="cmt_content" @focus='checkWt' v-if="newComment.pageInfo.list.length>0">
              </el-input>
              <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 6}" placeholder="还没有人评论，来说两句吧~" v-model="cmt_content" @focus='checkWt' v-else>
              </el-input>
            </div>
            <div class="page-news-comment-form-login" v-if="!$store.state.userinfo">
              <span @click="login" class="loginreg">登录</span>
              <span class="loginshu">|</span>
              <span @click="reg" class="loginreg">注册</span>
              <span>后参与评论</span>
            </div>
            <div class="page-news-comment-form-sub" v-if="$store.state.userinfo">
              <button @click="cmt" :disabled="!cmt_content||!cancmt">发表</button>
            </div>
          </div>
          <div class="page-news-comment-hot" v-if="hotComment&&hotComment.pageInfo.list.length>0">
            <h2 class="page-news-comment-hot-title">热门评论
              <span>({{hotComment.pageInfo.list.length}}条)</span>
            </h2>
            <div class="page-news-comment-hot-list">
              <div class="page-news-comment-hot-item" v-for="(i,idx) in hotComment.pageInfo.list" :key="idx">
                <img :src="i.userIcon" alt="">
                <div>
                  <div class="page-news-comment-hot-item-hd">
                    <span class="page-news-comment-hot-item-hd-name">{{i.nickName}}</span>
                    <span class="page-news-comment-hot-item-hd-time">{{i.createdAt|fromNow}}</span>
                    <div class="page-news-comment-hot-item-hd-ctrl">
                      <span class="page-news-comment-hot-item-hd-ctrl-cmt" @click="cmtclick(i.id)">回复</span>
                      <span class="page-news-comment-hot-item-hd-ctrl-good" @click="like(i)" :class="{has:i.currentUserLike}">{{i.likeNum}}</span>
                      <el-dropdown class="page-news-comment-hot-item-hd-ctrl-report" @command="report(i)">
                        <i class="el-icon-caret-bottom"></i>
                        <el-dropdown-menu slot="dropdown" class="page-news-comment-hot-item-hd-ctrl-report-items">
                          <template v-if="!$store.state.userinfo">
                              <el-dropdown-item command="1">举报</el-dropdown-item>
                              <el-dropdown-item command="2">删除</el-dropdown-item>
                          </template>
                          <template v-else>
                            <el-dropdown-item command="1" v-if="i.userId!=$store.state.token.split('_')[0]">
                              举报</el-dropdown-item>
                            <el-dropdown-item command="2" v-else>删除</el-dropdown-item>
                          </template>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </div>
                  <div class="page-news-comment-hot-item-bd">
                    {{i.content}}
                  </div>
                  <div class="page-news-comment-hot-item-input" v-if="i.showinput">
                    <el-input type="textarea" :autosize="{ minRows: 3, maxRows:3 }" placeholder="来说两句吧…" v-model="i.input" @focus='checkWt'></el-input>
                    <button @click="replay(i)" :disabled="!i.input">回复</button>
                  </div>
                  <div class="page-news-comment-hot-item-ft" v-if="i.userReplyList.length>0">
                    <div class="page-news-comment-hot-item-ft-item" v-for="(ii,iidx) in i.userReplyList" :key="iidx" v-show="iidx<2||i.showall">
                      <div class="page-news-comment-hot-item-ft-item-hd">
                        <span class="page-news-comment-hot-item-ft-item-hd-name" v-if="ii.replyNickName">{{ii.commentNickName}}
                          <span>回复</span> {{ii.replyNickName}}</span>
                        <span class="page-news-comment-hot-item-ft-item-hd-name" v-else>{{ii.commentNickName}}</span>
                        <span class="page-news-comment-hot-item-ft-item-hd-time">{{ii.createdAt|fromNow}}</span>
                        <div class="page-news-comment-hot-item-ft-item-hd-ctrl">
                          <span class="page-news-comment-hot-item-ft-item-hd-ctrl-cmt" @click="cmtclick(ii.id)">回复</span>
                          <span class="page-news-comment-hot-item-ft-item-hd-ctrl-good" @click="like(ii)" :class="{has:ii.currentUserLike}">{{ii.replyLikeNum}}</span>
                          <el-dropdown class="page-news-comment-hot-item-ft-item-hd-ctrl-report" @command="report(ii)">
                            <i class="el-icon-caret-bottom"></i>
                            <el-dropdown-menu slot="dropdown" class="page-news-comment-hot-item-ft-item-hd-ctrl-report-items">
                              <template v-if="!$store.state.userinfo">
                                <el-dropdown-item command="1">
                                  举报</el-dropdown-item>
                                <el-dropdown-item command="2">删除</el-dropdown-item>
                              </template>
                              <template v-else>
                                <el-dropdown-item command="1" v-if="ii.userId!=$store.state.token.split('_')[0]">
                                  举报</el-dropdown-item>
                                <el-dropdown-item command="2" v-else>删除</el-dropdown-item>
                              </template>
                            </el-dropdown-menu>
                          </el-dropdown>
                        </div>
                      </div>
                      <div class="page-news-comment-hot-item-ft-item-bd">
                        {{ii.content}}
                      </div>
                      <div class="page-news-comment-hot-item-ft-item-input" v-if="ii.showinput">
                        <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 3}" placeholder="来说两句吧…" v-model="ii.input" @focus='checkWt'></el-input>
                        <button @click="replay(ii)" :disabled="!ii.input||!cancmt">回复</button>
                      </div>
                      
                    </div>
                    <div class="lookall" v-if="i.userReplyList.length>2" @click="i.showall=!i.showall">
                      <span v-show="!i.showall">查看全部</span>
                      <span v-show="i.showall">收起全部</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="page-news-comment-hot" v-if="newComment&&newComment.pageInfo.list.length>0">
            <h2 class="page-news-comment-hot-title">最新评论
              <span>({{newComment.pageInfo.list.length}}条)</span>
            </h2>
            <div class="page-news-comment-hot-list">
              <div class="page-news-comment-hot-item" v-for="(i,idx) in newComment.pageInfo.list" :key="idx">
                <img :src="i.userIcon" alt="">
                <div>
                  <div class="page-news-comment-hot-item-hd">
                    <span class="page-news-comment-hot-item-hd-name">{{i.nickName}}</span>
                    <span class="page-news-comment-hot-item-hd-time">{{i.createdAt|fromNow}}</span>
                    <div class="page-news-comment-hot-item-hd-ctrl">
                      <span class="page-news-comment-hot-item-hd-ctrl-cmt" @click="cmtclick(i.id)">回复</span>
                      <span class="page-news-comment-hot-item-hd-ctrl-good" @click="like(i)" :class="{has:i.currentUserLike}">{{i.likeNum}}</span>
                      <el-dropdown class="page-news-comment-hot-item-hd-ctrl-report" @command="report(i)">
                        <i class="el-icon-caret-bottom"></i>
                        <el-dropdown-menu slot="dropdown" class="page-news-comment-hot-item-hd-ctrl-report-items">
                          <template v-if="!$store.state.userinfo">
                            <el-dropdown-item command="1">
                              举报</el-dropdown-item>
                            <el-dropdown-item command="2">删除</el-dropdown-item>
                          </template>
                          <template v-else>
                            <el-dropdown-item command="1" v-if="i.userId!=$store.state.token.split('_')[0]">
                              举报</el-dropdown-item>
                            <el-dropdown-item command="2" v-else>删除</el-dropdown-item>
                          </template>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </div>
                  <div class="page-news-comment-hot-item-bd">
                    {{i.content}}
                  </div>
                  <div class="page-news-comment-hot-item-input" v-if="i.showinput">
                    <el-input type="textarea" :autosize="{ minRows: 3, maxRows:3 }" placeholder="来说两句吧…" v-model="i.input" @focus='checkWt'></el-input>
                    <button @click="replay(i)" :disabled="!i.input||!cancmt">回复</button>
                  </div>
                  <div class="page-news-comment-hot-item-ft" v-if="i.userReplyList.length>0">
                    <div class="page-news-comment-hot-item-ft-item" v-for="(ii,iidx) in i.userReplyList" :key="iidx" v-show="iidx<2||i.showall">
                      <div class="page-news-comment-hot-item-ft-item-hd">
                        <span class="page-news-comment-hot-item-ft-item-hd-name" v-if="ii.replyNickName">{{ii.commentNickName}}
                          <span>回复</span> {{ii.replyNickName}}</span>
                        <span class="page-news-comment-hot-item-ft-item-hd-name" v-else>{{ii.commentNickName}}</span>
                        <span class="page-news-comment-hot-item-ft-item-hd-time">{{ii.createdAt|fromNow}}</span>
                        <div class="page-news-comment-hot-item-ft-item-hd-ctrl">
                          <span class="page-news-comment-hot-item-ft-item-hd-ctrl-cmt" @click="cmtclick(ii.id)">回复</span>
                          <span class="page-news-comment-hot-item-ft-item-hd-ctrl-good" @click="like(ii)" :class="{has:ii.currentUserLike}">{{ii.replyLikeNum}}</span>
                          <el-dropdown class="page-news-comment-hot-item-ft-item-hd-ctrl-report" @command="report(ii)">
                            <i class="el-icon-caret-bottom"></i>
                            <el-dropdown-menu slot="dropdown" class="page-news-comment-hot-item-ft-item-hd-ctrl-report-items">
                              <template v-if="!$store.state.userinfo">
                                <el-dropdown-item command="1">
                                  举报</el-dropdown-item>
                                <el-dropdown-item command="2">删除</el-dropdown-item>
                              </template>
                              <template v-else>
                                <el-dropdown-item command="1" v-if="ii.userId!=$store.state.token.split('_')[0]">
                                  举报</el-dropdown-item>
                                <el-dropdown-item command="2" v-else>删除</el-dropdown-item>
                              </template>
                            </el-dropdown-menu>
                          </el-dropdown>
                        </div>
                      </div>
                      <div class="page-news-comment-hot-item-ft-item-bd">
                        {{ii.content}}
                      </div>
                      <div class="page-news-comment-hot-item-ft-item-input" v-if="ii.showinput">
                        <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 3}" placeholder="来说两句吧…" v-model="ii.input" @focus='checkWt'></el-input>
                        <button @click="replay(ii)" :disabled="!ii.input||!cancmt">回复</button>
                      </div>
                    </div>
                    <div class="lookall" v-if="i.userReplyList.length>2" @click="i.showall=!i.showall">
                      <span v-show="!i.showall">查看全部</span>
                      <span v-show="i.showall">收起全部</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="page-news-right">
        <div class="page-news-author">
          <img :src="data.authorHead" alt="" class="page-news-authorimg" @click="goauthorlist">
          <img src="../../assets/images/qymt.png" alt="" class="page-news-authorIdentity" v-if="data.identity==3">
          <img src="../../assets/images/tyzz.png" alt="" class="page-news-authorIdentity" v-if="data.identity==2">
          <h2 class="page-news-authorname" @click="goauthorlist">{{data.author}}</h2>
          <div class="page-news-author-btns" :class="{notfollow:follow==0,follow:follow==1}">
            <div class="btn0" v-if="follow==0" @click.stop="sub">
              <img src="../../assets/images/jiajia.png" alt=""> 订阅
            </div>
            <div class="btn1" v-if="follow==1" @click.stop="sub">
              <img src="../../assets/images/gougou.png" alt=""> 已订阅
            </div>
            <div class="btn-1" @click.stop="sub">取消订阅</div>
          </div>
          <div class="page-news-authorviewinfo clearfix">
            <div class="page-news-authorviewinfoitem" @click="goauthorlist">
              <div class="v">{{data.followCount}}</div>
              <div class="k">订阅量</div>
            </div>
            <div class="page-news-authorviewinfoitem" @click="goauthorlist">
              <div class="v">{{data.articleTotalNum}}</div>
              <div class="k">文章数</div>
            </div>
          </div>
          <div class="page-news-author-recentArticles" v-if="list.length>0">
            <div class="page-news-author-recentArticles-title">最近文章</div>
            <div class="page-news-author-recentArticles-list">
              <div class="page-news-author-recentArticles-item" v-for="(i,idx) in list" :key="idx">
                <a :href="`/news/${i.mediaId}.html`" class="page-news-author-recentArticles-item-title" :title="i.title" target="_blank">{{i.title}}</a>
                <div class="page-news-author-recentArticles-item-date">{{i.pubTime|fromNow}}</div>
              </div>
            </div>
          </div>
        </div>
        <thumbnail-ads :items="advlist.rightAdvert" style="margin:60px 0" v-if="advlist.rightAdvert" />
        <hotNews style="margin:60px 0"></hotNews>
        <adv-full :list="advlist.rightBarAdvert" style="margin:60px 0"></adv-full>
      </div>

    </div>
  </div>
</template>
<style lang="scss">
@import "./index.scss";
</style>
<script>
import hotNews from "../../components/hot-news.vue";
import ThumbnailAds from "~/components/thumbnail-ads";
import cArticleList from "../../components/article/c-article-list.vue";
import cArticleShare from "../../components/article/c-article-share.vue";
import AdvFull from "~/components/adv-full";
import {
  getNewsById,
  adv,
  ckAuthorFollow,
  authorMediaList,
  getTagArticle,
  getCommentList,
  getCommentList1,
  addComment,
  replyComment,
  userCommentReport,
  userCommentuserLikeNum,
  userCommentdelComment,
  userCommentgetUserWt,
  collecthasCollect,
  collectupdateCollect
} from "~/service/main-api";
import { oprFollow } from "../mine/js/mineapi.js";
import loginmodalevent from "../../service/loginmodalevent.js";
import getuserevent from "../../service/getuserevent.js";
export default {
  components: {
    hotNews,
    AdvFull,
    ThumbnailAds,
    cArticleList,
    cArticleShare
  },
  methods: {
    oncomment() {
      window.location.href = "#oncommenttag";
    },
    oncollect() {
      if (!this.$store.state.userinfo) {
        return loginmodalevent.$emit("login");
      }
      collectupdateCollect({
        uniteId: this.$route.params.id.split(".html")[0]
      })
        .then(res => {
          if (res.status == 1) {
            this.hasCollect = true;
          } else {
            this.hasCollect = false;
          }
          this.message({
            title: res.msg
          });
        })
        .catch(err => {
          this.message({
            title: err.msg,
            type: "warning"
          });
        });
    },
    login() {
      loginmodalevent.$emit("login");
    },
    reg() {
      this.$router.push({
        path: "/reg",
        query: {
          from: this.$route.fullPath
        }
      });
    },
    checkWt() {
      if (!this.$store.state.userinfo) {
        return loginmodalevent.$emit("login");
      }
      if (!this.cancmt_complete) {
        userCommentgetUserWt()
          .then(res => {
            this.cancmt = true;
            this.cancmt_complete = true;
          })
          .catch(err => {
            this.message({
              title: err.msg,
              type: "warning"
            });
            this.cancmt_complete = true;
          });
      }
    },
    sub() {
      if (this.$store.state.userinfo) {
        oprFollow({
          authorType: this.data.clientType,
          authorUserId: this.data.adminId
        })
          .then(res => {
            if (this.follow == 0) {
              this.follow = 1;
              this.$message({
                message: '订阅成功',
                customClass: "successful-prompt-message",
                iconClass: "successful-prompt-message-img",
                duration: 1000,
                showClose: true
              });
            } else if (this.follow == 1) {
              this.follow = 0;
              this.$message({
                message: '取消订阅成功',
                customClass: "successful-prompt-message",
                iconClass: "successful-prompt-message-img",
                duration: 1000,
                showClose: true
              });
            }
          })
          .catch(err => {
            this.message({
              title: err.msg,
              type: "warning"
            });
          });
      } else {
        loginmodalevent.$emit("login");
      }
    },
    goauthorlist() {
      var url = `/author/${this.data.clientType}/${this.data.adminId}`;
      window.open(url);
    },
    getfollowstate(data) {
      if (data == 1) {
        var authorType = this.data.clientType;
        var authorUserId = this.data.adminId;
        var mediaType = 1;
        var mediaId = this.$route.params.id.split(".html")[0];
        ckAuthorFollow({
          authorType,
          authorUserId,
          mediaType,
          mediaId
        }).then(res => {
          this.follow = res.follow;
        });
      }
    },
    getcollecthasCollect(data) {
      if (data == 1) {
        collecthasCollect({
          uniteId: this.$route.params.id.split(".html")[0]
        }).then(res => {
          this.hasCollect = res;
        });
      }
    },
    cmt() {
      addComment({
        mediaId: this.$route.params.id.split(".html")[0],
        authorUserId: this.data.adminId,
        content: this.cmt_content
      })
        .then(res => {
          this.cmt_content = "";
          res.userReplyList = [];
          res.showinput = false;
          this.newComment.pageInfo.list.unshift(res);
        })
        .catch(err => {
          this.message({
            title: err.msg,
            type: "warning"
          });
        });
    },
    replay(i) {
      if (!this.$store.state.userinfo) {
        return loginmodalevent.$emit("login");
      }
      if (i.hasreport) {
        return;
      }
      if (i.commentId) {
        var _data = {
          replyId: i.id,
          commentId: i.commentId,
          content: i.input
        };
      } else {
        var _data = {
          commentId: i.id,
          content: i.input
        };
      }
      replyComment(_data)
        .then(res => {
          res.showinput = false;
          i.showinput = false;
          i.input = "";
          if (i.commentId) {
            this.newComment.pageInfo.list.forEach(_i => {
              if (_i.id == i.commentId) {
                i.showinput = false;
                _i.userReplyList.push(JSON.parse(JSON.stringify(res)));
              }
            });
            this.hotComment.pageInfo.list.forEach(_i => {
              if (_i.id == i.commentId) {
                i.showinput = false;
                _i.userReplyList.push(JSON.parse(JSON.stringify(res)));
              }
            });
          } else {
            i.showinput = false;
            i.userReplyList.push(JSON.parse(JSON.stringify(res)));
          }
        })
        .catch(err => {
          this.message({
            title: err.msg,
            type: "warning"
          });
        });
    },
    report(i) {
      if (!this.$store.state.userinfo) {
        return loginmodalevent.$emit("login");
      }
      if (i.commentId) {
        var _data = {
          replyId: i.id,
          commentId: i.commentId
        };
      } else {
        var _data = {
          commentId: i.id
        };
      }
      if (i.hasreport) {
        return;
      }
      if (i.userId == this.$store.state.token.split("_")[0]) {
        var todofun = userCommentdelComment;
        var todofun_title = "删除成功";
      } else {
        var todofun = userCommentReport;
        var todofun_title = "举报成功";
      }
      todofun(_data)
        .then(res => {
          if (todofun_title == "删除成功") {
            i.hasreport = true;
          }
          if (todofun_title == "删除成功") {
            i.content = "该评论已删除";
          }
          this.message({
            title: todofun_title,
            type: "success"
          });
        })
        .catch(err => {
          this.message({
            type: "warning",
            title: err.msg
          });
        });
    },
    like(i) {
      if (!this.$store.state.userinfo) {
        return loginmodalevent.$emit("login");
      }
      if (i.currentUserLike) {
        return;
      }
      if (i.hasreport) {
        return;
      }
      if (i.commentId) {
        var _data = {
          replyId: i.id,
          commentId: i.commentId
        };
      } else {
        var _data = {
          commentId: i.id
        };
      }
      userCommentuserLikeNum(_data)
        .then(res => {
          i.currentUserLike = 1;
          i.likeNum = res.totalLikeNum;
          i.replyLikeNum = res.totalLikeNum;
        })
        .catch(err => {
          this.message({
            type: "warning",
            title: err.msg
          });
        });
    },
    getcmtlist(data) {
      if (data == 1) {
        getCommentList1({
          mediaId: this.$route.params.id.split(".html")[0],
          commentType: 1
        }).then(res => {
          res.pageInfo.list.forEach(i => {
            i.showinput = false;
            i.userReplyList.forEach(ii => {
              ii.showinput = false;
            });
          });
          this.hotComment = res;
        });
        getCommentList1({
          mediaId: this.$route.params.id.split(".html")[0],
          commentType: 2
        }).then(res => {
          res.pageInfo.list.forEach(i => {
            i.showinput = false;
            i.userReplyList.forEach(ii => {
              ii.showinput = false;
            });
          });
          this.newComment = res;
        });
      } else {
        getCommentList({
          mediaId: this.$route.params.id.split(".html")[0],
          commentType: 1
        }).then(res => {
          res.pageInfo.list.forEach(i => {
            i.showinput = false;
            i.userReplyList.forEach(ii => {
              ii.showinput = false;
            });
          });
          this.hotComment = res;
        });
        getCommentList({
          mediaId: this.$route.params.id.split(".html")[0],
          commentType: 2
        }).then(res => {
          res.pageInfo.list.forEach(i => {
            i.showinput = false;
            i.userReplyList.forEach(ii => {
              ii.showinput = false;
            });
          });
          this.newComment = res;
        });
      }
    },
    message({
      message,
      title,
      onClose = () => {},
      duration = 2000,
      type = "success"
    }) {
      this.$notify({
        title,
        message,
        type,
        customClass: "messagev142",
        duration,
        onClose
      });
    },
    cmtclick(id) {
      if (!this.$store.state.userinfo) {
        return loginmodalevent.$emit("login");
      }
      function toggle(id, list) {
        list.forEach(i => {
          if (i.id != id) {
            i.showinput = false;
            i.userReplyList.forEach(i => {
              if (i.id != id) {
                i.showinput = false;
              } else {
                i.showinput = !i.showinput;
              }
            });
          } else {
            i.showinput = !i.showinput;
            i.userReplyList.forEach(i => {
              if (i.id != id) {
                i.showinput = false;
              } else {
                i.showinput = !i.showinput;
              }
            });
          }
        });
      }
      toggle(id, this.newComment.pageInfo.list);
      toggle(id, this.hotComment.pageInfo.list);
    }
  },
  data() {
    return {
      advlist: [],
      follow: 0,
      hotComment: null,
      newComment: null,
      cmt_content: "",
      command: "",
      cancmt: false,
      cancmt_complete: false,
      hasCollect: false,
      fixleft: 0,
      adminIdContent: '挖链网登载此文出于传递更多信息之目的，并不意味着赞同其观点或证实其描述，图片及文章内容版权归原作者所有。文章内容仅供参考，不构成投资建议，投资者据此操作，风险自担。',
      userIdContent: '本文由入驻挖链网的作者发布，观点仅代表作者个人，不代表挖链网的观点和立场。如稿件因图片及文章版权问题导致侵权行为，一切法律后果由投稿人负责。'
    };
  },
  mounted() {
    adv({
      type: 3
    }).then(res => {
      this.advlist = res;
    });
    if (this.isClient) {
      let data = this.$store.state.userinfo ? 1 : 0;
      this.getfollowstate(data);
      this.getcmtlist(data);
      this.getcollecthasCollect(data);
    } else {
      getuserevent.$once("getuser", data => {
        this.getfollowstate(data);
        this.getcmtlist(data);
        this.getcollecthasCollect(data);
      });
    }
  },
  async asyncData(ctx) {
    // console.log('ccc');
    var data = await getNewsById(ctx.route.params.id.split(".html")[0]);
    // console.log(data)
    if (!data) {
      return ctx.error({
        statusCode: 444,
        message: ""
      });
    }
    data.content = (data.content || "")
      .replace(data.content ? /&(?!#?\w+;)/g : /&/g, "&amp;")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
    var { mediaList: { list } } = await authorMediaList({
      page: 1,
      clientType: data.clientType,
      userId: data.adminId
    });
   
    if (data.tags && data.tags.length > 0) {
      var { list: otherlist } = await getTagArticle(
        data.channelId,
        10,
        1,
        data.tags[0].tagId
      );
    
      otherlist = otherlist
        .filter(i => i.id != ctx.route.params.id.split(".html")[0])
        .filter((i, idx) => idx < 3);
    } else {
      otherlist = [];
    }
    list = list
      .filter(i => i.mediaId != ctx.route.params.id.split(".html")[0])
      .filter((i, idx) => idx < 5);
    return {
      data,
      list,
      otherlist,
      isClient: ctx.isClient
    };
  },
  head() {
    return {
      title: this.data.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.data.intro
        },
        {
          hid: "keywords",
          name: "keywords",
          content: !this.data.tags
            ? this.data.intro
            : this.data.tags.map(i => i.tagName).join(",")
        },
        {
          property: "og:type",
          content: "article"
        },
        {
          property: "og:title",
          content: this.data.title
        },
        {
          property: "og:description",
          content: this.data.intro
        },
        {
          property: "og:image",
          content: this.data.logo || this.data.logoWeb || this.data.logoApp
        },
        {
          property: "og:url",
          content: "https://www.walian.cn/news/" + this.data.id + ".html"
        },
        {
          property: "og:site_name",
          content: "挖链网"
        },
        {
          property: "article:published_time",
          content: new Date(this.data.pubTime)
        },
        {
          property: "article:author",
          content: this.data.author
        },
        {
          property: "og:published_first",
          content: "挖链网,https://www.walian.cn/news/" + this.data.id + ".html"
        }
      ]
    };
  }
};
</script>
