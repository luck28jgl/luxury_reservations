import { createWebHistory, createRouter } from "vue-router";
import routes from "./routes";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const authToken = sessionStorage.getItem('auth_token');
//   const lastVisitedRoute = sessionStorage.getItem('lastVisitedRoute');

//   // Guarda la última ruta visitada, excepto si es la página de inicio de sesión
//   if (to.name !== 'LoginPath') {
//     sessionStorage.setItem('lastVisitedRoute', to.fullPath);
//     console.log('Última ruta guardada:', to.fullPath);
//   }

//   // Redirige al usuario autenticado a la última ruta visitada
//   if (authToken && to.name === 'LoginPath' && lastVisitedRoute) {
//     next(lastVisitedRoute);
//   } else {
//     next();
//   }
// });

export default router;