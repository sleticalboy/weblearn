<script>
import {ArrowDown, Lightning, Location, MoonNight, Setting, UserFilled} from "@element-plus/icons-vue";

export default {
  name: 'App',
  components: {MoonNight, Lightning, UserFilled, ArrowDown, Setting, Location},
  mounted() {
  },
  methods: {
    compApi() {
      this.$router.push({path: '/comp-api'})
    },
    optApi() {
      this.$router.push({path: '/opt-api'})
    },
    doLogout() {
      this.$router.push({path: '/login'})
    }
  }
}
</script>

<template>
  <div id="app">
    <el-container style="height: 900px; border: 1px solid #eee">
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown trigger="click" style="height: 100%; text-align: center">
          <span class="el-dropdown-link">下拉菜单 <el-icon><arrow-down/></el-icon></span>
          <template #dropdown>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-icon>
                  <user-filled/>
                </el-icon>
                用户中心
              </el-dropdown-item>
              <el-dropdown-item>
                <el-icon>
                  <setting/>
                </el-icon>
                设置
              </el-dropdown-item>
              <el-dropdown-item disabled>
                <el-icon>
                  <moon-night/>
                </el-icon>
                主题
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
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
        <el-text>用户 | 角色 </el-text>
        <el-button @click="doLogout">退出</el-button>
      </el-footer>
    </el-container>
  </div>
</template>

<style>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
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