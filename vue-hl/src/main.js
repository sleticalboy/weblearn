import {createApp} from 'vue'

// 导入根组件
import App from '@/App.vue'
// 导入其他组件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import router from '@/router/index.js'
import '@/permisions/index.js'

const app = createApp(App)
app.use(router)
// 注册应用范围内可用的组件
// app.component('element-ui', null)
// 使用 element-ui 组件
app.use(ElementPlus)
// 错误处理器
app.config.errorHandler = (err) => {
    console.log(`error handled: ${err}`)
}
// 挂载应用到 id 为 app 的页面元素上
app.mount('#app')
