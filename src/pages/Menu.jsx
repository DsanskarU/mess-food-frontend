import React, { useEffect, useState } from "react";
import { getTodayMenu } from "../api/menuApi";
import { voteFood, getMyTodayVotes } from "../api/voteApi";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [votedFood, setVotedFood] = useState([]);
  const [voteError, setVoteError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchMenu();
    fetchMyVotes();
  }, []);

  // fetch menu
  const fetchMenu = async () => {
    try {
      const res = await getTodayMenu();
      setMenu(res.data);
    } catch {
      setError("Failed to load today's menu");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 fetch already voted foods
  const fetchMyVotes = async () => {
    try {
      const res = await getMyTodayVotes();
      setVotedFood(res.data); // array of food_ids
    } catch {
      // user not logged in → ignore
    }
  };

  // vote handler
  const handleVote = async (food_id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", {
        state: { message: "You must login to vote" },
      });
      return;
    }

    try {
      await voteFood(food_id);
      setVotedFood((prev) => [...prev, food_id]);
    } catch (err) {
      setVoteError(
        err.response?.data?.message || "You already voted"
      );
    }
  };

  // reusable section renderer
  const renderSection = (title, emoji, category) => (
    <>
      <h4 className="mt-4 mb-3 text-center">
        {emoji} {title}
      </h4>

      <div className="row">
        {menu
          .filter((item) => item.category === category)
          .map((item) => {
            const isVoted = votedFood.includes(item.food_id);

            return (
              <div key={item.menu_id} className="col-md-4 mb-4 d-flex">
                <div className="card h-100 w-100 shadow-sm">
                  <div className="card-body d-flex flex-column">

                    <h5 className="card-title">{item.food_name}</h5>

                    <p>
                      <strong>Type:</strong>{" "}
                      {item.is_veg ? (
                        <span className="badge bg-success">Veg</span>
                      ) : (
                        <span className="badge bg-danger">Non-Veg</span>
                      )}
                    </p>

                    <button
                      className={`btn mt-auto ${
                        isVoted ? "btn-secondary" : "btn-warning"
                      }`}
                      disabled={isVoted}
                      onClick={() => handleVote(item.food_id)}
                    >
                      {isVoted ? "Voted" : "Vote"}
                    </button>

                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Today's Menu</h2>

      {loading && (
        <div className="text-center">
          <div className="spinner-border text-primary"></div>
        </div>
      )}

      {error && <div className="alert alert-danger">{error}</div>}
      {voteError && <div className="alert alert-warning">{voteError}</div>}

      {renderSection("Breakfast", "🍳", "BREAKFAST")}
      {renderSection("Lunch", "🍛", "LUNCH")}
      {renderSection("Dinner", "🍽️", "DINNER")}
    </div>
  );
};

export default Menu;
