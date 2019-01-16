<template>
  <div class="a">
    <progress-bar type="circle" ref="line" :options="options"></progress-bar>
  </div>
</template>
<style>
  .a {
    width: 100px;
  }
</style>

<script>
  export default {
    mounted: function() {
      setInterval(() => {
        var pecent = ++this.num / this.all;

        this.$refs.line.animate(pecent);
      }, 1000);
    },

    data() {
      return {
        all: 10,
        num: 0,
        options: {
          color: "#4D87EA",
          strokeWidth: 4,
          trailColor: "#EEEEEE",
          trailWidth: 4
        }
      };
    }
  };
</script>

