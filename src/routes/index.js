import { createRouter, createWebHistory } from 'vue-router';

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
            path: '/:catchAll(.*)',
            component: () => import('@/views/NotFoundPage.vue'),
        }
    ]
});

export default router;