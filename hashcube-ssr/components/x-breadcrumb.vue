<template>
  <el-breadcrumb v-if="breadcrumb" separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="item.path" v-for="item in breadcrumb.parentsList" :key="item.path">
      {{item.label}}
    </el-breadcrumb-item>
    <el-breadcrumb-item>{{breadcrumb.label}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
  import {mapState} from 'vuex';

  export default {
    name: 'x-breadcrumb',
    computed: {
      ...mapState(['breadcrumb'])
    }
  };
</script>
