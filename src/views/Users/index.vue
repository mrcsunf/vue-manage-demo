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
          <el-button type="primary" @click="addDialogVisiable = true"
            >添加用户</el-button
          >
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
              @click="delUser"
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

    <!-- 添加用户的对话框 -->
    <el-dialog
      title="提示"
      :visible.sync="addDialogVisiable"
      width="50%"
      @close="addDialogCloesd"
    >
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="tel">
          <el-input v-model="addForm.tel"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisiable = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    // 验证邮箱的规则
    var checkEmail = (rule, value, cb) => {
      // 验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      if (regEmail.test(value)) {
        // 合法的邮箱
        return cb();
      }
      cb(new Error("请输入合法的邮箱"));
    };
    // 验证手机号的规则
    var checkTel = (rule, value, cb) => {
      // 验证手机号的正则表达式
      // 匹配手机号码的正则表达式：/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/
      // /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      const regTel = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;

      if (regTel.test(value)) {
        // 合法的手机号
        return cb();
      }
      cb(new Error("请输入合法的手机号"));
    };
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
      // 用户对话框的显示与隐藏
      addDialogVisiable: false,
      // 添加用户的表单数据
      addForm: {
        username: "",
        password: "",
        email: "",
        tel: "",
      },
      // 添加表单的验证规则对象
      addFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "用户名在3~10个字符之间",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "密码在6~18个字符之间",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
        ],
        tel: [
          { required: true, message: "请输入电话", trigger: "blur" },
          { validator: checkTel, trigger: "blur" },
        ],
      },
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
    // 删除方法
    delUser() {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 监听添加用户对话框的关闭事件
    addDialogCloesd() {
      this.$refs.addFormRef.resetFields();
    },
    // 添加用户
    addUser() {
      this.$refs.addFormRef.validate((valid) => {
        if (!valid) return;
        console.log(valid);
        // 验证通过，发起网络请求
      });
    },
  },
  created() {
    this.getUserList();
  },
};
</script>

<style lang="less" scoped>
</style>