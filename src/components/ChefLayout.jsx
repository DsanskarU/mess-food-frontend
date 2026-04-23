import React from "react";
import ChefNavbar from "./ChefNavbar";
import { Outlet } from "react-router-dom";

const ChefLayout = () => {
  return (
    <>
      <ChefNavbar />

      <div className="chef-content">
        <Outlet />
      </div>

      <style>
        {`
          .chef-content {
            margin-left: 260px;
            padding: 20px;
            min-height: 100vh;
          }

          /* MOBILE FIX */
          @media (max-width: 768px) {
            .chef-content {
              margin-left: 0 !important;
            }
          }
        `}
      </style>
    </>
  );
};

export default ChefLayout;