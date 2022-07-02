import Vue from 'vue';
import App from './App.vue';
// 引入全局样式表
import './assets/less/global.less';
// 导入字体图标
import './assets/fonts/iconfont.css';
// 按需引入 element-ui 组件
import './plugins/element.js';
// 引入路由器
import router from './router';
// 引入 vuex
// import './store/index.js';
// // 引入axios
// import axios from 'axios';
// // 配置请求的根路径
// axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/';
// Vue.prototype.$http = axios;
// // axios 请求拦截
// axios.interceptors.request.use((config) => {
//   // console.log(config);
//   config.headers.Authorization = window.sessionStorage.getItem('token');
//   // 在最后必须 return config
//   return config;
// });
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
}).$mount('#app');
