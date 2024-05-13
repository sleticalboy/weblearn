import router from "@/router/index.js";

router.beforeEach(async (to, from, next) => {
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