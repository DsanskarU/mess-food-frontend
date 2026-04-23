import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserFromToken } from "../api/getUserFromToken";
import { getUserById } from "../api/userApi";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const tokenUser = getUserFromToken();

    if (tokenUser?.id) {
      getUserById(tokenUser.id)
        .then((res) => setUser(res.data))
        .catch((err) => console.log(err));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/login"; // 🔥 full reset
  };

  // hide for chef
  if (user?.role?.toLowerCase() === "chef") return null;

  return (
    <>
      {/* TOP NAVBAR */}
      <nav className="navbar navbar-dark navbar-custom px-3">
        <Link className="navbar-brand" to="/">
          Mess अंन्ना
        </Link>

        {/* HAMBURGER (mobile only) */}
        <button
          className="d-lg-none"
          onClick={() => setOpen(true)}
          style={{
            fontSize: "26px",
            background: "none",
            border: "none",
            color: "white",
          }}
        >
          ☰
        </button>

        {/* DESKTOP MENU */}
        <div className="d-none d-lg-flex align-items-center gap-3 ms-auto">
          <Link className="nav-link text-white" to="/">Home</Link>
          <Link className="nav-link text-white" to="/menu">Menu</Link>
          <Link className="nav-link text-white" to="/feedback">Feedback</Link>

          {!user ? (
            <Link className="btn btn-warning" to="/login">Login</Link>
          ) : (
            <>
              <span className="text-white fw-bold">{user.name}</span>
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </nav>

      {/* BACKDROP */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.4)",
            zIndex: 998,
          }}
        />
      )}

      {/* RIGHT SIDE SLIDE MENU */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100vh",
          width: "260px",
          backgroundColor: "#111827",
          color: "white",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "0.3s ease",
          zIndex: 999,
          padding: "20px",
        }}
      >
        <h4 className="mb-4">Menu</h4>

        <Link to="/" onClick={() => setOpen(false)} className="d-block mb-3 text-white">
          Home
        </Link>

        <Link to="/menu" onClick={() => setOpen(false)} className="d-block mb-3 text-white">
          Menu
        </Link>

        <Link to="/feedback" onClick={() => setOpen(false)} className="d-block mb-3 text-white">
          Feedback
        </Link>

        {!user ? (
          <Link to="/login" onClick={() => setOpen(false)} className="btn btn-warning w-100 mt-3">
            Login
          </Link>
        ) : (
          <>
            <div className="mt-3 mb-2 fw-bold">{user.name}</div>

            <button
              onClick={handleLogout}
              className="btn btn-danger w-100"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;