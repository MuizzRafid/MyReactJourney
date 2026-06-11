import { useCallback, useState } from "react";
import { ChildComponent } from "./components/ChildComponent";

import { ExpensiveComponent } from "./components/ExpensiveComponet";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  // function handleCount() {
  //   setCount(count + 1);
  // }

  //now i need to freeze the handlecount function so new ref couldn't make

  const handleCount = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  //after adding the depedency the childcomponet only created when the de
  //pendency will change and unnessery creation will not happen

  return (
    <div>
      <ExpensiveComponent></ExpensiveComponent>
    </div>

    // <div>
    //   <p>Count : {count}</p>
    //   <button onClick={handleCount}>Incremnt</button>

    //   <div>
    //     <ChildComponent
    //       buttonName="Click Me"
    //       handleCount={handleCount}
    //     ></ChildComponent>
    //   </div>
    // </div>
  );
}

export default App;
