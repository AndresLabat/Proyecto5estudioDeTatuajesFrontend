import axios from "axios";

export const logUser = async (body) => {
    return await axios.post(`http://localhost:4000/user/login`, body);
}

export const registerUser = async (body) => {
    return await axios.post(`http://localhost:4000/user/register`, body);
}

export const getWorkers = async () => {
    return await axios.get(`http://localhost:4000/user/allWorkers?skip=12&page=1`);
}

export const profileUser = (token) => {
    return axios.get("http://localhost:4000/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

export const updateUser = (body, token) => {
  return axios.put("http://localhost:4000/user/update", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const appointmentsUser = (token) => {
  return axios.get("http://localhost:4000/appointment/byUser?skip=12&page=1", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};