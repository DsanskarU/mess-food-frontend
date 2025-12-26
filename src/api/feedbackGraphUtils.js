export const prepareMealWiseData = (feedbackList) => {
  const meals = {
    BREAKFAST: { LIKE: 0, DISLIKE: 0 },
    LUNCH: { LIKE: 0, DISLIKE: 0 },
    DINNER: { LIKE: 0, DISLIKE: 0 }
  };

  feedbackList.forEach(item => {
    if (item.sentiment === "LIKE") meals[item.meal_time].LIKE++;
    if (item.sentiment === "DISLIKE") meals[item.meal_time].DISLIKE++;
  });

  return Object.keys(meals).map(meal => ({
    meal,
    LIKE: meals[meal].LIKE,
    DISLIKE: meals[meal].DISLIKE
  }));
};
