import RouterView from '@/views/Index.vue';
import Index from '../pages/Login.vue';

// import Index from '@/views/Estadisticas/Index.vue';
// import Swal from 'sweetalert2';
// import Store from '@/store';

export default {
    path: '/',
    component: RouterView,
    children: [
        {
            path: '',
            component: Index,
            name: 'LoginPage'
        }
    ]
}
