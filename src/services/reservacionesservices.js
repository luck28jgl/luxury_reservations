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
    getReservaciones_priv (data) {
        return axiosInstance.get('/reservaciones/priv/', {
            params: data
        });
    },
    createreserv_client (data) {
        return axiosInstance.post('/reservaciones/create-for-user/', data);
    },
    list_reserv_client (data) {
        return axiosInstance.get('/reservaciones/user-reservations/',  {
            params: data
        });
    },

    createreserv (data) {
        return axiosInstance.post('/reservaciones/', data);
    },
    Deletereserv (data) {
        return axiosInstance.delete(`/reservaciones/${data.id}/delete-reservation/`);
    },

};
