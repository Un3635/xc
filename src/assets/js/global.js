
import Vue from 'vue'
import axios from 'axios'
import util from '@/libs/util.js'

Vue.prototype.$http = axios
// axios
Vue.prototype.axiosPOST = function (vm, API, contentType, paramsData, successCB,errorCB) {
  this.$nextTick(()=>{
    let token =  util.cookies.get('token');
    let options ={
      method: 'post',
      headers: {
          'Content-Type': contentType,
          'x-auth-token': token,
          'Access-Control-Allow-Origin': '*'
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
        if(vm.pageLoading){
          vm.pageLoading = false;
        }
        if(res.code === '3001'){
          vm.$message.error('登录失效，请重新登录');
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
          if(errorCB){
            errorCB(res)
          } else {
            vm.$message.error(res.message);
          }
        }
      })
      .catch((err)=>{
        if(vm.pageLoading){
          vm.pageLoading = false;
        }
        console.log(err);
        vm.$message.error('接口错误');
      })
  })
},
Vue.prototype.axiosGET = function (vm, API, contentType, paramsData, successCB,errorCB) {
  this.$nextTick(()=>{
    let token =  util.cookies.get('token');
    let options ={
      method: 'get',
      headers: {
        'Content-Type': contentType,
        'x-auth-token': token,
        'Access-Control-Allow-Origin': '*'
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
        
        if(vm.pageLoading){
          vm.pageLoading = false;
        }
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
          if(errorCB){
            errorCB(res)
          } else {
            vm.$message.error(res.message)
          }
        }
      })
      .catch((err)=>{
        if(vm.pageLoading){
          vm.pageLoading = false;
        }
        console.log(err);
        vm.$message.error('接口错误');
      })
  })
}

  