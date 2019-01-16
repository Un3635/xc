<template>
  <div class="_content">
    <div class="main-page">
      <el-container>
        <el-aside>
        <el-scrollbar class="init-menu_scroll">
          <div class="init-menu">
            <ul>
              <li v-for="(item,index) in menuList" :key="index" :class="{active: curMenuIdx === index}" @click="curMenuIdx = index">
                <div class="bg-style"><div class="text">{{item.name || ''}}</div></div>
              </li>
            </ul>
          </div>
        </el-scrollbar>
        </el-aside>
        <el-main>
          <div class="intro">
            <div class="title">
              <h1>{{menuList[curMenuIdx] && menuList[curMenuIdx].name}}</h1>
            </div>
            <div class="content">
              <span v-html="menuList[curMenuIdx] && menuList[curMenuIdx].content"></span>
            </div>
          </div>
        </el-main>
      </el-container>
    </div>
  </div>
</template>
<script>
  import PlugSidebar from '../plug-sidebar'
  export default {
    name: 'main-page',
    components: {PlugSidebar},
    data(){
      return{
        menuList: [],
        curMenuIdx: 0
      }
    },
    created() {
      getajaxdata(API.allianceList, 'get', {}, 'json', (res) => {
        this.menuList = res.data.announceVos || [];
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
  .title {
    font-family: MicrosoftYaHei-Bold;
    letter-spacing: 0;
    height: 64px;
    line-height: 64px;
    & > h1 {
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
  .content{
    font-family: MicrosoftYaHei;
    font-size: 16px;
    color: #2F2F2F;
    letter-spacing: 0;
    line-height: 32px;
    width: 100%;
    & > span {
      padding: 30px;
      display: inline-block;
    }
  }
}

</style>

