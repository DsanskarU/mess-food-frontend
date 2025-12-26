import React, { useEffect, useState } from "react";
import { getTodayVoteResult } from "../api/voteApi"; // adjust path if needed

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

      setBreakfast(data.filter(item => item.category === "BREAKFAST"));
      setLunch(data.filter(item => item.category === "LUNCH"));
      setDinner(data.filter(item => item.category === "DINNER"));
    } catch (error) {
      console.error("Error fetching vote results", error);
    } finally {
      setLoading(false);
    }
  };

  const renderTable = (title, items) => (
    <div className="card mb-4 shadow-sm">
      <div className="card-header bg-dark text-white">
        <h5 className="mb-0">{title}</h5>
      </div>
      <div className="card-body p-0">
        {items.length === 0 ? (
          <p className="text-center p-3">No votes found</p>
        ) : (
          <table className="table table-bordered table-striped mb-0">
            <thead className="table-secondary">
              <tr>
                <th>Food Name</th>
                <th>Total Votes</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{item.food_name}</td>
                  <td>{item.total_votes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4"> Today Vote Result</h2>

      {renderTable("Breakfast", breakfast)}
      {renderTable("Lunch", lunch)}
      {renderTable("Dinner", dinner)}
    </div>
  );
};

export default TodayVoteResult;
