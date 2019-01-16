import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store=new Vuex.Store({
  state:{
    isEnglish: 'cn',
    isOpacity: false
  },
  mutations:{
    changeLange(state, LG) {
      // LG === cn 中文  LG === en 英文
      state.isEnglish = LG;
      if(state.isEnglish === 'cn') {
        document.title = 'XToken-多链多币种'
      }else{
        document.title = 'XToken-Multi-chain multi-currency'
      }
    },
    changeOpacity(state, val) {
      state.isOpacity = val;
    }
  }
})

export default store
