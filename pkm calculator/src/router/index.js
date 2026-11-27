import { createRouter, createWebHistory } from 'vue-router';
import HomeScreen from '../components/pages/Home.vue'
import Team from '../components/pages/Team.vue';


const routes = [
    { path: '/', component: HomeScreen },
    { path: '/team/', component: Team, props: (route) => ({team: route.query.team})}
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;