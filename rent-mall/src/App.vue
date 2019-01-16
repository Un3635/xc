<template>
  <div id="app" class="container">
    <router-view class="view"></router-view>
  </div>
</template>

<script>
  import TokenAPI from './services/token-api';
  import {mapState} from 'vuex';
  import {MutationTypes} from './store/mutations';

  export default {
    name: 'App',
    data() {
      return {};
    },

    computed: {
      ...mapState(['token', 'login'])
    },
    methods: {},
    created() {
      const token = TokenAPI.get();
      TokenAPI.loginCheck(token)
        .then(res => {
          if (res) {
            this.$store.commit(MutationTypes.LOGIN_IN, token);
          } else {
            this.$store.commit(MutationTypes.LOGIN_OUT);
          }
        })
        .catch(() => {
        });
    }
  };
</script>

<style lang="sass">
  @import "assets/css/public.scss"
</style>
