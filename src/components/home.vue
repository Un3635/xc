<template>
  <div class="home">
    <div class="content">
      <div id="anchor0" class="cont">
        <div class="bg-img"><img src="../assets/img/pic_bg.png" alt=""></div>
        <div class="anchor1-text">
          <h1 v-html="currText.home"></h1>
          <p v-if="currText.homeP" v-html="currText.homeP"></p>
          <div class="anchor1-btn" @click="$router.push('download')" v-html="currText.homeBtn"></div>
        </div>
      </div>
      <div id="anchor1" class="cont">
        <div class="line-cont">
          <div class="line">
            <div class="left-img fl"><img src="../assets/img/pic_1.png" alt=""></div>
            <div class="right-text fr">
              <div class="icon"></div>
              <h1 v-html="currText.productT1"></h1>
              <p v-html="currText.productP1"></p>
            </div>
          </div>
        </div>
        <div class="line line-bg">
          <div class="right-text fl">
            <div class="icon"></div>
            <h1 v-html="currText.productT2"></h1>
            <p v-html="currText.productP2"></p>
          </div>
          <div class="left-img fr"><img src="../assets/img/pic_2.png" alt=""></div>
        </div>
        <div class="line-cont">
          <div class="line">
            <div class="left-img fl"><img src="../assets/img/pic_3.png" alt=""></div>
            <div class="right-text fr">
              <div class="icon"></div>
              <h1 v-html="currText.productT3"></h1>
              <p v-html="currText.productP3"></p>
            </div>
          </div>
        </div>

      </div>
      <div id="anchor2" class="cont">
        <div class="about">
          <h1>{{currText.collT}}</h1>
          <div class="icon"></div>
          <div class="about_img">
            <div class="img"><img src="../assets/img/media-logo/walian.png" alt=""></div>
            <div class="img"><img src="../assets/img/media-logo/bitong.png" alt=""></div>
            <div class="img"><img src="../assets/img/media-logo/sina.png" alt=""></div>
            <div class="img"><img src="../assets/img/media-logo/todayhead.png" alt=""></div>
            <div class="img"><img src="../assets/img/media-logo/souhu.png" alt=""></div>
          </div>
          <div class="about_img">
            <div class="img"><img src="../assets/img/media-logo/tencent.png" alt=""></div>
            <div class="img"><img src="../assets/img/media-logo/wangyi.png" alt=""></div>
            <div class="img"><img src="../assets/img/media-logo/zaker.png" alt=""></div>
            <div class="img"><img src="../assets/img/media-logo/huxiu.png" alt=""></div>
            <div class="img"><img src="../assets/img/media-logo/fenghuang.png" alt=""></div>
          </div>
        </div>
        <div class="footer" id="footer">
          <h1>{{currText.contact}}</h1>
          <div class="email">E-mail: xtoken@xt.top</div>
          <div class="share-icon">
            <a href="javascript:void(0)">
              <div class="icon img1" @mouseenter="isWechatShow = !isWechatShow"
                   @mouseleave="isWechatShow=!isWechatShow"></div>
              <transition name="fadeIn">
                <div class="modal" v-if="isWechatShow">
                  <div class="img">
                    <img src="../assets/img/wechat_code.png" alt="">
                  </div>
                  <p>{{currText.watch}}</p>
                </div>
              </transition>
            </a>
            <a href="javascript:void(0)">
              <div class="icon img2" @mouseenter="isQQshow = !isQQshow" @mouseleave="isQQshow=!isQQshow"></div>
              <transition name="fadeIn">
                <div class="modal modal1" v-if="isQQshow">
                  <div class="img">
                    <img src="../assets/img/qq_code.png" alt="">
                  </div>
                  <p>{{currText.qq}}</p>
                </div>
              </transition>
            </a>
            <a href="https://weibo.com/u/6612917086?refer_flag=1001030101_&is_hot=1" target="_blank">
              <div class="icon img3"></div>
            </a>
            <a href="https://t.me/XTokenwallet" target="_blank">
              <div class="icon img6"></div>
            </a>
            <a href="https://www.facebook.com/oken.xt.5" target="_blank">
              <div class="icon img4"></div>
            </a>
            <a href="https://twitter.com/?lang=en" target="_blank">
              <div class="icon img5"></div>
            </a>
          </div>
          <p class="footer-text">Copyright © XToken 2018</p>
        </div>
      </div>
      <div id="anchor3" class="cont"></div>
    </div>

  </div>
</template>

