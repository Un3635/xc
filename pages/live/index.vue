<template>
  <div class="page-live">
    <ristShow/>
    <div class="page-live-inner clearfix">
      <div class="page-live-left">
        <div class="page-live-hd">
          <div class="page-live-hd-title">闪讯</div>
          <div class="page-live-hd-ctrl">
            <div class="page-live-hd-ctrl-tags">
              <div :class="{active:i.active}" v-for="(i,idx) in types" :key="idx" @click="toggleType(i)">{{i.name}}</div>
            </div>
            <div class="page-live-hd-ctrl-notice">
              <el-dropdown :hide-on-click="false">
                <span class="el-dropdown-link">
                  <div class="page-live-hd-ctrl-notice-set"></div>
                </span>
                <el-dropdown-menu slot="dropdown" class="page-live-hd-ctrl-notice-el-dropdown">
                  <el-dropdown-item>声音提醒
                    <el-switch v-model="notice1" active-color="#4D87EA" inactive-color="#CCCCCC" :width=46>
                    </el-switch>
                  </el-dropdown-item>
                  <el-dropdown-item>桌面提醒
                    <el-switch v-model="notice2" active-color="#4D87EA" inactive-color="#CCCCCC" :width=46>
                    </el-switch>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
        <div class="page-live-list">
          <div class="page-live-list-item" v-for="(i,idx) in list" :key="idx">
            <img :src="i.head" alt="" class="page-live-list-item-author">
            <div class="page-live-list-item-content">
              <div class="page-live-list-item-content-info">
                <div class="page-live-list-item-content-info-left">
                  <div class="page-live-list-item-content-info-left-name">{{i.identityName}}</div>
                  <div class="page-live-list-item-content-info-left-date">{{i.pubTime|fromNow}}</div>
                </div>
                <div class="page-live-list-item-content-info-center">
                  <el-rate :allow-half="true" disabled :value="i.star" />
                </div>
                <!-- <div class="page-live-list-item-content-info-right">
                  <div class="page-live-list-item-content-info-right-1">利好</div>
                  <div class="page-live-list-item-content-info-right-2"></div>
                  <div class="page-live-list-item-content-info-right-3">10%</div>
                </div> -->
              </div>
              <h1>{{i.title}}</h1>
              <p v-html="i.content"></p>
            </div>
          </div>
          <div class="page-live-list-loadmore" @click="loadmore" v-if="page.pageNum<page.pages">加载更多</div>
        </div>
      </div>
      <div class="page-live-right">
        <hot-news/>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  @import "index.scss";
</style>
<script>
  import ristShow from "../../components/ristshow";
  import hotNews from "../../components/hot-news.vue";
  import { getLiveNews, getLiveNewsColumn } from "../../service/main-api";
  import livenoticeevent from "../../service/livenoticeevent.js";
  export default {
    components: { hotNews, ristShow },
    data() {
      return {
      };
    },
    computed:{
      notice1:{
        get(){return this.$store.state.livenotice1},
        set(value){this.$store.commit('LIVENOTIVE_TOGGLE',{type:1,value})}
      },
      notice2:{
        get(){return this.$store.state.livenotice2},
        set(value){this.$store.commit('LIVENOTIVE_TOGGLE',{type:2,value})}
      }
    },
    methods: {
      toggleType(i) {
        var hasToggle = false;
        this.types = this.types.map(item => {
          if (item != i) {
            item.active = false;
          } else {
            if (!item.active) {
              hasToggle = true;
              item.active = true;
            }
          }
          return item;
        });
        if(hasToggle){
          this._initlist();
        }
      },
      async _initlist(){
        var types=this.types.filter(i=>i.active);
          var { list, page } = await getLiveNews(types[0].id, 20, 1);
          this.list=list||[];
          this.page=page||{pageNum:1,pages:0};
      },
      async loadmore() {
        var types = this.types.filter(i => i.active == true);
        var { list, page } = await getLiveNews(
          types[0].id,
          20,
          ++this.page.pageNum
        );
        list=list.filter(i=>this.list.every(item=>item.id!=i.id))
        this.list = [...this.list, ...list];
        this.page = page;
      }
    },
    mounted(){
      livenoticeevent.$on('new',(data)=>{
        this.list=[...data,...this.list]
      })
    },
    beforeDestroy(){
      livenoticeevent.$off('new',()=>{})
    },
    async asyncData() {
      var types = await getLiveNewsColumn();
      types.sort((i, ii) => i.rank > ii.rank);
      types = types.map((i, idx) => {
        if (idx == 0) {
          i.active = true;
        } else {
          i.active = false;
        }
        return i;
      });

      var { list, page } = await getLiveNews(types[0].id, 20, 1);

      return {
        types,
        list,
        page
      };
    },
    head() {
      return {
        title: "区块链闪讯门户网站-挖链网",
        meta: [
          {
            hid: "description",
            name: "description",
            content:
              "挖链闪讯提供区块链最新资讯、虚拟货币最新行情，为大家提供实时新闻资讯，让您及时了解币圈市场行情动态。"
          },
          {
            hid: "keywords",
            name: "keywords",
            content: "区块链新闻,区块链资讯,闪讯,虚拟货币行情,挖链指数"
          }
        ]
      };
    }
  };
</script>
