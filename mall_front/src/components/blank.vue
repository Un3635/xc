<template>
  <div v-html="alipayHtml"></div>
</template>

<script>
  export default {
    name: 'blank',
    data () {
      return {
        alipayHtml: '',
        token: '',
      }
    },
    created() {
      this.token = localStorage.getItem('xckz_mall');
      if (!this.token) {
        this.$router.push('/error');
      } else {
        this.alipayHtml = localStorage.getItem('ali_h');
        localStorage.removeItem('ali_h');
      }
    },
    mounted(){
      $('form[name=punchout_form]').submit();
    }
  }
</script>

<style scoped>

</style>
