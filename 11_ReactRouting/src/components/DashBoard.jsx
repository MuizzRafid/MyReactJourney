import React from "react";
import { Outlet } from "react-router-dom";
export const Dashboard = () => {
  return (
    <div>
      DashBoard
      <Outlet></Outlet>
    </div>
  );
};
