import API from "./axiosInstance";

export const getAllUsers = () => {
  return API.get("/users");
};

export const getUserById = (id) => {
  return API.get(`/users/${id}`);
};

export const updateUser = (id, data) => {
  return API.put(`/users/update/${id}`, data);
};

export const deleteUser = (id) => {
  return API.delete(`/users/${id}`);
};
