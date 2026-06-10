import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmount,
  resetValue,
} from "./Features/Counter/counterSlice";

import "./App.css";

function App() {
  const count = useSelector((state) => state.counter.value);
  const [amount, setAmount] = useState(0);
  const dispatch = useDispatch();

  function handleIncrementClick() {
    dispatch(increment());
  }

  function handleDecrementClick() {
    dispatch(decrement());
  }
  function handleResetClick() {
    dispatch(resetValue());
  }
  function handleIncAmountClick() {
    dispatch(incrementByAmount(amount));
  }

  return (
    <div className="CounterMain">
      <button onClick={handleIncrementClick}> + </button>

      <p>Count:{count}</p>

      <button onClick={handleDecrementClick}> - </button>

      <button onClick={handleResetClick}>Reset</button>

      <br />
      <br />
      <input
        className="inputVal"
        onChange={(e) => {
          setAmount(e.target.value);
        }}
        type="number"
        value={amount}
        placeholder="Enter an amount"
      />
      <br />
      <button onClick={handleIncAmountClick}>Increment by Amount</button>
    </div>
  );
}

export default App;
