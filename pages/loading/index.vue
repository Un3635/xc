<template>
    <div></div>
</template>
<script>
    export default {
      created() {
        if (this.$route.query.topath) {
          this.$router.replace({
            path: this.$route.query.topath
          });
        } else {
          this.$router.replace({
            path: "/"
          });
        }
      }
    };
</script>
