<template>
  <div class="_content">
    <div class="main-page" >
      <el-container>
        <el-aside>
          <el-scrollbar class="init-menu_scroll">
            <div class="init-menu">
              <ul>
                <li v-for="(item,index) in menuList" :key="index" :class="{active: curMenuIdx === index}"
                    @click="curMenuIdx = index">
                  <div class="bg-style">
                    <div class="text">{{item.name || ''}}</div>
                  </div>
                </li>
              </ul>
            </div>
          </el-scrollbar>
        </el-aside>
        <el-main>
          <div class="intro" v-loading.lock="fullscreenLoading">
            <div class="title">
              <h1>{{menuList[curMenuIdx] && menuList[curMenuIdx].name}}</h1>
            </div>
            <div class="content">
              <div v-html="menuList[curMenuIdx] && menuList[curMenuIdx].content"></div>
            </div>
          </div>
        </el-main>
      </el-container>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'main-page',
    data(){
      return {
        menuList: [],
        curMenuIdx: 0,
        fullscreenLoading:  true
      };
    },
    mounted() {
      getajaxdata(API.allianceList, 'get', {initTimes: new Date().getTime()}, 'json', (res) => {
        this.menuList = res.data.announceVos || [];
        this.fullscreenLoading = false;
      });
    }
  };
</script>
<style lang="scss" scoped>
  .main-page {
    margin-bottom: 50px;
  }

  .init-menu_scroll {
    height: 100%;
  }

  .intro {
    width: 100%;
    min-height: 730px;
    height: auto;
    background: #fff;
  .title {
    letter-spacing: 0;
    height: 64px;
    line-height: 64px;
    font-weight:800;

  &>h1 {
    padding-left: 30px;
    font-size: 22px;
    color: #2F2F2F;
  }

  &:after {
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    background: #EAEAEA;
  }

  }
  .content {
    font-size: 16px;
    color: #2F2F2F;
    letter-spacing: 0;
    line-height: 32px;
    width: 1030px;

  &>div {
    padding: 30px;
    display: inline-block;
  }

  }
  }

</style>

