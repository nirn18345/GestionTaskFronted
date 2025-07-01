import { useEffect } from 'react';
import axios from 'axios';
import { useModal } from './ModalContext';

const AxiosInterceptorInitializer = () => {
  const { showModal } = useModal();

  useEffect(() => {
    // Interceptor para agregar el token en cada solicitud
    axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');

        // No agregar token al endpoint de login
        if (token && config.url && !config.url.includes('/login')) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    // Interceptor de errores en respuestas
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error.response?.status;
        const msg = error.response?.data?.message || 'Unexpected error';
        let title = 'Error';
        switch (status) {
          case 401:
            title = 'Incorrect credentials';
            break;
          case 403:
            title = 'Access denied';
            break;
          case 402:
            title = 'Error';
            break;
          case 404:
            title = 'Resource not found';
            break;
          case 500:
            title = 'Server error';
            break;
          default:
            title = `Error (${status})`;
        }

        showModal('error', msg, title);
        return Promise.reject(error);
      }
    );
  }, [showModal]);

  return null;
};

export default AxiosInterceptorInitializer;
