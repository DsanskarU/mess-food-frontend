import API from "./axiosInstance";

// CHEF
export const addPreparedFood = (data) => {
  return API.post("/prepared/add", data);
};

// CHEF + STUDENT
export const getTodayPreparedFood = () => {
  return API.get("/prepared/today");
};

// CHEF
export const undoPreparedFood = (food_id) => {
  return API.delete(`/prepared-food/${food_id}`);
};