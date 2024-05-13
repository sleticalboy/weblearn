<script>
import {
  ArrowDown, Avatar,
  DocumentAdd, DocumentChecked, Finished,
  Lightning,
  Location,
  MoonNight, Rank,
  RemoveFilled,
  Setting, Timer,
  UserFilled
} from "@element-plus/icons-vue";

import {logout, settings} from "@/api/users.js";

function handleSettings(r) {
  r.settings.forEach(item => {
    switch (item.key) {
      case 'profile':
        item.handler = () => {}
        break
      case 'settings':
        item.handler = () => {};
        break
      case 'theme':
        item.handler = () => {};
        break
    }
  })
  return r
}

export default {
  name: 'App',
  components: {
    Avatar,
    Timer,
    Rank,
    Finished,
    DocumentChecked,
    DocumentAdd,
    RemoveFilled,
    MoonNight,
    Lightning,
    UserFilled,
    ArrowDown,
    Setting,
    Location
  },
  data() {
    return {
      settings: {
        data: {},
        err: null
      },
    }
  },
  mounted() {
    settings().then((r, err) => {
      this.settings.data = handleSettings(r['data'])
      this.settings.err = err
    })
    this.compApi()
  },
  methods: {
    compApi() {
      this.$router.push({path: '/comp-api'})
    },
    optApi() {
      this.$router.push({path: '/opt-api'})
    },
    doLogout() {
      logout().then(r => {
        console.log(`doLogout() data: ${r}`)
        this.$router.push({path: '/login'})
      })
    }
  }
}
</script>

<template>
  <div id="app">
    <el-container style="height: 950px; border: 1px solid #eee">
      <el-header>
        <el-row :gutter="22">
          <el-col :span="12" style="text-align: start; align-items: center">
            <el-text>
              <el-icon><Rank /></el-icon> vue 学习指南
            </el-text>
          </el-col>
          <el-col :span="12" style="text-align: right;padding-right: 0">
            <el-dropdown v-if="settings.data && settings.err == null" trigger="click">
              <el-button type="text">
                配置中心 <el-icon class="el-icon--down"><arrow-down /></el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="item in settings.data.settings" :key="item.key"
                                    @click="item.handler" divided>
                    {{item.desc}}
                  </el-dropdown-item>
                  <el-dropdown-item @click="doLogout" divided>
                    退出登录
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
          <el-menu router mode="vertical" default-active="1">
            <el-menu-item index="1" @click="compApi">组合式 api</el-menu-item>
            <el-menu-item index="2" @click="optApi">选项式 api</el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
      <el-footer style="text-align: right">
        <el-text><el-icon><Avatar /></el-icon> {{settings.data.user}} | {{settings.data.role}} <el-icon><Timer /></el-icon> {{settings.data.login_time}}</el-text>
      </el-footer>
    </el-container>
  </div>
</template>

<style>
.el-text, .el-button {
  font-size: 1.5em;
}
.el-header, .el-footer {
  --el-header-padding: 0 10px;
  --el-footer-padding: 0 10px;
  height: auto;
}

.el-aside {
  color: #333;
}

.el-memu-item {
  text-align: center;
  border: 1px solid #6c373f;
  margin-bottom: 1px;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}

.el-icon-arrow-down {
  font-size: 12px;
}
</style>