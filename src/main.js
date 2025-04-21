import './assets/main.css'
import './output.css'; 
import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index.js'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/Index.css';
import store from './store'; // Importa tu store de Vuex


const app = createApp(App)
// createApp(App)
app.use(router)
app.use(store);
// app.use(Loading);
app.component('Loading', Loading);
app.use(VueSweetalert2)
app.mount('#app')
