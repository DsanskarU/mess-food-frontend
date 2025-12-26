import API from "./axiosInstance";

//STUDENT + CHEF
export const getAllFoodItems = () => {
    return API.get("/food")
}

// CHEF ONLY
export const addFoodItem = (data) => {
  return API.post("/food/add", data);
};

export const updateFoodItem = (id, data) => {
  return API.put(`/food/update/${id}`, data);
};

export const deleteFoodItem = (id) => {
  return API.delete(`/food/delete/${id}`);
};
