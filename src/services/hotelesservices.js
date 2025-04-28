import { axiosInstance } from '@/boot/axios';

export default {
    // getNot (data) {
    //     return axiosInstance.get('/notifications/', {
    //         params: data
    //     });
    // },
    get_hoteles (data) {
        return axiosInstance.get('/hoteles/', {
            params: data
        });
    },
    createhotel (data) {
        return axiosInstance.post('/hoteles/', data);
    },
    Deletehotel (data) {
        return axiosInstance.delete(`/hoteles/${data.id}/delete-reservation/`);
    },
    editCotizacion (data) {
        return axiosInstance.put(`/hoteles/${data.id}/`, data);
    },
};
