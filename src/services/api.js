import axios from "axios";

// API Base URL - connect to backend
const API_URL = import.meta.env.VITE_API_URL;


// --- API Helper ---
const api = {
    // Auth
    login: async (email, password) => {
        const res = await axios.post(`${API_URL}/auth/login`, { email, password });
        return res.data;
    },
    getAdmin: async () => {
        const res = await axios.get(`${API_URL}/auth/admin`);
        return res.data;
    },
    updateAdminName: async (name) => {
        const res = await axios.put(`${API_URL}/auth/admin/name`, { name });
        return res.data;
    },

    // Stats
    getStats: async () => {
        const res = await axios.get(`${API_URL}/stats`);
        return res.data;
    },

    // Repairs
    getRepairs: async () => {
        const res = await axios.get(`${API_URL}/repairs`);
        return res.data;
    },
    createRepair: async (data) => {
        const res = await axios.post(`${API_URL}/repairs`, data);
        return res.data;
    },
    updateRepair: async (id, data) => {
        const res = await axios.put(`${API_URL}/repairs/${id}`, data);
        return res.data;
    },
    deleteRepair: async (id) => {
        const res = await axios.delete(`${API_URL}/repairs/${id}`);
        return res.data;
    },
    updateRepairStatus: async (id, status) => {
        const res = await axios.patch(`${API_URL}/repairs/${id}/status`, {
            status,
        });
        return res.data;
    },
    searchRepairs: async (query) => {
        const res = await axios.get(`${API_URL}/search/repairs?q=${query}`);
        return res.data;
    },

    // Customers
    getCustomers: async () => {
        const res = await axios.get(`${API_URL}/customers`);
        return res.data;
    },
    createCustomer: async (data) => {
        const res = await axios.post(`${API_URL}/customers`, data);
        return res.data;
    },
    updateCustomer: async (id, data) => {
        const res = await axios.put(`${API_URL}/customers/${id}`, data);
        return res.data;
    },
    deleteCustomer: async (id) => {
        const res = await axios.delete(`${API_URL}/customers/${id}`);
        return res.data;
    },
    searchCustomers: async (query) => {
        const res = await axios.get(`${API_URL}/search/customers?q=${query}`);
        return res.data;
    },
};

export default api;
