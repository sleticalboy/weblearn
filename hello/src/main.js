import './assets/main.css'

import { createApp, ref } from 'vue'
// import App from './App.vue'
// createApp(App).mount('#app')
import HelloRef from './basic/HelloRef.vue'

const app = createApp(HelloRef)
app.config.errorHandler = (err) => {
  console.log('error handled: ' + err)
}
// 挂载应用到 id 为 app 的页面元素上
app.mount('#app')
