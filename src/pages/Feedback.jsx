import React, { useEffect, useState } from "react";
import { addFeedback } from "../api/feedbackApi";
import { getTodayPreparedFood } from "../api/preparedApi";

const Feedback = () => {
  const [foods, setFoods] = useState([]);
  const [rating, setRating] = useState({});
  const [comment, setComment] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitted, setSubmitted] = useState([]);

  useEffect(() => {
    loadPreparedFoods();
  }, []);

  const loadPreparedFoods = async () => {
    try {
      const res = await getTodayPreparedFood();
      setFoods(
        res.data.map(f => ({
          ...f,
          category: f.category.toUpperCase()
        }))
      );
    } catch {
      setError("Failed to load foods");
    }
  };

  const handleSubmit = async (food) => {
    try {
      setError("");
      setSuccess("");

      if (!rating[food.id]) {
        setError("Please select rating");
        return;
      }

      const payload = {
        food_id: food.id,
        rating: Number(rating[food.id]),
        comment: comment[food.id] || "",
        meal_time: food.category
      };

      await addFeedback(payload);

      setSubmitted(prev => [...prev, food.id]);
      setSuccess("Feedback submitted successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Submission failed");
    }
  };

  // 🔥 Modern Meal Section UI
  const MealSection = ({ title, icon, color, category }) => {
    const mealFoods = foods.filter(f => f.category === category);
    if (!mealFoods.length) return null;

    return (
      <div className={`card shadow-sm mb-5 border-${color}`}>
        <div className={`card-header bg-${color} text-white`}>
          <h5 className="mb-0">
            {icon} {title}
          </h5>
        </div>

        <div
          className="card-body p-0"
          style={{ maxHeight: "320px", overflowY: "auto" }}
        >
          <table className="table table-hover table-bordered mb-0">
            <thead className="table-light sticky-top">
              <tr>
                <th>Food</th>
                <th>Type</th>
                <th>Rating</th>
                <th>Comment</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {mealFoods.map(food => (
                <tr key={food.id}>
                  <td className="fw-semibold">{food.food_name}</td>

                  <td>
                    <span
                      className={`badge ${
                        food.is_veg === 1 ? "bg-success" : "bg-danger"
                      }`}
                    >
                      {food.is_veg === 1 ? "VEG" : "NON-VEG"}
                    </span>
                  </td>

                  <td style={{ width: "120px" }}>
                    <select
                      className="form-select form-select-sm"
                      disabled={submitted.includes(food.id)}
                      value={rating[food.id] || ""}
                      onChange={(e) =>
                        setRating(prev => ({
                          ...prev,
                          [food.id]: e.target.value
                        }))
                      }
                    >
                      <option value="">⭐</option>
                      {[1, 2, 3, 4, 5].map(r => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </td>

                  <td>
                    <input
                      className="form-control form-control-sm"
                      placeholder="Optional"
                      disabled={submitted.includes(food.id)}
                      value={comment[food.id] || ""}
                      onChange={(e) =>
                        setComment(prev => ({
                          ...prev,
                          [food.id]: e.target.value
                        }))
                      }
                    />
                  </td>

                  <td style={{ width: "120px" }}>
                    {submitted.includes(food.id) ? (
                      <span className="badge bg-secondary">Submitted</span>
                    ) : (
                      <button
                        className="btn btn-sm btn-outline-primary"
                        disabled={!rating[food.id]}
                        onClick={() => handleSubmit(food)}
                      >
                        Submit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">📝 Today’s Food Feedback</h3>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <MealSection
        title="Breakfast"
        icon="🍳"
        color="warning"
        category="BREAKFAST"
      />

      <MealSection
        title="Lunch"
        icon="🍛"
        color="success"
        category="LUNCH"
      />

      <MealSection
        title="Dinner"
        icon="🍽️"
        color="primary"
        category="DINNER"
      />
    </div>
  );
};

export default Feedback;
