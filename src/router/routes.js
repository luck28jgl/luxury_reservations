import LoginPage from '../pages/Login.vue';
import resev from '../views/reservaciones/Index.vue';
// import Requisiciones from './Requisiciones.js';
import MainLayout from '../layouts/MainLayout.vue';


const routes = [
    // {
    //     path: '/',
    //     name: 'LoginPath',
    //     component: LoginPage,
    // },
    // {
    //     path: '/Reservacion',
    //     name: 'ReservacionPath',
    //     component: resev
    // },
    {
        path: '/',
        component: MainLayout,
        meta: { requiresAuth: true },
        children: [
            {
                path: '/Reservacion',
                name: 'ReservacionPath',
                component: resev
            },
            {
                path: '/',
                name: 'LoginPath',
                component: LoginPage,
            },
        ]
    }
];

export default routes