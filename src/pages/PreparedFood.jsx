import React, { useEffect, useState } from "react";
import {
  addPreparedFood,
  getTodayPreparedFood,
  undoPreparedFood
} from "../api/preparedApi";
import { getTodayVoteResult } from "../api/voteApi";

const PreparedFood = () => {
  const [foods, setFoods] = useState([]);
  const [preparedIds, setPreparedIds] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    loadVoteResults();
    loadPreparedFoods();
  }, []);

  const loadVoteResults = async () => {
    try {
      const res = await getTodayVoteResult();
      setFoods(res.data);
    } catch {
      setError("Failed to load vote results");
    }
  };

  const loadPreparedFoods = async () => {
    try {
      const res = await getTodayPreparedFood();
      setPreparedIds(res.data.map(item => Number(item.food_id)));
    } catch (err) {
      console.error(err);
    }
  };

  const handlePrepare = async (food) => {
    try {
      setLoadingId(food.food_id);

      await addPreparedFood({
        food_id: food.food_id,
        quantity: quantities[food.food_id] || 1,
      });

      await loadPreparedFoods();
      setSuccess(`${food.food_name} marked as prepared`);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add prepared food");
    } finally {
      setLoadingId(null);
    }
  };

  const handleUndo = async (food) => {
    try {
      setLoadingId(food.food_id);

      await undoPreparedFood(food.food_id);

      await loadPreparedFoods();
      setSuccess(`${food.food_name} removed from prepared`);
      setError("");
    } catch {
      setError("Failed to undo prepared food");
    } finally {
      setLoadingId(null);
    }
  };

  const renderTable = (title, items) => (
    <div className="card mb-4 shadow-sm">
      <div className="card-header bg-dark text-white">
        <h5 className="mb-0">{title}</h5>
      </div>

      <div className="card-body p-0">
        {items.length === 0 ? (
          <p className="text-center p-3">No food available</p>
        ) : (
          <table className="table table-bordered mb-0">
            <thead className="table-secondary">
              <tr>
                <th>Food Name</th>
                <th>Type</th>
                <th>Total Votes</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {items.map(food => {
                const foodId = Number(food.food_id);
                const isPrepared = preparedIds.includes(foodId);

                return (
                  <tr key={foodId}>
                    <td>{food.food_name}</td>

                    <td>
                      <span
                        className={`badge ${
                          food.is_veg === 1
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {food.is_veg === 1 ? "VEG" : "NON-VEG"}
                      </span>
                    </td>

                    <td>{food.total_votes}</td>

                    <td>
                      <input
                        type="number"
                        min="1"
                        className="form-control form-control-sm"
                        style={{ width: "80px" }}
                        value={quantities[foodId] || 1}
                        disabled={isPrepared}
                        onChange={(e) =>
                          setQuantities(prev => ({
                            ...prev,
                            [foodId]: Number(e.target.value),
                          }))
                        }
                      />
                    </td>

                    <td>
                      {!isPrepared ? (
                        <button
                          className="btn btn-primary btn-sm w-100"
                          disabled={loadingId === foodId}
                          onClick={() => handlePrepare(food)}
                        >
                          {loadingId === foodId ? "Adding..." : "Add"}
                        </button>
                      ) : (
                        <button
                          className="btn btn-outline-danger btn-sm w-100"
                          disabled={loadingId === foodId}
                          onClick={() => handleUndo(food)}
                        >
                          Undo
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">Today Food Voting Result</h3>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {renderTable("Breakfast", foods.filter(f => f.category === "BREAKFAST"))}
      {renderTable("Lunch", foods.filter(f => f.category === "LUNCH"))}
      {renderTable("Dinner", foods.filter(f => f.category === "DINNER"))}
    </div>
  );
};

export default PreparedFood;
