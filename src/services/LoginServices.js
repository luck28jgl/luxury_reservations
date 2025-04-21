import { axiosInstance } from '@/boot/axios';

export default {
    login (data) {
        return axiosInstance.post('/token/login/', data);
    },
    create_user (data) {
        return axiosInstance.post('/usuarios/', data);
    },

    // getDataUser () {
    //     return axiosInstance.get('/users/me/');
    // },

    getUType (data) {
        return axiosInstance.post('/obtener-tipo-usuario/', data);
    },

    logut () {
        return axiosInstance.post('/token/logout/', sessionStorage.getItem('auth_token'));
    },
    // verifyEmail (data) {
    //     return axiosInstance.post('/core/passwordCode/verificacion-usuario/', data)
    // },
    // verifyCode (data) {
    //     return axiosInstance.post('/core/passwordCode/verify-code/', data)
    // },
    // updatePasswor (data) {
    //     return axiosInstance.post('/core/passwordCode/update-pass/', data)
    // }
};
