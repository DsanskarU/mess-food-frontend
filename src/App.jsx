import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import ChefNavbar from "./components/ChefNavbar";

import Menu from "./pages/Menu";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddMenu from "./pages/AddMenu";
import AddFood from "./pages/AddFood";
import UpdateFood from "./pages/UpdateFood";
import PreparedFood from "./pages/PreparedFood";
import TodayFeedback from "./pages/TodayFeedback";
import TodayVoteResult from "./pages/TodayVoteResult";
import Feedback from "./pages/Feedback";
import ChefLayout from "./components/ChefLayout";
import ChefProtectedRoute from "./components/ChefProtectedRoute";
import ChefFeedbackDashboard from "./pages/ChefFeedbackDashboard";

import { getUserFromToken } from "./api/getUserFromToken";

const App = () => {
  const user = getUserFromToken();

  const isChef = user?.role?.toLowerCase() === "chef";

  return (
    <BrowserRouter>

      {/* 🔥 ROLE BASED NAVBAR */}
      {isChef ? <ChefNavbar /> : <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/register" element={<Register />} />
        <Route path="/feedback" element={<Feedback />} />

        {/* Chef Routes */}
        <Route
          path="/chef"
          element={
            <ChefProtectedRoute>
              <ChefLayout />
            </ChefProtectedRoute>
          }
        >
          <Route path="add-menu" element={<AddMenu />} />
          <Route path="add-food" element={<AddFood />} />
          <Route path="update-food" element={<UpdateFood />} />
          <Route path="prepared-food" element={<PreparedFood />} />
          <Route path="feedback-today" element={<TodayFeedback />} />
          <Route path="today-vote-result" element={<TodayVoteResult />} />
          <Route path="feedback-dashboard" element={<ChefFeedbackDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;