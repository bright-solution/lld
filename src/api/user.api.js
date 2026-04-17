import Axios from '../utils/Axios.js';

const API_URL = '/users';

export const getLevelWiseTeam = async (payload) => {
    const response = await Axios.get(`${API_URL}/get-level-wise-team`, payload);
    return response;
}