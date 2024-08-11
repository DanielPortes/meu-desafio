import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ApiView from "@/views/ApiView.vue"

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/api',
        name: 'Api',
        component: ApiView
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router