<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123456',
      }
    }
  },
  methods: {
    doLogin() {
      if (this.loginForm.username === 'admin' && this.loginForm.password === '123456') {
        this.$router.push({path: '/dashboard'})
      }
    }
  }
}
</script>

<template>
  <div style="text-align: center">
    <el-form :model="loginForm">
      <el-form-item label="用户名">
        <el-input v-model="loginForm.username" type="text" autocomplete="on" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="loginForm.password" placeholder="请输入密码" show-password></el-input>
      </el-form-item>
      <el-button @click="doLogin">登录</el-button>
    </el-form>
  </div>
</template>

<style scoped>

</style>