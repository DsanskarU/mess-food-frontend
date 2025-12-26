import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserFromToken } from "../api/getUserFromToken";
import { getUserById } from "../api/userApi";

const ChefNavbar = () => {
  const [user, setUser] = useState(null);
  const tokenUser = getUserFromToken();

  useEffect(() => {
    if (tokenUser?.id) {
      getUserById(tokenUser.id)
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.error("Failed to load user", err);
        });
    }
  }, []);

  return (
    <div className="bg-light vh-100 p-3 d-flex flex-column" style={{ width: "250px" }}>
      
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="m-0">Chef Portal</h4>

        {user && (
          <span className="fw-bold text-primary">
            {user.name}
          </span>
        )}
      </div>

      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link className="nav-link btn btn-outline-primary w-100" to="/chef/add-menu">
            Add Menu
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link btn btn-outline-primary w-100" to="/chef/add-food">
            Add Food Item
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link btn btn-outline-primary w-100" to="/chef/update-food">
            Edit Food Item
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link btn btn-outline-primary w-100" to="/chef/prepared-food">
            Add Prepared Food
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link btn btn-outline-primary w-100" to="/chef/feedback-today">
            Today Feedback
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link btn btn-outline-primary w-100" to="/chef/today-vote-result">
            Today's Vote Result
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link btn btn-outline-primary w-100" to="/chef/feedback-dashboard">
            Feedback Dashboard
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ChefNavbar;
