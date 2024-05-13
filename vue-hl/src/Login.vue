<script>

import {login} from "@/api/users.js";

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
      login(this.loginForm).then((r, err) => {
        console.log(`login() ${r}, ${err}`)
        if (err) {
          // 登录失败
        } else {
          this.$router.push({path: '/dashboard'})
        }
      })
    },
  },
}
</script>

<template>
  <div id="xxx">
    <el-form :model="loginForm">
      <el-row :gutter="10">
        <el-col class="form-label" :span="6">用户名:</el-col>
        <el-col :span="18">
          <el-form-item>
            <el-input v-model="loginForm.username" type="text" autocomplete="on" placeholder="请输入用户名"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col class="form-label" :span="6">密码:</el-col>
        <el-col :span="18">
          <el-form-item>
            <el-input v-model="loginForm.password" placeholder="请输入密码" show-password></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24"><el-button @click="doLogin" style="width: 100%">登录</el-button></el-col>
      </el-row>
    </el-form>
  </div>
</template>

<style scoped>
.form-label {
  text-align: right;
}
#xxx {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vh;
  height: 100vh;
}
</style>