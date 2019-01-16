import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isEnglish: 'cn',
    isMove: false,
    showPop: false, //弹窗
    isQqPop: false
  },
  mutations: {
    changeLange(state, LG) {
      // LG === cn 中文
      // LG === en 英文
      state.isEnglish = LG;
    },
    changeMoveState(state,params){ //页面滑动时箭头动画效果
      state.isMove = params;
    },
    changeShowPop(state,params){
      state.showPop = params;
    },
    changeQqPop(state,params){
      state.isQqPop = params;
    }
  }
})

export default store
