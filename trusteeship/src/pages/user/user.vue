<template>
  <div class="page">
    <div class="page-top">
      <div class="page-component">
        <app-breadcrumbs class="x-breadcrumb"/>
        <div class="page-container">
          <div class="page-container__inner">
            <div class="page-component__nav">
              <h2 class="nav-title">个人中心</h2>
              <router-link class="nav-link" to="/i/account" active-class="active">我的账户</router-link>
              <router-link class="nav-link" to="/i/order" active-class="active">我的订单</router-link>
              <router-link class="nav-link" to="/i/trusteeship" active-class="active">我的托管</router-link>
              <router-link class="nav-link" to="/i/power" active-class="active">我的云算力</router-link>
              <router-link class="nav-link" to="/i/invitation" active-class="active">我的邀请</router-link>
              <router-link class="nav-link" to="/i/address" active-class="active">收货地址</router-link>
              <router-link class="nav-link" to="/i/safety" active-class="active">安全中心</router-link>
            </div>
            <div class="page-component__content">
              <router-view/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <x-features/>
    <el-dialog title="风险评估问卷" width="900px" :visible.sync="dialogVisible"
               custom-class="risk" top="10vh" @close="closeHandler">
      <div class="risk-desc">为了便于您了解自身的风险承受能力，选择合适的投资产品和服务，请您填写以下风险承受能力评估问卷。
        下列问题可协助评估您对投资产品和服务的风险承受能力，请您根据自身情况认真选择。评估结果仅供参考，不构成投资建议。
        为了及时了解您的风险承受能力，我们建议您持续做好动态评估。我们承诺对您的所有个人资料保密。
      </div>
      <div class="risk-form">
        <div class="form-title">个人及财务基本状况评估</div>
        <form class="risk-form-detail">
          <div class="form-item">
            <div class="form-item-title"> 1、请问您的年龄处于哪个阶段？</div>
            <div class="form-item-content">
              <el-radio v-model="answer.age" label="4">18以下</el-radio>
              <el-radio v-model="answer.age" label="5">18-30岁</el-radio>
              <el-radio v-model="answer.age" label="6">31-40岁</el-radio>
              <el-radio v-model="answer.age" label="3">41-50岁</el-radio>
              <el-radio v-model="answer.age" label="2">51-60岁</el-radio>
              <el-radio v-model="answer.age" label="1">60岁以上</el-radio>
            </div>
          </div>
          <div class="form-item">
            <div class="form-item-title"> 2、请问您的最高学历是以下哪一类别？</div>
            <div class="form-item-content">
              <el-radio v-model="answer.record" label="3">大专</el-radio>
              <el-radio v-model="answer.record" label="4">本科</el-radio>
              <el-radio v-model="answer.record" label="5">硕士</el-radio>
              <el-radio v-model="answer.record" label="2">博士</el-radio>
              <el-radio v-model="answer.record" label="1">其他</el-radio>
            </div>
          </div>
          <div class="form-item">
            <div class="form-item-title">3、您的家庭收入为？</div>
            <div class="form-item-content">
              <el-radio v-model="answer.income" label="1">5万元以下</el-radio>
              <el-radio v-model="answer.income" label="2">5-20万元</el-radio>
              <el-radio v-model="answer.income" label="3">20-50万元</el-radio>
              <el-radio v-model="answer.income" label="4">50-100万元</el-radio>
              <el-radio v-model="answer.income" label="5">100万元以上</el-radio>
            </div>
          </div>
          <div class="form-item">
            <div class="form-item-title"> 4、您所投资过的互联网金融产品平台的数量？？</div>
            <div class="form-item-content">
              <el-radio v-model="answer.netNum" label="2">1-2家</el-radio>
              <el-radio v-model="answer.netNum" label="3">2-3家</el-radio>
              <el-radio v-model="answer.netNum" label="4">3-4家</el-radio>
              <el-radio v-model="answer.netNum" label="5">5家以上</el-radio>
              <el-radio v-model="answer.netNum" label="1">从未投资过互联网金融产品</el-radio>
            </div>
          </div>
          <div class="form-item">
            <div class="form-item-title"> 5、以下那项描述最符合您的投资态度？</div>
            <div class="form-item-content">
              <p>
                <el-radio v-model="answer.attitude" label="1">厌恶风险，不希望本金损失，希望获得稳定回报</el-radio>
              </p>
              <p>
                <el-radio v-model="answer.attitude" label="2">保守投资，不希望本金损失，愿意承担一定幅度的回报波动</el-radio>
              </p>
              <p>
                <el-radio v-model="answer.attitude" label="4">寻求资金的较高回报和成长性，愿意为此承担有限的本金损失</el-radio>
              </p>
              <p>
                <el-radio v-model="answer.attitude" label="5">寻求资金的较高回报和成长性，愿意为此承担有限的本金损失</el-radio>
              </p>
            </div>
          </div>
          <div class="form-item">
            <div class="form-item-title"> 6、以下哪一分类更符合对您从事行业的描述？</div>
            <div class="form-item-content">
              <el-radio v-model="answer.trade" label="5">互联网，信息技术</el-radio>
              <el-radio v-model="answer.trade" label="4">金融服务</el-radio>
              <el-radio v-model="answer.trade" label="2">公共管理</el-radio>
              <el-radio v-model="answer.trade" label="3">商务贸易</el-radio>
              <el-radio v-model="answer.trade" label="1">其他</el-radio>
            </div>
          </div>
          <div class="assessment-result" v-if="score>0">
            <div>评估结果</div>
            <p>通过我们的评估，您总共得 <span class="result-scroe">{{score}}</span>分,
              <span class="result-type">你属于{{score|riskType}}</span>
            </p>
          </div>
          <div class="submit-btn">
            <el-button type="primary" class="btn" :class="{'is-disabled':!!score||isDisabledSubmit}"
                       :loading="submitBtnLoading" @click="submit">
              提交评审
            </el-button>
          </div>
        </form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import XFeatures from '../../components/x-features';
  import {mapState} from 'vuex';
  import UserAPI from '../../services/user-api';
  import {UPDATE_USER_INFO} from '../../store/action-types';
  import errorHandler from '../../services/error-handler';

  export default {
    components: {XFeatures},
    computed: {
      ...mapState(['userInfo']),
      isDisabledSubmit() {
        return !this.userInfo.score &&
          !(this.answer.age &&
            this.answer.record &&
            this.answer.income &&
            this.answer.netNum &&
            this.answer.attitude &&
            this.answer.trade);
      }
    },
    data() {
      return {
        answer: {
          age: '',
          record: '',
          income: '',
          netNum: '',
          attitude: '',
          trade: ''
        },
        score: 0,
        submitBtnLoading: false,
        dialogVisible: false
      };
    },
    filters: {
      riskType(score) {
        if (score >= 20) {
          return '进取型';
        }
        if (score >= 10) {
          return '平衡型';
        }
        if (score >= 6) {
          return '稳健型';
        }
      }
    },
    methods: {
      closeHandler() {
        sessionStorage.setItem('__risk__dialog__close', 'true');
      },
      submit() {
        if (this.userInfo.score) {
          return;
        }
        this.score = 0;
        let score = 0;
        for (let k in this.answer) {
          score += +this.answer[k];
        }
        this.submitBtnLoading = true;
        UserAPI.riskScore(score)
          .then(() => {
            this.submitBtnLoading = false;
            this.score = score;
            return this.$store.dispatch(UPDATE_USER_INFO);
          })
          .catch(err => {
            this.submitBtnLoading = false;
            errorHandler(err);
          });
      }
    },
    mounted() {
      let isCloseDialog = sessionStorage.getItem('__risk__dialog__close') === 'true';
      if (isCloseDialog) {
        this.dialogVisible = false;
      } else {
        UserAPI.userInfo()
          .then(res => {
            this.dialogVisible = !res.score;
          });
      }
    }
  };
