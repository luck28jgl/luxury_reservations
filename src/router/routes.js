import LoginPage from '../pages/Login.vue';
import Logincompra from '../pages/Logincompra.vue';
import hotel_create from '../views/hoteles/Index.vue';
import resev from '../views/requisiciones/Index.vue';
import reservaciones_cliente from '../views/reservaciones_cliente/Index.vue';
import mis_reservaciones from '../views/mis_reservaciones/Index.vue';
// import Requisiciones from './Requisiciones.js';
import MainLayout_public from '../layouts/MainLayout_public.vue';
import MainLayout from '../layouts/MainLayout.vue';
import Store from '@/store';
// import axiosInstance from '@/axios.js';
import { axiosInstance } from '@/boot/axios';

const routes = [
    // ...otras rutas...
    {
        path: '/:catchAll(.*)',
        redirect: '/crear-reservacion', // Redirige cualquier ruta no encontrada
    },
    {
        path: '/',
        component: MainLayout_public,
        meta: { requiresAuth: true },
        children: [
            {
                path: '',
                redirect: '/crear-reservacion', // Redirige la raíz al componente de LoginPage
            },
            {
                path: '/crear-reservacion',
                name: 'LoginPath',
                component: LoginPage,
            },
            {
                path: '/Inicio-sesion',
                name: 'ReservacionPath',
                component: resev,
            },

        ],

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
                beforeEnter: (to, from, next) => {
                    const authToken = sessionStorage.getItem('auth_token');
                    if (!authToken) {
                        next('/crear-reservacion'); // Redirige solo si no hay token
                    } else {
                        next(); // Permite el acceso si hay token
                    }
                }
            },
            {
                path: '/crear-hotel',
                name: 'hotelcreate',
                component: hotel_create,
            },
            {
                path: '/reservar',
                name: 'reservaIndex',
                component: reservaciones_cliente,
            },
            {
                path: '/mis-reservaciones',
                name: 'reservacionesIndex',
                component: mis_reservaciones,
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
                if (tipoUsuario === 0) {
                    if (to.path !== '/lista-all-reservation') {
                        next('/lista-all-reservation'); // Evita redirigir si ya estás en '/lista-all-reservation'
                    } else {
                        next();
                    }
                }if (tipoUsuario === 1) {
                    if (to.path !== '/reservar') {
                        next('/reservar'); // Evita redirigir si ya estás en '/crear-hotel'
                    } else {
                        next();
                    }
                } else {
                    if (to.path !== '/crear-reservacion') {
                        next('/crear-reservacion'); // Evita redirigir si ya estás en '/crear-reservacion'
                    } else {
                        next();
                    }
                }
                // next();
            }
        }
    }
];

export default routes