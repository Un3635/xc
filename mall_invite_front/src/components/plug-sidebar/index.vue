<template>
  <div class="init-menu">
    <ul>
      <!--<li v-for="(item,index) in menuList" :key="index" :class="{active: curPath === item.path}" @click="$router.push(item.path)">-->
      <li v-for="(item,index) in menuList" :key="index" :class="{active: item.path.indexOf(curPath) > -1}" @click="$router.push(item.path[0])">
        <div class="bg-style"><div class="text">{{item.name}}</div></div>
      </li>
    </ul>
  </div>

</template>
<script>
  export default {
    name: 'plug-sidebar',
    props: {
      menuList: {
        type: Array,
        default: []
      },
      propPath: {
          type: String,
          default: '/'
      }
    },
    data() {
      return {
        curPath: this.$route.path
      }
    },
    watch: {
      '$route'(to, from){
        this.curPath = to.path;
      }
    }
  };
</script>
<style scoped lang="scss">

</style>


