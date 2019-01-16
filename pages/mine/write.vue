<template>
  <div class="mine_write">
    <div class="mine_write_inner clearfix">
      <mineLeft></mineLeft>
      <!-- v-if="($route.query.type&&$route.query.type==1)||!$route.query.type" -->
      <div class="mine_write_right">
        <div class="mine_write_state" v-if="$route.query.id&&copydata">
          <img src="../../assets/images/1.2/butongguo_normal.png" alt="" v-if="copydata.status==3">
          <img src="../../assets/images/1.2/caogao_normal.png" alt="" v-if="copydata.status==0">
          <img src="../../assets/images/1.2/daifabu_normal.png" alt="" v-if="copydata.status==2">
          <img src="../../assets/images/1.2/shenhezhong_normal.png" alt="" v-if="copydata.status==1">
          <img src="../../assets/images/1.2/yifabu_normal.png" alt="" v-if="copydata.status==4">
          <img src="../../assets/images/1.2/yishangchu_normal.png" alt="" v-if="copydata.status==6">
          <img src="../../assets/images/1.2/yixiajia_normal.png" alt="" v-if="copydata.status==5">
          <p v-if="copydata.status==3">拒绝原因：{{copydata.rejectReason}}</p>
        </div>
        <el-tabs v-model="tabactive">
          <el-tab-pane label="发布文章" name="1" v-if="canshowtab1">
            <div class="mine_write_form">
              <input type="text" class="mine_write_inputtitle inEditor" placeholder="请在这里输入文章标题，限70个字符" maxlength="70" v-model="news.title">
              <div class="quill-wrap" style="line-height:normal">
                <quill-editor v-model="news.content" :options="editorOption">
                </quill-editor>
              </div>
              <h3 class="mine_write_title">封面图</h3>
              <upload-card :title1="'点击添加封面图'" :h3_1="'建议尺寸：500PX * 300PX'" :h3_2="'支持格式：jpg、png、jpeg'" :url.sync="news.imgurl" :type="'img'" />
              <el-input placeholder="请填写简介摘要" type="textarea" v-model="news.des" :maxlength="100"></el-input>
            </div>
          </el-tab-pane>
          <el-tab-pane label="发布视频" name="2" v-if="canshowtab2">
            <div class="mine_write_form">
              <input type="text" class="mine_write_inputtitle" placeholder="请在这里输入视频标题，限70个字符" maxlength="70" v-model="video.title">
              <!-- <div class="quill-wrap" style="line-height:normal">
                <quill-editor v-model="video.content" :options="editorOption">
                </quill-editor>
              </div> -->
              <el-input placeholder="视频类文字介绍建议不超过500字" type="textarea" v-model="video.content" :maxlength="1000"></el-input>
              <h3 class="mine_write_title">封面图</h3>
              <upload-card :title1="'点击添加封面图'" :h3_1="'建议尺寸：686PX * 384PX'" :h3_2="'支持格式：jpg、png、jpeg'" :url.sync="video.imgurl" :type="'mp4img'" />
              <h3 class="mine_write_title">上传视频</h3>
              <upload-card :title1="'点击上传视频'" :h3_1="'建议大小：不超过1.5G'" :h3_2="'支持格式：mp4'" :url.sync="video.fileurl" :type="'mp4'" />
            </div>
          </el-tab-pane>
          <el-tab-pane label="发布音频" name="3" v-if="canshowtab3">
            <div class="mine_write_form">
              <input type="text" class="mine_write_inputtitle" placeholder="请在这里输入音频标题，限70个字符" maxlength="70" v-model="audio.title">

              <h3 class="mine_write_title">APP封面图</h3>
              <upload-card :title1="'点击添加APP封面图'" :h3_1="'建议尺寸：250PX * 150PX'" :h3_2="'支持格式：jpg、png、jpeg'" :url.sync="audio.imgurl" :type="'mp3img'" />
              <h3 class="mine_write_title">APP播放页图</h3>
              <upload-card :title1="'点击添加APP播放页图'" :h3_1="'建议尺寸：550PX * 550PX'" :h3_2="'支持格式：jpg、png、jpeg'" :url.sync="audio.appimgurl" :type="'mp3img'" />
              <h3 class="mine_write_title">上传音频</h3>
              <upload-card :title1="'点击上传音频'" :h3_1="'建议大小：不超过400m'" :h3_2="'支持格式：mp3'" :url.sync="audio.fileurl" :type="'mp3'" />
            </div>
          </el-tab-pane>
        </el-tabs>
        <div>
           <el-checkbox v-model="agreementTag"></el-checkbox>
          <span style="color: #8c8b8b;padding-left: 7px; font-size: 15px;">您选择投稿且点击“提审”，则默认签订</span>
          <span @click="dialogshow1=true" style="font-wight:700; color:#ef2e2e; font-size: 15px; cursor:pointer">《挖链号线上作者协议》</span>
        </div>
        
        <div class="mine_write_btns">
          <el-button class="mine_write_btns_dk" @click="ts">提审</el-button>

          <el-button class="mine_write_btns_lt" @click="ccg" v-if="!copydata||copydata.status!=4">存草稿</el-button>
          <el-button class="mine_write_btns_lt" v-if="tabactive!=3" @click="yl">预览</el-button>
        </div>
      </div>
    </div>
     <el-dialog :visible.sync="dialogshow1" :custom-class="'edit_nicknamenewcompact'" :width="'960px'">
      <div class="edit_nicknamenewcompact-title">
       平台入驻协议</div>
      <div class="edit_nicknamenewcompact-content"  style="height:423px; overflow-y: scroll;">
        <div>
          <h3>甲方：上海挖链科技有限公司</h3>
          <h3>乙方：挖链号平台入驻作者</h3>
          <p>挖链号是由上海挖链科技有限公司开发并运营的一个新经济、新科技领域的聚合型内容分发平台，鼓励相关领域个人与媒体、企业等机构在此平台发布原创优质内容。平台致力于帮助区块链、科技金融及其他新科技领域的优质原创作者实现平台化的内容创作，为挖链号作者提供一个和谐、健康、法治的创作环境，鼓励更多优质内容的产生，坚决抵制低质文章的流入，保护原创版权，维护创作者合法权益。本协议为上海挖链科技有限公司与挖链号平台入驻作者签订的挖链号平台投稿协议。</p>
          <h3>协议内容如下：</h3>
          <h3>一、协议总则</h3>
          <p>1.为更清晰地理解并遵守相关协议及规则，乙方务必仔细阅读并透彻理解本协议，并遵守挖链号服务协议等专项规则。</p>
          <p>2.甲方将有权对以下类型内容进行操作，如果内容严重违规，则会对文章进行删除或者封号处理。</p>
          <P>3、挖链号在发布入驻作者的文章之前，会穷尽各种手段对该文章的标题、内容、图片、视频等所包含的侵犯知识产权的信息予以核查，但囿于现有技术的有限性、文章作者及内容的不可控性，本平台无法完全避免侵犯知识产权行为及内容的出现，为了维护甲方平台的权利，甲方在此声明此类侵犯知识产权的行为后果由乙方承担，若由此给甲方平台造成损失，甲方有权对乙方进行追偿。</P>
          <P>4、乙方成为甲方挖链号的入驻作者时，视为乙方接受本协议项下的所有条款；尤其是因乙方侵权时对甲方免责条款的约定，乙方已有明确的认知并接受此约定。</P>
          <P>5.甲方负责本协议的解释及实施。</P>
          <h3>二、发文规范</h3>
          <p>1.挖链号发文格式规范
            ①标题中含有错别字、繁体字、特殊符号，或标题不通顺，标题使用全英文或者外文等；正文（包含视频）存在全文使用繁体字、全文英文、少数民族文字，且无翻译（字幕）；文章含有大段乱码、未分段、无标点、较多错别字。以上现象文章，不予通过。
            ②使用过度夸张的惊叹词，故意营造悬念引人好奇，或者具有煽动性的标题；题文不符，标题存在歧义，断章取义，捏造正文中不存在的人、物、情节等；将未经查实的事件赋予确定口吻以及过度自我揣测作为标题；以揭秘炒股稳赚秘诀、精准预测大盘走势等标题误导读者。以上现象文章，不予通过。
            ③文字、图片、视频对性部位和性行为进行过度描述或展示；对性部位和性行为进行暗示或内涵表述：如展示形似性器官的物品，或形似性行为的动作；违背社会公德及违背公序良俗的性观念（性虐、乱伦、恋童等）；以上现象文章，不予通过。
            ④含有二维码、电话、个人微信、QQ号、微信群、QQ群等推广信息或者含有多处推广信息；推广微信公众号时使用变种文字，如威信、薇信、微^信`公`众`号等；发布的内容中含有购物链接、网盘资源、跳转链接、下载链接等；发布商业产品、品牌、活动的推广软文及广告；任何形式与正文毫无相关性的推广。以上现象文章，不予通过。
          </p>
          <p>2.挖链号发文内容规范</p>
          <p>
            ①发布与已发生事实相悖的事件情节；无中生有的内容或捏造谣言，断章取义，将部分事实加上推测作为事实发布；对政策法规加以曲解。以上文章所触及相关法律法规，由乙方承担，与甲方无关。
            ②未取得合法独家授权，发布或剽窃他人作品的均构成抄袭，侵犯他人知识产权；拼接类内容，大篇幅引用他人内容或文章主要内容为他人作品，如网络图片拼接故事，知识罗列、作品盘点、摘抄等，视为抄袭；发布他人原创内容而不注明原作者的，注明转载或注明原作者有误的，视同为抄袭；以上文章所触及相关法律法规，由乙方承担，与甲方无关。
          </p>
          <h3>三、版权规范</h3>
          <p>本协议将对版权问题作以如下处理：</p>
          <p>①凡本网注明“稿件来源：挖链网”等声明版权的所有文字、图片和音视频稿件，版权均属本网站所有，任何媒体、网站或个人未经本网协议授权不得转载、链接、转贴或以其他方式复制发表。已经本站协议授权的媒体、网站，在下载使用时必须注明“稿件来源：挖链网”，违者本站将依法追究责任。</p>
          <p>②本网注明稿件来源为其他媒体与网站的文/图等稿件均为转载稿，本网转载，出于非商业性的行业交流和信息传递之目的，并不意味着赞同其观点或证实其内容的真实性。如转载稿涉及版权等问题，请作者在两周内速来电或来函联系，我们协调给予处理(或删除)。如不同意本网之转载，请及时告知本网撤除。</p>
          <p>③任何单位和个人认为通过挖链网包含的内容可能涉嫌侵犯其合法权益，应及时向挖链网进行书面反馈，并提供其身份证明、权属证明及详细侵权情况的说明，挖链网在收到上述法律文件后，将会立即移除被控侵权内容。因本网在使用的部分图片及文字原始来源无法确认作者时，请作者及时与本网取得联系，以便支付相应稿酬。</p>
          <p>④凡向挖链号投稿的作者，投稿人务必保证稿件的原创性和内容的真实性，如果稿件因抄袭、作假等行为导致的法律后果，由乙方负责。</p>
          <p>如因本协议项下任意条款产生争议，协议双方及其利害关系人愿意本着平等协商的原则予以解决，确实无法解决的争议，双方愿意约定将此争议提交甲方所在地人民法院予以解决。</p>
          <h3>五、结语</h3>
          <p>为了构建和谐、法治、健康的网络环境，维护挖链号自媒体平台秩序，更好的保障作者合法权益，鼓励更多创作者入驻挖链号平台，对于发布以上违规内容的作者，平台将严肃处理。也请广大创作者遵守《挖链号作者协议》，共同参与打造挖链号平台健康良好的创作环境。
            以上内容于乙方入驻挖链号平台后发表文章时勾选时生效，最终解释权，在法律允许的范围内归甲方所有。</p>
      
        </div>
      </div>
      <button class="edit_nicknamenewcompact-close" @click="dialogshow1=false">关闭</button>
    </el-dialog>
  </div>
</template>
<style lang="scss">
  @import "write.scss";
  .edit_nicknamenewcompact-content {
    h3 {
      padding: 7px 0;
    }
    p {
      margin-top: 10px !important;
      margin-bottom: 10px !important;
    }
  }
</style>
<script>
  import mineLeft from "../../components/mine/mine-left.vue";
  import uploadCard from "../../components/mine/upload-card.vue";

  import { quillEditor, Quill } from "vue-quill-editor";
  import { container, ImageExtend, QuillWatch } from "quill-image-extend-module";
  Quill.register("modules/ImageExtend", ImageExtend);

  import { AppConfig } from "../../service/config";
  import { Loading } from "element-ui";
  import { confim } from "./js/write_messagebox.js";
  import {
    audioaudioAudit,
    acticlecheckFamiliar,
    audiocheckFamiliar,
    articleeeditArticle,
    articledetail,
    articleeditArticleStatus,
    saveUserVideoInfo,
    submitUserVideo,
    userVideoInfo,
    editAudioQuery,
    videocheckFamiliar
  } from "./js/mineapi.js";
  import getuserevent from "../../service/getuserevent.js";
  import loginmodalevent from "../../service/loginmodalevent.js";

  export default {
    components: { mineLeft, uploadCard },
    data() {
      var canshowtab1 = false;
      var canshowtab2 = false;
      var canshowtab3 = false;
      var type = this.$route.query.type;
      if (this.$route.query.type) {
        if (type == 1) {
          canshowtab1 = true;
        } else if (type == 2) {
          canshowtab2 = true;
        } else if (type == 3) {
          canshowtab3 = true;
        }
      } else {
        var canshowtab1 = true;
        if (this.$store.state.userinfo.pubVideoRight) {
          canshowtab2 = true;
        }
        if (this.$store.state.userinfo.pubAudioRight) {
          canshowtab3 = true;
        }
      }
      return {
        tabactive: this.$route.query.type ? this.$route.query.type + "" : "1",
        canshowtab3,
        canshowtab2,
        canshowtab1,
        copydata: null,
        audio: {
          imgurl: "",
          appimgurl: "",
          fileurl: "",
          title: ""
        },
        video: {
          imgurl: "",
          fileurl: "",
          title: "",
          content: ""
        },
        news: {
          imgurl: "",
          title: "",
          content: "",
          des: ""
        },
        checkList: ["web端", "app端"],

        editorOption: {
          modules: {
            ImageExtend: {
              loading: true,
              name: "file",
              headers: xhr => {
                xhr.setRequestHeader("token", this.$store.state.token);
              },
              action: AppConfig.apiEndpoint + "/api/seo/uploadImage",
              response: res => {
                return res.data.result;
              }
            },
            toolbar: {
              container: [
                [
                  "bold",
                  "italic",
                  "underline",
                  "strike",
                  "blockquote",
                  "code-block",
                  "image"
                ],
                [{ list: "ordered" }, { list: "bullet" }],

                [{ indent: "-1" }, { indent: "+1" }],

                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                [{ color: [] }, { background: [] }],

                [{ align: [] }],

                ["clean"]
              ],
              handlers: {
                image: function() {
                  QuillWatch.emit(this.quill.id);
                }
              }
            }
          },
          placeholder:
            "文字内容需500字以上，并配有2张以上配图。\n不可含有公众号、网址或二维码等内容。\n营销类、广告类稿件均不予通过。",
          theme: "snow",
          scrollingContainer: ".ql-container"
        },
        familiarloadinstance: null,
        agreementTag: false,
        dialogshow1: false
      };
    },
    methods: {
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
      ccg() {
        switch (this.tabactive) {
          case "1":
            this.ccg1(0);
            break;
          case "2":
            this.ccg2(0);
            break;
          case "3":
            this.ccg3(0);
            break;
        }
      },
      ts() {
        switch (this.tabactive) {
          case "1":
            this.ts1();
            break;
          case "2":
            this.ts2();
            break;
          case "3":
            this.ts3();
            break;
        }
        
      },
      yl() {
        switch (this.tabactive) {
          case "1":
            this.yl1();
            break;
          case "2":
            this.yl2();
            break;
        }
      },
      async ccg3(type) {
        try {
          if (!this.audio.title) {
            return this.message({
              title: "请输入音频标题",
              type: "warning"
            });
          }
          if (!this.audio.imgurl) {
            return this.message({
              title: "请上传APP封面图",
              type: "warning"
            });
          }
          if (!this.audio.appimgurl) {
            return this.message({
              title: "请上传APP播放页图",
              type: "warning"
            });
          }
          if (!this.audio.fileurl) {
            return this.message({
              title: "请上传音频",
              type: "warning"
            });
          }

          var id = await audioaudioAudit({
            title: this.audio.title,
            audio: this.audio.fileurl,
            coverPic: this.audio.imgurl,
            type: 0,
            playPic: this.audio.appimgurl,
            audioId: this.audio.id
          });
          this.audio.id = id;
          if (type == 0) {
            this.message({
              title: "保存成功",
              type: "success"
            });
            this.$store.commit('SET_FROMWRITE',this.tabactive)
            this.$router.back();
          } else {
            return id;
          }
        } catch (err) {
          this.message({
            title: err.msg,
            type: "warning"
          });
        }
      },
      async ts3() {
        try {
          if (!this.audio.title) {
            return this.message({
              title: "请输入音频标题",
              type: "warning"
            });
          }
          if (!this.audio.imgurl) {
            return this.message({
              title: "请上传APP封面图",
              type: "warning"
            });
          }
          if (!this.audio.appimgurl) {
            return this.message({
              title: "请上传APP播放页图",
              type: "warning"
            });
          }
          if (!this.audio.fileurl) {
            return this.message({
              title: "请上传音频",
              type: "warning"
            });
          }
           if(!this.agreementTag) {
               return this.message({
                message: "请先阅读《挖链号线上作者协议》并勾选确认，再提审文章，谢谢！",
                type: "warning"
              });  
          }

          if(this.audio.status!=4){

          var instance = Loading.service({ text: "相似度检查中" });
          var { familiar } = await audiocheckFamiliar({
            title: this.audio.title
          });
          instance.close();
          if (familiar) {
            await confim(this.$confirm, "similarity");
          }
          }

          var id = await this.ccg3(1);
          if (id) {
            await audioaudioAudit({
              title: this.audio.title,
              audio: this.audio.fileurl,
              coverPic: this.audio.imgurl,
              type: 1,
              playPic: this.audio.appimgurl,
              audioId: id
            });
            
            this.message({
              title: "提审成功",
              type: "success"
            });
            this.$store.commit('SET_FROMWRITE',this.tabactive)
            this.$router.back();
          }
        } catch (err) {
          console.log(err);
          instance&&instance.close();
          this.message({
            title: err.msg,
            type: "warning"
          });
        }
      },
      async ccg2(type) {
        try {
          if (!this.video.title) {
            return this.message({
              title: "请输入视频标题",
              type: "warning"
            });
          }
          if (!this.video.content) {
            return this.message({
              title: "请上传视频内容",
              type: "warning"
            });
          }
          if (!this.video.imgurl) {
            return this.message({
              title: "请上传封面图",
              type: "warning"
            });
          }
          if (!this.video.fileurl) {
            return this.message({
              title: "请上传视频",
              type: "warning"
            });
          }

          var id = await saveUserVideoInfo({
            title: this.video.title,
            intro: this.video.content,
            videoUrl: this.video.fileurl,
            logo: this.video.imgurl,
            id: this.video.id
          });
          this.video.id = id;

          if (type == 0) {
            this.message({
              title: "保存成功",
              type: "success"
            });
                        this.$store.commit('SET_FROMWRITE',this.tabactive)
            this.$router.back();
          } else {
            return id;
          }
        } catch (err) {
          this.message({
            title: err.msg,
            type: "warning"
          });
        }
      },
      async ts2() {
        try {
          if (!this.video.title) {
            return this.message({
              title: "请输入视频标题",
              type: "warning"
            });
          }
          if (!this.video.content) {
            return this.message({
              title: "请上传视频内容",
              type: "warning"
            });
          }
          if (!this.video.imgurl) {
            return this.message({
              title: "请上传封面图",
              type: "warning"
            });
          }
          if (!this.video.fileurl) {
            return this.message({
              title: "请上传视频",
              type: "warning"
            });
          }
          if(!this.agreementTag) {
            return this.message({
              message: "请先阅读《挖链号线上作者协议》并勾选确认，再提审文章，谢谢！",
              type: "warning"
            });
          }

          if(this.video.status!=4){
          var instance = Loading.service({ text: "相似度检查中" });

          var { familiar } = await videocheckFamiliar({
            title: this.video.title
          });
          instance.close();
          if (familiar) {
            console.log("想似");
            await confim(this.$confirm, "similarity");
          }
          }

          var id = await this.ccg2(1);
          if (id) {
            await submitUserVideo({
              videoId: id
            });
             
            this.message({
              title: "提审成功",
              type: "success"
            });
                        this.$store.commit('SET_FROMWRITE',this.tabactive)
            this.$router.back();
          }
        } catch (err) {
          instance&&instance.close();
          this.message({
            title: err.msg,
            type: "warning"
          });
        }
      },

      async ccg1(type) {
        try {
          if (!this.news.title) {
            return this.message({
              title: "请输入文章标题",
              type: "warning"
            });
          }
          if (!this.news.content) {
            return this.message({
              title: "请输入文章内容",
              type: "warning"
            });
          }
          if (!this.news.imgurl) {
            return this.message({
              title: "请上传封面图",
              type: "warning"
            });
          }
          if (!this.news.des) {
            return this.message({
              title: "请上传简介摘要",
              type: "warning"
            });
          }

          var _data = {
            title: this.news.title,
            subTitle: "",
            intro: this.news.des,
            content: this.news.content,
            logo: this.news.imgurl,
            articleId: "",
            type: 0,
            pubPlatform: 0,
            articleId: this.news.id
          };

          var { articleId: id } = await articleeeditArticle(_data);
          this.news.id = id;
          if (type == 0) {
            this.message({
              title: "保存成功",
              type: "success"
            });
            this.$store.commit('SET_FROMWRITE',this.tabactive)
            this.$router.back();
          } else {
            return id;
          }
        } catch (err) {
          this.message({
            title: err.msg,
            type: "warning"
          });
        }
      },
      async ts1() {
        try {
          if (!this.news.title) {
            return this.message({
              title: "请输入文章标题",
              type: "warning"
            });
          }
          if (!this.news.content) {
            return this.message({
              title: "请输入文章内容",
              type: "warning"
            });
          }
          if (!this.news.imgurl) {
            return this.message({
              title: "请上传封面图",
              type: "warning"
            });
          }
          if (!this.news.des) {
            return this.message({
              title: "请上传简介摘要",
              type: "warning"
            });
          }
          if(!this.agreementTag) {
            return this.message({
              message: "请先阅读《挖链号线上作者协议》并勾选确认，再提审文章，谢谢！",
              type: "warning"
            });
          }
          if (this.news.status != 4) {
            var instance = Loading.service({ text: "相似度检查中" });
            var { familiar } = await acticlecheckFamiliar({
              title: this.news.title,
              content: this.news.content
            });
            instance.close();
            if (familiar) {
              console.log("想似");
              await confim(this.$confirm, "similarity");
            }
          }

          var id = await this.ccg1(1);
         
          if (id) {
            await articleeditArticleStatus({
              articleId: id,
              type: 1
            });
             
            this.message({
              title: "提审成功",
              type: "success"
            });
            this.$store.commit('SET_FROMWRITE',this.tabactive)
            this.$router.back();
          }
        } catch (err) {
          instance&&instance.close();
          this.message({
            title: err.msg,
            type: "warning"
          });
        }
      },
      async yl1() {
        try {
          var id = await this.ccg1(1);
          if (id) {
            window.open("/newspreview/" + id + ".html");
          }
        } catch (err) {
          this.message({
            title: err.msg,
            type: "warning"
          });
        }
      },
      async yl2() {
        try {
          var id = await this.ccg2(1);
          if (id) {
            window.open("/newspreview/" + id + ".html?isvideo");
          }
        } catch (err) {
          this.message({
            title: err.msg,
            type: "warning"
          });
        }
      },
      async getdetail1(id, loadinginstance) {
        var { articleDetail } = await articledetail({ articleId: id });
        this.news = {
          title: articleDetail.title,
          des: articleDetail.intro,
          content: articleDetail.content,
          imgurl: articleDetail.logo,
          id: articleDetail.articleId,
          status: articleDetail.status,
          rejectReason: articleDetail.rejectReason
        };
        loadinginstance.close();
      },
      async getdetail2(id, loadinginstance) {
        var data = await userVideoInfo({ videoId: id });
        this.video = {
          imgurl: data.logo,
          fileurl: data.videoUrl,
          title: data.title,
          content: data.intro,
          id: data.id
        };
        loadinginstance.close();
      },
      async getdetail3(id, loadinginstance) {
        var data = await editAudioQuery({ audioId: id });
        this.audio = {
          imgurl: data.pictureUrl,
          appimgurl: data.playPictureUrl,
          fileurl: data.audioUrl,
          title: data.title,
          id: data.id
        };
        loadinginstance.close();
      }
    },
    mounted() {
      function checkuser(data) {
        if (data == 0) {
          this.$router.replace({ path: "/" });
          setTimeout(() => {
            loginmodalevent.$emit("login");
          }, 2000);
          return;
        }
      }
      var checkInEdit = () => {
        var { id, type } = this.$route.query;
        if (id) {
          //然后根据不同的type id查询线详情
          var loadinginstance = Loading.service();
          if (type == 3) {
            this.getdetail3(id, loadinginstance);
          } else if (type == 2) {
            this.getdetail2(id, loadinginstance);
          } else {
            this.getdetail1(id, loadinginstance);
          }
        }
      };

      if (this.isClient) {
        let data = this.$store.state.userinfo ? 1 : 0;
        checkuser(data);
        checkInEdit();
      } else {
        getuserevent.$once("getuser", data => {
          checkuser(data);
          checkInEdit();
        });
      }
    },
    watch: {
      news(value) {
        this.copydata = value;
      },
      video(value) {
        this.copydata = value;
      },
      audio(value) {
        this.copydata = value;
      }
    },
    asyncData({ isClient }) {
      return { isClient };
    }
  };
</script>