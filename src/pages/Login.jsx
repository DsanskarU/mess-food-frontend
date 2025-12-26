import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../api/authApi';
import { useLocation } from 'react-router-dom';
import anaNam from '../assets/ananam.png';
import { getUserFromToken } from '../api/getUserFromToken';
const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const loginMessage = location.state?.message;
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const [showMessage, setShowMessage] = useState(false);
    const [error, setError] = useState("");

    const handelChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handelSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login(formData);

            //save token 
            localStorage.setItem("token", res.data.token);
            const user = getUserFromToken();
            if (user?.role?.toLowerCase() === "chef") {
                navigate("/chef/add-menu");
            } else {
                navigate("/");
            }
        } catch (err) {
            setError(err.response?.data?.message || "login Failed")
        }
    }

    useEffect(() => {
        if (loginMessage) {
            setShowMessage(true); // show modal/card
        }
    }, [loginMessage]);

    const handleOk = () => {
        setShowMessage(false); // hide card, show login form
    };


    return (
        <div className='container mt-5 position-relative'>
            {/* Popup card */}
            {showMessage && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                    style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
                >
                    <div className="card p-4 text-center" style={{ width: "300px" }}>
                        <img
                            src={anaNam}
                            alt="Alert"
                            className="mb-3"
                            style={{ width: "240px", height: "190px", objectFit: "contain" }}
                        />
                        <h5 className="card-title">Alert</h5>
                        <p className="card-text">{loginMessage}</p>
                        <button className="btn btn-danger" onClick={handleOk}>
                            OK
                        </button>
                    </div>
                </div>
            )}
            {!showMessage && (
                <div className='container mt-5'>
                    <div className='row justify-content-center'>
                        <div className='col-md-5'>
                            <div className='card shadow menu-card'>
                                <div className='card-body'>
                                    <h3 className='text-center mb-4'>Login</h3>
                                    <p style={{ color: "orange" }} className='text-center mb-4'>Test Of Home</p>
                                    {/* error part */}

                                    {error && <div className='alert alert-danger'>{error}</div>}
                                    <form onSubmit={handelSubmit}>
                                        <div className='mb-3'>
                                            <label className='form-label'>Email</label>
                                            <input
                                                type='email'
                                                name='email'
                                                className='form-control'
                                                value={formData.email}
                                                onChange={handelChange}
                                                required
                                            />
                                        </div>
                                        <div className='mb-3'>
                                            <label className='form-label'>Password</label>
                                            <input
                                                type='password'
                                                name='password'
                                                className='form-control'
                                                value={formData.password}
                                                onChange={handelChange}
                                                required
                                            />
                                        </div>
                                        <div className='d-flex gap-2'>
                                            <button type="submit" className="btn btn-primary w-50">
                                                Login
                                            </button>

                                            <button
                                                type="button"
                                                className="btn btn-secondary w-50"
                                                onClick={() => navigate("/")}
                                            >
                                                Back to Home
                                            </button>
                                        </div>
                                        <div>
                                            <Link to="/register" className="btn btn-success w-100 mt-3">
                                                Register
                                            </Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Login