</script>

<style scoped lang="scss">
  $page-width: 1200px;
  $nav-width: 160px;
  $nav-content-gap: 10px;

  .page-top {
    min-height: 500px;
    padding-bottom: 20px;
    background-color: #f6f6f6;
  }

  .page-component {
    height: 100%;
    width: 1200px;
    margin: 0 auto;
    position: relative;
    padding-top: 36px;
  }

  .x-breadcrumb {
    position: absolute;
    top: 0;
    left: 0;
    line-height: 36px;
    z-index: 2;
  }

  .page-container {
    position: relative;
    height: 100%;
    margin-top: -36px;
    padding-top: 36px;
  }

  .page-container__inner {
    position: relative;
    padding-left: $nav-width + $nav-content-gap;
  }

  .page-component__nav {
    position: absolute;
    left: 0;
    width: $nav-width;
    height: 100%;
    min-height: 430px;
    background-color: #fff;
    padding: 20px;
  }

  .page-component__content {
    width: $page-width - $nav-width - $nav-content-gap;
    height: 100%;
    background-color: #fff;
  }

  .nav-title {
    font-size: 18px;
    line-height: 44px;
    color: #333;
  }

  .nav-link {
    display: block;
    font-size: 14px;
    color: #666;
    line-height: 36px;
    padding-left: 5px;
  }

  .nav-link.active {
    color: #303137;
    font-weight: bold;
    border-left: 2px solid #303137;
    line-height: 14px;
    margin: 7px 0;
    padding-left: 3px;
  }

  .risk-desc {
    margin-top: 10px;
    margin-bottom: 20px;
    font-size: 14px;
    line-height: 21px;
    color: #969699;
  }

  .form-title {
    font-size: 14px;
    color: #D43939;
  }

  .risk-form-detail {
    margin-top: 20px;
  }

  .form-item-title {
    font-size: 14px;
    color: #303137;
    font-weight: bold;
  }

  .form-item-content {
    padding-left: 22px;
    margin: 12px 0;
    p {
      margin-bottom: 9px;
    }
  }

  .assessment-result {
    padding: 15px;
    background: #FFF7EA;
    border: 1px solid #D7C9B0;
    border-radius: 5px;
    width: 408px;
    font-size: 14px;
    color: #303137;
    .result-scroe {
      font-size: 26px;
      color: #F95453;
    }
    .result-type {
      color: #F95453;
    }
  }

  .submit-btn {
    margin-top: 24px;
    .btn {
      width: 272px;
      height: 46px;
      line-height: 46px;
      text-align: center;
      padding: 0;
      font-size: 18px;
    }
  }
</style>
