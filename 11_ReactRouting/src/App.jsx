import { useState } from "react";

import "./App.css";
import { Home } from "./components/Home";
import { About } from "./components/About";
import { Dashboard } from "./components/DashBoard";
import { NavBar } from "./components/NavBar";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Param } from "./components/Param";
import { Course } from "./components/Course";
import { NotFound } from "./components/NotFound";

// const Layout = () => (
//   <div>
//     <NavBar />
//     <Outlet />
//   </div>
// );

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <NavBar />
        <Home />
      </div>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <div>
        <NavBar />
        <Dashboard />
      </div>
    ),
    children: [
      {
        path: "course",
        element: <Course />,
      },
      {
        path: "mocktest",
        element: <div>Looking for Mock Test</div>,
      },
      {
        path: "reports",
        element: <div>Reports are here</div>,
      },
    ],
  },
  {
    path: "/about",
    element: (
      <div>
        <NavBar />
        <About />
      </div>
    ),
  },
  {
    path: "/student/:id",
    element: <Param />,
  },
  {
    path: "/*",
    element: <NotFound />,
  },
]);

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
