import { useReducer } from "react";

import "./App.css";

function App() {
  const reducer = (state, action) => {
    if (action.type === "increment") {
      return state + 1;
    }
    if (action.type === "decrement") {
      return state - 1;
    }
    return state;
  };

  const [state, dispatch] = useReducer(reducer, 0);

  return (
    <>
      <div>
        <h1>UseReducer HOOk</h1>

        <h2>{state}</h2>
        <button onClick={() => dispatch({ type: "increment" })}>Increment</button>
        <button onClick={() => dispatch({ type: "decrement" })}>decrement</button>
      </div>
    </>
  );
}

export default App;
