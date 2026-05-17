import { useContext } from "react";
import { themeContext } from "../App.jsx";

const ChildC = () => {
  const { theme, setTheme } = useContext(themeContext);

  return (
    <>
      <div>
        <button
          onClick={() => {
            theme === "light" ? setTheme("dark") : setTheme("light");
          }}
        >
          Change Theme
        </button>
      </div>
    </>
  );
};

export default ChildC;
