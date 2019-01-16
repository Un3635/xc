<template>
  <div class="approval-manage">
    <section>
      <plugin_title :hasLine="false" message="审批列表"></plugin_title>
      <div class="approval-list">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="待审批" name="first">
            <approvalTable :state="0"></approvalTable>
          </el-tab-pane>
          <el-tab-pane label="审批通过" name="second">
            <approvalTable :state="1"></approvalTable>
          </el-tab-pane>
          <el-tab-pane label="审批拒绝" name="third">
            <approvalTable :state="2"></approvalTable>
          </el-tab-pane>
          <el-tab-pane label="全部审批" name="fourth">
            <approvalTable :state="-1"></approvalTable>
          </el-tab-pane>
        </el-tabs>
      </div>
    </section>
  </div>
</template>
<script>
  import plugin_title from '../plugin_title'
  import approvalTable from './approvalTable'

  export default {
    data() {
      return {
        token: '',
        activeName:'first'
      };
    },
    mounted() {

    },
    methods: {
      handleClick(){

      }
    },
    components: {
      plugin_title,
      approvalTable
    }
  }
</script>
<style lang="scss" scoped>
  .approval-manage {
    background: #f5f5f5;
    min-height: 100%;
    overflow: hidden;
    section{
      border-radius: 8px;
      background: #fff;
      padding-bottom: 10px;
    }
    .approval-list{
      padding: 0 30px;
      position: relative;
    }
  }
</style>
<style lang="scss">
  .approval-manage .el-tabs__nav{
    &>div:not(.is-active){
      font-size: 14px;
      color: #999999;
    }
  }
  .approval-manage .el-tabs__nav-wrap::after{
    display: none;
  }
</style>
