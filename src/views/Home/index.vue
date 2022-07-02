<template>
  <el-container class="home-container">
    <!-- 头部 -->
    <el-header>
      <div>
        <img src="./imges/mrc.png" alt="" style="border-radius: 5px" />
        <span>通用后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu
          router
          unique-opened
          background-color="#666666"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse="isCollapse"
          :collapse-transition="false"
        >
          <!-- 一级菜单 -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menuList"
            :key="item.id"
          >
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id]"></i>
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/' + subItem.path"
              v-for="subItem of item.children"
              :key="subItem.id"
            >
              <i class="el-icon-menu"></i>
              <span>{{ subItem.authName }}</span>
            </el-menu-item>
          </el-submenu>

          <el-menu-item>
            <i class="el-icon-menu"></i>
            <span slot="title">test</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 右侧内容 -->
      <el-container>
        <!-- 右侧主体 -->
        <el-main>
          <!-- 路由占位符 -->
          <router-view></router-view>
        </el-main>
        <!-- 右侧底部 -->
        <el-footer
          >版权所有 &copy; mrc {{ new Date().getFullYear() }} 保留一切权利
          蜀ICP备2021033087号-1 蜀ICP备2021033087号</el-footer
        >
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      menuList: [
        {
          id: 1,
          authName: "用户管理",
          path: null,
          children: [
            {
              id: 1.1,
              authName: "用户列表",
              path: "users",
            },
          ],
        },
        {
          id: 2,
          authName: "权限管理",
          path: null,
          children: [
            {
              id: 2.1,
              authName: "角色列表",
              path: "role",
            },
            {
              id: 2.2,
              authName: "权限列表",
              path: "permission",
            },
          ],
        },
        {
          id: 3,
          authName: "商品管理",
          path: null,
          children: [
            {
              id: 3.1,
              authName: "商品列表",
              path: "productList",
            },
            {
              id: 3.2,
              authName: "分类参数",
              path: "classPara",
            },
            {
              id: 3.3,
              authName: "商品分类",
              path: "productClass",
            },
          ],
        },
        {
          id: 4,
          authName: "订单管理",
          path: null,
          children: [
            {
              id: 4.1,
              authName: "订单列表",
              path: "orderList",
            },
          ],
        },
        {
          id: 5,
          authName: "数据统计",
          path: null,
          children: [
            {
              id: 5.1,
              authName: "数据列表",
              path: "dataList",
            },
          ],
        },
      ],
      iconsObj: {
        1: "el-icon-user-solid",
        2: "el-icon-s-goods",
        3: "el-icon-s-order",
        4: "el-icon-s-home",
        5: "el-icon-s-platform",
      },
      // 是否折叠
      isCollapse: false,
    };
  },
  methods: {
    // 退出
    logout() {
      // 清除 token
      window.sessionStorage.clear();
      this.$router.push("/login");
      console.log("退出了");
    },
    // 点击按钮切换菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
  },
  created() {},
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: #2b2b2b;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #666666;
  .el-menu {
    border-right: none;
  }
  .toggle-button {
    background-color: #524a4a;
    color: #fff;
    text-align: center;
    font-size: 10px;
    letter-spacing: 0.2em;
    line-height: 24px;
    cursor: pointer;
  }
}

.el-main {
  background-color: #f0f8ff;
}

.el-footer {
  background-color: rgb(248, 250, 251);
  color: #606061;
  text-align: center;
  line-height: 60px;
  font-size: 14px;
}
</style>