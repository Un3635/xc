<template>
    <div class="contact">
       <div class="banner"></div>
      <div class="motto">
        <div class="left" v-html="txtData.motto[language]"></div>
        <div class="right"><a href="#contact-form">{{language === "cn" ? 'Free Trail': 'Free Trail'}}</a></div>
      </div>
      <div class="school-tit">
        <div class="tit">
          <img class="deco" src="~@/assets/images/public/tit_deco_left.jpg"/>
          <span>{{language === "cn" ? '学院信息': 'Academy Information'}}</span>
          <img class="deco" src="~@/assets/images/public/tit_deco_right.jpg"/>
          <img class="circle" src="~@/assets/images/public/tit_deco_circle.png"/>
        </div>
      </div>
      <div class="school">
        <div class="map" id="map-canvas"></div>
        <ul class="info">
          <li class="item">
            <div class="left">
              <img src="~@/assets/images/contact/icon_01.png"/>
            </div>
            <div class="right">
              <div class="name">phone</div>
              <div class="text">408-508-9962,    925-819-0893</div>
            </div>
          </li>
          <li class="item">
            <div class="left">
              <img src="~@/assets/images/contact/icon_02.png"/>
            </div>
            <div class="right">
              <div class="name">website</div>
              <div class="text">thunderkungfu.com <br/>thunderkungfuacademy.com</div>
            </div>
          </li>
          <li class="item">
            <div class="left">
              <img src="~@/assets/images/contact/icon_03.png"/>
            </div>
            <div class="right">
              <div class="name">email</div>
              <div class="text">thunderkungfu@gmail.com<br/>thunderkungfuacademy@gmail.com</div>
            </div>
          </li>
          <li class="item">
            <div class="left">
              <img src="~@/assets/images/contact/icon_04.png"/>
            </div>
            <div class="right">
              <div class="name">Dublin School</div>
              <div class="text">6735 Sierra Ct, Suite B, Dublin   CA 94568</div>
              <div class="name">Fremont School</div>
              <div class="text">43490 Grimmer Blvd ,Fremont . CA 94538</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="school-tit school-tit2" id="contact-form">
        <div class="tit">
          <img class="deco" src="~@/assets/images/public/tit_deco_left.jpg"/>
          <span>{{language === "cn" ? '联系我们': 'Contact Us'}}</span>
          <img class="deco" src="~@/assets/images/public/tit_deco_right.jpg"/>
          <img class="circle" src="~@/assets/images/public/tit_deco_circle.png"/>
        </div>
      </div>
      <div class="sendInfo">
        <div class="input-box">
          <div class="info-item">
            <input class="item" type="text"
                   :placeholder="language === 'cn' ? '姓名': 'name'"
                   @input="checkInfo"
                   v-model="paramsData.name"/>
            <p v-if="!checkItem.name">* Cannot be empty</p>
          </div>
          <div class="info-item">
            <input class="item" type="text"
                   :placeholder="language === 'cn' ? '电话': 'phone'"
                   v-model="paramsData.tel"
                   @input="checkInfo"/>
            <p v-if="!checkItem.phone">* Cannot be empty</p>
          </div>
          <div class="info-item">
            <input class="item" type="text"
                   :placeholder="language === 'cn' ? '邮箱': 'email'"
                   v-model="paramsData.email"
                   @input="checkInfo"/>
            <p v-if="!checkItem.email">* Cannot be empty</p>
          </div>
        </div>
        <textarea class="info-text"
                  :placeholder="language === 'cn' ? '留言': 'message'"
                  maxlength="300"
                  v-model="paramsData.content"></textarea>
        <div class="submitBtn" @click="submitInfo" v-if="infoPassed">{{btnLoading ? "Loading..." : "Submit"}}</div>
        <div class="submitBtn" @click="submitInfo" v-else style="background:#4d5950;color:#ccc;">Submit</div>
        <pop/>
      </div>
      <div class="bot-img"></div>
    </div>
</template>

