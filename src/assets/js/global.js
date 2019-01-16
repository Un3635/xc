
import Vue from 'vue'
import router from '../../routerConfig'
import store from '../../store/index'
import axios from 'axios'
import util from '@/libs/util.js'

Vue.prototype.$http = axios
// axios
Vue.prototype.axiosPOST = function (vm, API, contentType, paramsData, successCB, errorCB) {
  this.$nextTick(()=>{
    let token =  util.cookies.get('token');
    let options ={
      method: 'post',
      headers: {
          'Content-Type': contentType,
          'x-auth-token': token
      },
      url: vm.$API.URL + API,
    };
    if(contentType === 'application/json'){
      options.data = paramsData;
    } else {
      options.params = paramsData;
    }
    vm.$axios(options)
      .then((res)=>{
        if(res.code === '3001'){
          vm.$message.error('登录失效，请重新登录')
          util.cookies.remove('token');
          util.cookies.remove('uuid');
          util.cookies.remove('d2adminMenuAside');
          vm.$router.push({
            name: 'login'
          })
        }else if (res.code === '1000'){
          successCB(vm,res);
        } else if (res.code === '6105'){
          vm.$message.error('请修改密码');
          vm.$store.commit('setShowPwdPop',true);
        }else {
          vm.$message.error(res.message)
        }
      })
      .catch((err)=>{
        errorCB(err);
      })
  })
},
Vue.prototype.axiosGET = function (vm, API, contentType, paramsData, successCB, errorCB) {
  this.$nextTick(()=>{
    let token =  util.cookies.get('token');
    let options ={
      method: 'get',
      headers: {
        'Content-Type': contentType,
        'x-auth-token': token
      },
      url: vm.$API.URL + API,
    };
    if(contentType === 'application/json'){
      options.data = paramsData;
    } else {
      options.params = paramsData;
    }
    vm.$axios(options)
      .then((res)=>{
        if(res.code === '3001'){
          vm.$message.error('登录失效，请重新登录')
          util.cookies.remove('token');
          util.cookies.remove('uuid');
          util.cookies.remove('d2adminMenuAside');
          vm.$router.push({
            name: 'login'
          })
        }else if (res.code === '1000'){
          successCB(vm,res);
        } else if (res.code === '6105'){
          vm.$message.error('请修改密码')
          vm.$store.commit('setShowPwdPop',true);
        }else {
          vm.$message.error(res.message)
        }
      })
      .catch((err)=>{
        errorCB(err);
      })
  })
}