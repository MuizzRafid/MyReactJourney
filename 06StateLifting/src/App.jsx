import { useState } from "react";
import "./App.css";
import { Panel } from "./Card";
import { ColorSwitch } from "./ColorSwitch";

//state lifting and event handling

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [click, setClick] = useState(0);
  const [color, setColor] = useState("");

  const handleClickOutside = () => {
    setClick(click + 1);
  };

  function getRandomColor() {
    let r = 150 + Math.round(100 * Math.random());
    let g = 150 + Math.round(100 * Math.random());
    let b = 150 + Math.round(100 * Math.random());
    return `rgb(${r},${g},${b})`;
  }

  const handleChangeColor = () => {
    setColor(getRandomColor());
  };

  return (
    <main className="accordion">
      <h1>Almaty, Kazakhstan</h1>
      <Panel
        title="About"
        isActive={activeIndex === 0}
        onShow={() => setActiveIndex(0)}
      >
        With a population of about 2 million, Almaty is Kazakhstan's largest
        city. From 1929 to 1997, it was its capital city.
      </Panel>
      <Panel
        title="Etymology"
        isActive={activeIndex === 1}
        onShow={() => setActiveIndex(1)}
      >
        The name comes from <span lang="kk-KZ">алма</span>, the Kazakh word for
        "apple" and is often translated as "full of apples". In fact, the region
        surrounding Almaty is thought to be the ancestral home of the apple, and
        the wild <i lang="la">Malus sieversii</i> is considered a likely
        candidate for the ancestor of the modern domestic apple.
      </Panel>

      <br />
      <br />
      <div
        id="colorChanger"
        style={{
          width: "100%",
          height: "100%",
          border: "2px solid black",
          backgroundColor: color,
        }}
        onClick={(e) => {
          handleClickOutside(e);
        }}
      >
        <ColorSwitch handleChangeColor={handleChangeColor}></ColorSwitch>
        <br />
        <br />
        <h2>Clicks on the box : {click}</h2>
      </div>
    </main>
  );
}

export default App;
