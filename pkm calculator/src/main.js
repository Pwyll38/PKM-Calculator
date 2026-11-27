import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'vue3-easy-data-table/dist/style.css';
import router from './router/index.js';

import PokemonDisplay from './components/reusables/PokemonDisplay.vue';

import Vue3EasyDataTable from 'vue3-easy-data-table';


const app = createApp(App)

app.component('PokemonDisplay', PokemonDisplay)

app.component('EasyDataTable', Vue3EasyDataTable)

app.use(router).mount('#app')
