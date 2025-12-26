import React, { useState } from 'react'
import { addFoodItem } from '../api/foodApi';
import { useLocation, useNavigate } from 'react-router-dom';

const AddFood = () => {
  const [formData, setFormData] = useState({
          name: "",
          category:"LUNCH",
          is_veg:1
      });

  const navigate = useNavigate();
  const location = useLocation();   

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'is_veg' ? (value === 'Veg' ? 1 : 0) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      setError("");
      setLoading(true);
      await addFoodItem(formData);
      setSuccess("food item added successfully");
    }catch(err){
      setError(err.response?.data?.message || "Failed to add food");
    }finally{
      setLoading(false);
    }
  } 
  
  
  return (
    <div className='card shadow p-4'>
      <h3 className='mb-3'>Add Food</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label className='from-label'>Food Name</label>
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            className='form-control'
            required
            disabled={loading}
          />
        </div>
        <div className='mb-3'>
          <label className='from-label'>Time</label>
          <select 
          className='form-select'
          name='category'
          value={formData.category}
          onChange={handleChange}
          disabled={loading}
          >
            <option value="BREAKFAST">BREAKFAST</option>
            <option value="LUNCH">LUNCH</option>
            <option value="DINNER">DINNER</option>
          </select>
        </div>
        <div className='mb-3'>
          <label className='from-label'>Category</label>
          <select 
          className='form-select'
          name='is_veg'
          value={formData.is_veg === 1 ? 'Veg' : 'Non-Veg'}
          onChange={handleChange}
          disabled={loading}
          >
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
          </select>
        </div>
        <div className='d-flex justify-content-between mt-4'>
          <button 
          type="submit" 
          className="btn btn-success w-100"
          disabled={loading}
          >
            {loading ? "Adding..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddFood
