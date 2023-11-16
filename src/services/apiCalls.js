import axios from "axios";

const base_URL = "http://localhost:4000/"

export const logUser = async (body) => {
  return await axios.post(`${base_URL}user/login`, body);
}

export const registerUser = async (body) => {
  return await axios.post(`${base_URL}user/register`, body);
}

export const getWorkers = async () => {
  return await axios.get(`${base_URL}user/allWorkers?skip=12&page=1`);
}

export const profileUser = (token) => {
  return axios.get(`${base_URL}user/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUser = (body, token) => {
  return axios.put(`${base_URL}user/update`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const appointmentsUser = (token) => {
  return axios.get(`${base_URL}appointment/byUser?skip=12&page=1`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createAppointment = (body, token) => {
  return axios.post(`${base_URL}appointment/create`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateAppointment = (body, token) => {
  return axios.put(`${base_URL}appointment/update`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const allUsers = (token, page) => {
  return axios.get(`${base_URL}user/all?skip=12&page=${page}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const allAppointmens = (token) => {
  return axios.get(`${base_URL}appointment/bySuperAdmin?skip=12&page=1`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const portfolio = async () => {
  return await axios.get(`${base_URL}portfolio/get?skip=12&page=1`);
}

export const portfolioHome = async (page) => {
  return await axios.get(`${base_URL}portfolio/get?skip=6&page=${page}`);
}

export const getWorkersHome = async (page) => {
  return await axios.get(`${base_URL}user/allWorkers?skip=6&page=${page}`);
}

export const deleteAppointment = async (id, token) => {
  console.log(token);
  return await axios.delete(`${base_URL}appointment/delete`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      id: id,
    },
  });
};