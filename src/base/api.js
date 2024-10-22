import axios from "axios";
import { API_URL } from "../constants";

export const instanceAxios = axios.create({
    baseURL: API_URL
})
// {title: "name", price: 3}
const serialize = function (obj) {
    const str = [];
    for (let p in obj)
        if (obj.hasOwnProperty(p) && obj[p]) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&"); // title=name&price=3
}
export const dataProvider = (resource) => {
    const getList = async (limit, offset, search) => {

        // resource?limit=10&offset=0
        let url = `${resource}?limit=${limit}&offset=${offset}`;
        if (search) {
            url += "&" + serialize(search)
        }

        const res = await instanceAxios.get(url);
        return res.data;
    }


    const getOne = (id, data) => {
        return instanceAxios.get(`${resource}/${id}`, data)
    }

    return { getList, getOne }
}

export const createItem = async (resource, data) => {
    const res = await instanceAxios.post(`${resource}`, data);
    return res.data;
};

export const updateItem = async (id, data) => {
    const res = await instanceAxios.put(id, data);
    return res.data;
};

export const deleteItem = async (id) => {
    return await instanceAxios.delete(`/products/${id}`);
};

export const login = async (email, password) => {
    const res = await instanceAxios.post(`/auth/login`, {
        email,
        password
    });

    console.log(res.data);
    return res.data;
};

export const logout = () => {
    localStorage.removeItem("access_token");
};


export const uploadImages = async (files) => {
    if (!files || files.length === 0) {
      throw new Error("No files selected for upload.");
    }

    const uploadPromises = files.map((file) => {
      const formData = new FormData();
      formData.append("file", file.originFileObj);

      return instanceAxios.post("/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Upload response:", response.data);
        return response.data.location; 
      })
    });

    const uploadedUrls = await Promise.all(uploadPromises);
    return uploadedUrls;

};

