import React, { useState } from "react";
import { addFoodItem } from "../api/foodApi";
import { useNavigate } from "react-router-dom";

const AddFood = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "LUNCH",
    is_veg: 1,
  });

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "is_veg"
          ? value === "Veg"
            ? 1
            : 0
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setSuccess("");
      setLoading(true);

      await addFoodItem(formData);

      setSuccess("Food item added successfully");

      setFormData({
        name: "",
        category: "LUNCH",
        is_veg: 1,
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add food");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">

      <div className="row justify-content-center">

        {/* RESPONSIVE CARD */}
        <div className="col-12 col-sm-10 col-md-8 col-lg-6">

          <div className="card shadow p-3 p-md-4">

            <h3 className="text-center mb-3">🍽 Add Food</h3>

            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={handleSubmit}>

              {/* FOOD NAME */}
              <div className="mb-3">
                <label className="form-label">Food Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter food name"
                  required
                  disabled={loading}
                />
              </div>

              {/* CATEGORY (TIME) */}
              <div className="mb-3">
                <label className="form-label">Time</label>
                <select
                  className="form-select"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  disabled={loading}
                >
                  <option value="BREAKFAST">BREAKFAST</option>
                  <option value="LUNCH">LUNCH</option>
                  <option value="DINNER">DINNER</option>
                </select>
              </div>

              {/* VEG/NON-VEG */}
              <div className="mb-3">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  name="is_veg"
                  value={formData.is_veg === 1 ? "Veg" : "Non-Veg"}
                  onChange={handleChange}
                  disabled={loading}
                >
                  <option value="Veg">Veg</option>
                  <option value="Non-Veg">Non-Veg</option>
                </select>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="btn btn-success w-100"
                disabled={loading}
              >
                {loading ? "Adding..." : "Submit"}
              </button>

              {/* BACK BUTTON (optional UX improvement) */}
              <button
                type="button"
                className="btn btn-secondary w-100 mt-2"
                onClick={() => navigate(-1)}
              >
                Back
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AddFood;