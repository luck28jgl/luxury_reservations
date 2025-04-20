import { axiosInstance } from '@/boot/axios';

export default {
    getNot (data) {
        return axiosInstance.get('/notifications/', {
            params: data
        });
    },
    getReservaciones (data) {
        return axiosInstance.get('/reservaciones/', {
            params: data
        });
    },
    createreserv (data) {
        return axiosInstance.post('/reservaciones/', data);
    },

};
