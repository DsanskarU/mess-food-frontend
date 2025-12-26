import API from "./axiosInstance";

// STUDENT
export const addFeedback = (data) => {
  return API.post("/feedback/add", data);
};

// CHEF
export const getTodayFeedback = () => {
  return API.get("/feedback/today");
};

export const getFoodFeedback = (foodId) => {
  return API.get(`/feedback/food/${foodId}`);
};
