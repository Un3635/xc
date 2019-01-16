<template>
  <div class="c-homeactivity">
    <div class="c-homeactivity-hd">
      <div class="c-homeactivity-hd-item" v-for="(i,idx) in moduleList" :key="idx" :class="{active:i.id==moduleactive}" @click="change(i)">{{i.name}}</div>
    </div>
    <div class="c-homeactivity-bd">
      <div class="c-homeactivity-bd-list clearfix">
        <div class="c-homeactivity-bd-item" v-for="(i,idx) in activityList.list" :key="idx">
          <a :href="href(i)" target="_blank" :title="i.title">
          <img :src="i.logo" :alt="i.title" class="bannner">
          </a>
          <div class="down">
            <a :href="href(i)" target="_blank" :title="i.title">
            <h2>{{i.title}}</h2>
            </a>
            <div class="info">
              <img src="../../assets/images/xueyuan/time_icon@2x.png" alt="">{{i.activityTime|date}}
            </div>
            <div class="info" v-if="i.moduleType==2">
              <img src="../../assets/images/xueyuan/Location_icon@2x.png" alt="">{{i.address}}
            </div>
            <a class="ato" :href="href(i)" target="_blank" :title="i.title">{{i.butNote}}</a>
            <div class="tag">
              <div class="taginner">
                <img :src="i.icon" alt="">{{i.moduleName}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="c-homeactivity-more" v-if="activityList.page.pageNum!=activityList.page.pages" @click="loadmore">加载更多</div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ["moduleList", "moduleactive", "activityList"],
    methods: {
      loadmore() {
        this.$emit("loadmore");
      },
      change(i) {
        if (i.id != this.moduleactive) {
          this.$emit("change", i.id);
        }
      },
      href(i) {
        if (i.moduleType == 1) {
          return "/xueyuan/online/" + i.id;
        } else {
          return "/xueyuan/offline/" + i.id;
        }
      }
    }
  };
</script>


<style lang="scss">
  .c-homeactivity {
    &-hd {
      width: 1180px;
      margin: 0 auto;
      &-item {
        line-height: 70px;
        font-size: 16px;
        color: #222222;
        display: inline-block;
        margin-right: 30px;
        background-color: white;
        cursor: pointer;
        &.active {
          background-image: linear-gradient(#5581e9, #5581e9);
          background-size: 100% 4px;
          background-position: bottom;
          color: #222222;
          font-weight: bold;
          background-repeat: no-repeat;
        }
      }
    }
    &-bd-list {
      width: 1180px;
      margin: 0 auto;
      padding: 30px 0;
    }
    &-bd {
      background: #f6f6f6;
      &-item {
        width: 576px;
        height: 455px;
        overflow: hidden;
        float: left;

        border-radius: 8px;
        margin-bottom: 28px;
        background-color: white;
        position: relative;
        .down {
          padding: 14px 23px 0 24px;
          h2 {
            line-height: 30px;
            height: 60px;
            font-size: 20px;
            color: #000000;
            margin-bottom: 20px;
          }
          .info {
            line-height: 22px;
            font-size: 14px;
            color: #505050;
            img {
              width: 14px;

              margin-right: 11px;
            }
          }
          .ato {
            position: absolute;
            right: 23px;
            bottom: 26px;
            background-color:#4D87EA;
            border-radius: 3px;
            width: 120px;
            line-height: 43px;
            text-align: center;
            font-size: 20px;
            color: #ffffff;
            outline: none;
            border: none;
            cursor: pointer;
            &:hover{
              background-color:#3B74D5;
            }
          }
        }
        .bannner {
          display: block;
          height: 282px;
          width: 100%;
        }
        .tag {
          position: absolute;
          left: 18px;
          top: 18px;
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: 100px;
          line-height: 33px;
          height: 33px;

          width: 111px;
          .taginner {
            color: white;
            font-size: 14px;
            text-align: center;
            img {
              height: 14px;
              margin-right: 6px;
              vertical-align: -2px;
            }
          }
        }
        &:nth-of-type(2n) {
          margin-left: 28px;
        }
      }
      &-item:hover{
        box-shadow:2px 2px 12px #cccccc;
        .down{
          h2{
            color: #4D87EA;
          }
        }
      }
    }
    &-more {
      padding-bottom: 28px;
      font-size: 16px;
      color: #0063ee;
      text-align: center;
      cursor: pointer;
    }
  }
</style>
