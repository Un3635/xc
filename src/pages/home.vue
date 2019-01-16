<template>
  <div class="home">
    <div class="banner">
      <swiper class="home-ban-roll" :options="swiperOptionWeb">
        <swiper-slide v-for="item,index in webBannerList" :key="index">
          <img class="img" :src="item.src" />
        </swiper-slide>
      </swiper>
      <div class="swiper-pagination-web" slot="pagination"></div>
    </div>
    <div class="wap-banner">
      <swiper class="home-ban-roll" :options="swiperOption">
        <swiper-slide v-for="item,index in bannerList" :key="index">
          <img class="img" :src="item.src" />
        </swiper-slide>
      </swiper>
      <div class="swiper-pagination" slot="pagination"></div>
    </div>
    <div class="introduce">
      <img class="title" src="~@/assets/images/home/tit1-en.png"/>
      <div class="content">
        <!--<p class="txt"><span>Thunder</span> Kung Fu Academy is a school integrating the Chinese traditional art and culture with Kungfu. It has two branch schools   located in Fremont city, San Francisco Bay area, California and Dublin city respectively.</p>-->
        <!--<p class="txt"><span>We</span> share our enthusiasm for martial arts and traditional arts and culture and believe the martial arts can change our lives. Your efforts will be recognized, and your milestone achievements will be celebrated.</p>-->
        <!--<p class="txt"><span>We</span> have 2000-square-feet air conditioned training ground for each training hall, and authentic Chinese Kungfu, dragon-lion dance, Tai Ji and Qigong, free combat for you to choose. We believe not only can the Kungfu and dragon-lion dance be seen in movies, but also you can in our school have fun viewing our most incisive and vivid performance of Kungfu Art. By practicing martial arts, Kungfu spirit, and dragon-lion dance, you will gain self-confidence, build up a good physique, become upright, strive to improve yourself constantly, value the morality and righteousness, be self-disciplined, and have good and modest manners.</p>-->
        <!--<p class="txt"><span>Our</span> school initiates characteristic all-round teaching system with courses available in the whole year, including Shaolin Kung Fu, self-defense and protection techniques, Qigong, weapons, Tai Ji, free combat, martial arts, free sparring, traditional Kungfu, internal Kung Fu, external Kung Fu, dragon-lion dance, etc. We also elaborately developed a set of courses specially designed for children of 4-16 years old, which are beneficial for them to be physically stronger, have better body coordination, flexibility, and gain speed and strength, in addition, the physical training can help to increase self-confidence, inspire wisdom, cultivate self-discipline, and form good character.</p>-->
        <p class="txt"><span>Thunder</span>Kung Fu Academy is a place that combines Chinese traditional art culture and Kung Fu.  We offer classes in authentic Chinese Kung Fu, Dragon-Lion Dance, Tai Chi & Qigong, and Sanda (Chinese Kick Boxing) at both of our branches.  Our training halls boasts over 2,000 square feet of training space and is equipped with air conditioning, training weapons, and safety equipment.  We are proudly located in Fremont, CA and Dublin, CA in the San Francisco Bay Area. </p>
        <p class="txt"><span>We</span>believe in sharing our passion for martial arts and traditional art culture and feel that martial arts changes our lives for the better.  The discipline recognizes your efforts and celebrates achievements.  Here at Thunder Kung Fu Academy, we can show you how fun martial arts is and that Kung Fu and Lion Dance aren’t only seen in action movies. </p>
        <p class="txt"><span>By</span> practicing marital arts, you can increase your self-confidence, physical fitness, integrity, self-improvement, self-discipline, and courtesy.  All of our masters at the Academy believe in creating a unique, well-rounded, teaching system.  We offer classes year-round in additional disciplines such as Shaolin Kung Fu, Self-Defense, Weapons, Foreign Kung Fu, Tumbling and Aerial training.</p>
        <p class="txt"><span>We</span> have carefully developed a set of courses for children ages 4-16 to help<br/>
          <em>- increase physical strength</em>
          <em>- enhance coordination, flexibility, and speed</em>
          <em>- encourage self confidence</em>
          <em>- shape discipline</em>
          <em>- build character</em>
        <p class="txt"><span>The</span>real world is full of work, school, and home stresses which in turn, leads to heavy, internal pressure, causing damage to our bodies.  Traditional Kung Fu, Tai Chi, and Qigong promotes blood circulation and the long-term practice helps to open your mind, feel energetic, and be happy.</p>
        <p class="txt"><span>The</span>origin of our name determines the direction of our path and ultimately, our future.  “Thunder” in Chinese, is the homonym of “Shangde” which means morality; what to learn first, what to do first.  Our doors opened to the public in June of 2015.  Besides our mission of promoting Chinese Kung Fu, we strive to further build a bridge of cultural understanding, encourage health and well-being, and shape to a brighter future for all.</p>

      </div>
    </div>
    <div class="home-culture">
      <div class="content">
        <p class="txt" v-for="item,index in txtData.culture[language]" v-html="item"></p>
      </div>
    </div>
    <div class="course">
      <img class="title" src="~@/assets/images/home/tit2-en.png"/>
      <div class="course-roll">
        <swiper class="course-roll-in" :options="swiperOption2">
          <swiper-slide v-for="item,index in txtData.course" :key="index">
            <p class="tit" v-html="item.tit[language]"></p>
            <div class="txt-box">
              <p class="txt" v-html="item.txt[language]"></p>
            </div>
          </swiper-slide>
        </swiper>
        <div class="swiper-pagination2" slot="pagination"></div>
      </div>
    </div>
    <div class="moment">
      <img class="title" src="~@/assets/images/home/tit3-en.png"/>
      <div class="content">
        <swiper class="home-moment-roll" :options="swiperOption3">
          <swiper-slide v-for="item,index in momentList" :key="index">
            <img class="img" :src="item.src" />
          </swiper-slide>
        </swiper>
        <div class="swiper-pagination3" slot="pagination"></div>
      </div>
      <img class="pic" src="~@/assets/images/home/moment-bottom.png"/>
    </div>
    <div class="home-team">
      <div class="content" >
        <p v-html="txtData.team[language]"></p>
      </div>
    </div>
    <div class="contact">
      <img class="title" src="~@/assets/images/home/tit4-en.png"/>
      <ul class="item-list">
        <li class="item">
          <div class="content">
            <p class="tit" v-html="txtData.contact[0].title[language]"></p>
            <p class="txt" v-html="txtData.contact[0].txt[language]"></p>
          </div>
          <img class="icon" src="~@/assets/images/home/contact-icon1.png"/>
        </li>
        <li class="item">
          <div class="content">
            <p class="tit" v-html="txtData.contact[1].title[language]"></p>
            <p class="txt" v-html="txtData.contact[1].txt[language]"></p>
          </div>
          <img class="icon" src="~@/assets/images/home/contact-icon2.png"/>
        </li>
        <li class="item">
          <div class="content">
            <p class="tit" v-html="txtData.contact[2].title[language]"></p>
            <p class="txt" v-html="txtData.contact[2].txt[language]"></p>
          </div>
          <img class="icon" src="~@/assets/images/home/contact-icon3.png"/>
        </li>
      </ul>
      <div class="sendInfo">
        <div class="input-box">
          <div class="info-item">
            <input class="item" type="text"
                   :placeholder="language === 'cn' ? '姓名': 'Please input your name'"
                   @input="checkInfo"
                   v-model="paramsData.name"/>
            <p v-if="!checkItem.name">*Cannot be empty</p>
          </div>
          <div class="info-item">
            <input class="item" type="text"
                   :placeholder="language === 'cn' ? '电话': 'Please input your phone'"
                   v-model="paramsData.tel"
                   @input="checkInfo"/>
            <p v-if="!checkItem.phone">*Cannot be empty</p>
          </div>
          <div class="info-item">
            <input class="item" type="text"
                   :placeholder="language === 'cn' ? '邮箱': 'Please input your email'"
                   v-model="paramsData.email"
                   @input="checkInfo"/>
            <p v-if="!checkItem.email">*Cannot be empty</p>
          </div>
        </div>
        <textarea class="info-text"
                  :placeholder="language === 'cn' ? '留言': 'Please input message'"
                  maxlength="300"
                  v-model="paramsData.content"></textarea>
        <div class="submitBtn" @click="submitInfo" v-if="infoPassed">{{btnLoading ? "Loading..." : "Submit"}}</div>
        <div class="submitBtn" @click="submitInfo" v-else style="background:#8aa7ad;color:#ddd;">Submit</div>
        <pop/>
      </div>
    </div>
    <div class="bot-img"></div>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import TxtData from '../data/home_data'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import axios from 'axios'
