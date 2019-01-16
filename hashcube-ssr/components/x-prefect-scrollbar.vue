<template>
  <section class="ps-container"
           :is="$props.tagname"
           @mouseover.once="update"
           @ps-scroll-y="scrollHandler"
           @ps-scroll-x="scrollHandler"
           @ps-scroll-up="scrollHandler"
           @ps-scroll-down="scrollHandler"
           @ps-scroll-left="scrollHandler"
           @ps-scroll-right="scrollHandler"
           @ps-y-reach-start="scrollHandler"
           @ps-y-reach-end="scrollHandler"
           @ps-x-reach-start="scrollHandler"
           @ps-x-reach-end="scrollHandler">
    <slot></slot>
  </section>
</template>
<style lang="scss">
  @import 'perfect-scrollbar/css/perfect-scrollbar.css';

  .ps-container {
    position: relative;
  }
</style>
<script>
  import ScrollBar from 'perfect-scrollbar';

  export default {
    name: 'x-perfect-scrollbar',
    props: {
      settings: {
        default: undefined
      },
      swicher: {
        type: Boolean,
        default: true
      },
      tagname: {
        type: String,
        default: 'section'
      }
    },
    data() {
      return {
        scrollBar: null
        // _ps_inited: false
      };
    },
    methods: {
      scrollHandler(evt) {
        this.$emit(evt.type, evt);
      },
      update() {
        this.scrollBar.update(this.$el);
      },
      __init() {
        if (this.swicher) {
          if (!this._ps_inited) {
            this._ps_inited = true;
            this.scrollBar = new ScrollBar(this.$el, this.settings);
          } else {
            this.update(this.$el);
          }
        }
      },
      __uninit() {
        this.scrollBar.destroy(this.$el);
        this._ps_inited = false;
      }
    },
    watch: {
      swicher(val) {
        if (val && !this._ps_inited) {
          this.__init();
        }
        if (!val && this._ps_inited) {
          this.__uninit();
        }
      },
      $route() {
        this.update();
        this.$el.scrollTop = 0;
      }
    },
    mounted() {
      // debugger
      if (!process || !process.server) {
        this.__init();
      }
    },
    updated() {
      this.$nextTick(this.update);
    },
    activated() {
      this.__init();
    },
    deactivated() {
      this.__uninit();
    },
    beforeDestroy() {
      this.__uninit();
    }
  };
</script>
