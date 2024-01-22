import { createRouter, createWebHistory } from 'vue-router';
import { Home, NotFound } from '@/views';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    linkActiveClass: 'active',
    routes: [
        { 
            path: '/', 
            component: Home, // set this base layout 
            name: 'home'
        },
        { 
            path: '/:catchAll(.*)',
            component: NotFound,
            name: 'notFound',
        }
    ]
})

export default router