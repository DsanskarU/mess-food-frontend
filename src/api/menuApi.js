import API from "./axiosInstance";

export const addMenu = (data) => {
    return API.post("/menu/add",data);
}

export const getTodayMenu = () => {
    return API.get("/menu/today");
}

export const getMenuByDate = (date) => {
    return API.get(`/menu/date/${date}`);
}