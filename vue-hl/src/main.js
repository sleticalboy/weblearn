import {createApp} from 'vue'
import {createRouter, createWebHashHistory} from 'vue-router'

// 导入根组件
import App from '@/App.vue'
// 导入其他组件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const router = createRouter({
    routes: [
        {
            path: '/',
            redirect: '/login',
        },
        {
            path: '/login',
            component: () => import('@/Login.vue'),
            meta: {title: 'Login'}
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: () => import('@/Dashboard.vue'),
            children: [
                {
                    path: '/comp-api',
                    component: () => import('@/components/basic/composite-api.vue'),
                    meta: {requiresAuth: true, title: 'Composite Api'}
                },
                {
                    path: '/opt-api',
                    component: () => import('@/components/basic/options-api.vue'),
                    meta: {requiresAuth: true, title: 'Options Api'}
                },
            ],
            meta: {title: 'Dashboard'}
        },
        {
            path: '/404',
            component: () => import('@/404.vue'),
            name: 'not-fount',
            meta: {title: 'Not Found'}
        },
        {path: '/:pathMatch(.*)', redirect: '/404', hidden: true}
    ],
    history: createWebHashHistory(),
    // history: createWebHistory()
    // history: createMemoryHistory(),
    scrollBehavior: () => ({y: 0}),
})
router.beforeEach(async(to, from, next) => {
    console.log(`beforeEach() from '${from.path}' to '${to.path}'`)
    // 拦截并处理
    if (to.meta.title) {
        document.title = to.meta.title
    }
    if (from.path === '/' && to.path !== '/login') {
        // 判断是否登录
        const isLogin = () => {
            return true
        }
        if (isLogin()) {
            // 已登录，去 dashboard
            next({path: '/dashboard'})
        } else {
            // 未登录，去 login
            next({path: '/login'})
        }
    }
    next()
})
router.afterEach((to, from, failure) => {
    console.log(`afterEach() from '${from.path}' to '${to.path}' failure: '${failure}'`)
})

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
