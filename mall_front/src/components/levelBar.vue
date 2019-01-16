<template>
  <div class="level">
    <ol class="breadcrumb" v-if="menuList.length !== 1 && hiddenType">
      <li v-for="(item, index) in menuList"><span class="active" v-if="isLast(index)">{{ showName(item) }}</span>
        <router-link :to="item.path" v-else>{{ showName(item) }}</router-link>
      </li>
    </ol>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        hiddenName: '',
        hiddenType: true,
        menuList: []
      }
    },
    methods: {
      isLast (index) {
        return index === this.menuList.length - 1
      },
      showName (item) {
        return item.meta && item.meta.label || item.name
      }
    },
    mounted () {
      this.menuList = this.$store.state.menu
      if (this.separator) {
        this.$el.style.setProperty('--separator', `"${this.separator}"`)
      }
    },
    watch: {
      $route (val) {
        this.menuList = this.$store.state.menu
      },
      menuList (val) {
        if (val.length > 1 && val.length < 3) {
          this.hiddenName = val[1].name
          if (this.hiddenName === '全部机型' || this.hiddenName === '重置密码') {
            this.hiddenType = false;
          } else {
            this.hiddenType = true;
          }
          if (val[1].path === '/i') {
            this.$store.state.menu = [val[0], {name: '个人中心', path: '/i'}]
          }
        } else {
          this.hiddenType = true
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .level{
    width: 1200px;
    margin: 0 auto;
    .breadcrumb {
      // > \003e
      // / \2044
      --separator: "\003e";

      list-style: none;
      align-items: center;
      display: flex;
      justify-content: start;
      padding: 12px 0;

      & > li + li:before {
        padding: 0 5px;
        color: #999999;
        content: var(--separator, "\003e");
        text-align: center;
        font-size: 12px;
      }
      .active{
        color: #333;
        font-size: 12px;
      }
      a{
        color: #999999;
        font-size: 12px;
      }
    }
  }
</style>
