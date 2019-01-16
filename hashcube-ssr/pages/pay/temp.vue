<template>
  <div v-html="html"></div>
</template>

<script>
  import {getStore} from "../../utils";

  export default {
    layout: 'full',
    data() {
      return {
        html: ''
      };
    },
    mounted() {
      this.html = getStore('alipay-info');
      this.$nextTick(() => {
        document.forms[0].submit();
      });
    }
  };
</script>

