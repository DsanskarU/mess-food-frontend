import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { getTodayFeedbackAnalysis } from "../api/feedbackAnalysisApi";
import { prepareMealWiseData } from "../api/feedbackGraphUtils";

const ChefFeedbackDashboard = () => {
  const [graphData, setGraphData] = useState([]);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTodayFeedbackAnalysis()
      .then((res) => {
        const feedback = res.data;

        // GRAPH DATA
        setGraphData(prepareMealWiseData(feedback));

        // MENU SUMMARY
        const foodMap = {};

        feedback.forEach((item) => {
          if (!foodMap[item.food_name]) {
            foodMap[item.food_name] = {
              food_name: item.food_name,
              meal_time: item.meal_time,
              is_veg: item.is_veg,
              totalRating: 0,
              count: 0,
            };
          }

          foodMap[item.food_name].totalRating += item.rating;
          foodMap[item.food_name].count += 1;
        });

        const menuSummary = Object.values(foodMap).map((f) => ({
          food_name: f.food_name,
          meal_time: f.meal_time,
          is_veg: f.is_veg,
          avg_rating: (f.totalRating / f.count).toFixed(1),
        }));

        setMenu(menuSummary);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
        <p className="mt-2">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">

      {/* TITLE */}
      <h2 className="text-center mb-4 fw-bold">
        📊 Today’s Food Feedback Dashboard
      </h2>

      {/* MENU SECTION */}
      <div className="card shadow-sm mb-4">

        <div className="card-header bg-dark text-white">
          🍽 Today’s Menu Summary
        </div>

        <div className="card-body">

          <div className="row">

            {menu.map((item, index) => (
              <div
                key={index}
                className="col-12 col-sm-6 col-lg-4 mb-3"
              >
                <div className="border rounded p-3 h-100 shadow-sm">

                  {/* VEG BADGE */}
                  <span
                    className={`badge ${
                      item.is_veg ? "bg-success" : "bg-danger"
                    } mb-2`}
                  >
                    {item.is_veg ? "VEG" : "NON-VEG"}
                  </span>

                  {/* FOOD NAME */}
                  <h6 className="mt-2 fw-bold">
                    {item.food_name}
                  </h6>

                  {/* MEAL TIME */}
                  <div className="text-muted small">
                    {item.meal_time}
                  </div>

                  {/* RATING */}
                  <div className="fw-bold text-warning">
                    ⭐ Avg Rating: {item.avg_rating}
                  </div>

                </div>
              </div>
            ))}

          </div>

        </div>

      </div>

      {/* GRAPH SECTION */}
      <div className="card shadow-sm">

        <div className="card-header bg-primary text-white">
          📈 Meal-wise Like vs Dislike
        </div>

        <div className="card-body">

          {/* RESPONSIVE GRAPH */}
          <div style={{ width: "100%", height: 380 }}>
            <ResponsiveContainer>
              <BarChart data={graphData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="meal" />
                <YAxis />
                <Tooltip />
                <Legend />

                <Bar
                  dataKey="LIKE"
                  fill="#28a745"
                  radius={[6, 6, 0, 0]}
                />

                <Bar
                  dataKey="DISLIKE"
                  fill="#dc3545"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>

      </div>

    </div>
  );
};

export default ChefFeedbackDashboard;