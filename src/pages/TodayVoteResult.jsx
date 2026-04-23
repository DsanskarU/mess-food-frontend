import React, { useEffect, useState } from "react";
import { getTodayVoteResult } from "../api/voteApi";

const TodayVoteResult = () => {
  const [breakfast, setBreakfast] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [dinner, setDinner] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVoteResults();
  }, []);

  const fetchVoteResults = async () => {
    try {
      const res = await getTodayVoteResult();
      const data = res.data;

      setBreakfast(data.filter((item) => item.category === "BREAKFAST"));
      setLunch(data.filter((item) => item.category === "LUNCH"));
      setDinner(data.filter((item) => item.category === "DINNER"));
    } catch (error) {
      console.error("Error fetching vote results", error);
    } finally {
      setLoading(false);
    }
  };

  const renderTable = (title, items, color) => (
    <div className="card mb-4 shadow-sm">

      {/* HEADER */}
      <div className={`card-header bg-${color} text-white`}>
        <h5 className="mb-0">📊 {title}</h5>
      </div>

      {/* BODY */}
      <div className="card-body p-0">

        {items.length === 0 ? (
          <p className="text-center p-3 mb-0 text-muted">
            No votes found
          </p>
        ) : (
          <div className="table-responsive">

            <table className="table table-bordered table-striped mb-0">

              <thead className="table-light">
                <tr>
                  <th>Food Name</th>
                  <th className="text-center">Total Votes</th>
                </tr>
              </thead>

              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td className="fw-semibold">
                      {item.food_name}
                    </td>
                    <td className="text-center">
                      <span className="badge bg-primary">
                        {item.total_votes}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  );

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
        <p className="mt-2">Loading results...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">

      {/* TITLE */}
      <h2 className="text-center mb-4">
        🗳 Today Vote Result
      </h2>

      {/* SECTIONS */}
      {renderTable("Breakfast", breakfast, "warning")}
      {renderTable("Lunch", lunch, "success")}
      {renderTable("Dinner", dinner, "primary")}

    </div>
  );
};

export default TodayVoteResult;