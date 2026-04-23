import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { login } from "../api/authApi";
import anaNam from "../assets/ananam.png";
import { getUserFromToken } from "../api/getUserFromToken";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const loginMessage = location.state?.message;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showMessage, setShowMessage] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(formData);

      localStorage.setItem("token", res.data.token);

      const user = getUserFromToken();

      if (user?.role?.toLowerCase() === "chef") {
        navigate("/chef/add-menu");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login Failed");
    }
  };

  useEffect(() => {
    if (loginMessage) {
      setShowMessage(true);
    }
  }, [loginMessage]);

  const handleOk = () => {
    setShowMessage(false);
  };

  return (
    <div className="container mt-5">

      {/* POPUP */}
      {showMessage && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
        >
          <div className="card p-4 text-center" style={{ width: "90%", maxWidth: "300px" }}>
            <img
              src={anaNam}
              alt="Alert"
              className="mb-3 img-fluid"
              style={{ maxHeight: "180px", objectFit: "contain" }}
            />
            <h5>Alert</h5>
            <p>{loginMessage}</p>
            <button className="btn btn-danger" onClick={handleOk}>
              OK
            </button>
          </div>
        </div>
      )}

      {/* LOGIN FORM */}
      {!showMessage && (
        <div className="row justify-content-center">

          <div className="col-12 col-sm-10 col-md-6 col-lg-4">

            <div className="card shadow p-3 p-md-4">

              <h3 className="text-center mb-3">Login</h3>
              <p className="text-center text-warning mb-3">Test Of Home</p>

              {error && (
                <div className="alert alert-danger">{error}</div>
              )}

              <form onSubmit={handleSubmit}>

                {/* EMAIL */}
                <div className="mb-3">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* PASSWORD */}
                <div className="mb-3">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* BUTTONS */}
                <div className="d-grid gap-2">

                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate("/")}
                  >
                    Back to Home
                  </button>

                  <Link to="/register" className="btn btn-success">
                    Register
                  </Link>

                </div>

              </form>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default Login;