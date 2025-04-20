import axios from 'axios'
// import cryptoJs from 'crypto-js';

// const URL_API = 'http://127.0.0.1:8000'
// const URL_API = 'https://docs.djangoproject.com/en/5.2/howto/deployment'
const URL_API = process.env.NODE_ENV === 'production'
    ? 'https://docs.djangoproject.com/en/5.2/howto/deployment/'  // URL de tu backend en producción
    : 'http://127.0.0.1:8000';  // URL de tu backend en desarrollo

const axiosInstance = axios.create({
    baseURL: URL_API + '/api',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Accept: 'application/json',
    }
});

export default async ({ app }) => {
    if (window.sessionStorage.getItem('auth_token')) {
        axiosInstance.defaults.headers.common.Authorization = 'Token ' + window.sessionStorage.getItem('auth_token');
    }

    app.config.globalProperties.$axios = axiosInstance;
};

export { axiosInstance, URL_API };

