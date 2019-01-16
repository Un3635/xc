<template>
  <div class="home">
    <div class="header" :class="{'active': isOpacity}">
      <div class="header-con">
        <div class="log"><img src="../assets/img/logo_xtoken.png" alt=""></div>
        <div class="menu">
          <div class="item" v-for="(item,index) in currList" :key="index" :class="{'active': activeInd === index}">
            <a href="javascript:void(0)" v-if="item === 'APP下载' || item === 'APP'" @click="gotoApp(index)">{{item}}</a>
            <a href="javascript:void(0)" v-else @click="goAnchor(index)">{{item}}</a>
          </div>
          <div class="item">
            <span class="text" :class="{'active': isEnglish === 'cn'}" @click="changeLan('cn')">CN</span> / <span class="text"
            :class="{'active': isEnglish === 'en'}"
            @click="changeLan('en')">EN</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  export default {
    name: 'x-header',
    props: {
      currList: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        activeInd: 0,
        domarr: []
      };
    },
    computed: {
      ...mapState(['isEnglish', 'isOpacity'])
    },
    methods: {
      gotoApp(index) {
//        this.$emit('currIndex', index);
//        this.bus.$emit('active', index);
        this.$router.push('/download')
      },
      changeLan(lg) {
        this.$store.commit('changeLange', lg);
        this.bus.$emit('currIndex', 'returnTops')
      },
      goAnchor(index) {
        this.$store.commit('changeLange', this.isEnglish);
        this.bus.$emit('currIndex', index);
        this.bus.$emit('active', index);
        if(this.$route.path !== '/'){
          this.$router.push({path: '/', query: {'activeInd': index}});
        }
      },

    },
    mounted() {
      this.bus.$on('active', (index) => {
        this.activeInd = index;
      });
    }
  };
</script>
