
<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialog_realname.dialogshow" :width="'385px'" :custom-class="'edit_nicknamenew'" :center="true" @close="$emit('update:show', false)" :before-close="bc">
      <el-form ref="form">
        <el-form-item>
          <el-input v-model="dialog_realname.userName" @focus="dialog_realname.err=''" :maxlength=8 placeholder="请输入真实姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="dialog_realname.idcardNum" @focus="dialog_realname.err=''" :maxlength=18 placeholder="请输入身份证号"></el-input>
        </el-form-item>
        <div class="err" v-show="dialog_realname.err">{{dialog_realname.err}}</div>
        <el-form-item>
          <el-button class="sub" type="primary" :disabled="!dialog_realname.idcardNum||!dialog_realname.userName||!compactchecked" :loading="dialog_realname.sub_loading" @click="sub_realname">实名认证</el-button>
        </el-form-item>
        <el-form-item class="compact">
            <el-checkbox v-model="compactchecked"></el-checkbox>
          我已阅读
          <span @click="dialog_realname.dialogshow1=true">《挖链-投稿合同》</span>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog :visible.sync="dialog_realname.dialogshow1" :custom-class="'edit_nicknamenewcompact'" :width="'960px'">
      <div class="edit_nicknamenewcompact-title">
       平台入驻协议</div>
      <div class="edit_nicknamenewcompact-content"  style="height:423px;    overflow-y: scroll;">
        <div>
          <p> 1、“挖链平台”：指包括挖链网（域名为 walian.cn）、算立方（域名为hc.top）、通证指数网（域名为Tokenindexrank.com）等网站及客户端，以下统称为“挖链平台”。</p>
          <p>2、《挖链平台投稿须知》是《挖链平台服务协议》的补充协议，本须知未尽事宜，适用《挖链平台服务协议》的相关规定。</p>
          <p>3、用户应对其投递的任何文字、信息、数据、图片、图表、照片、软件、声音、影像或其他任何储存形式或任何表现形式的资料（以下统称为“稿件”）享有合法权益（由用户原创或用户已获合法授权）并承担相应法律责任。在任何情况下，挖链平台均不对稿件的准确性、合法性、完整性以及因稿件而引起的任何损失、损害承担任何责任。</p>
          <p>4、用户同意并授权：对于用户提供、发布及在使用挖链平台服务中形成的除个人信息外的文字、图片、视频、音频等非个人信息，在法律规定的保护期限内您免费授予挖链及其关联公司获得全球排他的许可使用权利，及再授权给其他第三方使用，并有权以自身名义对第三方侵权行为取证及提起诉讼的权利。使用范围包括但不限于在当前或其他网站、应用程序、产品或终端设备等。您同意挖链及其关联公司采用存储、使用、复制、修订、编辑、汇编、发布、发行、展示、翻译、分发等方式使用您的非个人信息或制作其派生作品，并以已知或日后开发的形式、媒体或技术将上述信息纳入其它作品内。</p>
          <p>5、挖链平台默认用户对其投递的稿件拥有合法的知识产权或已获得合法授权，直至他人提出异议。若稿件因侵犯他人合法权益造成法律纠纷，一经发现或收到投诉，挖链平台有权立即删除并不承担任何责任。由此产生的侵权纠纷均由用户自行负责，本平台概不承担任何法律责任或赔偿义务。同时，若由此给挖链公司及挖链的关联公司造成损失的，由投稿用户进行赔偿。</p>
          <p>6、用户在本平台上投递并发表的一切稿件仅代表其个人观点，与本平台无关，不代表本平台赞同其观点和对其真实性负责。由网友承担一切因其自身的行为而直接或间接导致的民事、行政或刑事法律责任。</p>
          <p>7、网友须尊重网上道德，遵守《全国人大常委会关于维护互联网安全的决定》和《互联网电子公告服务管理规定》及中华人民共和国其他各项有关法律法规。严禁发表危害国家安全、破坏民族团结、破坏国家宗教政策、破坏社会稳定、侮辱、诽谤、教唆、淫秽等内容的稿件。</p>
          <p>8、用户将稿件上传至本平台，即视为授权许可本网站免费使用稿件。</p>
          <p>9、除特别约定外，用户所投递稿件在本平台的发布无需支付任何费用，同时本网站也不对惠赐稿件者支付任何费用。</p>
          <p>10、网友一旦在本平台投稿，即表明其认可本投稿须知内容，并承诺严格遵守。</p>
          <p>11、用户同意并授权：挖链公司以公司自己的名义或委托专业第三方对侵犯您上传发布的享有知识产权的内容进行代维权，维权形式包括但不限于：监测侵权行为、发送维权函、提起诉讼或仲裁、调解、和解等，公司有权对维权事宜做出决策并独立实施。</p>
          <p>12、用户在任何情况下都不得私自使用挖链公司的包括但不限于“挖链”、“http://www.walian.cn ”、“算立方”、“hc.top”、“通证指数网”、“Tokenindexrank.com”等在内的任何商标、服务标记、商号、域名、网站名称或其他显著品牌特征等（以下统称为“标识”）。未经公司事先书面同意，您不得将本条款前述标识以单独或结合任何方式展示、使用或申请注册商标、进行域名注册等，也不得实施向他人明示或暗示有权展示、使用、或其他有权处理该些标识的行为。由于您违反本协议使用公司上述商标、标识等给公司或他人造成损失的，由您承担全部法律责任。</p>
        </div>
      </div>
      <button class="edit_nicknamenewcompact-close" @click="dialog_realname.dialogshow1=false">关闭</button>
    </el-dialog>

  </div>

</template>
<style lang="scss">
  @import "edit-nicknamenew.scss";
</style>
<script>
  import { submitRealName } from "../../pages/mine/js/mineapi";
  import regex from "../../service/regex";

  export default {
    props: {
      show: {
        type: Boolean
      },
      realName: {
        type: String
      },
      title: {
        type: String
      }
    },
    data() {
      return {
        dialog_realname: {
          userName: "",
          idcardNum: "",
          err: "",
          sub_loading: false,
          dialogshow: this.show,
          dialogshow1: false
        },
        compactchecked:false
      };
    },
    methods: {
      bc(done) {
        this.do_bc();
        done();
      },
      do_bc() {
        this.dialog_realname = {
          userName: "",
          idcardNum: "",
          err: "",
          sub_loading: false,
          dialogshow: false,
           dialogshow1: false
        };
        this.compactchecked=false
      },
      sub_realname() {
        if (!regex.is_idcard.test(this.dialog_realname.idcardNum)) {
          this.dialog_realname.err = "请输入正确的身份证格式";
          return;
        }
        if (!regex.is_name.test(this.dialog_realname.userName)) {
          this.dialog_realname.err = "请输入正确的姓名格式";
          return;
        }
        this.dialog_realname.sub_loading = true;
        submitRealName({
          userName: this.dialog_realname.userName,
          idcardNum: this.dialog_realname.idcardNum
        })
          .then(res => {
            var name =
              this.dialog_realname.userName[0] +
              this.dialog_realname.userName
                .split("")
                .slice(1)
                .map(i => "*")
                .join("");

            this.$store.commit("SET_USERINFO", {
              realName: name
            });
            this.do_bc();
          })
          .catch(err => {
            this.dialog_realname.err = err.msg;
          })
          .finally(() => (this.dialog_realname.sub_loading = false));
      }
    },
    watch: {
      show() {
        this.dialog_realname.dialogshow = this.show;
      }
    }
  };
</script>