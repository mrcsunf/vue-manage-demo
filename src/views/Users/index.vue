<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card class="box-card">
      <!-- 搜索与添加 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表区 -->
      <el-table :data="tableData" border stripe>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="tel"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scop">
            <!-- {{ scop.row }} -->
            <el-switch v-model="scop.row.mg_state"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <!-- 修改按钮 -->
          <el-tooltip
            effect="dark"
            content="修改"
            placement="top"
            :enterable="false"
          >
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
            ></el-button>
          </el-tooltip>
          <!-- 删除按钮 -->
          <el-tooltip
            effect="dark"
            content="删除"
            placement="top"
            :enterable="false"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
            ></el-button>
          </el-tooltip>
          <!-- 分配角色按钮 -->
          <el-tooltip
            effect="dark"
            content="分配角色"
            placement="top"
            :enterable="false"
          >
            <el-button
              type="warning"
              icon="el-icon-setting"
              size="mini"
            ></el-button>
          </el-tooltip>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      query: "",
      // 当前页数
      pagenum: 1,
      // 当前每页显示多少条数据
      pagesize: 5,
      // 用户数量
      total: 0,
      userList: [
        {
          username: "张三",
          email: "mrcsunf@163.com",
          tel: "17352226332",
          role_name: "超级管理员",
          mg_state: true,
        },
        {
          username: "李四",
          email: "mrcsunf@163.com",
          tel: "17352226332",
          role_name: "测试角色",
          mg_state: false,
        },
        {
          username: "李四",
          email: "mrcsunf@163.com",
          tel: "17352226332",
          role_name: "测试角色",
          mg_state: false,
        },
        {
          username: "李四",
          email: "mrcsunf@163.com",
          tel: "17352226332",
          role_name: "测试角色",
          mg_state: false,
        },
        {
          username: "李四",
          email: "mrcsunf@163.com",
          tel: "17352226332",
          role_name: "测试角色",
          mg_state: false,
        },
        {
          username: "李四",
          email: "mrcsunf@163.com",
          tel: "17352226332",
          role_name: "测试角色",
          mg_state: false,
        },
        {
          username: "李四",
          email: "mrcsunf@163.com",
          tel: "17352226332",
          role_name: "测试角色",
          mg_state: false,
        },
      ],
      //当前页码的表格数据
      tableData: [],
    };
  },
  methods: {
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      console.log(newSize + "条/页");
      this.pagenum = 1;
      this.pagesize = newSize;
      this.getUserList();
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      console.log("第" + newPage + "页");
      this.pagenum = newPage;
      this.getUserList();
    },
    // 获取用户列表
    getUserList() {
      // 获取用户数量
      this.total = this.userList.length;
      this.tableData = this.getNeedArr(this.userList, this.pagesize)[
        this.pagenum - 1
      ];
      // 数组里边存放的对象
      console.log(this.tableData);
    },
    //获取所需指定长度分割的数组;参数1为用于分割的总数组,参数2为分割数组后每个小数组的长度
    getNeedArr(array, size) {
      const length = array.length;
      //判断不是数组，或者size没有设置，size小于1，就返回空数组
      if (!length || !size || size < 1) {
        return [];
      }
      //核心部分
      let index = 0; //用来表示切割元素的范围start
      let resIndex = 0; //用来递增表示输出数组的下标
      //根据length和size算出输出数组的长度，并且创建它。
      let result = new Array(Math.ceil(length / size));
      //进行循环
      while (index < length) {
        //循环过程中设置result[0]和result[1]的值。该值根据array.slice切割得到。
        result[resIndex++] = array.slice(index, (index += size));
      }
      // 新的数组
      // console.log(result);
      //输出新数组
      return result;
    },
  },
  created() {
    this.getUserList();
  },
};
</script>

<style lang="less" scoped>
</style>