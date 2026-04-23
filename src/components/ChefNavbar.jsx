import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserFromToken } from "../api/getUserFromToken";
import { getUserById } from "../api/userApi";

const ChefNavbar = () => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const tokenUser = getUserFromToken();

  useEffect(() => {
    if (tokenUser?.id) {
      getUserById(tokenUser.id)
        .then((res) => setUser(res.data))
        .catch((err) => console.error(err));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <>
      {/* ✅ MOBILE TOP BAR */}
      <div className="d-flex d-md-none align-items-center justify-content-between p-3 shadow-sm bg-dark text-white">
        <button
          onClick={() => setOpen(true)}
          style={{
            fontSize: "28px",
            background: "none",
            border: "none",
            color: "white",
          }}
        >
          ☰
        </button>

        <h5 className="m-0 fw-bold">
          Chef Panel {user ? `- ${user.name}` : ""}
        </h5>
      </div>

      {/* ✅ BACKDROP */}
      {open && (
        <div
          className="d-md-none"
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

      {/* ✅ SIDEBAR */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: "260px",
          backgroundColor: "#111827",
          color: "white",
          zIndex: 999,
          transform: open ? "translateX(0)" : "translateX(-100%)",
          transition: "0.3s ease",
        }}
      >
        {/* ✅ DESKTOP HEADER ONLY (NO DUPLICATE IN MOBILE) */}
        <div
          className="p-3 border-bottom d-none d-md-block"
          style={{ borderColor: "#374151" }}
        >
          <h4 style={{ color: "#FF7A00" }}>🍽 Chef Portal</h4>

          {user && (
            <div className="small">
              Welcome, <b>{user.name}</b>
            </div>
          )}
        </div>

        {/* MENU */}
        <div className="p-2 flex-grow-1">
          {[
            { name: "Add Menu", path: "/chef/add-menu" },
            { name: "Add Food", path: "/chef/add-food" },
            { name: "Edit Food", path: "/chef/update-food" },
            { name: "Prepared Food", path: "/chef/prepared-food" },
            { name: "Today Feedback", path: "/chef/feedback-today" },
            { name: "Vote Result", path: "/chef/today-vote-result" },
            { name: "Feedback Dashboard", path: "/chef/feedback-dashboard" },
          ].map((item, i) => (
            <Link
              key={i}
              to={item.path}
              onClick={() => setOpen(false)}
              style={{
                display: "block",
                padding: "10px",
                marginBottom: "8px",
                color: "white",
                textDecoration: "none",
                border: "1px solid #374151",
                borderRadius: "6px",
              }}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* LOGOUT */}
        <div className="p-3 border-top" style={{ borderColor: "#374151" }}>
          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#dc3545",
              border: "none",
              color: "white",
              fontWeight: "bold",
              borderRadius: "6px",
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* ✅ DESKTOP FIX */}
      <style>
        {`
          @media (min-width: 768px) {
            div[style*="translateX"] {
              transform: translateX(0) !important;
            }
          }
        `}
      </style>
    </>
  );
};

export default ChefNavbar;