import API from "./axiosInstance";

// STUDENT
export const voteFood = (food_id) => {
  return API.post("/vote/add", {food_id});
};

// CHEF
export const getTodayVoteResult = () => {
  return API.get("/vote/result/today");
};

export const getMyTodayVotes = () => {
  return API.get("/vote/my-votes");
};