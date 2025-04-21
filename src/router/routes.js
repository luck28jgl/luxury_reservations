import LoginPage from '../pages/Login.vue';
import Logincompra from '../pages/Logincompra.vue';
import resev from '../views/requisiciones/Index.vue';
// import Requisiciones from './Requisiciones.js';
import MainLayout_public from '../layouts/MainLayout_public.vue';
import MainLayout from '../layouts/MainLayout.vue';
import Store from '@/store';
// import axiosInstance from '@/axios.js';
import { axiosInstance } from '@/boot/axios';

const routes = [

    {
        path: '/',
        component: MainLayout_public,
        meta: { requiresAuth: true },
        children: [
            {
                path: '/',
                name: 'LoginPath',
                component: LoginPage,
            },
            {
                path: '/Inicio-sesion',
                name: 'ReservacionPath',
                component: resev,
            },
        ]
    },
    {
        path: '/',
        component: MainLayout,
        meta: { requiresAuth: true },
        children: [
            {
                path: '/lista-all-reservation',
                name: 'LoginCompra',
                component: Logincompra,
            },
        ],
        beforeEnter: (to, from, next) => {
            if (to.meta.requiresAuth && !sessionStorage.getItem('auth_token')) {
                next({
                    name: 'LoginPath'
                })
            } else {
                const tipoUsuario = Store.state.user.type;
                if (sessionStorage.getItem('auth_token')) {
                    axiosInstance.defaults.headers.common = {
                        Accept: 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                        Authorization: 'Token ' + sessionStorage.getItem('auth_token')
                    };
                }
                if (tipoUsuario  === 1 && to.path == '/' ) {
                    next('/lista-all-reservation');
                }  else {
                    next();
                }
                // next();
            }
        }
    }
];

export default routes