import Pop from '../components/pop/pop'
import {mapState,mapGetters} from 'vuex'
export default {
  name: 'home',
  components: {
    swiper,
    swiperSlide,
    Pop
  },
  data () {
    return {
      txtData:'',
      swiperOptionWeb: {
        autoplay: true,
        speed: 1200,
        loop: true,
        pagination: {
          el: '.swiper-pagination-web'
        }
      },
      swiperOption: {
        autoplay: true,
        speed: 1200,
        loop: true,
        pagination: {
          el: '.swiper-pagination'
        }
      },
      swiperOption2: {
        autoplay: true,
        speed: 2000,
        loop: true,
        pagination: {
          el: '.swiper-pagination2'
        }
      },
      swiperOption3: {
        autoplay: true,
        speed: 2000,
        loop: true,
        pagination: {
          el: '.swiper-pagination3'
        }
      },
      webBannerList:[
        {src:require('../assets/images/home/web-ban2.jpg')},
        {src:require('../assets/images/home/web-ban1.jpg')},
        {src:require('../assets/images/home/web-ban3.jpg')},
        {src:require('../assets/images/home/web-ban4.jpg')},
        {src:require('../assets/images/home/web-ban5.jpg')}
      ],
      bannerList:[
         {src:require('../assets/images/home/web-ban2.jpg')},
         {src:require('../assets/images/home/web-ban1.jpg')},
         {src:require('../assets/images/home/web-ban3.jpg')},
         {src:require('../assets/images/home/web-ban4.jpg')},
         {src:require('../assets/images/home/web-ban5.jpg')}
        // {src:require('../assets/images/home/home-ban1.jpg')},
        // {src:require('../assets/images/home/home-ban2.jpg')},
        // {src:require('../assets/images/home/home-ban3.jpg')}

      ],
      momentList:[
        {src:require('../assets/images/home/moment1.png')},
        {src:require('../assets/images/home/moment2.png')},
        {src:require('../assets/images/home/moment3.png')}
      ],
      btnLoading:false,
      infoPassed:false,
      checkItem:{
        name:true,
        phone:true,
        email:true
      },
      paramsData:{
        'name': '',
        'tel':'',
        'email':'',
        'content':''
      }
    }
  },
  created(){
    this.txtData = TxtData;
  },
  computed: {
    ...mapState({
      language:'isEnglish'
    }),
    ...mapGetters({
      popShow:'popShow'
    })
  },
  methods:{
    submitInfo(){
      if(this.infoPassed){
        this.btnLoading = true;
        let vm = this;
        this.$ajax({
          url: 'http://18.222.50.135:8099/api/mail/send',
          method: 'post',
          data: vm.paramsData,
          transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
          }],
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
          .then(res => {
            this.$store.commit("changePopStatus",'Submitted successfully !')
            this.btnLoading = false;
            this.paramsData={
              'name': '',
              'tel':'',
              'email':'',
              'content':''
            }
          })
          .catch(err => {
            this.$store.commit("changePopStatus",'Submission failed, please resubmit !');
            this.btnLoading = false;
            console.log(err);
          })
      } else{
        this.checkInfo();
      }

    },
    checkInfo(){
      if(this.paramsData.name !== ''){
        this.checkItem.name = true;
      } else {
        this.checkItem.name =false;
      }
      if(this.paramsData.tel !== ''){
        this.checkItem.phone =true;
      } else {
        this.checkItem.phone =false;
      }
      if(this.paramsData.email !== ''){
        this.checkItem.email =true;
      } else {
        this.checkItem.email =false;
      }
      if(this.checkItem.name && this.checkItem.phone && this.checkItem.email){
        this.infoPassed = true;
      } else {
        this.infoPassed = false;
      }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import '~@/assets/css/public.scss';
  .home{
    @include home-wrap;
    .introduce{
      width:100%;
      text-align:center;
      margin:90px auto 88px;
      .title{
        width:548px;
        height:87px;
      }
      .content{
        width:1000px;
        margin:30px auto 0;
        padding-right:10px;
        /*height:330px;*/
        /*overflow-y:auto;*/
        .txt{
          padding-top:12px;
          color: rgba(137, 137, 137, 0.9);
          text-align:justify;
          text-justify:inter-ideograph;
          /*font-size:16px;*/
          /*font-family: "DIN Next W01 Light";*/
          font-family: DINNeuzeitGroteskLTW01BdCn, Arial;
          font-weight:200;
          span{
            font-weight:600;
            color:#7e9da1;
            padding-right:10px;
          }
          em{
            display:inline-block;
            font-style:normal;
            padding-right:15px;
            /*text-indent:2em;*/
            font-weight:400;
            color: rgba(137, 137, 137, 0.76);
          }
        }
      }
    }
    .home-culture{
      margin:100px auto 0;
      width:1200px;
      height:331px;
      padding-top:260px;
      background:url("~@/assets/images/home/culture-bg.png") 50% 0% no-repeat;
      background-size:1200px 591px;
      text-align:left;
      .content{
        padding:10px 30px 20px 100px;
        width:900px;
        height:252px;
        overflow-y:auto;
        .txt{
          width:100%;
          text-indent:2em;
          color: #d6d6d6;
          padding-top:8px;
          text-align:justify;
          -ms-text-justify: inter-ideograph;
          text-justify: inter-ideograph;
        }
      }
    }
    .course{
      width:100%;
      margin:80px auto 0;
      text-align:center;
      .title{
        width:1200px;
        margin:0 auto 10px;
      }
      .course-roll{
        margin:0 auto;
        padding-bottom: 150px;
        padding-top:40px;
        width:1200px;
        height:206px;
        background:url("~@/assets/images/home/course-frame.png") 50% 0% no-repeat;
        background-size:1200px 266px;
        .course-roll-in{
          width:590px;
          margin:0 20px 0 430px;
          text-align:left;
          .tit{
            margin-left:10px;
            font-size:20px;
            color: rgba(47, 47, 47, 0.87);
            line-height:36px;
            font-weight:600;
            display: inline-block;
            border-bottom:2px solid rgba(83, 123, 129, 0.41);
            margin-bottom: 14px;
          }
          .txt-box{
            height:130px;
            padding:0 10px;
            overflow-y:auto;
            .txt{
              color: #737373;
              text-align:justify;
              text-justify: inter-ideograph;
              word-break: break-all;
            }

          }
        }

      }
    }
    .moment{
      width:1200px;
      margin:0 auto;
      text-align:center;
      .title{
        width:1000px;
        margin:0 auto;
      }
      .content{
        position:relative;
        width:1060px;
        margin:53px auto 0;
        .home-moment-roll{
          width:100%;
        }
      }
      .pic{
        margin-top:50px;
        width:100%;
      }
    }
    .home-team{
      margin:129px auto 0;
      padding-top:140px;
      width:1200px;
      height:251px;
      background:url("~@/assets/images/home/team-bg.png") 50% 0% no-repeat;
      background-size:1200px 381px;
      text-align:left;
      .content{
        padding-left:100px;
        width:740px;
        max-height:195px;
        overflow-y:auto;
        padding-right:10px;
        p{
          text-align: justify;
          text-justify: inter-ideograph;
          color:#fffefe;
        }
      }
    }
    .contact{
      width:1200px;
      margin:92px auto 0;
      /*padding-bottom:50px;*/
      .title{
        width:100%;
        margin-bottom: 55px;
      }
      .item-list{
        width:1000px;
        margin:0 auto 45px;
        @include clearfix;
        .item{
          float:left;
          width:290px;
          position: relative;
          margin-right:64px;
          transition:0.3s all ease-in;
          .content{
            margin-top:54px;
            /*width:296px;*/
            height:170px;
            border:2px solid #4f737a;
            text-align:center;
            .tit{
              padding:55px 0 17px;
              color:#62615e;
              font-size:20px;
              font-weight:600;
            }
            .txt{
              color: #7f7f7f;
              font-size:15px;
              line-height:21px;
              font-family:DINNextW01Light, Arial;
            }
          }
          .icon{
            width:100px;
            height:100px;
            position:absolute;
            top:0;
            left:98px;
          }
          &:last-of-type{
            margin-right:0;
          }
          &:hover{
            .content{
              /*background:#3a696f;*/
              background:url("~@/assets/images/home/contact-txt.jpg") 50% 50% no-repeat;
              background-size:cover;
              .tit{
                color:#fff;
              }
              .txt{
                color:#fff;
              }
            }
          }
        }
      }
      .sendInfo{
        overflow:hidden;
        position:relative;
        width:1000px;
        height:316px;
        margin:0 auto;
        text-align:center;
        @include clearfix;
        .input-box{
          float:right;
          width:330px;
        }
        .info-item{
          position:relative;
          width:100%;
          height:35px;
          margin-bottom:24px;
          &:last-of-type{
            margin-right:0;
          }
          .item{
            padding-left:10px;
            width:310px;
            height:33px;
            border:1px solid #537b81;
            font-size:16px;
            line-height:30px;
            color:#555;
            background-color:transparent;
            &::-webkit-input-placeholder{
              color:#c2beba;
              font-family: DINNextW01Light,Arial;
            }
            &:focus,&:active,&:hover{
              background:#4f737a94;
              border:1px solid #353f37;
              color:#fff;
              &::-webkit-input-placeholder{
                color:#eee;
              }
            }
            &:last-of-type{
              margin-right:0;
            }
          }
          p{
            position:absolute;
            font-size:14px;
            color:#921000;
            top:36px;
            left:0;
            font-family:DINNextW01Light, Arial;
          }
        }
        .info-text{
          float:left;
          width:640px;
          height:152px;
          font-size:16px;
          line-height:24px;
          text-indent:1em;
          color:#555;
          resize:none;
          background-color:transparent;
          border:1px solid #3d6a6e;
          &::-webkit-input-placeholder{
            color:#c2beba;
            font-size:16px;
            line-height:32px;
            font-family: DINNextW01Light,Arial;
          }
        }
        .submitBtn{
          overflow:hidden;
          width:200px;
          height:40px;
          line-height:40px;
          margin:200px auto 0;
          color:#fff;
          background:#4f737a;
          cursor:pointer;
          border-radius:8px;
          font-family: DINNextW01Light,Arial;
          font-weight:700;
        }
      }
    }
    .bot-img{
      @include botImg;
    }
  }
  @media screen and (max-width: 918px) {
    .home{
      @include wap-wrap;
      .introduce{
        width:100%;
        margin:0.9rem auto 0.88rem;
        font-size:0;
        .title{
          width:5.48rem;
          height:0.87rem;
        }
        .content{
          width:10rem;
          margin:0.3rem auto 0;
          /*max-height:5.2rem;*/
          max-height:4rem;
          overflow-y:auto;
          .txt{
            padding-top:0.15rem;
          }
        }
      }
      .home-culture{
        margin:1rem auto 0;
        width:12rem;
        height:3.41rem;
        padding-top:2.5rem;
        background:url("~@/assets/images/home/culture-bg.png") 50% 0% no-repeat;
        background-size:12rem 5.91rem;
        font-size:0;
        .content{
          padding:0 0.3rem 0 1rem;
          width:9rem;
          height:2.67rem;
          .txt{
            width:100%;
            text-indent:2em;
            padding-top:0.08rem;
          }
        }
      }
      .course{
        width:100%;
        margin:0.8rem auto 0;
        font-size:0;
        .title{
          width:12rem;
          margin:0 auto 0.1rem;
        }
        .course-roll{
          margin:0 auto;
          padding-bottom: 1.5rem;
          padding-top:0.4rem;
          width:12rem;
          height:2.06rem;
          background:url("~@/assets/images/home/course-frame.png") 50% 0% no-repeat;
          background-size:12rem 2.66rem;
          .course-roll-in{
            width:5.9rem;
            margin:0 0.2rem 0 4.3rem;
            text-align:left;
            .tit{
              margin-left:0.1rem;
              font-size:0.2rem;
              color: rgba(47, 47, 47, 0.79);
              line-height:0.36rem;
              font-weight:600;
              display: inline-block;
              border-bottom:0.02rem solid rgba(83, 123, 129, 0.41);
              margin-bottom: 0.14rem;
            }
            .txt-box{
              height:1.3rem;
              padding:0 0.1rem;
              overflow-y:auto;
              .txt{
                color:#898989;
                line-height:0.27rem;
                text-align:justify;
                text-justify: inter-ideograph;
              }
            }
          }
        }
      }
      .moment{
        width:12rem;
        margin:0 auto;
        text-align:center;
        .title{
          width:10rem;
          margin:0 auto;
        }
        .content{
          position:relative;
          width:10.6rem;
          margin:0.53rem auto 0;
          .home-moment-roll{
            width:100%;
          }
        }
        .pic{
          margin-top:0.5rem;
          width:100%;
        }
      }
      .home-team{
        margin:1rem auto 0;
        padding-top:1.4rem;
        width:12rem;
        height:2.51rem;
        background:url("~@/assets/images/home/team-bg.png") 50% 0% no-repeat;
        background-size:12rem 3.81rem;
        text-align:left;
        .content{
          padding-left:1rem;
          width:7.4rem;
          max-height:1.84rem;
          overflow-y:auto;
          padding-right:0.1rem;
          p{
            text-align: justify;
            text-justify: inter-ideograph;
            font-size:0.18rem;
            line-height:0.32rem;
            color:#fffefe;
          }
        }
      }
      .contact{
        width:12rem;
        margin:0.92rem auto 0;
        padding-bottom:0.5rem;
        font-size:0;
        .title{
          margin-bottom: 0.5rem;
        }
        .item-list{
          width:10rem;
          margin-bottom:0.7rem;
          .item{
            width:3.12rem;
            margin-right:0.29rem;
            .content{
              margin-top:0.54rem;
              width:3.08rem;
              height:2.48rem;
              border:0.02px solid #4f737a;
              .tit{
                padding:0.75rem 0 0.17rem;
                font-size:0.2rem;
              }
              .txt{
                font-size:0.16rem;
                line-height:0.28rem;
                width:100%;
                word-wrap: break-word;
              }
            }
            .icon{
              width:1.15rem;
              height:1.15rem;
              left:1.04rem;
            }
          }
        }
        .sendInfo{
          overflow: visible;
          width:10rem;
          height:3.16rem;
          margin:0 auto;
          text-align:center;
          .input-box{
            @include clearfix;
            float:none;
            width:10rem;
            margin:0 auto 0.35rem;
          }
          .info-item{
            float:left;
            position:relative;
            width:3.1rem;
            height:0.6rem;
            margin:0 0.26rem 0 0;
            &:last-of-type{
              margin-right:0;
            }
            .item{
              vertical-align:top;
              padding-left:0.1rem;
              width:100%;
              font-size:0.18rem;
              height:0.6rem;
              border:0.01rem solid #747474;
              line-height:0.6rem;
              color:#555;
              background-color:transparent;
              &::-webkit-input-placeholder{
                color:#c2beba;
                font-size:0.16rem;
                line-height:0.6rem;
              }
              &:focus,&:active,&:hover{
                background-color:transparent;
                border:0.01rem solid #4f737a;
                color:#555;
                &::-webkit-input-placeholder{
                  color:#ddd;
                }
              }
            }
            p{
              position:absolute;
              color:#921000;
              top:0.65rem;
              left:0;
              font-size:0.12rem;
              line-height:0.28rem;
              font-weight: 200;
              font-family: DINNextW01Light;
            }
          }
          .info-text{
            overflow:visible;
            float:none;
            margin:0 auto;
            width:9.94rem;
            font-size:0.18rem;
            height:1.9rem;
            text-indent:1em;
            color:#555;
            resize:none;
            background-color:transparent;
            &::-webkit-input-placeholder{
              color:#c2beba;
              line-height:0.36rem;
              font-size:0.16rem;
            }
          }
          .submitBtn{
            display:inline-block;
            width:2rem;
            height:0.5rem;
            font-size:0.2rem;
            line-height:0.58rem;
            margin:0.2rem auto 0;
            border-radius:0.08rem;
          }
        }
      }
      .bot-img{
        @include wap-botImg;
      }
    }
  }





</style>
