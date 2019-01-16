<template>
  <div class="c-homelecturer">
    <div class="c-homelecturer-title">合作讲师</div>
    <div class="c-homelecturer-list clearfix">
      <el-carousel height="560px" :indicator-position="guestlength==1?'none':'outside'" :interval='20000' arrow="never">
        <el-carousel-item v-for="(i,idx) in guestLists" :key="idx" class="c-homelecturers">
          <div class="c-homelecturer-item" v-for="(is,idxs) in i" :key="idxs">
            <img :src="is.photo" :alt="is.name" class="picture">
            <div class="info">
              <h1>{{is.name}}</h1>
              <div class="company">{{is.identity}}</div>
              <div class="des">
                <p>{{is.intro}}</p>
              </div>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>
<script>
  export default {
    props: ["guestList"],
    data() {
      return {
        guestLists: [],
        guestlength: 0
      }
    },
    methods: {
    },
    mounted() {
      for (var i = 0, len = this.guestList.length; i < len; i += 10) {
        this.guestLists.push(this.guestList.slice(i, i + 10));
      }
      this.guestlength = this.guestLists.length
    },
  };
</script>

<style lang="scss">
  .c-homelecturer {
    padding: 28px 0 20px 0;
    &-title {
      width: 1180px;
      margin: 0 auto;
      font-size: 24px;
      color: #000000;
      padding-bottom: 15px;
      border-bottom: 1px solid#f0f0f0;
      padding-left: 9px;
      margin-bottom: 20px;
    }
    &-list {
      width: 1180px;
      margin: 0 auto;
      .c-homelecturers {
        overflow: hidden;
        height: 560px;
      }
      .el-carousel__indicators {
        .el-carousel__indicator {
          button {
            height: 9px;
            width: 9px;
            border-radius: 5px;
            background: #858585;
          }
        }
        .is-active {
          button {
            background: #4E88EA;
            opacity: 1;
            width: 18px;
          }
        }
      }
    }
    &-item {
      width: 217px;
      height: 250px;
      overflow: hidden;
      float: left;
      margin-right: 23px;
      margin-bottom: 30px;
      border-radius: 8px;
      position: relative;
      .picture {
        position: absolute;
        left: 0;
        top: 0;
        width: 217px;
        height: 250px;
      }
      .info {
        height: 250px;
        background: rgba(0, 0, 0, 0.58);
        text-align: center;
        padding: 3px 17px 0 17px;
        cursor: pointer;
        z-index: 10;
        position: relative;
        margin-top: 193px;
        transition: all 0.5s;
        &:hover {
          margin-top: 0;
          padding-top: 21px;
          .des {
            display: block;
          }
        }
        .des {
          margin-top: 21px;
          font-size: 12px;
          color: #ffffff;
          line-height: 17px;
          display: none;
          text-align: left;
          P {
            font-size: 12px;
            line-height: 22px;
            height: 130px;
            overflow: hidden;
          }
        }
        h1 {
          font-size: 18px;
          color: #ffffff;
          line-height: 30px;
        }
        .company {
          font-size: 12px;
          color: #ffffff;
          line-height: 22px;
        }
      }
      &:nth-of-type(5n) {
        margin-right: 0;
      }
    }
  }
</style>
