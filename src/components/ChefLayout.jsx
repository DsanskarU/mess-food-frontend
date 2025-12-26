import React from 'react';
import ChefNavbar from './ChefNavbar';
import { Outlet } from 'react-router-dom';

const ChefLayout = ({}) => {
  return (
    <div className="d-flex">
      {/* Left Sidebar */}
      <ChefNavbar />

      {/* Right Content */}
      <div className="flex-grow-1 p-4">
        <Outlet/>
      </div>
    </div>
  );
};

export default ChefLayout;