<script>
  import Pop from '../components/pop/pop'
  import TxtData from '../data/contact_data'
  import {mapState,mapGetters} from 'vuex'
  export default {
    components:{
      Pop
    },
    data() {
      return {
        btnLoading:false,
        txtData: '',
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
    created() {
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
    methods: {
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
      initMap() {
        let points = [
          new google.maps.LatLng(37.70, -121.91), //dublin
          new google.maps.LatLng(37.51, -121.96), //fremont
        ];
        var myOptions = {
          zoom: 10.2,
          mapTypeControl: false, //不显示地图卫星图切换的控件,
          center: new google.maps.LatLng(37.60, -121.93),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        //添加map
        let gmap = new google.maps.Map(document.getElementById("map-canvas"),
          myOptions);
        let markers = [];
        //添加标注，并将其存入数组marker[]
        for (var i = 0; i < points.length; i++) {
          var gmarker = new google.maps.Marker({
            position: points[i],
            map: gmap
          });
          markers.push(gmarker);
        }
        //两个信息框
        var contentString = '<div id="content">' + '<div id="bodyContent">' + '<p>Dublin School</p>' + '</div>' + '</div>';
        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });
        infowindow.open(gmap, markers[0]);
        var contentString = '<div id="content">' + '<div id="bodyContent">' + '<p>Fremont School</p>' + '</div>' + '</div>';
        var infowindow2 = new google.maps.InfoWindow({
          content: contentString
        });
        infowindow2.open(gmap, markers[1]);
        //调用函数实现功能要求
//         this.setVeiwPort();
      },
      //展示最佳视野的函数
      setVeiwPort() {
        var bounds = new google.maps.LatLngBounds();
        //读取标注点的位置坐标，加入LatLngBounds
        for (var i = 0; i < markers.length; i++) {
          bounds.extend(markers[i].getPosition());
        }
        //调整map，使其适应LatLngBounds,实现展示最佳视野的功能
        gmap.fitBounds(bounds);
      },
    },
    mounted() {
      this.initMap();
    }
  }
</script>

<style scoped lang="scss">
  @import '~@/assets/css/public.scss';
  .contact{
    @include wrap;
    .banner{
      display:none;
      width:100%;
      height:843px;
      background:url("~@/assets/images/contact/ban.png") 50% 50% no-repeat;
    }
    .motto{
      padding-top:200px;
      width:1200px;
      height:191px;
      margin:0 auto 130px;
      background:url("~@/assets/images/contact/frame.png") 50% 100% no-repeat;
      @include clearfix;
      .left{
        float:left;
        width:550px;
        padding-left:190px;
        padding-top:40px;
        font-size:22px;
        line-height:30px;
        /*font-family: "DINNextW01Light";*/
      }
      .right{
        float:right;
        margin:42px 140px 0 0;
        text-align:center;
        font-size:24px;
        height:50px;
        line-height:50px;
        padding:0 40px;
        /*border:1px solid #979289;*/
        border-style:double;
        border-color:#b0ada6;
        cursor:pointer;
        font-family: "宋体","新宋体";
        color:#b0ada6;
        font-weight:600;
        &:hover{
          color:#979289;
          border-color:#979289;
        }
      }
    }
    .school-tit{
      width:1000px;
      margin:0 auto 50px;
      .tit{
        @include title;
        .circle{
          top:22px;
          left:618px;
        }
      }
    }
    .school-tit2{
      .tit{
        .circle{
          left:555px !important;
        }
      }
    }
    .school{
      width:1000px;
      margin:0 auto 135px;
      @include clearfix;
      .map{
        float:left;
        width:498px;
        height:427px;
        background:#fff;
        border:1px solid #979289;
      }
      .info{
        float:left;
        width:465px;
        padding-left:35px;
        .item{
          width:100%;
          margin-bottom:20px;
          @include clearfix;
        }
      }
    }
    .item{
      .left{
        float:left;
        width:64px;
        img{
          width:100%;
          vertical-align:middle;
        }
      }
      .right{
        float:right;
        width:390px;
        display:inline-block;
        .name{
          font-size:20px;
          line-height:28px;
          color:#343f37;
        }
        .text{
          font-size:16px;
          line-height:28px;
          font-weight:200;
          color:#6f726c;
          font-family: DINNextW01Light;
        }
      }
    }
    .sendInfo{
      position:relative;
      width:1000px;
      height:316px;
      margin:0 auto;
      text-align:center;
      .input-box{
        @include clearfix;
        width:1000px;
        margin:0 auto 30px;
      }
      .info-item{
        float:left;
        position:relative;
        width:316px;
        height:35px;
        margin-right:20px;
        &:last-of-type{
          margin-right:0;
        }
        .item{
          padding-left:10px;
          width:100%;
          height:33px;
          border:1px solid #747474;
          font-size:16px;
          line-height:30px;
          color:#555;
          background-color:transparent;
          &::-webkit-input-placeholder{
            color:#c2beba;
            font-size:16px;
          }
          &:focus,&:active,&:hover{
            background:#717f74;
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
          font-size:12px;
          color:#921000;
          top:36px;
          left:0;
        }
      }
      .info-text{
        margin:0 auto;
        padding:10px;
        width:980px;
        height:170px;
        font-size:16px;
        line-height:24px;
        text-indent:1em;
        color:#555;
        resize:none;
        background-color:transparent;
        &::-webkit-input-placeholder{
          color:#c2beba;
          font-size:16px;
          line-height:32px;
          font-family: DINNextW01Light;
        }
      }
      .submitBtn{
        width:200px;
        height:40px;
        font-size:18px;
        line-height:40px;
        margin:40px auto 0;
        color:#fff;
        background:#353f37;
        cursor:pointer;
        font-family: DINNextW01Light;
      }
    }
    .bot-img{
      @include botImg;
    }
  }
  @media screen and (max-width: 918px) {
    .contact{
      @include wap-wrap;
      .banner{
        display:none;
        width:100%;
        height:5.27rem;
        background:url("~@/assets/images/contact/ban.png") 50% 50% no-repeat;
        background-size:12rem 5.27rem;
      }
      .motto{
        padding-top:2rem;
        width:12rem;
        height:1.91rem;
        margin:0 auto 1.3rem;
        // background:url("~@/assets/images/contact/frame.png") 50% 50% no-repeat;
        background-size:12rem 1.91rem;
        @include clearfix;
        .left{
          float:left;
          width:5.8rem;
          padding-left:1.9rem;
          padding-top:0.28rem;
          font-size:0.2rem;
          line-height:0.3rem;
        }
        .right{
          float:right;
          margin:0.42rem 1.4rem 0 0;
          text-align:center;
          font-size:0.24rem;
          height:0.5rem;
          line-height:0.5rem;
          padding:0 0.4rem;
          /*border:1px solid #979289;*/
          border-style:double;
          border-width: 0.01rem;
          border-color:#b0ada6;
          cursor:pointer;
          color:#b0ada6;
          font-weight:600;
        }
      }
      .school-tit{
        width:10rem;
        margin:0 auto 0.5rem;
        .tit{
          @include wap-title;
          .circle{
            top:0.22rem;
            left:6.2rem;
          }
        }
      }
      .school-tit2{
        .tit{
          .circle{
            left:5.6rem !important;
          }
        }
      }
      .school{
        width:10rem;
        margin:0 auto 1.35rem;
        @include clearfix;
        .map{
          float:left;
          width:4.98rem;
          height:5.27rem;
          background:#fff;
          border:0.01rem solid #979289;
        }
        .info{
          float:left;
          width:4.65rem;
          padding-left:0.25rem;
          .item{
            width:100%;
            margin-bottom:0.2rem;
            @include clearfix;
          }
        }
      }
      .item{
        .left{
          float:left;
          width:0.64rem;
          img{
            width:100%;
            height:0.59rem;
            vertical-align:middle;
          }
        }
        .right{
          float:right;
          width:3.7rem;
          display:inline-block;
          .name{
            font-size:0.16rem;
            line-height:0.28rem;
            color:#343f37;
          }
          .text{
            font-size:0.16rem;
            line-height:0.28rem;
            font-weight:200;
            color:#6f726c;
          }
        }
      }
      .sendInfo{
        width:10rem;
        height:3.16rem;
        margin:0 auto;
        text-align:center;
        .input-box{
          @include clearfix;
          width:10rem;
          margin:0 auto 0.5rem;
        }
        .info-item{
          float:left;
          position:relative;
          width:3.1rem;
          height:0.6rem;
          margin-right:0.26rem;
          &:last-of-type{
            margin-right:0;
          }
          .item{
            vertical-align:top;
            padding-left:0.1rem;
            width:100%;
            height:0.6rem;
            border:1px solid #747474;
            font-size:0.16rem;
            line-height:0.6rem;
            color:#555;
            background-color:transparent;
            &::-webkit-input-placeholder{
              font-size:0.16rem;
            }
          }
          p{
            position:absolute;
            font-size:0.12rem;
            color:#921000;
            top:0.7rem;
            left:0;
          }
        }
        .info-text{
          padding:0.1rem;
          margin:0 auto;
          width:9.8rem;
          height:1.7rem;
          font-size:0.16rem;
          line-height:0.28rem;
          text-indent:1em;
          color:#555;
          resize:none;
          background-color:transparent;
          &::-webkit-input-placeholder{
            color:#c2beba;
            font-size:0.16rem;
            line-height:0.36rem;
          }
        }
        .submitBtn{
          vertical-align:top;
          display:inline-block;
          width:2rem;
          height:0.5rem;
          font-size:0.18rem;
          line-height:0.5rem;
          margin:0.1rem auto 0;
          color:#ccc;
          background:#4d5950;
          &:hover{
            color:#fff;
            background:#353f37;
          }
        }
      }
      .bot-img{
        @include wap-botImg;
      }
    }
  }
</style>
