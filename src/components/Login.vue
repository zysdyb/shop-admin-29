<template>
  <div class="login">
    <el-form status-icon ref="form" :rules="rules" :model="form" label-width="80px">
      <img src="../assets/avatar.jpg" alt>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'change' },
          { min: 3, max: 9, message: '长度在 3 到 9 个字符', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' },
          {
            min: 6,
            max: 12,
            message: '长度在 6 到 12 个字符',
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    reset() {
      this.$refs.form.resetFields()
    },
    login() {
      this.$refs.form.validate(valid => {
        if (valid) {
          axios({
            method: 'post',
            url: 'http://localhost:8888/api/private/v1/login',
            data: this.form
          }).then(res => {
            if (res.data.meta.status === 200) {
              this.$message.success('登录成功')
              localStorage.setItem('token', res.data.data.token)
              this.$router.push('/home')
            } else {
              this.$message({
                message: res.data.meta.msg,
                type: 'error',
                duration: 1000
              })
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
.login {
  height: 100%;
  width: 100%;
  background-color: #2d434c;
  overflow: hidden;

  .el-form {
    width: 400px;
    background-color: #fff;
    margin: 200px auto;
    padding: 75px 40px 15px;
    border-radius: 10px;
    position: relative;

    img {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: -70px;
      border-radius: 50%;
      border: 10px solid #fff;
    }

    .el-button:nth-child(2) {
      margin-left: 80px;
    }
  }
}
</style>