<script>
  import {mapState} from 'vuex';
  export default {
    name: 'home',
    data () {
      return {
        activeInd: 0,
        allText: {
          cn: {
            home: 'XToken - 去中心化多币种跨链钱包',
            homeP: '私钥自持 | 安全无忧 | 本地加密存储 | 资产自己掌控',
            homeBtn: '下载XToken',
            productT1: '多链多币 一站式管理',
            productP1: 'BTC（及其分叉币）、ETH、ACT系、LTC、DASH、DCR、SC... 多链多币种一站式管理，对“多个钱包来回切换”说不。',
            productT2: '无忧存储，安全可靠',
            productP2: 'PBKDF2加密算法、两步授权验证、反钓鱼系统设计、恶意地址库过滤，基于Sidechains/relays的跨链技术。',
            productT3: '钱包生态，XToken即所有',
            productP3: '共享挖链WT体系，行为即挖矿 <br> 理财+糖果+资讯+行情+IM，钱包生态，告别在钱包、<br>TELEGRAM、行情、资讯间频繁切换。',
            collT: '合作媒体',
            contact: '联系我们',
            watch: '官方微信:  XToken01',
            qq: '官方QQ群:  836519064'
          },
          en: {
            home: 'XToken - multi_chain asset management <br> and decentralized wallet',
            homeP: '',
            homeBtn: 'Download',
            productT1: 'One-stop multi-chain asset management',
            productP1: ' BTC(and its forked tokens)、ETH、ACT、LTC、DASH、<br>DCR、SC…<br>One-stop multi-chain asset management, Say no to “Switch back and forth between multiple wallets”.',
            productT2: 'One-stop multi-chain asset management',
            productP2: 'PBKDF2 Encryption Algorithm、Two-step<br>authorization verification、Anti-phishing<br>system、Malicious address filtering、Cross-<br>chain technology based on Sidechains/relays.',
            productT3: 'The wallet ecological, XToken<br>is all',
            productP3: 'Shared Walian WT system, acting is mining.<br>XToken Eco: Asset management + Candy + News<br>+ Market + IM, Say goodbye to the cumbersome<br>switch between Wallet、Telegram、News.',
            collT: 'Partners',
            contact: 'Contact us',
            watch: 'Wechat:  XToken01',
            qq: 'QQ:  836519064'
          }
        },
        currText: {},
        isWechatShow: false,
        isQQshow: false,
        timer: '',
        isStop: false
      };
    },
    computed: {
      ...mapState(['isEnglish'])
    },
    watch: {
      isEnglish(val){
        this.currText = this.allText[val];
      }
    },
    methods: {
      getClientHeight() {
        let clientHeight = 0;
        if (document.body.clientHeight && document.documentElement.clientHeight) {
          clientHeight = (document.body.clientHeight < document.documentElement.clientHeight)
            ? document.body.clientHeight
            : document.documentElement.clientHeight;
        } else {
          clientHeight = (document.body.clientHeight > document.documentElement.clientHeight)
            ? document.body.clientHeight
            : document.documentElement.clientHeight;
        }
        return clientHeight - 80;
        // return 974;
      },
      handleScroll() {
        var _height = this.getClientHeight() / 2;
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop > 80) {
          this.$store.commit('changeOpacity', true);
        } else {
          this.$store.commit('changeOpacity', false);
        }
        var anchor0, anchor1, anchor2, anchor3, footer;
        anchor0 = document.querySelector('#anchor0').offsetTop;
        anchor1 = document.querySelector('#anchor1').offsetTop;
        anchor2 = document.querySelector('#anchor2').offsetTop;
        anchor3 = document.querySelector('#anchor3').offsetTop;
        footer = document.querySelector('#footer').offsetTop;
        if (scrollTop > 0) {
          this.activeInd = 0;
        }
        if (anchor1 - scrollTop <= _height) {
          this.activeInd = 1;
        }
        if (anchor2 + footer - scrollTop <= _height) {
          this.activeInd = 2;
        }
        if (anchor3  - scrollTop <= _height) {
          this.activeInd = 3;
        }
        this.bus.$emit('active', this.activeInd);
      },
      stopScrollAnimate() {
        if (!this.isStop) {
          clearInterval(this.timer);
          window.removeEventListener('scroll', this.stopScrollAnimate);
        }
      }
    },
    mounted() {
      this.bus.$on('currIndex', (index) => {
        if (index === 'returnTops') {
          //回到顶部
          if(this.$route.path === '/'){
            this.bus.$emit('active', 0);
            this.bus.$emit('currIndex', 0);
          }
          this.timer = setInterval(() => {
            window.addEventListener('scroll', this.stopScrollAnimate);
            var osTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            var ispeed = Math.floor(-osTop / 7);
            document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
            if(osTop <= 0) {
              clearInterval(this.timer);
            }
            this.isStop = true
          },1)
        } else {
          //定位
          var anchor = this.$el.querySelector('#anchor' + index);
          var footer = this.$el.querySelector('#footer');
          // console.log('index', anchor.offsetTop, footer.offsetTop);
          if(index === 2) {
              document.documentElement.scrollTop = document.body.scrollTop = anchor.offsetTop + footer.offsetTop/2;
              return ;
          }
          document.documentElement.scrollTop = document.body.scrollTop = anchor.offsetTop;
        }
      });
      this.$nextTick(() => {
        window.addEventListener('scroll', this.handleScroll);
      });
    },
    created() {
      this.currText = this.allText[this.isEnglish];
      this.activeInd = this.$route.query.activeInd || 0;
      this.$nextTick(() => {
        this.bus.$emit('active', this.activeInd);
        this.bus.$emit('currIndex', this.activeInd);
      });
    },
    beforeDestroy(){
      window.removeEventListener('scroll', this.handleScroll);
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
