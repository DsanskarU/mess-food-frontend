import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllFoodItems } from "../api/foodApi";
import { addMenu } from "../api/menuApi";

const AddMenu = () => {
  const navigate = useNavigate();

  const [foods, setFoods] = useState([]);
  const [selectedFoodId, setSelectedFoodId] = useState(null);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await getAllFoodItems();
        setFoods(res.data);
      } catch {
        setError("Failed to load food items");
      }
    };
    fetchFoods();
  }, []);

  const filteredFoods = foods.filter(
    (food) =>
      food.name.toLowerCase().includes(search.toLowerCase()) ||
      food.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFoodId) {
      setError("Please select a food item");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await addMenu({ food_id: selectedFoodId });
      const food = foods.find((f) => f.id === selectedFoodId);
      setSuccess(`"${food.name}" added to today's menu`);
      setSelectedFoodId(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add menu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-lg">

        {/* HEADER */}
        <div className="card-header bg-success text-white">
          <h4 className="mb-0"> Add Today’s Menu</h4>
        </div>

        <div className="card-body">

          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          {/* SEARCH */}
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search food by name or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* SCROLLABLE TABLE */}
          <div style={{ maxHeight: "350px", overflowY: "auto" }}>
            <table className="table table-hover table-bordered align-middle">
              <thead className="table-dark sticky-top">
                <tr>
                  <th style={{ width: "60px" }}>Select</th>
                  <th>Food Name</th>
                  <th>Category</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {filteredFoods.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center text-muted">
                      No food items found
                    </td>
                  </tr>
                )}

                {filteredFoods.map((food) => (
                  <tr key={food.id}>
                    <td className="text-center">
                      <input
                        type="radio"
                        name="foodSelect"
                        className="form-check-input"
                        checked={selectedFoodId === food.id}
                        onChange={() => setSelectedFoodId(food.id)}
                      />
                    </td>
                    <td>{food.name}</td>
                    <td>
                      <span className="badge bg-primary">
                        {food.category}
                      </span>
                    </td>
                    <td>
                      {food.is_veg ? (
                        <span className="badge bg-success">Veg</span>
                      ) : (
                        <span className="badge bg-danger">Non-Veg</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ACTION BUTTONS */}
          <div className="d-flex justify-content-between mt-4">
            <button
              className="btn btn-outline-primary"
              onClick={() => navigate("/chef/add-food")}
            >
               Add New Food
            </button>

            <button
              className="btn btn-success px-4"
              onClick={handleSubmit}
              disabled={loading || !selectedFoodId}
            >
              {loading ? "Saving..." : " Add to Menu"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMenu;
