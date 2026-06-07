import apiClient from "./apiClient";

export const getCustomers = async (searchName = "") => {
    const response = await apiClient.get('/api/customers', {
        params: {
            name: searchName
        }
    });
    return response.data;
};

export const createCustomer = async (customerData) => {
    const response = await apiClient.post('/api/customers', customerData)
    return response.data;
};

export const deleteCustomer = async (id) => {
    await apiClient.delete(`/api/customers/${id}`);
}