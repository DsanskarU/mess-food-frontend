import API from "./axiosInstance";

export const getTodayFeedbackAnalysis = () => {
  return API.get("/analysis/today");
};