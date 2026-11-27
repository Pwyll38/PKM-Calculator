import { createRouter, createWebHistory } from 'vue-router';
import HomeScreen from '../components/pages/Home.vue'


const routes = [
    { path: '/', component: HomeScreen },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;