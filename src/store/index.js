import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store=new Vuex.Store({
  state:{
    isEnglish: 'en',
    popShow:false,
    popText:''
  },
  getters:{
    popShow: state => state.popShow,
    popText: state => state.popText
  },
  mutations:{
    changeLange(state, LG) {
      state.isEnglish = LG;
      if(state.isEnglish === 'cn') {
        document.title = '尚德精武学院'
      }else{
        document.title = 'Thunder'
      }
    },
    changePopStatus(state,params){
      state.popShow= true;
      state.popText = params;
      setTimeout(()=>{
        state.popShow = false;
      },3000)
    }
  }
})

export default store
