import Axios from '../utils/Axios.js';

const API_URL = '/admin';

export const adminLogin = async (payload) => {
    const response = await Axios.post(`${API_URL}/login`, payload);
    return response;
}