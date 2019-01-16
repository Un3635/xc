<template>
  <el-form label-width="150px" class="rule-form panel-form" v-if="config.length > 0">
    <el-form-item :label="item.label" v-for="(item, index) in config" :key="index">
      <span class="detail-info" v-if="!item.type">{{item.names ? item.names[data[item.field]] || '-' : typeof data[item.field] === 'number' ? data[item.field] : data[item.field] || '-'}}</span>
      <div v-else-if="item.type==='pic'">
        <img v-if="data[item.field]" :src="data[item.field]" alt="" @click="$store.commit('setShowPicPopOn', {type:'pic', content:data[item.field]})"/>
        <span v-else>暂无头像</span>
      </div>
      <div v-else-if="item.type==='picGroup'">
        <img class="pic-group" alt="" v-for="pic,index in data[item.field]" :src="pic" v-if="data[item.field]" @click="previewPic(pic)" />
        <span v-else>暂无图片</span>
      </div>
      <div v-else-if="item.type==='video'">
        <video v-if="data[item.field]" :src="data[item.field]" controls="controls"></video>
        <span v-else>暂无视频</span>
      </div>
      <div v-else-if="item.type==='voice'">
        <audio :src="item.voiceUrl" controls="controls"></audio>
      </div>
    </el-form-item>
    <slot></slot>
  </el-form>
  <p v-else class="no-data">暂无数据</p>
</template>
<script>
export default {
  name: "x-form",
  props: {
    config: {
      type: Array,
      default: () => []
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    previewPic(img) {
      this.$store.commit("setShowPicPopOn", { type: "pic", content: img });
    }
  },
  created() {
    // console.log(this.data.length, this.config.length);
  }
};
</script>
<style lang="scss" scoped>
.pic-group {
  width: 150px;
  height: auto;
  border: 5px solid rgba(0, 0, 0, 0.03);
  margin-right: 10px;
  &:last-of-type {
    margin-right: 0;
  }
}
.panel-form {
  video {
    width: 200px;
    height: 200px;
  }
  img {
    display: inline-block;
    width: 60px;
    height: 60px;
  }
  audio {
    width: 100px;
  }
}
.no-data {
  width: 100%;
  font-size: 14px;
  text-align: center;
  color: #909399;
}
</style>

