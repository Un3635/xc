<template>
  <div ref="view" @click="closeWindow"></div>
</template>

<script>
  export default {
    layout: 'full',
    data() {
      return {};
    },
    methods: {
      closeWindow() {
        localStorage.setItem('is_payed', "true");
        window.location.href = "about:blank";
        window.close();
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.$refs.view.click();
      });
    }
  };
</script>
