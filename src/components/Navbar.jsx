import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { getUserFromToken } from '../api/getUserFromToken'
import { getUserById } from '../api/userApi'

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    const tokenUser = getUserFromToken()

    useEffect(() => {
        const token = localStorage.getItem("token")
        setIsLoggedIn(!!token)

        if (tokenUser?.id) {
            getUserById(tokenUser.id)
                .then(res => {
                    setUser(res.data)
                })
                .catch(err => {
                    console.error("Error loading user", err)
                })
        }
    }, [tokenUser])

    const handleLogout = (e) => {
        e.preventDefault()
        localStorage.removeItem("token")
        setIsLoggedIn(false)
        setUser(null)
        navigate("/")
    }

    return (
        <nav className='navbar navbar-expand-lg navbar-custom'>
            <div className='container'>
                <Link className='navbar-brand' to="/">
                    Mess अंन्ना
                </Link>

                <div className='collapse navbar-collapse'>
                    <ul className='navbar-nav ms-auto align-items-center'>
                        <li className='nav-item'>
                            <Link className='nav-link' to="/">Home</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/menu">Menu</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/feedback">Feedback</Link>
                        </li>

                        {!isLoggedIn ? (
                            <li className='nav-item ms-2'>
                                <Link className='btn btn-warning' to="/login">
                                    Login
                                </Link>
                            </li>
                        ) : (
                            <>
                                {/* Student Name / Email */}
                                {user && (
                                    <li className="nav-item me-3 fw-bold text-white">
                                        {user.name}
                                    </li>
                                )}

                                <li className='nav-item'>
                                    <button
                                        className='btn btn-danger'
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
