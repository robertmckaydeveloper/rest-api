import axios from 'axios'
import keycloak from '../auth/keycloak'

const apiClient = axios.create({
    baseURL: 'http://backend:8080'
});

apiClient.interceptors.request.use(
    async (config) => {
        if (keycloak.token) {
            try {
                await keycloak.updateToken(5);
                config.headers.Authorization = `Bearer ${keycloak.token}`;
            } catch (error) {
                console.error("Failed to refresh token, logging out...", error);
                keycloak.logout();
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;