import axios from "axios";
import { API_URL } from "../constants";

export const instanceAxios = axios.create({
    baseURL: API_URL
})

export const dataProvider = (resource) => {
    const getList = async (limit, offset) => {
// resource?limit=10&offset=0
        const res = await instanceAxios.get(`${resource}?limit=${limit}&offset=${offset}`);

        return res.data;
    }
    const getOne = (id, data) => {
        return instanceAxios.get(`${resource}/${id}`, data)
    }



    return { getList, getOne }
}