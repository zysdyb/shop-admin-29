<template>
  <div class="users">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-input placeholder="请输入内容" v-model="query" class="input-with-select">
      <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
    </el-input>
    <el-button type="success" plain>添加用户</el-button>
    <!-- 表格 -->
    <el-table :data="userlist" style="width: 100%">
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="mg_state" label="用户状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" plain icon="el-icon-edit" size="mini"></el-button>
          <el-button
            type="danger"
            plain
            icon="el-icon-delete"
            @click="delUser(scope.row.id)"
            size="mini"
          ></el-button>
          <el-button type="success" plain icon="el-icon-check" size="mini">分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      background
    ></el-pagination>
  </div>
</template>

<script>
// 引入axios
import axios from 'axios'
export default {
  data() {
    return {
      userlist: [],
      query: '',
      currentPage: 1,
      pageSize: 2,
      total: 0
    }
  },
  methods: {
    getUserList() {
      axios({
        method: 'get',
        url: 'http://localhost:8888/api/private/v1/users',
        params: {
          query: this.query,
          pagenum: this.currentPage,
          pagesize: this.pageSize
        },
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }).then(res => {
        if (res.data.meta.status === 200) {
          this.userlist = res.data.data.users
          this.total = res.data.data.total
        }
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getUserList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getUserList()
    },
    search() {
      this.currentPage = 1
      this.getUserList()
    },
    delUser(id) {
      this.$confirm('您确定要删除吗', '温馨提示', {
        type: 'warning'
      })
        .then(() => {
          axios({
            method: 'delete',
            url: `http://localhost:8888/api/private/v1/users/${id}`,
            headers: {
              Authorization: localStorage.getItem('token')
            }
          }).then(res => {
            if (res.data.meta.status === 200) {
              if (this.userlist.length <= 1 && this.currentPage > 1) {
                this.currentPage--
              }
              this.getUserList()
              this.$message.success('删除成功了')
            }
          })
        })
        .catch(() => {
          this.$message.info('取消删除了')
        })
    }
  },
  created() {
    this.getUserList()
  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  height: 30px;
  line-height: 30px;
}
.el-input {
  width: 300px;
  margin-bottom: 5px;
}
</style>
