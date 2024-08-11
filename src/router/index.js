import {createRouter, createWebHashHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ApiView from "@/views/ApiView.vue"
import AboutView from '../views/AboutView.vue'
import NotFound from "@/views/NotFound.vue";

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
    {
        path: '/about',
        name: 'About',
        component: AboutView
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router