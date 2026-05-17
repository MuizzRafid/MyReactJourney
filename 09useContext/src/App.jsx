import { useState, createContext } from "react";
import ChildA from "./components/ChildA";

import "./App.css";

const themeContext = createContext();

function App() {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState("light");

  return (
    <>
      <themeContext.Provider value={{ theme, setTheme }}>
        <div
          id="container"
          style={{ background: theme === "light" ? "beige" : "black" }}
        >
          <ChildA></ChildA>
        </div>
      </themeContext.Provider>
    </>
  );
}

export default App;
export { themeContext };
