import axios from 'axios';

export const userAPI = { baseURL: "http://localhost:4000/api/" };

const usePostData = async function(url, data) {
    const controller = new AbortController();
    const config = {
        url: url,
        method: 'post',
        headers: { "Content-type": "application/json" },
        signal: controller.signal,
        data: data,
    };
    try {
        const response = await axios(config);
    } catch (err) {

    }
}

Object.defineProperty(userAPI, "post", usePostData);

