import React from "react";
import { useNavigate } from "react-router-dom";

import annaImg from "../assets/anaImg.png";
import voteImg from "../assets/voteCard.png";
import menuImg from "../assets/menuCard.png";
import feedbackImg from "../assets/Feedback.png";
import mealsCard from "../assets/mealsCard.png";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">

      {/* HERO SECTION */}
      <div className="row align-items-center py-5 flex-column-reverse flex-md-row"
        style={{
          background: "linear-gradient(135deg, #FFDEE9, #B5FFFC)",
          borderRadius: "15px",
          padding: "40px"
        }}
      >

        {/* TEXT SECTION */}
        <div className="col-12 col-md-6 text-center text-md-start">
          <h1
            className="display-4 fw-bold mb-3"
            style={{
              background: "linear-gradient(90deg, #FF9A8B, #FF6A88, #FF99AC)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "2px 2px 4px rgba(0,0,0,0.1)"
            }}
          >
            Welcome to Mess <span className="text-warning">अंन्ना</span>
          </h1>

          <p className="lead mb-4" style={{ fontSize: "1.25rem", lineHeight: "1.6" }}>
            खाना हुआ <span className="fw-bold text-warning">आसान</span>:
            मेन्यू, फीडबैक और मैनेजमेंट, बस एक क्लिक दूर!
          </p>

          <button
            className="btn btn-warning btn-lg shadow-lg"
            onClick={() => navigate("/menu")}
            style={{ transition: "all 0.3s ease" }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            View Menu
          </button>
        </div>

        {/* IMAGE SECTION */}
        <div className="col-12 col-md-6 text-center">
          <img
            src={annaImg}
            alt="Food"
            className="img-fluid rounded shadow-lg"
            style={{
              maxWidth: "100%",
              width: "100%",
              maxHeight: "350px",
              objectFit: "contain",
              borderRadius: "20px"
            }}
          />
        </div>
      </div>

      {/* FEATURES TITLE */}
      <h2 className="mb-4 text-center mt-5">Features</h2>

      {/* CARDS SECTION */}
      <div className="row text-center">

        {/* CARD 1 */}
        <div className="col-12 col-sm-6 col-lg-3 mb-4">
          <div className="card h-100 shadow-sm p-3">
            <img src={menuImg} alt="Menu" className="img-fluid mb-2" />
            <h5>Today's Menu</h5>
            <p>Check out what’s cooking today.</p>
            <button className="btn btn-outline-primary" onClick={() => navigate("/menu")}>
              View Menu
            </button>
          </div>
        </div>

        {/* CARD 2 */}
        <div className="col-12 col-sm-6 col-lg-3 mb-4">
          <div className="card h-100 shadow-sm p-3">
            <img src={voteImg} alt="Vote" className="img-fluid mb-2" />
            <h5>Vote</h5>
            <p>Vote for your favorite dishes demand.</p>
            <button className="btn btn-outline-success" onClick={() => navigate("/menu")}>
              Vote Now
            </button>
          </div>
        </div>

        {/* CARD 3 */}
        <div className="col-12 col-sm-6 col-lg-3 mb-4">
          <div className="card h-100 shadow-sm p-3">
            <img src={feedbackImg} alt="Feedback" className="img-fluid mb-2" />
            <h5>Feedback</h5>
            <p>Share your thoughts and suggestions.</p>
            <button className="btn btn-outline-warning" onClick={() => navigate("/feedback")}>
              Give Feedback
            </button>
          </div>
        </div>

        {/* CARD 4 */}
        <div className="col-12 col-sm-6 col-lg-3 mb-4">
          <div className="card h-100 shadow-sm p-3">
            <img src={mealsCard} alt="Track" className="img-fluid mb-2" />
            <h5>Track Meals</h5>
            <p>Keep a record of your meals easily.</p>
            <button className="btn btn-outline-info" onClick={() => navigate("/menu")}>
              Track Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;