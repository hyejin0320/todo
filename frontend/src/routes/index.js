import { createRouter, createWebHistory } from 'vue-router';
// import { getCookie } from '@/utils/cookies';

const onlyAuthUser = (to, from, next) => {
    next();
    // if(getCookie('userId')) next();
    // else next('/');
}

const router = createRouter({
    history: createWebHistory(process.env.COMMON_API_URL),
    routes: [
        {
            path:'/',
            redirect: '/login',
        },
        {
            path:'/login',
            component: () => import('@/views/LoginPage.vue'),
        },
        {
            path:'/signup',
            component: () => import('@/views/SignupPage.vue'),
        },
        {
            path: '/group',
            component: () => import('@/views/MainPage.vue'),
            beforeEnter: onlyAuthUser,
        },
        {
            path: '/test',
            component: () => import('@/views/TestPage.vue'),
            beforeEnter: onlyAuthUser,
        },
        {
            path: '/:catchAll(.*)',
            component: () => import('@/views/NotFoundPage.vue'),
        }
    ]
});

export default router;