import apiClient from "./apiClient";

export const getCustomers = async () => {
    const response = await apiClient.get('/api/customers');
    return response.data;
}