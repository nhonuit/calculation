import axios from "axios";

const API_URL = process.env.API_URL;
export const getUsersListByType = async (type) => {
    return await axios.get(`${API_URL}/users`, type)
}