<template>
  <div class="download-wrap">
    <div>
      <img src="../assets/img/downLoadApp/logo@2x.jpg" class="imglogo">
    </div>
    <div class="download-content">
      <span class="title content-title">{{data.title}}</span>
     <div>
        <button class="btn ios"  @click="download('ios')">{{data.ios}}</button>
     </div>
     <div>
        <button class="btn android" @click="download('android')">{{data.android}}</button>
     </div>
     <div class="hint">{{data.hint}}</div>
    </div>
    <div class="border-1px"></div>
    <div class="course">
      <h2>{{data.course.title}}</h2>
      <div class="split"></div>
      <ul>
        <li v-for="(item, index) in data.course.step" :key="index">
          <span class="title">{{item.title}}</span>
          <div>
            <img :src="item.imgUrl">
          </div>
        </li>
      </ul>
    </div>
    <p class="sweet hint">{{data.sweet}}</p>
    <div :class="{maskPlayer: show}" v-show="show"  @touchmove.stop.prevent="" @click= "show=false">
      <div class="downHint">敬请期待</div>
    </div>
    
  </div>
</template>
<script>
import downLoadData from '../../static/downloadApp.js'
export default {
  data() {
    return {
      data: [],
      show: false
    }
  },
  methods: {
    download(T) {
      if( T === 'ios') {
        window.open('https://www.cw.pub/app.php/610');
        return;
      }
      if(T === 'android') {
        // this.show = true;
        // window.open('http://api.xt.top/apk/xtoken_lastest.apk');
        //  window.open('http://api.xt.top/components/api/apk/xtoken_lastest.apk');
        // window.open('/static/xtoken_lastest.apk');
        //  window.open('https://xtoken.oss-cn-hongkong.aliyuncs.com/xtoken/1040634045861462016.apk?Expires=1852301466&OSSAccessKeyId=LTAIlQ1L6DaY5Sdo&Signature=a2zku93pcSFmbtCq%2Bc8sW%2Fz1bYQ%3D');
         window.open('https://xtoken.oss-cn-hongkong.aliyuncs.com/xtoken/1044928903547715584.apk?Expires=1853325440&OSSAccessKeyId=LTAIlQ1L6DaY5Sdo&Signature=V2DHBPodxobbbKXWEaQkalHWrNo%3D');
        // return;
      }
    }
  },
  created() {
    this.data = downLoadData.data[this.$store.state.isEnglish];
  }
}
</script>
<style lang="scss" scoped>
.download-wrap {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background: #ffffff;
  overflow: auto;
  span {
    display: block;
  }
 
  .download-content {
    margin: 0px 22px;
  }
  .hint {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #FF8000;
    letter-spacing: -0.13px;
    margin-top: 46px;
  }
}
.imglogo {
  width: 76px;
  height: 76px;
  margin: 42px 0px 17px 0px;
}
.content-title {
  margin: 0px 50px 67px 50px;
}
.title {
  font-family: PingFangSC-Regular;
  display: inline-block;
  font-size: 14px;
  color: #333333;
}
.btn {
  font-family: PingFangSC-Semibold;
  border-radius: 100px;
  padding: 11px 59px;
  color: #ffffff;
  margin-bottom: 22px;
  width: 200px;
  font-size: 17px;
  &.ios {
    background: #2790DD;
  }
  &.android {
    background: #28B7A2
  }
}
.course {
  text-align: left;
  h2 {
    position: relative;
    font-family: PingFangSC-Semibold;
    margin: 20px auto 10px;
    font-size: 16px;
    color: #333333;
    letter-spacing: 0.32px;
    margin-top: 20px;
    margin-bottom: 8px;
    text-align: center;
    // &:after {
    //   content: "";
    //   position: absolute;
    //   top: 33px;
    //   left: 47%;
    //   display: inline-block;
    //   width: 26px;
    //   height: 4px;
    //   background: #20A0FF;
    // }
  }
  .split {
    width: 26px;
    height: 4px;
    background: #20A0FF;
    margin: auto;
    margin-bottom: 20px;
  }
  li {
    width: 88%;
    margin: 0px auto 33px;
    .title {
      margin-bottom: 11px;
    }
  }
 
}
.border-1px {
  position : relative;
  margin-top: 63px;
}
.border-1px:after {
  position : absolute;
  content:' ';
  left: 0px;
  bottom: 10px;
  width: 100%;
  border-top: 1px solid #F5F5F5;
}
.sweet {
  margin: 0px 22px 30px 22px;
}
.maskPlayer {
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.7);
}
.downHint {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  padding: 20px 50px;
  border-radius: 8px;
  box-sizing: border-box;
  border: 1px solid #ebeef5;
 
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  transition: opacity .3s,transform .3s,left .3s,right .3s,top .4s,bottom .3s;
  overflow: hidden;
}

</style>

