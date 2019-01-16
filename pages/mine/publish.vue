<template>
  <div id="mine_publish" v-if="$store.state.userinfo&&reports">
    <div class="page">
      <mineLeft></mineLeft>
      <div class="right">
        <div class="four">
          <div class="fouritem">
            <img src="../../assets/images/142/阅读@2x.png" alt="">
            <p>{{articledatas.articleCount}}</p>
            <span>文章总量(篇)</span>
          </div>
          <div class="fouritem">
            <img src="../../assets/images/142/阅读数@2x.png" alt="">
            <p>{{articledatas.readCount}}</p>
            <span>浏览量(次)</span>
          </div>
          <div class="fouritem">
            <img src="../../assets/images/142/转发数@2x.png" alt="">
            <p>{{articledatas.shareCount}}</p>
            <span>转发数(次)</span>
          </div>
          <div class="fouritem">
            <img src="../../assets/images/142/订阅号@2x.png" alt="">
            <p>{{articledatas.followCount}}</p>
            <span>订阅数(篇)</span>
          </div>
          <div class="fouritem">
            <img src="../../assets/images/142/收藏@2x.png" alt="">
            <p>{{articledatas.collectCount}}</p>
            <span>收藏数(篇)</span>
          </div>

        </div>
        <div class="publish">
          <el-tabs v-model="activeName" class="publish-list" @tab-click="tabclick">
            <el-tab-pane :label="`全部${typename}(${articletotal['-1']})`" name="-1"></el-tab-pane>
            <el-tab-pane :label="`已发布(${articletotal['4']})`" name="4"></el-tab-pane>
            <el-tab-pane :label="`草稿箱(${articletotal['0']})`" name="0"></el-tab-pane>
            <el-tab-pane :label="`待审核(${articletotal['1']})`" name="1"></el-tab-pane>
          </el-tabs>
          <el-button class="pbhbt" @click="gowrire" icon="el-icon-plus">发布文章</el-button>
          <el-dropdown v-if="$store.state.userinfo.pubAudioRight||$store.state.userinfo.pubVideoRight" @command="typechange">
            <span class="el-dropdown-link">

            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="1">全部文章</el-dropdown-item>
              <el-dropdown-item command="2" v-if="$store.state.userinfo.pubVideoRight">全部视频</el-dropdown-item>
              <el-dropdown-item command="3" v-if="$store.state.userinfo.pubAudioRight">全部音频</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="tablelayer">
          <el-table :data="articlelist" size="60px" style="width: 100%" class="table">
            <el-table-column prop="articleId" label="ID" width="70">
            </el-table-column>
            <el-table-column prop="title" label="标题">
            </el-table-column>
            <el-table-column prop="statusName" label="状态" width="120">
              <template slot-scope="scope">
                <span :class="statusColor(scope.row.statusName)" class="status"></span>
                <span>{{ scope.row.statusName }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="createDate" label="最后编辑时间" width="163">
            </el-table-column>
            <el-table-column prop="note" label="反馈" width="97">
              <template slot-scope="scope">
                <div v-if="scope.row.note" class="feedback">
                  <div @click.stop="feedbackshow(scope.row.articleId)">
                    <img src="../../assets/images/142/Group 41@2x.png" alt="" class="img">
                    <span>反馈</span>
                  </div>
                  <div class="feedbackhide" v-if="scope.row.articleId == feedbacknum">
                    <div class="back"></div>
                    <div class="box">
                      <div class="top">
                        <div class="top-left">
                          <img class="feedbackhideimg" src="../../assets/images/142/tishi_tanchaung@2x.png" alt="">
                          <div>发布反馈</div>
                        </div>
                        <div class="top-right" @click.stop="feedbackshow('')"></div>
                      </div>
                      <div class="bottom">{{ scope.row.note }}</div>
                    </div>
                  </div>
                </div>
                <div v-if="!scope.row.note" class="feedback">- -</div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <div v-for="(i,idx) in scope.row.operate" :key="idx" v-if="i.key == 10 || i.key == 5" style="display: inline-block;margin-right:5px">
                  <img src="../../assets/images/142/edit@2x.png" alt="" class="img" v-if="i.status!=0 && i.key == 10">
                  <img src="../../assets/images/142/Group 29 Copy@2x.png" alt="" class="img" v-if="i.status!=0 && i.key == 5">
                  <el-button :disabled="i.status==0" @click="editArticle(i,scope)" type="text" v-if="i.status!=0">{{i.val}}</el-button>
                  <span v-if="i.status==0">- -</span>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="paginationlayer">
            <el-pagination class="butn" layout="prev, pager, next" :current-page.sync="pagenow" :page-size="pagesize" :total="total" @current-change="gettable"></el-pagination>
          </div>
        </div>
      </div>
    </div>
    <div class="minedialog" v-if="$store.state.userinfo">
      <edit-realname :show.sync="show_editrealname" :title="'发布文章请先完成实名认证'"></edit-realname>
      <div v-if="userSpecialAuthorsta">
        <el-dialog :visible.sync="dialogVisible" width="535px" center custom-class="userSpecialAuthor">
          <div class="dialog-title">
            <div class="dialog-title-yuan">
              <img src="../../assets/images/142/chenggong_tanchuang@2x.png" alt="">
            </div>
            <div class="dialog-title-qiu">恭喜您已经符合特邀作家要求</div>
          </div>
          <div class="dialog-cont">特约作家可以获得更多流量，以及各类福利。快来联系客服认证加入吧！添加客服，了解审核结果。客服微信：wangran0228</div>
          <div class="dialog-footer">
            <el-button @click="specialAuthorChoose(0)" class="none">不在提示</el-button>
            <el-button type="primary" @click="specialAuthorChoose(1)" style="margin-left:38px" class="tijiao">提交申请</el-button>
          </div>
        </el-dialog>
      </div>

    </div>
  </div>
</template>
<style lang="scss" >
  @import "publish.scss";
</style>
<style lang="scss">
  @import "./scss/publish_messagebox.scss";
</style>
<script>
  import { confim } from "./js/write_messagebox.js";
  import mineLeft from "../../components/mine/mine-left.vue";
  import {
    articlereports,
    articlelist,
    articlelists,
    articleeditArticleStatus,
    articledetail,
    articledata,
    userSpecialAuthor,
    userSpecialAuthorChoose,
    getUserVideoList,
    getUserVideoCount,
    getUseraudioList,
    getaudioCount,
    checkAudioStatus,
    webUserVideounderCarriageVideo
  } from "./js/mineapi";
  import EditRealname from "../../components/dialog/edit-realName.vue";
  import getuserevent from "../../service/getuserevent.js";
  import loginmodalevent from "../../service/loginmodalevent.js";

  export default {
    components: { EditRealname, mineLeft },
    data() {
      return {
        reports: null,
        reports_date: Date.now(),
        articlelist: [],
        pagenow: 1,
        pagesize: 20,
        total:0,
        searchtitle: "",
        show_editrealname: false,
        activeName: "-1",
        feedbacknum: "",
        articletitle: {
          pages: 0
        },
        articletotal: {
          "-1": "0",
          "4": "0",
          "0": "0",
          "1": "0"
        },
        articledatas: "",
        userSpecialAuthorsta: "",
        dialogVisible: true,

        type: "1" //1文章2视频3音频
      };
    },
    computed: {
      typename() {
        var obj = {
          "1": "文章",
          "2": "视频",
          "3": "音频"
        };

        return obj[this.type];
      }
    },
    methods: {
      statusColor(str) {
        if (str == "草稿" || str == "已下架") {
          return "gray";
        }
        if (str == "审核不通过" || str == "已删除") {
          return "red";
        }
        if (str == "待发布" || str == "待审核" || str == "审核中") {
          return "yellow";
        }
        if (str == "已发布") {
          return "blue";
        }
      },
      gowrire() {
        if (this.$store.state.userinfo.realName) {
          this.$router.push("write");
        } else {
          this.show_editrealname = true;
        }
      },

      getFour() {
        articlereports({ date: this.reports_date }).then(res => {
          this.reports = res.params;
        });
      },
      get_articledata() {
        articledata().then(res => {
          this.articledatas = res;
        });
      },
      specialAuthor() {
        userSpecialAuthor().then(res => {
          if (res) {
            this.userSpecialAuthorsta = true;
          }
        });
      },

      async gettable() {
        var getlist, getcount;
        this.articlelist = [];
        this.articletitle = {
          pages: 0
        };
        switch (this.type) {
          case "1":
            (getlist = articlelists), (getcount = articlelists);
            break;
          case "2":
            (getlist = getUserVideoList), (getcount = getUserVideoCount);
            break;
          case "3":
            (getlist = getUseraudioList), (getcount = getaudioCount);
            break;
        }

        var [list, call, c4, c0, c1] = await Promise.all([
          getlist({
            status: this.activeName,
            pageNum: this.pagenow,
            pageSize: this.pagesize
          }),
          getcount({
            status: "-1",
            pageNum: this.pagenow,
            pageSize: this.pagesize
          }),
          getcount({
            status: "4",
            pageNum: this.pagenow,
            pageSize: this.pagesize
          }),
          getcount({
            status: "0",
            pageNum: this.pagenow,
            pageSize: this.pagesize
          }),
          getcount({
            status: "1",
            pageNum: this.pagenow,
            pageSize: this.pagesize
          })
        ]);


        this.articletitle = list;
        this.articlelist = list.list;
        this.total=list.total||list.page.total;
        this.articletotal = {
          "-1": call.total,
          "4": c4.total,
          "0": c0.total,
          "1": c1.total
        };
      },

      tabclick(data) {
        this.pagenow = 1;
        this.gettable();
      },
      typechange(type) {
        this.type = type;
        this.activeName = "-1";
        this.pagenow = 1;
        this.gettable();
      },

      feedbackshow(num) {
        this.feedbacknum = num;
      },

      async editArticle(i, article) {
        if ([0, 1, 5, 6].indexOf(i.key) >= 0) {
          await confim(this.$confirm, "soldout");
          if (this.type == "1") {
            await articleeditArticleStatus({
              articleId: article.row.articleId,
              type: i.key
            });
          } else if (this.type == "2") {
            await webUserVideounderCarriageVideo({
              id: article.row.articleId
            });
          } else if (this.type == "3") {
            await checkAudioStatus({
              id: article.row.articleId,
              type: i.key
            });
          }

          this.getFour();
          this.gettable();
        } else {
          if (i.key == 10) {
            this.$router.push({
              path: "/mine/write",
              query: {
                id: article.row.articleId,
                type: this.type
              }
            });
          } else if (i.key == 11) {
            window.open("/newspreview/" + article.row.articleId + ".html");
          }
        }
      },

      specialAuthorChoose(decision) {
        userSpecialAuthorChoose({ decision }).then(res => {
          this.userSpecialAuthorsta = false;
        });
      }
    },
    mounted() {
      if (!this.$store.state.userinfo) {
        this.$router.replace({ path: "/" });
        setTimeout(() => {
          loginmodalevent.$emit("login");
        }, 2000);
      } else {
        this.get_articledata();
        this.getFour();
        this.specialAuthor();
        if(this.$store.state.fromwrite){
          this.type=this.$store.state.fromwrite;
       this.$store.commit('SET_FROMWRITE',"")
        }
        this.gettable();
      }
    }
  };
</script>
