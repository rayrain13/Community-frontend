import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);  //全局使用element-ui

Vue.config.productionTip = false;

Vue.prototype.$axios = axios;  //全局配置axios
/*axios.defaults.headers.post['Content-Type'] = 'application/json';*/
axios.defaults.baseURL = 'http://localhost:7001';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

//请求拦截器
axios.interceptors.request.use((config) => {
  if (localStorage.token) { //判断token是否存在
    config.headers.Authorization = localStorage.token;  //将token设置成请求头
  }
  //console.log(config)
  return config;
}, function (error) {
  //console.log(error)
  return Promise.reject(error);
});

//响应拦截器
axios.interceptors.response.use((config) => {
  //console.log(config);
  /*const code = config.data.code;*/
  const data = config.data;
  /*const message = config.data.message;*/
  return data;
}, function (error) {
  //console.log(error.response);
  const code = error.response.data.code;
  if(code === 401) {
    alert("登录已过期，请重新登录！");
    location.href = '/login';
  }
  return Promise.reject(error);
});
