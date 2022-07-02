// 引入 Vue
import Vue from 'vue';
// 引入 vue-router
import VueRouter from 'vue-router';
// 使用 vue-router
Vue.use(VueRouter);
// 引入组件
import Login from '../components/Login';
import Home from '../views/Home';
import Welcome from '../components/Welcome';
import Users from '../views/Users';
import Role from '../views/Role';
import Permission from '../views/Permission';
import ProductList from '../views/ProductList';
import ClassPara from '../views/ClassPara';
import ProductClass from '../views/ProductClass';
import OrderList from '../views/OrderList';
import DataList from '../views/DataList';

// 创建路由器
const router = new VueRouter({
  routes: [
    // 重定向路由规则
    {
      path: '*',
      redirect: '/login',
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        {
          path: '/welcome',
          component: Welcome,
        },
        {
          path: '/users',
          component: Users,
        },
        {
          path: '/role',
          component: Role,
        },
        {
          path: '/permission',
          component: Permission,
        },
        {
          path: '/productList',
          component: ProductList,
        },
        {
          path: '/classPara',
          component: ClassPara,
        },
        {
          path: '/productClass',
          component: ProductClass,
        },
        {
          path: '/orderList',
          component: OrderList,
        },
        {
          path: '/dataList',
          component: DataList,
        },
      ],
    },
  ],
});

// 挂载路由导航守卫
// router.beforeEach((to, from, next) => {
//     // to 将要访问的路径
//     // from 代表从哪个路径跳转而来
//     // next 是一个函数，表示放行
//     //      next()  放行        next('/login')  强制跳转
//     if (to.path === '/login') return next();
//     // 获取token
//     const tokenStr = window.sessionStorage.getItem('token')
//     if (!tokenStr) return next('/login')
//     next()
// })

// 暴露路由器
export default router;
