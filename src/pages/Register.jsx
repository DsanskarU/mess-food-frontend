import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signup } from '../api/authApi';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [error,setError] = useState("");
    const handelChange = (e) => {
        setFormData({ ...formData,[e.target.name] : e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await signup(formData);
            navigate("/login");
        }catch(err){
            setError(err.response?.data?.message || "login Failed");
        }
    }

    return (
        <div className='container mt-5'>
            <div className='row justify-content-center'>
                <div className='col-md-5'>
                    <div className='card shadow menu-card'>
                        <div className='card-body'>
                            <h3 className='text-center mb-4'>Register</h3>
                            <p style={{ color: "orange" }} className='text-center mb-4'>Test Of Home</p>
                            {error && <div className='alert alert-danger'>{error}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className='mb-3'>
                                    <label className='form-label'>Name</label>
                                    <input
                                        type='text'
                                        name='name'
                                        className='form-control'
                                        value={formData.name}
                                        onChange={handelChange}
                                        required
                                    />
                                </div>
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
                                        Submit
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-secondary w-50"
                                        onClick={() => navigate("/login")}
                                    >
                                        Back to login
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
