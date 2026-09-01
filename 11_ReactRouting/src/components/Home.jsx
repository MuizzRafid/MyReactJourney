import React from "react";
import { useNavigate } from "react-router-dom";
export const Home = () => {
  const nevigate = useNavigate();
  function handleClick() {
    nevigate("./about");
  }
  return (
    <div>
      Home Page
      <button onClick={handleClick}>to about page</button>
    </div>
  );
};
