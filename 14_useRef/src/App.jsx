import { useState, useRef } from "react";

import "./App.css";
import { useEffect } from "react";
import { use } from "react";

function App() {
  const [count, setCount] = useState(0);
  const timerRef = useRef(null);

  let val = 0;
  console.log("i am re-rendering");
  val = val + 1;
  console.log(`the value is : ${val}`);
  // useEffect(() => {
  // });

  const startWatch = () => {
    timerRef.current = setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);
  };
  const stoptWatch = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };
  const restartWatch = () => {
    stoptWatch();
    setCount(0);
  };

  return (
    <>
      <div id="container">
        <h1>Stop Watch: {count} seconds</h1>

        <button onClick={startWatch}>Start</button>
        <button onClick={stoptWatch}>Stop</button>
        <button onClick={restartWatch}>Restart</button>
      </div>
    </>
  );
}

export default App;
