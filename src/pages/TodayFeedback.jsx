import React, { useEffect, useState } from "react";
import { getTodayFeedback } from "../api/feedbackApi";

const TodayFeedback = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodayFeedback();
  }, []);

  const fetchTodayFeedback = async () => {
    try {
      const res = await getTodayFeedback();
      setFeedback(res.data);
    } catch (error) {
      console.error("Error fetching today feedback:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderCategorySection = (title, category, icon, color) => {
    const filtered = feedback.filter(
      (item) => item.category === category
    );

    if (filtered.length === 0) return null;

    return (
      <div className="mb-5">

        {/* TITLE */}
        <h4 className={`mb-3 text-${color}`}>
          {icon} {title}
        </h4>

        <div className="row">

          {filtered.map((item, index) => (
            <div
              key={index}
              className="col-12 col-sm-6 col-lg-4 mb-3"
            >

              <div className="card shadow-sm h-100 border-0">

                <div className="card-body d-flex flex-column">

                  <h5 className="card-title text-capitalize mb-2">
                    {item.food_name}
                  </h5>

                  {/* RATING BADGE */}
                  <div className="mb-2">
                    <span className="badge bg-warning text-dark">
                      ⭐ {Number(item.avg_rating).toFixed(1)} / 5
                    </span>
                  </div>

                  {/* TOTAL FEEDBACK */}
                  <p className="mt-auto mb-0 text-muted">
                    Total Feedback:{" "}
                    <strong>{item.total_feedback}</strong>
                  </p>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    );
  };

  return (
    <div className="container mt-4">

      {/* TITLE */}
      <h3 className="mb-4 text-center">
        📝 Today’s Food Feedback
      </h3>

      {/* LOADING */}
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary"></div>
          <p className="mt-2">Loading feedback...</p>
        </div>
      ) : feedback.length === 0 ? (
        <div className="alert alert-warning text-center">
          No feedback available for today.
        </div>
      ) : (
        <>
          {renderCategorySection(
            "Breakfast Feedback",
            "BREAKFAST",
            "🍳",
            "primary"
          )}

          {renderCategorySection(
            "Lunch Feedback",
            "LUNCH",
            "🍛",
            "success"
          )}

          {renderCategorySection(
            "Dinner Feedback",
            "DINNER",
            "🍽️",
            "danger"
          )}
        </>
      )}

    </div>
  );
};

export default TodayFeedback;