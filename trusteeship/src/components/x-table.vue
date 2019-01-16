<template>
  <div class="x-table">
    <div class="t-header" v-if="fixed" :class="`is-scrolling-${scrollPosition}`"
         :style="{width:headerWidth+'px'}">
      <div class="t-header__inner">
        <div class="t-column">
          <div class="t-cell"></div>
          <div class="t-cell" v-for="row in tableData.rows" :key="row.label">{{row.label}}</div>
        </div>
      </div>
    </div>
    <vue-perfect-scrollbar class="t-content" @ps-scroll-x="scrollHandler" :style="{paddingLeft:headerWidth+'px'}">
      <div class="t-content__inner">
        <div class="t-column" v-for="col in tableData.cols" :key="col.label" :style="columnStyle">
          <div class="t-cell">{{col.label}}</div>
          <div class="t-cell" v-for="row in tableData.rows" :key="row.label">
            {{get(tableData.data,`${row.prop}.${col.prop}.sum`,defaultData)}}
          </div>
        </div>
      </div>
    </vue-perfect-scrollbar>
  </div>
</template>

<script>
  import VuePerfectScrollbar from 'vue-perfect-scrollbar';
  import get from 'lodash.get';

  export default {
    name: 'x-table',
    components: {
      VuePerfectScrollbar
    },
    props: {
      fixed: {
        type: Boolean,
        default: true
      },
      headerWidth: {
        type: String,
        default: '0'
      },
      tableData: {
        type: Object,
        default() {
          return {
            rows: [],
            cols: [],
            data: {}
          };
        }
      },
      defaultData: {
        type: String,
        default: ''
      },
      columnStyle: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    computed: {},
    data() {
      return {
        scrollPosition: 'left'
        // tableData: {
        //   cols: [
        //     {label: 'BTC矿机', prop: 'BTC'},
        //     {label: 'ETH矿机', prop: 'ETH'},
        //     {label: 'ETH矿机', prop: 'DCR'},
        //     {label: 'ETH矿机', prop: 'DASH'},
        //     {label: 'ETH矿机', prop: 'DAS'},
        //     {label: 'ETH矿机', prop: 'SC'}
        //   ],
        //   rows: [
        //     {label: '运行中', prop: 'inWork'},
        //     {label: '维护中', prop: 'c'},
        //     {label: '待交割', prop: 'aWait'}
        //   ],
        //   data: {
        //     BTC: {
        //       inWork: 1,
        //       c: 2,
        //       aWait: 3
        //     },
        //     ETH: {
        //       inWork: 3,
        //       c: 2,
        //       aWait: 3
        //     },
        //     DCR: {
        //       inWork: 3,
        //       c: 2,
        //       aWait: 3
        //     },
        //     DASH: {
        //       inWork: 3,
        //       c: 2,
        //       aWait: 3
        //     },
        //     DAS: {
        //       inWork: 3,
        //       c: 2,
        //       aWait: 3
        //     },
        //     SC: {
        //       inWork: 3,
        //       c: 2,
        //       aWait: 3
        //     }
        //   }
        // }
      };
    },
    methods: {
      get,
      scrollHandler(e) {
        const self = this;
        const maxScrollLeftPosition = e.target.scrollWidth - e.target.offsetWidth - 1;
        const scrollLeft = e.target.scrollLeft;
        if (scrollLeft >= maxScrollLeftPosition) {
          self.scrollPosition = 'right';
        } else if (scrollLeft === 0) {
          self.scrollPosition = 'left';
        } else {
          self.scrollPosition = 'middle';
        }
      }
    }
  };
</script>

<style scoped lang="scss">

  @mixin n-items($n) {
    &:first-child:nth-last-child(#{$n}),
    &:first-child:nth-last-child(#{$n}) ~ .t-column {
      @content;
    }
  }

  .x-table {
    position: relative;

    .t-header {
      position: absolute;
      left: 0;
      top: 0;
      text-align: center;
      overflow: hidden;
      padding-right: 5px;
      z-index: 1;
      background-color: #fafafa;

      &.is-scrolling-left {
        .t-header__inner {
          box-shadow: none;
        }
      }

      .t-column {
        width: 100%;
      }
    }

    .t-header__inner {
      box-shadow: 0 0 10px rgba(0, 0, 0, .12);
    }

    .t-content {
      width: 100%;
      overflow-x: scroll;
      font-size: 0;
      white-space: nowrap;
      padding-bottom: 8px;
      user-select: none;
      /*padding-left: 120px;*/

      .t-column {
        display: inline-block;
        vertical-align: top;
        min-width: 120px;
        /*text-align: center;*/

        @include n-items(1) {
          width: 100%;
        }
        @include n-items(2) {
          width: 50%;
        }
        @include n-items(3) {
          width: 33.3%;
        }
        @include n-items(4) {
          width: 25%;
        }
        @include n-items(5) {
          width: 20%;
        }
      }
    }

    .t-content__inner {
      width: 100%;
    }

    .t-cell {
      width: 100%;
      font-size: 14px;
      height: 38px;
      line-height: 38px;

      &:first-child {
        color: #606166;
      }
    }

  }
</style>
