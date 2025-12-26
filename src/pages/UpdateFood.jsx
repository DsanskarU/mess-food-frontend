import React, { useEffect, useState } from "react";
import { getAllFoodItems, updateFoodItem } from "../api/foodApi";

const UpdateFood = () => {
  const [foods, setFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    is_veg: 1,
  });

  const fetchFoods = async () => {
    try {
      const res = await getAllFoodItems();
      setFoods(res.data);
    } catch (error) {
      console.error("Error fetching foods", error);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  // EDIT BUTTON FIX
  const handleEditClick = (food) => {
    setSelectedFood(food);
    setFormData({
      name: food.name,
      category: food.category,
      is_veg: food.is_veg,
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "is_veg" ? Number(value) : value,
    });
  };

  const handleUpdate = async () => {
    try {
      await updateFoodItem(selectedFood.id, formData);
      alert("Food updated successfully");
      setShowModal(false);
      fetchFoods();
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  // RENDER TABLE BY CATEGORY
  const renderFoodTable = (title, category) => {
    const filteredFoods = foods.filter(
      (food) => food.category === category
    );

    if (filteredFoods.length === 0) return null;

    return (
      <div className="mb-5">
        <h4 className="mb-3 text-primary">{title}</h4>

        <table className="table table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Veg / Non-Veg</th>
              <th>Edit</th>
            </tr>
          </thead>

          <tbody>
            {filteredFoods.map((food) => (
              <tr key={food.id}>
                <td>{food.id}</td>
                <td>{food.name}</td>

                <td>
                  <span
                    className={`badge ${
                      food.is_veg ? "bg-success" : "bg-danger"
                    }`}
                  >
                    {food.is_veg ? "Veg" : "Non-Veg"}
                  </span>
                </td>

                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleEditClick(food)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Update Food Items</h3>

      {renderFoodTable("Breakfast Menu", "BREAKFAST")}
      {renderFoodTable("Lunch Menu", "LUNCH")}
      {renderFoodTable("Dinner Menu", "DINNER")}

      {/* EDIT MODAL */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Edit Food</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Food Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <select
                    className="form-select"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="BREAKFAST">BREAKFAST</option>
                    <option value="LUNCH">LUNCH</option>
                    <option value="DINNER">DINNER</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Veg / Non-Veg</label>
                  <select
                    className="form-select"
                    name="is_veg"
                    value={formData.is_veg}
                    onChange={handleChange}
                  >
                    <option value={1}>Veg</option>
                    <option value={0}>Non-Veg</option>
                  </select>

                  <div className="mt-2">
                    <span
                      className={`badge ${
                        formData.is_veg ? "bg-success" : "bg-danger"
                      }`}
                    >
                      {formData.is_veg ? "Veg" : "Non-Veg"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-success"
                  onClick={handleUpdate}
                >
                  Update
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateFood;
