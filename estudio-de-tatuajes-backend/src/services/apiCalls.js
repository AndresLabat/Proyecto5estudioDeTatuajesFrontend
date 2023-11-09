import axios from "axios";

export const loginConnection = (body) => {
    return axios.post(`http://localhost:5173/api/user/login`, body);
}
