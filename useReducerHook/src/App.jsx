import "./App.css";
import ComplexCounter from "./Components/ComplexCounter";
import { Counter } from "./Components/Counter";
import Home from "./Components/Home";
import ShowValue from "./Components/ShowValue";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Home></Home>
      </div>
    ),
  },
  {
    path: "/ShowInstantValue",
    element: (
      <div>
        <ShowValue></ShowValue>
      </div>
    ),
  },
  {
    path: "/showcounter",
    element: (
      <div>
        <Counter></Counter>
      </div>
    ),
  },
  {
    path: "/complexCounter",
    element: (
      <div>
        <ComplexCounter></ComplexCounter>
      </div>
    ),
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
