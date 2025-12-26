import React from 'react'
import annaImg from '../assets/anaImg.png'
import { useNavigate } from 'react-router-dom'
import voteImg from "../assets/voteCard.png"
import menuImg from "../assets/menuCard.png"
import feedbackImg from "../assets/Feedback.png"
import mealsCard from "../assets/mealsCard.png"
const Home = () => {

  const navigate = useNavigate();
  
  return (
    <div className='container mt-5'>
      <div className='row align-items-center py-5' style={{ background: 'linear-gradient(135deg, #FFDEE9, #B5FFFC)', borderRadius: '15px', padding: '40px' }}>
        <div className='col-md-6'>
          <h1 className='display-4 fw-bold mb-3' style={{
            background: "linear-gradient(90deg, #FF9A8B, #FF6A88, #FF99AC)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "2px 2px 4px rgba(0,0,0,0.1)"
          }}>
            Welcome to Mess <span className="text-warning">अंन्ना</span>
          </h1>
          <p className='lead mb-4' style={{ fontSize: "1.25rem", lineHeight: "1.6" }}>
            खाना हुआ <span className="fw-bold text-warning">आसान</span>: मेन्यू, फीडबैक और मैनेजमेंट, बस एक क्लिक दूर!
          </p>
          <button className='btn btn-warning btn-lg shadow-lg'
            onClick={() => navigate("/menu")}
            style={{ transition: "all 0.3s ease" }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            View Menu
          </button>
        </div>
        <div className='col-md-6 text-center'>
          <img
            src={annaImg}
            className='img-fluid rounded shadow-lg'
            alt='Food'
            style={{ maxHeight: "400px" }}
          />
        </div>
      </div>

      <h2 className='mb-4 text-center'>Features</h2>
      <div className='row text-center'>
        <div className='col-md-3 mb-4'>
          <div className='card h-100 shadow-sm p-3'>
            <img src={menuImg} alt='Menu' className='img-fluid mb-2' />
            <h5 className='card-title'>Today's Menu</h5>
            <p className='card-text'>Check out what’s cooking today.</p>
            <button className='btn btn-outline-primary' onClick={() => navigate("/menu")}>
              View Menu
            </button>
          </div>
        </div>
        <div className='col-md-3 mb-4'>
          <div className='card h-100 shadow-sm p-3'>
            <img src={voteImg} alt='Vote' className='img-fluid mb-2' />
            <h5 className='card-title'>Vote</h5>
            <p className='card-text'>Vote for your favorite dishes demand.</p>
            <button className='btn btn-outline-success' onClick={() => navigate("/menu")}>
              Vote Now
            </button>
          </div>
        </div>
        <div className='col-md-3 mb-4'>
          <div className='card h-100 shadow-sm p-3'>
            <img src={feedbackImg} alt='Feedback' className='img-fluid mb-2' />
            <h5 className='card-title'>Feedback</h5>
            <p className='card-text'>Share your thoughts and suggestions.</p>
            <button className='btn btn-outline-warning' onClick={() => navigate("/feedback")}>
              Give Feedback
            </button>
          </div>
        </div>
        <div className='col-md-3 mb-4'>
          <div className='card h-100 shadow-sm p-3'>
            <img src={mealsCard} alt='Track' className='img-fluid mb-2' />
            <h5 className='card-title'>Track Meals</h5>
            <p className='card-text'>Keep a record of your meals easily.</p>
            <button className='btn btn-outline-info' onClick={() => navigate("/menu")}>
              Track Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
