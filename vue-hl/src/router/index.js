import {createRouter, createWebHashHistory} from "vue-router";

const routes = [
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
]

function newRouter() {
    return createRouter({
        routes: routes,
        history: createWebHashHistory(),
        scrollBehavior: () => ({y: 0}),
    })
}

const router = newRouter()

export function resetRouter() {
    const r = newRouter()
    router.matcher = r.matcher
}

export default router