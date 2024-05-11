import './assets/main.css'

import {createApp} from 'vue'
import {createRouter} from 'vue-router'

// 导入根组件
import compositeApi from './basic/composite-api.vue'
import optionsApi from './basic/options-api.vue'

// 根组件
// const app = createApp(compositeApi)
const app = createApp(optionsApi)

// const router = createRouter({
//     routes: [
//         // 404 pages
//         {path: '*', redirect: '/404', hidden: true}
//     ],
// })
// app.use(router)

// 注册应用范围内可用的组件
// app.component('element-ui', null)

// 错误处理器
app.config.errorHandler = (err) => {
    console.log(`error handled: ${err}`)
}
// 挂载应用到 id 为 app 的页面元素上
app.mount('#app')
